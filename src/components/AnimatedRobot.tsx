import { motion } from "framer-motion";

interface AnimatedRobotProps {
  className?: string;
}

export function AnimatedRobot({ className = "" }: AnimatedRobotProps) {
  return (
    <motion.div className={`relative ${className}`}>
      {/* Robot SVG - Created from scratch, NOT using any reference image */}
      <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]">
        {/* Antenna */}
        <motion.g>
          <line x1="60" y1="8" x2="60" y2="20" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
          <motion.circle
            cx="60"
            cy="5"
            r="5"
            fill="#00d4ff"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* Head */}
        <ellipse cx="60" cy="45" rx="35" ry="28" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Face visor/screen */}
        <rect x="30" y="32" width="60" height="26" rx="8" fill="#1a202c" />
        
        {/* Left Eye */}
        <motion.g>
          <circle cx="45" cy="45" r="8" fill="#00d4ff" />
          <motion.ellipse
            cx="45"
            cy="45"
            rx="8"
            ry="8"
            fill="#1a202c"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
          />
          <circle cx="45" cy="45" r="8" fill="#00d4ff" opacity="0.8" />
          {/* Eye highlight */}
          <circle cx="48" cy="42" r="2" fill="white" opacity="0.8" />
        </motion.g>
        
        {/* Right Eye */}
        <motion.g>
          <circle cx="75" cy="45" r="8" fill="#00d4ff" />
          <motion.ellipse
            cx="75"
            cy="45"
            rx="8"
            ry="8"
            fill="#1a202c"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
          />
          <circle cx="75" cy="45" r="8" fill="#00d4ff" opacity="0.8" />
          {/* Eye highlight */}
          <circle cx="78" cy="42" r="2" fill="white" opacity="0.8" />
        </motion.g>
        
        {/* Smile/mouth area */}
        <ellipse cx="60" cy="55" rx="4" ry="2" fill="#00d4ff" opacity="0.6" />

        {/* Neck */}
        <rect x="52" y="70" width="16" height="8" fill="#e2e8f0" rx="2" />

        {/* Body */}
        <rect x="35" y="78" width="50" height="45" rx="10" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Body center light */}
        <motion.circle
          cx="60"
          cy="100"
          r="8"
          fill="#00d4ff"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Body details */}
        <rect x="45" y="85" width="30" height="4" rx="2" fill="#e2e8f0" />
        <rect x="45" y="115" width="30" height="4" rx="2" fill="#e2e8f0" />

        {/* Left Arm */}
        <motion.g
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "35px 85px" }}
        >
          <rect x="18" y="82" width="20" height="10" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="2" />
          {/* Hand */}
          <circle cx="15" cy="87" r="8" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="2" />
        </motion.g>

        {/* Right Arm - Thumbs up */}
        <motion.g
          animate={{ rotate: [0, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: "85px 85px" }}
        >
          <rect x="82" y="82" width="20" height="10" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="2" />
          {/* Hand with thumb up */}
          <circle cx="105" cy="87" r="8" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="2" />
          {/* Thumb */}
          <motion.rect
            x="102"
            y="72"
            width="6"
            height="12"
            rx="3"
            fill="#f0f4f8"
            stroke="#e2e8f0"
            strokeWidth="2"
            animate={{ y: [72, 70, 72] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.g>

        {/* Left Leg */}
        <rect x="40" y="120" width="12" height="18" rx="4" fill="#4a5568" />
        <ellipse cx="46" cy="140" rx="10" ry="6" fill="#2d3748" />

        {/* Right Leg */}
        <rect x="68" y="120" width="12" height="18" rx="4" fill="#4a5568" />
        <ellipse cx="74" cy="140" rx="10" ry="6" fill="#2d3748" />
      </svg>
    </motion.div>
  );
}
