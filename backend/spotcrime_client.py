#!/usr/bin/env python3
"""
Production SpotCrime API Client
Session-based token management with lazy refresh strategy
"""

import requests
import json
import time
import re
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass

try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.chrome.options import Options
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False

@dataclass
class CrimeData:
    """Unified crime data structure"""
    id: str
    source: str
    type: str
    type_detail: str
    datetime: str
    address: str
    lat: float
    lng: float
    is_campus: bool
    severity: str
    external_link: str
    raw_data: Dict

class SpotCrimeClient:
    """Production-ready SpotCrime API client with session management"""
    
    def __init__(self, cache_duration_hours: int = 24):
        self.base_url = "https://spotcrime.com"
        self.api_endpoint = f"{self.base_url}/crimes.json"
        self.session = requests.Session()
        
        # Token caching
        self.cached_token = None
        self.token_timestamp = None
        self.cache_duration = timedelta(hours=cache_duration_hours)
        
        # UCF campus bounds for location detection
        self.ucf_bounds = {
            'north': 28.615,
            'south': 28.590,
            'east': -81.190,
            'west': -81.210
        }
        
        # Setup minimal headers (from our testing)
        self.session.headers.update({
            'User-Agent': 'Python/requests',
            'Accept': 'application/json'
        })
    
    def _is_token_expired(self) -> bool:
        """Check if cached token is expired"""
        if not self.cached_token or not self.token_timestamp:
            return True
        
        return datetime.now() - self.token_timestamp > self.cache_duration
    
    def _extract_token_from_page(self) -> Optional[str]:
        """Extract API token from SpotCrime map page"""
        print("Extracting fresh token from SpotCrime...")
        
        try:
            # Create a fresh session for token extraction
            temp_session = requests.Session()
            temp_session.headers.update({
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            })
            
            response = temp_session.get(f"{self.base_url}/map", timeout=10)
            print(f"Response status: {response.status_code}")
            
            if response.status_code == 200:
                # Look for token in data-api-key attribute
                pattern = r'data-api-key="([^"]+)"'
                matches = re.findall(pattern, response.text)
                
                for match in matches:
                    if match.startswith('SFMyNTY.'):
                        print(f"✓ Found token in data-api-key attribute")
                        return match
                
                print("✗ No valid token found in data-api-key")
                
                # Fallback: look for any SFMyNTY tokens
                sfmy_pattern = r'SFMyNTY\.[a-zA-Z0-9_.-]+'
                sfmy_matches = re.findall(sfmy_pattern, response.text)
                
                if sfmy_matches:
                    print(f"✓ Found fallback token")
                    return sfmy_matches[0]
                
                print("✗ No SFMyNTY tokens found")
            else:
                print(f"✗ Bad response: {response.status_code}")
                
        except Exception as e:
            print(f"✗ Token extraction failed: {e}")
        
        return None
    
    def _extract_token_with_selenium(self) -> Optional[str]:
        """Extract token using browser automation"""
        try:
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            
            driver = webdriver.Chrome(options=chrome_options)
            driver.get(f"{self.base_url}/map")
            
            # Wait for page to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # Execute JavaScript to intercept network requests
            script = """
            var token = null;
            var originalFetch = window.fetch;
            window.fetch = function(...args) {
                var headers = args[1]?.headers || {};
                if (headers['Spotcrime-API-Token']) {
                    token = headers['Spotcrime-API-Token'];
                }
                return originalFetch.apply(this, args);
            };
            
            // Try to trigger an API call
            if (window.loadCrimes) {
                window.loadCrimes();
            }
            
            return token;
            """
            
            # Wait a bit for any API calls to be made
            time.sleep(3)
            token = driver.execute_script(script)
            driver.quit()
            
            if token:
                print("✓ Extracted token using Selenium")
                return token
                
        except Exception as e:
            print(f"✗ Selenium token extraction failed: {e}")
            try:
                driver.quit()
            except:
                pass
        
        return None
    
    def _refresh_token(self) -> bool:
        """Refresh the cached token"""
        new_token = self._extract_token_from_page()
        if new_token:
            self.cached_token = new_token
            self.token_timestamp = datetime.now()
            self.session.headers['Spotcrime-API-Token'] = new_token
            print(f"✓ Token refreshed successfully")
            return True
        
        print("✗ Failed to refresh token")
        return False
    
    def _ensure_valid_token(self) -> bool:
        """Ensure we have a valid token, refresh if needed"""
        if self._is_token_expired():
            print("Token expired or missing, refreshing...")
            return self._refresh_token()
        
        # Set token in headers if we have one cached
        if self.cached_token:
            self.session.headers['Spotcrime-API-Token'] = self.cached_token
            return True
        
        return False
    
    def get_crimes(self, lat: float, lon: float, radius: float = 0.02, 
                   max_retries: int = 2) -> List[CrimeData]:
        """
        Get crimes from SpotCrime API with automatic token management
        
        Args:
            lat: Latitude
            lon: Longitude  
            radius: Search radius in degrees (default: ~2km)
            max_retries: Number of retry attempts on failure
            
        Returns:
            List of CrimeData objects
        """
        for attempt in range(max_retries + 1):
            try:
                # Ensure we have a valid token
                if not self._ensure_valid_token():
                    if attempt == max_retries:
                        raise Exception("Could not obtain valid API token")
                    continue
                
                # Make API request
                params = {
                    'lat': lat,
                    'lon': lon, 
                    'radius': radius
                }
                
                response = self.session.get(self.api_endpoint, params=params, timeout=15)
                
                # Handle 403 - token expired
                if response.status_code == 403:
                    print(f"✗ 403 Forbidden - token expired (attempt {attempt + 1})")
                    if attempt < max_retries:
                        # Force token refresh
                        self.cached_token = None
                        time.sleep(1)  # Brief delay before retry
                        continue
                    else:
                        raise Exception("Authentication failed after all retries")
                
                # Handle other errors
                if response.status_code != 200:
                    raise Exception(f"API returned {response.status_code}: {response.text[:200]}")
                
                # Parse response
                data = response.json()
                crimes = data.get('crimes', [])
                
                print(f"✓ Retrieved {len(crimes)} crimes from SpotCrime")
                
                # Convert to unified format
                return [self._convert_to_unified_format(crime) for crime in crimes]
                
            except requests.exceptions.RequestException as e:
                if attempt == max_retries:
                    raise Exception(f"Network error: {e}")
                print(f"Network error on attempt {attempt + 1}, retrying...")
                time.sleep(2 ** attempt)  # Exponential backoff
                
            except Exception as e:
                if attempt == max_retries:
                    raise e
                print(f"Error on attempt {attempt + 1}: {e}")
                time.sleep(1)
        
        return []
    
    def _convert_to_unified_format(self, crime: Dict) -> CrimeData:
        """Convert SpotCrime data to unified format"""
        try:
            # Parse date
            crime_datetime = datetime.strptime(crime.get('date', ''), '%m/%d/%Y %I:%M %p')
            
            # Map crime types
            crime_type_mapping = {
                'Theft': 'THEFT',
                'Assault': 'BATTERY', 
                'Burglary': 'BURGLARY',
                'Vandalism': 'VANDALISM',
                'Robbery': 'THEFT',
                'Other': 'OTHER',
                'Arrest': 'OTHER'
            }
            
            # Determine severity
            severity_mapping = {
                'Assault': 'high',
                'Robbery': 'high', 
                'Burglary': 'high',
                'Theft': 'medium',
                'Vandalism': 'medium',
                'Other': 'low',
                'Arrest': 'low'
            }
            
            lat = float(crime.get('lat', 0))
            lng = float(crime.get('lon', 0))
            
            return CrimeData(
                id=f"spotcrime_{crime.get('cdid')}",
                source='spotcrime',
                type=crime_type_mapping.get(crime.get('type'), 'OTHER'),
                type_detail=crime.get('type', 'Unknown'),
                datetime=crime_datetime.strftime('%Y-%m-%dT%H:%M:%SZ'),
                address=crime.get('address', ''),
                lat=lat,
                lng=lng,
                is_campus=self._is_campus_location(lat, lng),
                severity=severity_mapping.get(crime.get('type'), 'low'),
                external_link=crime.get('link', ''),
                raw_data=crime
            )
            
        except Exception as e:
            print(f"✗ Error converting crime {crime.get('cdid')}: {e}")
            # Return basic structure on error
            return CrimeData(
                id=f"spotcrime_{crime.get('cdid', 'unknown')}",
                source='spotcrime',
                type='OTHER',
                type_detail=crime.get('type', 'Unknown'),
                datetime=datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
                address=crime.get('address', ''),
                lat=float(crime.get('lat', 0)),
                lng=float(crime.get('lon', 0)),
                is_campus=False,
                severity='low',
                external_link=crime.get('link', ''),
                raw_data=crime
            )
    
    def _is_campus_location(self, lat: float, lng: float) -> bool:
        """Determine if coordinates are on UCF campus"""
        return (self.ucf_bounds['south'] <= lat <= self.ucf_bounds['north'] and
                self.ucf_bounds['west'] <= lng <= self.ucf_bounds['east'])
    
    def get_ucf_crimes(self, radius: float = 0.02) -> List[CrimeData]:
        """Get crimes near UCF campus"""
        ucf_lat, ucf_lng = 28.6024, -81.2001
        return self.get_crimes(ucf_lat, ucf_lng, radius)
    
    def get_token_info(self) -> Dict:
        """Get information about the current token"""
        return {
            'has_token': bool(self.cached_token),
            'token_age_hours': (datetime.now() - self.token_timestamp).total_seconds() / 3600 if self.token_timestamp else None,
            'is_expired': self._is_token_expired(),
            'token_preview': self.cached_token[:20] + '...' if self.cached_token else None
        }

def main():
    """Example usage"""
    client = SpotCrimeClient()
    
    print("SpotCrime Production Client")
    print("=" * 30)
    
    try:
        # Get crimes near UCF
        crimes = client.get_ucf_crimes()
        
        print(f"\nRetrieved {len(crimes)} crimes:")
        for crime in crimes[:5]:  # Show first 5
            print(f"  {crime.type}: {crime.address} ({crime.datetime})")
        
        # Show token info
        token_info = client.get_token_info()
        print(f"\nToken Info: {token_info}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()