import { useState, useEffect } from 'react';

export default function GeminiSummaryBox({ selectedDate }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateSummary();
  }, [selectedDate]);

  const generateSummary = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockSummaries = [
        "Based on historical data, the campus shows moderate safety levels today. The library area and main quad appear to have the lowest risk, while parking lots near the residence halls show slightly elevated activity. Recommended to stay in well-lit areas after 8 PM.",
        "Today's safety forecast indicates generally low risk across campus. The student union and academic buildings maintain excellent safety scores. Exercise normal precautions around the perimeter parking areas during evening hours.",
        "Current conditions show heightened activity near the recreational facilities. The central campus remains very safe with regular security patrols. Students should be particularly aware when traveling between buildings after dark."
      ];
      
      const randomSummary = mockSummaries[Math.floor(Math.random() * mockSummaries.length)];
      setSummary(randomSummary);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="card-enhanced p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-dark flex items-center gap-2">
          AI SAFETY SUMMARY
        </h3>
        <button
          onClick={generateSummary}
          disabled={loading}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="spinner w-4 h-4"></div>
              Generating...
            </div>
          ) : (
            'REFRESH'
          )}
        </button>
      </div>

      <div className="min-h-[100px] flex items-center">
        {loading ? (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>Analyzing safety data with AI...</span>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
            <div className="mt-4 text-sm text-gray-500">
              Generated for {new Date(selectedDate).toLocaleDateString()} • Powered by Gemini AI
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 rounded-xl text-white" style={{ backgroundColor: 'var(--primary-dark)' }}>
        <div className="flex items-start space-x-3">
          <div className="mt-0.5 text-lg font-bold" style={{ color: 'var(--accent-yellow)' }}>TIP</div>
          <div className="text-sm">
            <strong>Safety Tip:</strong> Always trust your instincts and report any suspicious activity to campus security at (407) 823-5555.
          </div>
        </div>
      </div>
    </div>
  );
}