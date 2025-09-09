import { Link } from "react-router-dom";
import { ArrowUp, Github, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">PPL Workout Split</div>
            <div className="text-sm mt-1">Train smarter. Recover better. Repeat.</div>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
            <Link to="/push" className="hover:text-pink-500 transition-colors">Push</Link>
            <Link to="/pull" className="hover:text-pink-500 transition-colors">Pull</Link>
            <Link to="/leg" className="hover:text-pink-500 transition-colors">Legs</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-pink-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter/X" className="hover:text-pink-500 transition-colors">
              <Twitter size={20} />
            </a>
            <button onClick={scrollToTop} aria-label="Back to top" className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-pink-500 hover:text-white transition-colors">
              <ArrowUp size={16} />
              <span className="text-xs font-semibold">Top</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} PPL Workout Split by Kunal Patel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
