export default function Sponsors() {
  const sponsors = [
    { name: 'University of Central Florida', logo: '🏫', description: 'Our home institution' },
    { name: 'Google Gemini AI', logo: '🤖', description: 'AI-powered insights and analysis' },
    { name: 'GitHub', logo: '💻', description: 'Code hosting and collaboration' },
    { name: 'React', logo: '⚛️', description: 'Frontend framework' },
    { name: 'Tailwind CSS', logo: '🎨', description: 'Styling and design' },
  ];

  const technologies = [
    'React', 'Tailwind CSS', 'React Router', 'Axios', 'Vite', 'Node.js', 'Express', 'Google Gemini AI'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sponsors & Credits</h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-4xl mb-4">{sponsor.logo}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{sponsor.name}</h3>
                  <p className="text-gray-600 text-sm">{sponsor.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Technologies Used</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acknowledgments</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                This project was developed as part of our commitment to improving campus safety 
                through innovative technology solutions. We're grateful for the support and 
                resources provided by our partners and the open-source community.
              </p>
              <p>
                Special thanks to the University of Central Florida for providing the platform 
                and data necessary to develop and test this safety forecasting system.
              </p>
              <p>
                We also acknowledge the contributions of various open-source libraries and 
                frameworks that made this project possible, as well as the AI technologies 
                that power our intelligent analysis features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}