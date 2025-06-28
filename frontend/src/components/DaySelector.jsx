export default function DaySelector({ selectedDate, onDateChange }) {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = today;
  const minDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleDateChange = (e) => {
    onDateChange(e.target.value);
  };

  const handleQuickSelect = (daysAgo) => {
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    onDateChange(date.toISOString().split('T')[0]);
  };

  return (
    <div className="card-enhanced p-6 fade-in">
      <h3 className="text-lg font-bold text-dark mb-4">SELECT DATE</h3>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
            max={maxDate}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickSelect(0)}
            className="btn-primary text-sm"
          >
            TODAY
          </button>
          <button
            onClick={() => handleQuickSelect(1)}
            className="btn-secondary text-sm"
          >
            YESTERDAY
          </button>
          <button
            onClick={() => handleQuickSelect(7)}
            className="btn-secondary text-sm"
          >
            1 WEEK AGO
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing data for: <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}