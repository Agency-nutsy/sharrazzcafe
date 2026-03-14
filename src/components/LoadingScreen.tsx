import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isShattering, setIsShattering] = useState(false);

  // Pre-calculate the sand particles so they are ready the moment the loader hits 100%
  const particles = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      // Start randomly within the bounding box of the logo
      startX: (Math.random() - 0.5) * 250,
      startY: (Math.random() - 0.5) * 100,
      // Explode outwards and drift upwards like wind blowing sand
      endX: (Math.random() - 0.5) * 800,
      endY: Math.random() * -600 - 100,
      // Varying tiny crystal sizes
      size: Math.random() * 3 + 1,
      // Staggered explosions
      delay: Math.random() * 0.15,
      duration: 0.8 + Math.random() * 0.5,
    }));
  }, []);

  useEffect(() => {
    // If we are shattering, wait for the particles to fly away before completing
    if (isShattering) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1400); // 1.4 seconds of cinematic dust blowing
      return () => clearTimeout(timer);
    }

    // Normal loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsShattering(true); // Trigger the shatter effect instead of immediately completing
          return 100;
        }
        return p + 2;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [isShattering, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
      >
        {/* THE MAIN CONTENT (Fades to blur/dust when shattering) */}
        <motion.div
          animate={isShattering ? { opacity: 0, scale: 1.1, filter: "blur(12px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          className="relative z-10 flex flex-col items-center justify-center gap-8"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl font-bold text-shimmer tracking-wider"
          >
            736 A.D.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground text-xs tracking-[0.3em] uppercase"
          >
            Old Charm. New Age Flair.
          </motion.p>
          <div className="w-48 h-[2px] bg-secondary rounded-full overflow-hidden mt-4">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-dark via-primary to-gold-light"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* THE GOLDEN SAND SHATTER PARTICLES (Hidden until 100%) */}
        {isShattering && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: p.startX, 
                  y: p.startY, 
                  opacity: 1, 
                  scale: 1 
                }}
                animate={{ 
                  x: p.endX, 
                  y: p.endY, 
                  opacity: 0, 
                  scale: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: p.duration, 
                  delay: p.delay, 
                  ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for a physical "wind-blown" feel
                }}
                className="absolute rounded-full bg-[#d4af37]"
                style={{ 
                  width: p.size, 
                  height: p.size, 
                  boxShadow: "0 0 10px rgba(212,175,55,0.8)" 
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;