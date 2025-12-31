import { motion } from "framer-motion";

interface AnimatedRobotProps {
  className?: string;
}

export function AnimatedRobot({ className = "" }: AnimatedRobotProps) {
  return (
    <motion.div className={`relative ${className}`}>
      {/* Professional AI/SaaS Robot - Clean, minimalist, modern design */}
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <defs>
          {/* Metallic gradient for body */}
          <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a4a5c" />
            <stop offset="50%" stopColor="#2d3a47" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          
          {/* Darker metallic for accents */}
          <linearGradient id="metalDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          
          {/* Subtle glow gradient */}
          <linearGradient id="glowAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Screen gradient */}
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Ambient glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Head - Sleek rounded rectangle */}
        <rect 
          x="20" y="8" 
          width="60" height="42" 
          rx="8" 
          fill="url(#metalBody)" 
          stroke="#475569" 
          strokeWidth="0.5"
        />
        
        {/* Head top accent line */}
        <rect x="25" y="10" width="50" height="1" rx="0.5" fill="#475569" opacity="0.5" />
        
        {/* Face screen/visor */}
        <rect 
          x="26" y="18" 
          width="48" height="24" 
          rx="4" 
          fill="url(#screenGrad)"
          stroke="#0ea5e9"
          strokeWidth="0.3"
          strokeOpacity="0.5"
        />
        
        {/* Left sensor - minimal line indicator */}
        <motion.g filter="url(#glow)">
          <motion.rect
            x="34" y="28"
            width="10" height="2"
            rx="1"
            fill="url(#glowAccent)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
        
        {/* Right sensor - minimal line indicator */}
        <motion.g filter="url(#glow)">
          <motion.rect
            x="56" y="28"
            width="10" height="2"
            rx="1"
            fill="url(#glowAccent)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.g>
        
        {/* Center status indicator */}
        <motion.circle
          cx="50" cy="35"
          r="2"
          fill="#0ea5e9"
          filter="url(#glow)"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Neck connector */}
        <rect x="42" y="50" width="16" height="6" rx="2" fill="url(#metalDark)" />
        
        {/* Body - Clean geometric shape */}
        <rect 
          x="25" y="56" 
          width="50" height="40" 
          rx="6" 
          fill="url(#metalBody)"
          stroke="#475569"
          strokeWidth="0.5"
        />
        
        {/* Body panel lines - subtle detail */}
        <line x1="30" y1="62" x2="70" y2="62" stroke="#475569" strokeWidth="0.3" />
        <line x1="30" y1="86" x2="70" y2="86" stroke="#475569" strokeWidth="0.3" />
        
        {/* Center core indicator */}
        <motion.g filter="url(#glow)">
          <rect x="44" y="68" width="12" height="12" rx="2" fill="url(#screenGrad)" stroke="#0ea5e9" strokeWidth="0.3" />
          <motion.rect
            x="47" y="71"
            width="6" height="6"
            rx="1"
            fill="#0ea5e9"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Left arm - angular, robotic */}
        <motion.g
          animate={{ rotate: [0, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "25px 65px" }}
        >
          <rect x="12" y="60" width="14" height="6" rx="2" fill="url(#metalDark)" />
          <rect x="6" y="58" width="8" height="10" rx="2" fill="url(#metalBody)" stroke="#475569" strokeWidth="0.3" />
        </motion.g>

        {/* Right arm - angular, robotic */}
        <motion.g
          animate={{ rotate: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          style={{ transformOrigin: "75px 65px" }}
        >
          <rect x="74" y="60" width="14" height="6" rx="2" fill="url(#metalDark)" />
          <rect x="86" y="58" width="8" height="10" rx="2" fill="url(#metalBody)" stroke="#475569" strokeWidth="0.3" />
        </motion.g>

        {/* Legs - sturdy, industrial */}
        <rect x="32" y="96" width="10" height="16" rx="2" fill="url(#metalDark)" />
        <rect x="58" y="96" width="10" height="16" rx="2" fill="url(#metalDark)" />
        
        {/* Feet - solid base */}
        <rect x="29" y="110" width="16" height="6" rx="2" fill="url(#metalBody)" stroke="#475569" strokeWidth="0.3" />
        <rect x="55" y="110" width="16" height="6" rx="2" fill="url(#metalBody)" stroke="#475569" strokeWidth="0.3" />

        {/* Shoulder accents */}
        <circle cx="28" cy="60" r="3" fill="url(#metalDark)" stroke="#475569" strokeWidth="0.3" />
        <circle cx="72" cy="60" r="3" fill="url(#metalDark)" stroke="#475569" strokeWidth="0.3" />
      </svg>
    </motion.div>
  );
}
