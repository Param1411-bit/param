import { motion } from "framer-motion";

interface AnimatedRobotProps {
  className?: string;
}

export function AnimatedRobot({ className = "" }: AnimatedRobotProps) {
  return (
    <motion.div className={`relative ${className}`}>
      {/* Abstract Industrial AI Module - NO face, NO character, purely mechanical */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Dark metallic gradients */}
          <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          
          <linearGradient id="graphite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          
          <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>

          <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>
        </defs>

        {/* Main chassis - hexagonal industrial shape */}
        <polygon 
          points="50,5 85,25 85,75 50,95 15,75 15,25" 
          fill="url(#darkMetal)" 
          stroke="#4b5563" 
          strokeWidth="0.8"
        />
        
        {/* Inner panel - recessed */}
        <polygon 
          points="50,15 75,30 75,70 50,85 25,70 25,30" 
          fill="url(#graphite)" 
          stroke="#374151" 
          strokeWidth="0.5"
        />

        {/* Horizontal panel lines */}
        <line x1="25" y1="40" x2="75" y2="40" stroke="#4b5563" strokeWidth="0.4" />
        <line x1="25" y1="60" x2="75" y2="60" stroke="#4b5563" strokeWidth="0.4" />
        
        {/* Vertical panel lines */}
        <line x1="40" y1="30" x2="40" y2="70" stroke="#4b5563" strokeWidth="0.3" />
        <line x1="60" y1="30" x2="60" y2="70" stroke="#4b5563" strokeWidth="0.3" />

        {/* Top connector port */}
        <rect x="42" y="8" width="16" height="6" rx="1" fill="url(#graphite)" stroke="#4b5563" strokeWidth="0.3" />
        <rect x="45" y="9" width="10" height="4" rx="0.5" fill="#111827" />
        
        {/* Bottom connector port */}
        <rect x="42" y="86" width="16" height="6" rx="1" fill="url(#graphite)" stroke="#4b5563" strokeWidth="0.3" />
        <rect x="45" y="87" width="10" height="4" rx="0.5" fill="#111827" />

        {/* Left mechanical joint */}
        <rect x="8" y="42" width="10" height="16" rx="1" fill="url(#graphite)" stroke="#4b5563" strokeWidth="0.3" />
        <line x1="10" y1="46" x2="16" y2="46" stroke="#6b7280" strokeWidth="0.4" />
        <line x1="10" y1="50" x2="16" y2="50" stroke="#6b7280" strokeWidth="0.4" />
        <line x1="10" y1="54" x2="16" y2="54" stroke="#6b7280" strokeWidth="0.4" />

        {/* Right mechanical joint */}
        <rect x="82" y="42" width="10" height="16" rx="1" fill="url(#graphite)" stroke="#4b5563" strokeWidth="0.3" />
        <line x1="84" y1="46" x2="90" y2="46" stroke="#6b7280" strokeWidth="0.4" />
        <line x1="84" y1="50" x2="90" y2="50" stroke="#6b7280" strokeWidth="0.4" />
        <line x1="84" y1="54" x2="90" y2="54" stroke="#6b7280" strokeWidth="0.4" />

        {/* Central processing indicator - abstract geometric */}
        <rect x="38" y="44" width="24" height="12" rx="1" fill="#111827" stroke="#374151" strokeWidth="0.5" />
        
        {/* Status bars - muted blue accent */}
        <motion.rect
          x="41" y="47"
          width="4" height="6"
          fill="url(#blueAccent)"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.rect
          x="48" y="47"
          width="4" height="6"
          fill="url(#blueAccent)"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
        />
        <motion.rect
          x="55" y="47"
          width="4" height="6"
          fill="url(#blueAccent)"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
        />

        {/* Corner bolts/rivets */}
        <circle cx="22" cy="28" r="2" fill="#374151" stroke="#4b5563" strokeWidth="0.3" />
        <circle cx="78" cy="28" r="2" fill="#374151" stroke="#4b5563" strokeWidth="0.3" />
        <circle cx="22" cy="72" r="2" fill="#374151" stroke="#4b5563" strokeWidth="0.3" />
        <circle cx="78" cy="72" r="2" fill="#374151" stroke="#4b5563" strokeWidth="0.3" />

        {/* Data flow lines */}
        <motion.line
          x1="30" y1="35"
          x2="70" y2="35"
          stroke="#2563eb"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          strokeDasharray="4 2"
          animate={{ strokeDashoffset: [0, -12] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="30" y1="65"
          x2="70" y2="65"
          stroke="#2563eb"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          strokeDasharray="4 2"
          animate={{ strokeDashoffset: [0, 12] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Vent slots - top section */}
        <rect x="32" y="22" width="8" height="1" fill="#111827" />
        <rect x="44" y="22" width="12" height="1" fill="#111827" />
        <rect x="60" y="22" width="8" height="1" fill="#111827" />

        {/* Vent slots - bottom section */}
        <rect x="32" y="77" width="8" height="1" fill="#111827" />
        <rect x="44" y="77" width="12" height="1" fill="#111827" />
        <rect x="60" y="77" width="8" height="1" fill="#111827" />
      </svg>
    </motion.div>
  );
}
