import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phases = [
    "Initializing...",
    "Loading Analytics...",
    "Processing Insights...",
    "Welcome!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 2; // Faster loading
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const phaseIndex = Math.floor(progress / 30);
    setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
  }, [progress, phases.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-background opacity-30" />
        
        {/* Static glowing orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[150px] bg-primary/25" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[150px] bg-accent/25" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-4">
          
          {/* Simple pulsing circle */}
          <motion.div
            className="relative w-24 h-24 md:w-32 md:h-32 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Outer ring */}
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              
              {/* Progress ring */}
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="url(#loaderGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
              
              {/* Center dot */}
              <circle
                cx="50" cy="50" r="8"
                fill="hsl(var(--primary))"
                className="animate-pulse"
              />

              <defs>
                <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-3 gradient-text text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Param Bhatkar
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Data Analytics • Business Analysis • Data Science
          </motion.p>

          {/* Phase text */}
          <motion.p
            key={currentPhase}
            className="text-sm text-primary font-mono mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {phases[currentPhase]}
          </motion.p>

          {/* Progress bar */}
          <div className="w-56 md:w-72 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <span className="text-xs text-muted-foreground font-mono mt-3">
            {progress}%
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}