export default function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--primary-teal)' }}>
      <div className="px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              CAMPUS SAFETY
              <span className="block text-3xl md:text-4xl mt-2" style={{ color: 'var(--accent-yellow)' }}>
                FORECAST SYSTEM
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl opacity-90">
              Stay informed about campus safety trends with AI-powered insights, 
              real-time danger zone mapping, and predictive analytics.
            </p>
          </div>
          
          <div className="mb-12 slide-up">
            <a 
              href="/dashboard" 
              className="btn-accent text-lg px-8 py-3 inline-block shadow-lg mr-4"
            >
              TRY DEMO NOW
            </a>
            <a 
              href="/about" 
              className="btn-secondary text-lg px-8 py-3 inline-block"
            >
              LEARN MORE
            </a>
          </div>
        </div>

        {/* Features Grid - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-5xl">
          <div className="card-enhanced p-6 slide-up">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold mr-4" style={{ backgroundColor: 'var(--primary-teal)', color: 'var(--primary-white)' }}>
                MAP
              </div>
              <h3 className="text-lg font-bold text-dark">INTERACTIVE MAPS</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Real-time campus safety visualization with danger zones and risk levels
            </p>
          </div>
          
          <div className="card-enhanced p-6 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold mr-4" style={{ backgroundColor: 'var(--primary-teal)', color: 'var(--primary-white)' }}>
                AI
              </div>
              <h3 className="text-lg font-bold text-dark">AI INSIGHTS</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Smart analysis and predictions powered by advanced machine learning
            </p>
          </div>
          
          <div className="card-enhanced p-6 slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold mr-4" style={{ backgroundColor: 'var(--primary-teal)', color: 'var(--primary-white)' }}>
                DATA
              </div>
              <h3 className="text-lg font-bold text-dark">TREND ANALYSIS</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Historical data analysis and safety pattern recognition
            </p>
          </div>
        </div>

        {/* Newsletter Section - Horizontal Layout */}
        <div className="card-enhanced p-6 max-w-2xl slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0">
              <h3 className="text-lg font-bold text-dark mb-1">
                STAY UPDATED
              </h3>
              <p className="text-gray-600 text-sm">
                Get weekly safety reports
              </p>
            </div>
            <div className="flex flex-1 gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm"
                style={{ borderColor: 'var(--primary-teal)' }}
              />
              <button className="btn-primary whitespace-nowrap text-sm px-4 py-2">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}