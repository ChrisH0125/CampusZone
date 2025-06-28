import { useState } from 'react';
import MapView from '../components/MapView';
import DayComparePicker from '../components/DayComparePicker';

export default function Compare() {
  const [dayA, setDayA] = useState(new Date().toISOString().split('T')[0]);
  const [dayB, setDayB] = useState(
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="bg-white border-b-2" style={{ borderColor: 'var(--primary-teal)' }}>
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold text-dark mb-2">
            COMPARE DAYS
          </h1>
          <p className="text-gray-600">
            Side-by-side safety analysis and comparison
          </p>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* Controls Section */}
        <div className="mb-8">
          <DayComparePicker 
            dayA={dayA} 
            dayB={dayB} 
            onDayAChange={setDayA} 
            onDayBChange={setDayB} 
          />
        </div>

        {/* Maps Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--light-teal)' }}>
              <h3 className="text-xl font-bold text-dark text-center">
                DAY A: {new Date(dayA).toLocaleDateString()}
              </h3>
            </div>
            <MapView selectedDate={dayA} />
          </div>
          <div>
            <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--light-teal)' }}>
              <h3 className="text-xl font-bold text-dark text-center">
                DAY B: {new Date(dayB).toLocaleDateString()}
              </h3>
            </div>
            <MapView selectedDate={dayB} />
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="card-enhanced p-8">
          <h3 className="text-2xl font-bold text-dark mb-6">AI COMPARISON SUMMARY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-dark mb-3">
                {new Date(dayA).toLocaleDateString()} Analysis
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>• Overall risk level: <span className="font-semibold">LOW</span></p>
                <p>• Active incidents: <span className="font-semibold">3</span></p>
                <p>• High-risk zones: <span className="font-semibold">1</span></p>
                <p>• Peak risk time: <span className="font-semibold">9:00 PM</span></p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-dark mb-3">
                {new Date(dayB).toLocaleDateString()} Analysis
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>• Overall risk level: <span className="font-semibold">MEDIUM</span></p>
                <p>• Active incidents: <span className="font-semibold">7</span></p>
                <p>• High-risk zones: <span className="font-semibold">2</span></p>
                <p>• Peak risk time: <span className="font-semibold">11:30 PM</span></p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--primary-white)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--accent-yellow)' }}>COMPARISON INSIGHTS</h4>
            <p className="text-sm">
              {new Date(dayA).toLocaleDateString()} showed significantly better safety conditions compared to {new Date(dayB).toLocaleDateString()}. 
              The earlier date had 57% fewer incidents and reduced high-risk zone activity. 
              Weather conditions and campus events may have contributed to these differences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}