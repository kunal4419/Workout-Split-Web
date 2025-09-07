import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Activity, HandMetal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoModal from "../components/VideoModal";
import latPulldown from "../assets/lat-pulldown.mp4";
import barbellRow from "../assets/barbell-row.mp4";
import barbellBicepsCurl from "../assets/barbell-biceps-curl.mp4";
import straightArmLatPulldown from "../assets/straight-arm-lat-pulldown.mp4";
import ropeHammerCurl from "../assets/rope-hammer-curl.mp4";
import reversePecDeckFly from "../assets/reverse-pec-deck-fly.mp4";

const exercises = [
	{
		name: "Lat Pulldowns",
		video: latPulldown,
		sets: "4 x 12-15",
		description: "Isolation exercise for the latissimus dorsi, helps build width in the back.",
		icon: <Dumbbell size={40} className="text-blue-400" />,
	},
	{
		name: "Barbell Row",
		video: barbellRow,
		sets: "3-4 x 10-12",
		description: "Compound movement for overall back thickness and strength.",
		icon: <Activity size={40} className="text-blue-400" />,
	},
	{
		name: "Barbell Biceps Curl",
		video: barbellBicepsCurl,
		sets: "4 x 15-20",
		description: "Classic biceps builder for peak and size.",
		icon: <HandMetal size={40} className="text-blue-400" />,
	},
	{
		name: "Straight Arm Lat Pulldown(Cable)",
		video: straightArmLatPulldown,
		sets: "3-4 x 15-20",
		description: "Targets the lats and teres major, improves mind-muscle connection.",
		icon: <Dumbbell size={40} className="text-blue-400" />,
	},
	{
		name: "Rope Hammer Curl",
		video: ropeHammerCurl,
		sets: "3-4 x 15-20",
		description: "Emphasizes brachialis and forearm development.",
		icon: <Activity size={40} className="text-blue-400" />,
	},
	{
		name: "Reverse Pec Deck Fly",
		video: reversePecDeckFly,
		sets: "3-4 x 12-15",
		description: "Isolates rear deltoids and upper back for posture and shoulder health.",
		icon: <HandMetal size={40} className="text-blue-400" />,
	},
];

export default function PullDay() {
	const [flipped, setFlipped] = useState(Array(exercises.length).fill(false));
	const navigate = useNavigate();
	const [modal, setModal] = useState({ open: false, src: null });

	const handleFlip = (idx) => {
		setFlipped((f) => f.map((v, i) => (i === idx ? !v : v)));
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center pt-8 py-10 relative overflow-hidden bg-[#0a0f1f]">
			{/* Animated gradient background */}
			<style>{`
        @keyframes gradient {
          0%, 100% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 12px #3b82f6); }
          50% { filter: drop-shadow(0 0 24px #3b82f6); }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 16s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulseGlow 2.5s infinite;
        }
      `}</style>
			<h1 className="w-full flex justify-center items-center py-4">
				<span
					className="w-full flex justify-center items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(59,130,246,0.8)]"
					style={{
						textShadow: '0 0 40px #3b82f6, 0 0 12px #fff',
						lineHeight: 1.1,
						paddingBottom: '0.2em',
						paddingTop: '0.1em'
					}}
				>
					Pull Day
				</span>
			</h1>
			<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-4 py-4">
				{exercises.map((ex, idx) => (
					<motion.div
						key={ex.name}
						className="perspective"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: idx * 0.2 }}
						whileHover={{ scale: 1.07, boxShadow: "0 0 32px #3b82f6" }}
						whileTap={{ scale: 1.04, boxShadow: "0 0 32px #3b82f6" }}
					>
						<motion.div
							className="relative w-full h-80 sm:h-72 transition-transform duration-300 cursor-pointer [transform-style:preserve-3d]"
							style={{ perspective: 1200 }}
							onClick={() => setFlipped(f => f.map((v, i) => i === idx ? true : false))}
							animate={{ rotateY: flipped[idx] ? 180 : 0 }}
							transition={{ duration: 0.45, ease: "easeInOut" }}
							onMouseLeave={() => setFlipped(f => f.map((v, i) => i === idx ? false : v))}
						>
							{/* Card Front */}
							<motion.div
								className="absolute inset-0 rounded-2xl shadow-xl border-2 border-blue-400 bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center gap-4 [backface-visibility:hidden] transition-all duration-300 hover:shadow-blue-400/60 hover:border-blue-400 hover:ring-4 hover:ring-blue-400/40 group"
								style={{ backfaceVisibility: "hidden" }}
							>
								<motion.div
									className="mb-2 pulse-glow"
									animate={{}}
								>
									<Dumbbell size={44} className="text-blue-400" />
								</motion.div>
								<h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white text-center drop-shadow-[0_0_8px_#3b82f6] cursor-pointer"
									onClick={() => {
										if (ex.video) {
											const bust = typeof ex.video === "string" ? `${ex.video}${ex.video.includes("?") ? "&" : "?"}v=${Date.now()}` : ex.video;
											setModal({ open: true, src: bust });
										}
									}}
								>
									{ex.name}
								</h2>
								<p className="text-sm sm:text-md font-semibold text-blue-300 drop-shadow-[0_0_8px_#3b82f6]">
									{ex.sets} Sets × Reps
								</p>
								<button
									className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-bold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
									onClick={(e) => {
										e.stopPropagation();
										if (ex.video) {
											const bust = typeof ex.video === "string" ? `${ex.video}${ex.video.includes("?") ? "&" : "?"}v=${Date.now()}` : ex.video;
											setModal({ open: true, src: bust });
										}
									}}
									disabled={!ex.video}
								>
									Watch Video
								</button>
							</motion.div>
							{/* Card Back (description) */}
							<motion.div
								className="absolute inset-0 rounded-2xl shadow-xl border-2 border-yellow-400 bg-blue-100/40 dark:bg-blue-900/60 backdrop-blur-lg flex items-center justify-center px-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]"
								style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
							>
								<span className="text-sm sm:text-lg font-medium text-white drop-shadow-[0_0_8px_#3b82f6]">
									{ex.description}
								</span>
							</motion.div>
						</motion.div>
					</motion.div>
				))}
				<VideoModal
					open={modal.open}
					src={modal.src}
					onClose={() => setModal({ open: false, src: null })}
				/>
			</div>
		</div>
	);
}
