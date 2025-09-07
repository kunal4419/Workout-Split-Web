import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Sun, Moon, Menu } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggCount, setEggCount] = useState(0);
  const [showArnold, setShowArnold] = useState(false);

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
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center px-4 py-3 bg-white dark:bg-gray-800 shadow z-50">
      <div className="flex items-center gap-2 flex-1">
        <button onClick={handleDumbbellClick} className="focus:outline-none">
          <Dumbbell size={32} />
        </button>
        <span className="font-bold text-xl">Kunal's Workout Split</span>
        {showArnold && (
          <span className="ml-4 px-3 py-1 rounded bg-yellow-200 dark:bg-yellow-700 text-black dark:text-white font-semibold shadow animate-pulse">
            "Strength does not come from winning. Your struggles develop your strengths." – Arnold Schwarzenegger
          </span>
        )}
      </div>
      {/* Desktop links */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-500 dark:hover:text-yellow-300">Home</Link>
        <Link to="/push" className="hover:text-blue-500 dark:hover:text-yellow-300">Push Day</Link>
        <Link to="/pull" className="hover:text-blue-500 dark:hover:text-yellow-300">Pull Day</Link>
        <Link to="/leg" className="hover:text-blue-500 dark:hover:text-yellow-300">Leg Day</Link>
        <button
          onClick={() => setDarkMode(dm => !dm)}
          className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-blue-400" />}
        </button>
      </div>
      {/* Hamburger menu for mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(m => !m)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-4 px-6 flex flex-col gap-4 z-50 min-w-[160px]">
            <Link to="/" className="hover:text-blue-500 dark:hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/push" className="hover:text-blue-500 dark:hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Push Day</Link>
            <Link to="/pull" className="hover:text-blue-500 dark:hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Pull Day</Link>
            <Link to="/leg" className="hover:text-blue-500 dark:hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Leg Day</Link>
            <button
              onClick={() => { setDarkMode(dm => !dm); setMenuOpen(false); }}
              className="mt-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-blue-400" />}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
