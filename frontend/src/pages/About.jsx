export default function About() {
  const teamMembers = [
    { name: 'Chris', role: 'Frontend Lead' },
    { name: 'Lisa', role: 'Full Stack Developer' },
    { name: 'Pablo', role: 'Frontend Developer' },
    { name: 'Anthony', role: 'Data Analyst' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're dedicated to improving campus safety through innovative technology and data-driven insights. 
              Our platform combines real-time incident analysis with AI-powered forecasting to help students, 
              faculty, and campus security make informed decisions about safety on campus.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-600">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Data Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Process and analyze campus incident data to identify patterns and trends
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-green-600 text-2xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Insights</h3>
                <p className="text-gray-600 text-sm">
                  Generate intelligent summaries and safety recommendations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-purple-600 text-2xl">🗺️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Visual Mapping</h3>
                <p className="text-gray-600 text-sm">
                  Create intuitive danger zone maps for better awareness
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}