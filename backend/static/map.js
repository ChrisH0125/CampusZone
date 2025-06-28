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

// 3. Get user's current location and center map
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
    },
    function(error) {
      console.log("Geolocation error:", error);
      // Fallback: add marker at default location (Orlando)
      L.marker([28.5383, -81.3792])
        .addTo(map)
        .bindPopup("Default location: Orlando, FL")
        .openPopup();
    }
  );
} else {
  console.log("Geolocation not supported");
  // Fallback: add marker at default location (Orlando)
  L.marker([28.5383, -81.3792])
    .addTo(map)
    .bindPopup("Default location: Orlando, FL")
    .openPopup();
}
