import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  // --- FIXED: Lock the body scroll so the scrollbar disappears during loading ---
  useEffect(() => {
    // Hide scrollbar when loader mounts
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scrollbar when loader unmounts
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isRevealing) {
      // Wait for the split animation to completely finish before unmounting the component
      const timer = setTimeout(() => {
        onComplete();
      }, 1300); // 1.3 seconds guarantees the doors are fully off-screen
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRevealing(true);
          return 100;
        }
        // Add a little randomness to the loading speed for a natural feel
        return p + Math.floor(Math.random() * 4) + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [isRevealing, onComplete]);

  return (
    // The main container doesn't fade, it just holds the doors that slide away
    <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
      
      {/* --- LEFT MAGMA DOOR --- */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isRevealing ? "-100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0402] flex justify-end z-20"
      >
        {/* Glowing Hot Edge that appears when splitting */}
        <motion.div
          animate={{ opacity: isRevealing ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-full bg-gradient-to-r from-transparent to-[#ff5a00] opacity-0 shadow-[10px_0_50px_20px_rgba(255,90,0,0.8)]"
        />
      </motion.div>

      {/* --- RIGHT MAGMA DOOR --- */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isRevealing ? "100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0402] flex justify-start z-20"
      >
        {/* Glowing Hot Edge that appears when splitting */}
        <motion.div
          animate={{ opacity: isRevealing ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-full bg-gradient-to-l from-transparent to-[#ff5a00] opacity-0 shadow-[-10px_0_50px_20px_rgba(255,90,0,0.8)]"
        />
      </motion.div>

      {/* --- CENTRAL FLASH EFFECT --- */}
      {/* Creates a bright cinematic flash right when it hits 100% */}
      {isRevealing && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 z-50 bg-[#ff5a00] mix-blend-overlay pointer-events-none"
        />
      )}

      {/* --- LOADING CONTENT (Fades out BEFORE doors open) --- */}
      <AnimatePresence>
        {!isRevealing && (
          <motion.div
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-40"
          >
            {/* Brand Name with pulsating heat shadow */}
            <motion.h1 
              animate={{ textShadow: ["0px 0px 10px rgba(255,90,0,0.4)", "0px 0px 25px rgba(255,90,0,0.8)", "0px 0px 10px rgba(255,90,0,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] mb-12 text-white text-center"
            >
              LITUP
            </motion.h1>

            {/* Vertical Fire Thermometer */}
            <div className="w-[2px] h-32 md:h-48 bg-white/10 relative rounded-full overflow-hidden mb-8">
              <motion.div
                className="absolute bottom-0 w-full bg-gradient-to-t from-[#8a1c00] via-[#ff4500] to-[#ffaa00] shadow-[0_0_15px_rgba(255,90,0,1)]"
                style={{ height: `${progress}%` }}
              />
            </div>

            {/* Progress Text */}
            <div className="text-[#ff5a00] text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold flex items-center gap-4">
              <span className="w-6 h-[1px] bg-[#ff5a00]" />
              Igniting {progress}%
              <span className="w-6 h-[1px] bg-[#ff5a00]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LoadingScreen;