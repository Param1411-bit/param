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
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const phaseIndex = Math.floor(progress / 25);
    setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
  }, [progress, phases.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Animated grid background */}
        <motion.div 
          className="absolute inset-0 grid-background opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated glowing orbs */}
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[150px] bg-primary/30"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[150px] bg-accent/30"
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] bg-primary/10"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-4">
          
          {/* Complex animated loader */}
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50" cy="50" r="48"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                />
              </svg>
            </motion.div>

            {/* Second rotating ring (opposite direction) */}
            <motion.div
              className="absolute inset-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="0.3"
                  strokeDasharray="1 6"
                  opacity="0.5"
                />
              </svg>
            </motion.div>

            {/* Main progress ring */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background ring */}
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.3"
              />
              
              {/* Animated progress ring */}
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="url(#loaderGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.64} 264`}
                transform="rotate(-90 50 50)"
                initial={{ pathLength: 0 }}
                style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
              />

              {/* Inner decorative ring */}
              <motion.circle
                cx="50" cy="50" r="35"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                opacity="0.3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Center pulsing core */}
              <motion.circle
                cx="50" cy="50" r="20"
                fill="url(#centerGradient)"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ filter: "drop-shadow(0 0 15px hsl(var(--primary)))" }}
              />

              {/* Inner glow ring */}
              <motion.circle
                cx="50" cy="50" r="12"
                fill="hsl(var(--primary))"
                opacity="0.6"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />

              {/* Center bright dot */}
              <circle
                cx="50" cy="50" r="4"
                fill="white"
                opacity="0.9"
              />

              {/* Orbiting dots */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
              >
                <circle cx="50" cy="12" r="2" fill="hsl(var(--primary))" />
              </motion.g>
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
              >
                <circle cx="50" cy="8" r="1.5" fill="hsl(var(--accent))" opacity="0.8" />
              </motion.g>

              <defs>
                <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
                <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Name with staggered animation */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-3 gradient-text text-center"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            Param Bhatkar
          </motion.h1>

          {/* Subtitle with fade in */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Data Analytics • Business Analysis • Data Science
          </motion.p>

          {/* Phase text with smooth transitions */}
          <motion.div className="h-6 mb-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhase}
                className="text-sm text-primary font-mono tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {phases[currentPhase]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar container */}
          <motion.div 
            className="w-64 md:w-80"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {/* Progress bar background */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden relative">
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Progress fill */}
              <motion.div
                className="h-full rounded-full relative"
                style={{ 
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
                  backgroundSize: '200% 100%'
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progress}%`,
                  backgroundPosition: ['0% 0%', '100% 0%']
                }}
                transition={{ 
                  width: { duration: 0.1 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              >
                {/* Glow effect on progress bar end */}
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ 
                    boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))'
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Percentage with animated counter effect */}
          <motion.span 
            className="text-sm text-muted-foreground font-mono mt-4 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {progress.toString().padStart(3, '0')}%
          </motion.span>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
