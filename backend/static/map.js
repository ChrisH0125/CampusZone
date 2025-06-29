// script.js

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// 1. Create the map instance with default view (will be updated with user location)
const map = L.map("map").setView([28.5383, -81.3792], 13); // Default to Orlando, Florida

// 2. Add Esri World Imagery tile layer
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
Esri_WorldImagery.addTo(map);

// 3. Load crime data and add circle markers
async function loadCrimeData() {
  try {
    const response = await fetch('/data.json');
    const crimeData = await response.json();
    
    // Add circle markers for each crime
    crimeData.forEach(crime => {
      // Skip if coordinates are missing
      if (!crime.coordinates || !crime.coordinates.latitude || !crime.coordinates.longitude) {
        return;
      }
      
      // Calculate radius based on danger_level (0-1 scale)
      // Scale: 50-200 pixels based on danger level
      const radius = 50 + (crime.danger_level * 150);
      
      // Determine color based on danger_level
      let color;
      if (crime.danger_level <= 0.33) {
        color = '#00FF00'; // green for low danger
      } else if (crime.danger_level <= 0.66) {
        color = '#FFFF00'; // yellow for medium danger
      } else {
        color = '#FF0000'; // red for high danger
      }
      
      // Create circle marker
      L.circle([crime.coordinates.latitude, crime.coordinates.longitude], {
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        radius: radius,
        weight: 1
      }).addTo(map);
    });
    
  } catch (error) {
    console.error('Error loading crime data:', error);
  }
}

// 4. Load crime forecast data and add forecast markers
async function loadCrimeForecast() {
  try {
    const response = await fetch('/api/crime-forecast');
    const forecastData = await response.json();
    
    // Update forecast text
    const forecastText = document.getElementById('forecast-text');
    const forecastLoading = document.getElementById('forecast-loading');
    const forecastError = document.getElementById('forecast-error');
    const forecastLegend = document.getElementById('forecast-legend');
    
    if (forecastData.error) {
      forecastLoading.classList.add('hidden');
      forecastError.classList.remove('hidden');
      forecastError.textContent = `Error loading forecast: ${forecastData.error}`;
      return;
    }
    
    // Display forecast text
    forecastLoading.classList.add('hidden');
    forecastText.classList.remove('hidden');
    forecastText.innerHTML = forecastData.forecast_text;
    forecastLegend.classList.remove('hidden');
    
    // Add forecast markers to map
    forecastData.high_risk_areas.forEach(area => {
      const coords = area.coordinates;
      
      // Determine marker color based on risk level
      let markerColor;
      if (area.risk_level === 'high') {
        markerColor = '#FF0000'; // Red
      } else if (area.risk_level === 'medium') {
        markerColor = '#FFA500'; // Orange
      } else {
        markerColor = '#FFFF00'; // Yellow
      }
      
      // Create custom icon for forecast markers
      const forecastIcon = L.divIcon({
        className: 'forecast-marker',
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      // Create popup content
      const popupContent = `
        <div style="font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #333;">Forecast: ${area.risk_level.toUpperCase()} Risk Area</h3>
          <p style="margin: 4px 0;"><strong>Risk Score:</strong> ${area.risk_score}</p>
          <p style="margin: 4px 0;"><strong>Historical Crimes:</strong> ${area.crime_count}</p>
          <p style="margin: 4px 0;"><strong>Predicted Crime Types:</strong> ${area.predicted_crimes.join(', ')}</p>
          <p style="margin: 4px 0;"><strong>Confidence:</strong> ${Math.round(area.confidence * 100)}%</p>
        </div>
      `;
      
      // Add forecast marker to map
      L.marker([coords.latitude, coords.longitude], {
        icon: forecastIcon
      })
        .addTo(map)
        .bindPopup(popupContent);
    });
    
  } catch (error) {
    console.error('Error loading crime forecast:', error);
    const forecastLoading = document.getElementById('forecast-loading');
    const forecastError = document.getElementById('forecast-error');
    
    forecastLoading.classList.add('hidden');
    forecastError.classList.remove('hidden');
    forecastError.textContent = 'Error loading crime forecast. Please try again later.';
  }
}

// 5. Get user's current location and center map
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Center map on user's location
      map.setView([lat, lng], 15);
      
      // Add marker at user's location
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();
      
      // Load crime data and forecast after setting location
      loadCrimeData();
      loadCrimeForecast();
    },
    function(error) {
      console.log("Geolocation error:", error);
      // Fallback: add marker at default location (Orlando)
      L.marker([28.5383, -81.3792])
        .addTo(map)
        .bindPopup("Default location: Orlando, FL")
        .openPopup();
      
      // Load crime data and forecast even on error
      loadCrimeData();
      loadCrimeForecast();
    }
  );
} else {
  console.log("Geolocation not supported");
  // Fallback: add marker at default location (Orlando)
  L.marker([28.5383, -81.3792])
    .addTo(map)
    .bindPopup("Default location: Orlando, FL")
    .openPopup();
  
  // Load crime data and forecast
  loadCrimeData();
  loadCrimeForecast();
}
