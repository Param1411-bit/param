import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface GlowingOrbsProps {
  count?: number;
  className?: string;
}

export function GlowingOrbs({ count = 4, className = '' }: GlowingOrbsProps) {
  // Memoize orb configurations to prevent recalculation
  const orbs = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 150, // Reduced size
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 20, // Slower animations
      delay: Math.random() * 5,
      color: i % 2 === 0 ? 'primary' : 'accent',
    })),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full will-change-transform ${
            orb.color === 'primary' ? 'bg-primary/15' : 'bg-accent/15'
          }`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)', // Reduced blur for better performance
          }}
          animate={{
            x: [0, 50, -25, 40, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'linear', // Linear is less CPU intensive
          }}
        />
      ))}
    </div>
  );
}
