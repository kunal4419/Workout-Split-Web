import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dumbbell, Sun, Moon, Menu, X, Zap, Flame, Star } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggCount, setEggCount] = useState(0);
  const [showArnold, setShowArnold] = useState(false);
  const [particles, setParticles] = useState([]);
  const location = useLocation();

  const handleDumbbellClick = () => {
    setEggCount(c => {
      const next = c + 1;
      if (next >= 5) {
        setShowArnold(true);
        setTimeout(() => setShowArnold(false), 6000);
        return 0;
      }
      return next;
    });
  };

  // Create floating particles
  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    });

    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = prev.map(p => ({
          ...p,
          y: p.y + p.speed,
          opacity: p.opacity - 0.01,
        })).filter(p => p.opacity > 0);

        if (newParticles.length < 8) {
          newParticles.push(createParticle());
        }

        return newParticles;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: <Star size={16} /> },
    { to: "/push", label: "Push Day", icon: <Flame size={16} /> },
    { to: "/pull", label: "Pull Day", icon: <Zap size={16} /> },
    { to: "/leg", label: "Leg Day", icon: <Dumbbell size={16} /> },
  ];

  return (
    <>
      {/* Floating Particles Background */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-40 overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-pink-400 to-blue-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <nav className="fixed top-0 left-0 w-full z-50">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl" />
        
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 via-blue-500/20 to-yellow-500/20 animate-pulse" />
        
        <div className="relative flex items-center px-4 py-3">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-1">
            <button 
              onClick={handleDumbbellClick} 
              className="group relative focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <Dumbbell size={28} className="text-white group-hover:text-pink-300 transition-colors duration-300" />
              </div>
            </button>
            
            <div className="relative">
              <span className="font-bold text-xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                Kunal's Workout Split
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {showArnold && (
              <div className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 shadow-lg animate-pulse">
                <span className="text-yellow-200 font-semibold text-sm">
                  "Strength does not come from winning. Your struggles develop your strengths." – Arnold Schwarzenegger
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 items-center">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === item.to
                    ? 'bg-gradient-to-r from-pink-500/30 to-blue-500/30 border border-white/30'
                    : 'hover:bg-white/10 border border-transparent hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-white font-medium group-hover:text-pink-300 transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(dm => !dm)}
              className="group relative ml-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative group-hover:scale-110 transition-transform duration-300">
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400 group-hover:text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-blue-400 group-hover:text-blue-300" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(m => !m)}
              className="group relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
              aria-label="Open menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative group-hover:scale-110 transition-transform duration-300">
                {menuOpen ? (
                  <X size={24} className="text-white group-hover:text-pink-300" />
                ) : (
                  <Menu size={24} className="text-white group-hover:text-pink-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl">
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 ${
                    location.pathname === item.to
                      ? 'bg-gradient-to-r from-pink-500/30 to-blue-500/30 border border-white/30'
                      : 'hover:bg-white/10 border border-transparent hover:border-white/20'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-white font-medium group-hover:text-pink-300 transition-colors duration-300">
                    {item.label}
                  </span>
                </Link>
              ))}
              
              <button
                onClick={() => { setDarkMode(dm => !dm); setMenuOpen(false); }}
                className="group flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {darkMode ? (
                    <Sun size={20} className="text-yellow-400 group-hover:text-yellow-300" />
                  ) : (
                    <Moon size={20} className="text-blue-400 group-hover:text-blue-300" />
                  )}
                </span>
                <span className="text-white font-medium group-hover:text-pink-300 transition-colors duration-300">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
