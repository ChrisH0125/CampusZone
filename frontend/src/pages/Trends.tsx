import { useState } from 'react';
import TrendsSparkline from '../components/TrendsSparkline';

export default function Trends() {
  const [selectedZone, setSelectedZone] = useState('all');

  const zones = [
    { id: 'all', name: 'All Campus' },
    { id: 'library', name: 'Library Area' },
    { id: 'parking', name: 'Parking Lots' },
    { id: 'dorms', name: 'Residence Halls' },
    { id: 'student-union', name: 'Student Union' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Past Trends</h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {zones.map(zone => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <TrendsSparkline selectedZone={selectedZone} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Trend Analysis</h3>
          <div className="text-gray-600">
            <p className="mb-4">
              Analysis for {zones.find(z => z.id === selectedZone)?.name || 'Selected Zone'} over the past 30 days...
            </p>
            <p className="italic">
              AI-generated insights about patterns, peak risk times, and safety recommendations will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}