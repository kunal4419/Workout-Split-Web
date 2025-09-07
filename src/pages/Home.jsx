import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, ArrowUpCircle, ArrowDownCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { quotes } from "../quotes";

export default function Home() {
  const navigate = useNavigate();
  const workoutRef = useRef(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleStart = () => {
    workoutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-black">
      {/* Hero Section */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/gym-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      <section className="flex flex-col items-center justify-center h-screen text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
        >
          <span className="bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Push · Pull · Legs – The Ultimate Split
          </span>
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 24px #f472b6, 0 0 48px #3b82f6" }}
          className="mt-8 px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white shadow-lg ring-2 ring-pink-400 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
          onClick={handleStart}
        >
          Start Workout
        </motion.button>
      </section>

      {/* Workout Selection Section */}
      <section ref={workoutRef} className="py-16 bg-gray-900 bg-opacity-80 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-2">
          {[{
            icon: <ArrowUpCircle size={48} className="text-pink-500 mb-4 animate-bounce" />, label: "Push Day", desc: "Chest, Shoulders, Triceps", link: "/push", delay: 0.2
          }, {
            icon: <ArrowDownCircle size={48} className="text-blue-500 mb-4 animate-bounce" />, label: "Pull Day", desc: "Back, Biceps", link: "/pull", delay: 0.4
          }, {
            icon: <Circle size={48} className="text-yellow-400 mb-4 animate-bounce" />, label: "Leg Day", desc: "Quads, Hamstrings, Calves", link: "/leg", delay: 0.6
          }].map(card => (
            <motion.div
              whileHover={{ scale: 1.06 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: card.delay }}
              className="rounded-2xl shadow-xl border-2 border-pink-400 bg-black/40 dark:bg-gray-900/60 backdrop-blur-lg p-8 flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-pink-500/40 hover:border-pink-500 hover:ring-4 hover:ring-pink-400/40 group"
              onClick={() => navigate(card.link)}
              key={card.label}
            >
              {card.icon}
              <h2 className="text-2xl font-extrabold text-white dark:text-pink-200 text-center drop-shadow-md mb-2">{card.label}</h2>
              <p className="text-center text-pink-300 font-semibold">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Motivational Quote */}
      <footer className="w-full py-8 text-center bg-black bg-opacity-70 text-white text-lg font-semibold shadow-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {quote}
        </motion.div>
      </footer>
    </div>
  );
}
