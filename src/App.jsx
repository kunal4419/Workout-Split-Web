import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PushDay from "./pages/PushDay";
import PullDay from "./pages/PullDay";
import LegDay from "./pages/LegDay";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return true; // default dark
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Page transition wrapper
  function PageTransition({ children }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  function AnimatedRoutes() {
    const location = useLocation();
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/push" element={<PageTransition><PushDay /></PageTransition>} />
          <Route path="/pull" element={<PageTransition><PullDay /></PageTransition>} />
          <Route path="/leg" element={<PageTransition><LegDay /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-20">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}
