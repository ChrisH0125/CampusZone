import React from 'react';

// A new, non-functional component for the subscription section
const SubscriptionSection: React.FC = () => {
    // Using state for inputs is good practice, even if not functional yet
    const [email, setEmail] = React.useState('');
    const [location, setLocation] = React.useState('Orlando');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In the future, your API call logic would go here.
        console.log('Subscribing:', { email, location });
    };

    return (
        <section className="py-12 sm:py-16" style={{ backgroundColor: 'var(--background-cream)'}}>
            <div className="container mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold" style={{color: 'var(--primary-dark-blue)'}}>Join Our Safety Network</h3>
                        <p className="mt-1 mb-8 text-gray-600">Get weekly crime reports and safety alerts for your area.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
                        <div className="flex items-center gap-2">
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                className="flex-grow w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm transition"
                                style={{'--tw-ring-color': 'var(--accent-teal)'} as React.CSSProperties}
                                required
                             />
                            <button type="submit" className="btn-primary whitespace-nowrap text-sm px-6 py-3 flex-shrink-0">
                                Subscribe
                            </button>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="location" className="sr-only">Location</label>
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm transition text-gray-700"
                                style={{'--tw-ring-color': 'var(--accent-teal)'} as React.CSSProperties}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

// A new component for the page footer
const Footer: React.FC = () => {
    return (
        <footer className="py-6" style={{ backgroundColor: 'var(--primary-dark-blue)' }}>
            <div className="container mx-auto px-6 text-center">
                <p className="text-white/60 text-sm">
                    &copy; {new Date().getFullYear()} Campus Safety Forecast. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};


const Landing: React.FC = () => {
    // Subtle background pattern using an inline SVG
    const backgroundStyle = {
        backgroundColor: 'var(--background-cream)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232A4D54' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    };

    return (
        <div style={backgroundStyle}>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow flex items-center justify-center text-center px-4 pt-20">
                    <div>
                        {/* Image Placeholder */}
                        <div 
                            className="mx-auto w-48 h-48 md:w-64 md:h-64 mb-8 rounded-full bg-white/80 border-4 border-gray-200 flex items-center justify-center shadow-lg"
                         >
                            {/* You can replace this with an <img> tag pointing to your logo */}
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 2ZM12 12.17C10.83 12.17 9.83 11.17 9.83 10C9.83 8.83 10.83 7.83 12 7.83C13.17 7.83 14.17 8.83 14.17 10C14.17 11.17 13.17 12.17 12 12.17Z" fill="#2A4D54"/>
                            </svg>
                        </div>

                        {/* Text Content */}
                        <h1 className="text-4xl md:text-5xl font-extrabold" style={{color: 'var(--primary-dark-blue)'}}>
                            Predictive Safety, Real-Time Peace of Mind.
                        </h1>
                        <p className="max-w-xl mx-auto mt-4 mb-10 text-lg" style={{color: 'var(--text-dark)'}}>
                           Our system analyzes campus data to forecast potential danger zones, helping you stay aware and secure.
                        </p>

                        {/* Action Buttons */}
                        <div className="space-x-4">
                            <a href="/dashboard" className="btn-primary">Try Demo</a>
                            <a href="/about" className="btn-secondary">Learn More</a>
                        </div>
                    </div>
                </main>

                <SubscriptionSection />
                <Footer />
            </div>
        </div>
    );
};

export default Landing;
