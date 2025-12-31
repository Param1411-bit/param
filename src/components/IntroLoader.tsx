import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import robotImage from "@/assets/robot.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [typedText, setTypedText] = useState("");
  const welcomeMessage = "Welcome to Param's Portfolio!";

  useEffect(() => {
    // Show welcome message after robot drops
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 1500);

    return () => clearTimeout(welcomeTimer);
  }, []);

  useEffect(() => {
    if (showWelcome) {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= welcomeMessage.length) {
          setTypedText(welcomeMessage.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          // Complete after typing is done
          setTimeout(() => onComplete(), 1500);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    }
  }, [showWelcome, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-b from-[#0a1628] to-[#0f2847] flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : '#00d4ff',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
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
          style={{ backgroundColor: '#00d4ff33' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Robot container with drop animation */}
          <motion.div
            className="relative"
            initial={{ y: -500, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              damping: 12, 
              stiffness: 100,
              duration: 1.2 
            }}
          >
            {/* Robot image */}
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={robotImage}
                alt="Welcome Robot"
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]"
              />
              
              {/* Blinking eyes overlay - positioned for the robot's eyes */}
              <motion.div
                className="absolute top-[28%] left-[25%] w-[15%] h-[10%] bg-[#0a1628] rounded-full"
                animate={{
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                }}
              />
              <motion.div
                className="absolute top-[28%] right-[25%] w-[15%] h-[10%] bg-[#0a1628] rounded-full"
                animate={{
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                }}
              />

              {/* Glow ring around robot */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                style={{ margin: "-20px" }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Thumbs up sparkle effect */}
            <motion.div
              className="absolute -right-4 top-1/2"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill="#00d4ff"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Welcome text with typing effect */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showWelcome ? 1 : 0, y: showWelcome ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #00d4ff, hsl(var(--primary)), #00d4ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
              }}
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {typedText}
              <motion.span
                className="inline-block w-1 h-8 md:h-12 bg-cyan-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.h1>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            className="flex gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: showWelcome ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-cyan-400"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              background: "linear-gradient(90deg, transparent, #00d4ff, hsl(var(--primary)), #00d4ff, transparent)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
