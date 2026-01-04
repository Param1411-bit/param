import { motion } from 'framer-motion';

interface GlowingOrbsProps {
  count?: number;
  className?: string;
}

export function GlowingOrbs({ count = 5, className = '' }: GlowingOrbsProps) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    color: i % 2 === 0 ? 'primary' : 'accent',
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full blur-[120px] ${
            orb.color === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
          }`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 100, -50, 80, 0],
            y: [0, -80, 60, -40, 0],
            scale: [1, 1.3, 0.9, 1.2, 1],
            opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
