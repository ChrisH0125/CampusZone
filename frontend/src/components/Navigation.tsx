import React, { useState } from 'react';

// A reusable Logo component
const Logo: React.FC = () => (
    <div className="flex items-center space-x-3">
        {/* You can replace this SVG with your actual logo file */}
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 2ZM12 12.17C10.83 12.17 9.83 11.17 9.83 10C9.83 8.83 10.83 7.83 12 7.83C13.17 7.83 14.17 8.83 14.17 10C14.17 11.17 13.17 12.17 12 12.17Z" fill="#2A4D54"/>
            </svg>
        </div>
        <span className="text-white text-xl font-bold tracking-wider">CAMPUS SAFETY</span>
    </div>
);

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navLinks = ["Dashboard", "Compare", "Trends", "About"];

    return (
        <header className="fixed top-0 left-0 right-0 z-50" style={{backgroundColor: 'var(--primary-dark-blue)'}}>
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="/"><Logo /></a>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link} href={`/${link.toLowerCase()}`} className="nav-link">
                                {link}
                            </a>
                        ))}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
                 {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 bg-primary-dark-blue">
                        {navLinks.map((link) => (
                             <a key={link} href={`/${link.toLowerCase()}`} className="block text-white text-center py-2 text-sm hover:bg-white/10 rounded">
                                {link}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navigation;
