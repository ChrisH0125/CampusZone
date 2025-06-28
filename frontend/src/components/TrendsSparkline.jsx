import { useState, useEffect } from 'react';

export default function TrendsSparkline({ selectedZone }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateTrendData();
  }, [selectedZone]);

  const generateTrendData = () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        value: Math.floor(Math.random() * 100) + 1,
        incidents: Math.floor(Math.random() * 10)
      }));
      
      setData(mockData);
      setLoading(false);
    }, 1000);
  };

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const getBarHeight = (value) => {
    if (maxValue === minValue) return 50;
    return ((value - minValue) / (maxValue - minValue)) * 80 + 10;
  };

  const getColorClass = (value) => {
    if (value < 30) return 'bg-green-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Safety Trends (30 Days)</h3>
        <button
          onClick={generateTrendData}
          disabled={loading}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-200"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-end space-x-1 h-32">
              {data.map((point, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group relative"
                >
                  <div
                    className={`w-full ${getColorClass(point.value)} rounded-t transition-all duration-200 hover:opacity-80`}
                    style={{ height: `${getBarHeight(point.value)}%` }}
                  ></div>
                  
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {point.date}<br />
                    Score: {point.value}<br />
                    Incidents: {point.incidents}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-700 font-semibold">Low Risk Days</div>
              <div className="text-2xl font-bold text-green-800">
                {data.filter(d => d.value < 30).length}
              </div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-yellow-700 font-semibold">Medium Risk Days</div>
              <div className="text-2xl font-bold text-yellow-800">
                {data.filter(d => d.value >= 30 && d.value < 70).length}
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-red-700 font-semibold">High Risk Days</div>
              <div className="text-2xl font-bold text-red-800">
                {data.filter(d => d.value >= 70).length}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500 text-center">
            Hover over bars to see detailed information
          </div>
        </>
      )}
    </div>
  );
}