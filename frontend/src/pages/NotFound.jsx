export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-lg">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center text-4xl font-bold" style={{ backgroundColor: 'var(--primary-teal)', color: 'var(--primary-white)' }}>
          404
        </div>
        <h1 className="text-5xl font-bold text-dark mb-4">PAGE NOT FOUND</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lost in the Campus</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Looks like you've wandered into an unsafe zone! Let's get you back to familiar territory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="btn-primary"
          >
            BACK TO HOME
          </a>
          <a
            href="/dashboard"
            className="btn-secondary"
          >
            GO TO DASHBOARD
          </a>
        </div>
      </div>
    </div>
  );
}