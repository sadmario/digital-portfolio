"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Natural variable speed counting for a premium vibe
      const step = Math.floor(Math.random() * 12) + 3;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          // Let the fade & blur transition complete before unmounting
          setTimeout(() => {
            onFinish();
          }, 800);
        }, 600);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(20px)",
            y: -100,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 w-full h-full bg-[#060B16] z-9999 flex flex-col items-center justify-center select-none"
        >
          {/* Glowing particle blur background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-highlight/5 rounded-full blur-[60px] pointer-events-none" />

          {/* Animated Central Logo Mark */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center w-24 h-24 rounded-2xl glass-panel relative overflow-hidden"
            >
              {/* Spinning glowing border lines */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-highlight opacity-30 animate-pulse" />
              
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white z-10"
              >
                {/* Embedded systems / circuit logo style */}
                <path
                  d="M8 20H32M20 8V32M13 13L27 27M27 13L13 27"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="opacity-20"
                />
                <motion.path
                  d="M10 20H30M20 10V30"
                  stroke="url(#logoGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="40"
                  animate={{
                    strokeDashoffset: [40, 0, -40],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />
                <defs>
                  <linearGradient id="logoGrad" x1="10" y1="20" x2="30" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="0.5" stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Soft pulsing halo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-highlight rounded-3xl opacity-20 blur-lg animate-pulse" />
          </div>

          {/* Typography Profile Details */}
          <div className="text-center mb-10 z-10">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-display font-bold tracking-widest text-white uppercase glow-text"
            >
              G. ARAVINTH
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs font-sans tracking-[0.2em] text-brand-secondary uppercase mt-2"
            >
              Hardware-Software Systems Portfolio
            </motion.p>
          </div>

          {/* Progress Section */}
          <div className="w-64 max-w-[85vw] flex flex-col items-center justify-center z-10">
            {/* Loading Bar Track */}
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-highlight"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Percentage Display */}
            <motion.span
              key={progress}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-display font-medium text-text-sec tracking-wider"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
