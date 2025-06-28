import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';

// UCF coordinates
const UCF_CENTER = [28.6024, -81.2001];

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Sample danger zones around UCF campus
const generateDangerZones = () => [
  {
    id: 1,
    name: 'Student Union Area',
    position: [28.6018, -81.2005],
    risk: 'low',
    color: '#10b981',
    radius: 200,
    incidents: Math.floor(Math.random() * 3),
    description: 'Well-lit area with high foot traffic and security presence.'
  },
  {
    id: 2,
    name: 'Library Parking',
    position: [28.6031, -81.2012],
    risk: 'medium',
    color: '#f59e0b',
    radius: 150,
    incidents: Math.floor(Math.random() * 5) + 2,
    description: 'Moderate risk during evening hours. Regular patrols.'
  },
  {
    id: 3,
    name: 'East Campus Housing',
    position: [28.6015, -81.1985],
    risk: 'low',
    color: '#10b981',
    radius: 300,
    incidents: Math.floor(Math.random() * 2),
    description: 'Residential area with good lighting and emergency stations.'
  },
  {
    id: 4,
    name: 'Research Park',
    position: [28.5995, -81.1975],
    risk: 'high',
    color: '#ef4444',
    radius: 250,
    incidents: Math.floor(Math.random() * 8) + 5,
    description: 'Isolated area with limited lighting. Caution advised after dark.'
  },
  {
    id: 5,
    name: 'Recreation Center',
    position: [28.6045, -81.2020],
    risk: 'low',
    color: '#10b981',
    radius: 180,
    incidents: Math.floor(Math.random() * 2),
    description: 'Active area with regular security and good visibility.'
  },
  {
    id: 6,
    name: 'Parking Garage C',
    position: [28.6025, -81.1995],
    risk: 'medium',
    color: '#f59e0b',
    radius: 120,
    incidents: Math.floor(Math.random() * 4) + 1,
    description: 'Enhanced security measures. Be aware of surroundings.'
  }
];

export default function MapView({ selectedDate }) {
  const [dangerZones, setDangerZones] = useState([]);

  useEffect(() => {
    setDangerZones(generateDangerZones());
  }, [selectedDate]);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskLabel = (risk) => {
    switch (risk) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
      default: return 'Unknown';
    }
  };

  return (
    <div className="card-enhanced p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-dark">
          CAMPUS SAFETY MAP
        </h3>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {new Date(selectedDate).toLocaleDateString()}
        </div>
      </div>
      
      <div className="relative mb-6 overflow-hidden rounded-xl" style={{ height: '400px' }}>
        <MapContainer
          center={UCF_CENTER}
          zoom={15}
          style={{ height: '400px', width: '100%', zIndex: 1 }}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* UCF Main Campus Marker */}
          <Marker position={UCF_CENTER}>
            <Popup>
              <div className="text-center">
                <h4 className="font-bold text-lg">University of Central Florida</h4>
                <p className="text-sm text-gray-600">Main Campus</p>
              </div>
            </Popup>
          </Marker>

          {/* Danger Zones */}
          {dangerZones.map((zone) => (
            <Circle
              key={zone.id}
              center={zone.position}
              radius={zone.radius}
              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.3,
                weight: 3
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h4 className="font-bold text-lg mb-2">{zone.name}</h4>
                  <div className="mb-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      zone.risk === 'low' ? 'status-safe' :
                      zone.risk === 'medium' ? 'status-moderate' : 'status-danger'
                    }`}>
                      {getRiskLabel(zone.risk)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{zone.description}</p>
                  <div className="text-xs text-gray-500">
                    Recent incidents: {zone.incidents}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: '#10b981' }}></div>
            <span className="text-sm font-medium text-gray-700">Low Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: '#f59e0b' }}></div>
            <span className="text-sm font-medium text-gray-700">Medium Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="text-sm font-medium text-gray-700">High Risk</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="mt-4 p-4 rounded-lg border-l-4" style={{ backgroundColor: 'var(--light-teal)', borderColor: 'var(--primary-teal)' }}>
        <div className="flex items-start">
          <div className="mr-2 font-bold text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--primary-teal)', color: 'var(--primary-white)' }}>INFO</div>
          <div className="text-sm" style={{ color: 'var(--primary-dark)' }}>
            <strong>Interactive Map:</strong> Click on colored zones to view detailed safety information and recent incident reports. If the map doesn't load, check your internet connection and ensure Leaflet CSS is properly loaded.
          </div>
        </div>
      </div>
    </div>
  );
}