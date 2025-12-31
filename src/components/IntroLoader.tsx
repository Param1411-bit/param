import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phases = [
    "Initializing Data Pipeline...",
    "Loading Analytics Engine...",
    "Processing Business Insights...",
    "Rendering Visualizations...",
    "Welcome!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 400);
          return 100;
        }
        return prev + 1;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const phaseIndex = Math.floor(progress / 25);
    setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
  }, [progress, phases.length]);

  const dataPoints = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.random() * 60 + 20,
    delay: i * 0.1,
  }));

  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 50 + 35 * Math.cos((i * 2 * Math.PI) / 8),
    y: 50 + 35 * Math.sin((i * 2 * Math.PI) / 8),
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-background opacity-30" />
        
        {/* Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[150px]"
          style={{ backgroundColor: 'hsl(var(--primary) / 0.25)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[150px]"
          style={{ backgroundColor: 'hsl(var(--accent) / 0.25)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-4">
          
          {/* Network graph */}
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {nodes.map((node, i) => 
                nodes.slice(i + 1).map((targetNode, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                  />
                ))
              )}
              
              <motion.circle
                cx="50" cy="50" r="8"
                fill="hsl(var(--primary))"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {nodes.map((node, i) => (
                <motion.circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r="4"
                  fill={i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                />
              ))}

              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="url(#loaderGrad)"
                strokeWidth="1"
                strokeDasharray="10 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
              />

              <defs>
                <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>

            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          {/* Bar chart */}
          <motion.div 
            className="flex items-end gap-1 h-14 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {dataPoints.slice(0, 12).map((point, i) => (
              <motion.div
                key={point.id}
                className="w-2 rounded-t"
                style={{
                  backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))',
                }}
                initial={{ height: 0 }}
                animate={{ height: [0, point.height, point.height * 0.6, point.height * 0.9] }}
                transition={{ duration: 1.5, delay: point.delay, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 gradient-text text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Param Bhatkar
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Data Analytics • Business Analysis • Data Science
          </motion.p>

          {/* Phase text */}
          <motion.p
            key={currentPhase}
            className="text-sm text-primary font-mono mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {phases[currentPhase]}
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="text-xs text-muted-foreground font-mono mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.span>
        </div>

        {/* Binary rain - left */}
        <div className="absolute left-4 top-0 bottom-0 w-8 overflow-hidden opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="text-xs font-mono text-primary absolute"
              style={{ top: `${i * 6}%` }}
              animate={{ y: [0, 80], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>
        
        {/* Binary rain - right */}
        <div className="absolute right-4 top-0 bottom-0 w-8 overflow-hidden opacity-20 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="text-xs font-mono text-accent absolute right-0"
              style={{ top: `${i * 6}%` }}
              animate={{ y: [0, 80], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
