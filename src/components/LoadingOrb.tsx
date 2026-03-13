import React from 'react';
import { motion } from 'motion/react';

interface LoadingOrbProps {
  size?: number;
  speed?: number;
  text?: string;
  className?: string;
}

export const LoadingOrb: React.FC<LoadingOrbProps> = ({
  size = 200,
  speed = 1,
  text,
  className = ""
}) => {
  const duration = 10 / speed;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Glow Pulse Layer (Intensified) */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: duration / 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'radial-gradient(circle, #6368FB 0%, #FF83AD 50%, #FDAB8B 100%)',
          }}
        />

        {/* Wave-like Ripple Lines */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 2],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: i * (duration / 3),
              ease: "easeOut",
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        ))}

        {/* The Orb Container */}
        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_60px_rgba(99,104,251,0.4)]"
          animate={{
            scale: [0.95, 1.05, 0.95],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: duration * 2,
              repeat: Infinity,
              ease: "linear",
            }
          }}
          style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.05)',
            filter: 'blur(4px)', // Soften the outline boundary
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)', // Add a glowy blurred boundary
          }}
        >
          {/* Moving Gradient Blobs inside */}
          <motion.div
            className="absolute -inset-[50%] opacity-60"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: duration * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'conic-gradient(from 0deg, #6368FB, #FF83AD, #FDAB8B, #6368FB)',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Inner Highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none blur-[2px]" />
        </motion.div>
      </div>

      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-text-secondary font-medium tracking-tight"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};
