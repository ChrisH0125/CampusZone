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

// 4. Get user's current location and center map
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
      
      // Load crime data after setting location
      loadCrimeData();
    },
    function(error) {
      console.log("Geolocation error:", error);
      // Fallback: add marker at default location (Orlando)
      L.marker([28.5383, -81.3792])
        .addTo(map)
        .bindPopup("Default location: Orlando, FL")
        .openPopup();
      
      // Load crime data even on error
      loadCrimeData();
    }
  );
} else {
  console.log("Geolocation not supported");
  // Fallback: add marker at default location (Orlando)
  L.marker([28.5383, -81.3792])
    .addTo(map)
    .bindPopup("Default location: Orlando, FL")
    .openPopup();
  
  // Load crime data
  loadCrimeData();
}
