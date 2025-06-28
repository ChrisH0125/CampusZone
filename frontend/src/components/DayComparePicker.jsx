export default function DayComparePicker({ dayA, dayB, onDayAChange, onDayBChange }) {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = today;
  const minDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Days to Compare</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Day A
          </label>
          <input
            type="date"
            value={dayA}
            onChange={(e) => onDayAChange(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 text-sm text-gray-600">
            {new Date(dayA).toLocaleDateString()}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Day B
          </label>
          <input
            type="date"
            value={dayB}
            onChange={(e) => onDayBChange(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 text-sm text-gray-600">
            {new Date(dayB).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            onDayAChange(today);
            onDayBChange(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
          }}
          className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-200"
        >
          Today vs Yesterday
        </button>
        <button
          onClick={() => {
            onDayAChange(today);
            onDayBChange(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
          }}
          className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200"
        >
          Today vs Last Week
        </button>
        <button
          onClick={() => {
            const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            onDayAChange(lastWeek);
            onDayBChange(twoWeeksAgo);
          }}
          className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200"
        >
          Week-over-Week
        </button>
      </div>
    </div>
  );
}