import { useState } from 'react';
import MapView from '../components/MapView';
import DaySelector from '../components/DaySelector';
import GeminiSummaryBox from '../components/GeminiSummaryBox';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="bg-white border-b-2" style={{ borderColor: 'var(--primary-teal)' }}>
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold text-dark mb-2">
            SAFETY DASHBOARD
          </h1>
          <p className="text-gray-600">
            Real-time campus safety monitoring and analytics
          </p>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* Controls Section */}
        <div className="mb-8">
          <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Map Section - Takes 3 columns */}
          <div className="lg:col-span-3">
            <MapView selectedDate={selectedDate} />
          </div>
          
          {/* Stats Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Campus Status Card */}
            <div className="card-enhanced p-6 text-center">
              <h3 className="text-lg font-bold text-dark mb-4">CAMPUS STATUS</h3>
              <div className="status-safe px-4 py-2 rounded-full text-sm font-semibold mb-4">
                SAFE
              </div>
              <p className="text-gray-600 text-sm">
                Normal security levels
              </p>
            </div>

            {/* Quick Stats Card */}
            <div className="card-enhanced p-6">
              <h3 className="text-lg font-bold text-dark mb-4">QUICK STATS</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Zones</span>
                  <span className="font-bold text-2xl" style={{ color: 'var(--primary-teal)' }}>6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk Level</span>
                  <span className="status-safe px-3 py-1 rounded-full text-xs font-bold">LOW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Incidents</span>
                  <span className="font-bold text-2xl" style={{ color: 'var(--accent-yellow)' }}>12</span>
                </div>
                <div className="pt-2 border-t" style={{ borderColor: 'var(--primary-teal)' }}>
                  <div className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href="/compare"
                className="btn-primary w-full text-center block"
              >
                COMPARE DAYS
              </a>
              <button className="btn-secondary w-full">
                EXPORT PDF
              </button>
              <button className="btn-accent w-full">
                EMAIL SUMMARY
              </button>
            </div>
          </div>
        </div>

        {/* AI Summary Section - Full Width */}
        <div className="mb-8">
          <GeminiSummaryBox selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}