import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Controls the cinematic delay
  const location = useLocation();

  useEffect(() => {
    // --- CINEMATIC SYNC TIMER ---
    // This hides the navbar for 4 seconds to allow the sand vortex to finish
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* 1. THE ULTRA-THIN TOP GOLD FILAMENT - Appears only after delay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
        className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-[110]" 
      />

      <motion.nav
        // The cinematic entrance logic
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // Smooth premium glide
          delay: 0.2 // Tiny extra buffer for the image reveal
        }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? "h-20 bg-background/90 backdrop-blur-2xl border-b border-primary/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            : "h-28 bg-transparent border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="group relative flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-[0.15em] transition-colors group-hover:text-white">
              736 A.D.
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-primary/40 -mt-1 group-hover:text-primary transition-colors">
              Culinary Bar
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-6 py-2 overflow-hidden group"
                >
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0 bg-primary/5 group-hover:h-full transition-all duration-300 ease-out z-0"
                  />
                  
                  <span className={`relative z-10 text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                    isActive ? "text-primary font-bold" : "text-foreground/70 group-hover:text-primary"
                  }`}>
                    {link.name}
                  </span>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <motion.a
              href="tel:+918010000249"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:flex items-center gap-3 px-8 py-3 border border-primary/30 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:bg-primary hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Phone size={14} />
              Reserve Table
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-primary p-2 transition-transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* INTEGRATED GOLDEN SCROLL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
          <motion.div
            className="h-full bg-primary relative"
            style={{ 
              width: `${scrollProgress}%`,
              boxShadow: "0 0 10px rgba(212,175,55,1)",
              transition: "width 0.1s ease-out"
            }}
          >
            <div className="absolute right-0 top-0 h-full w-4 bg-white/30 blur-[2px]" />
          </motion.div>
        </div>
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] bg-background flex flex-col p-12"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="text-primary">
                <X size={36} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-10 mt-12">
              {navLinks.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-5xl tracking-tighter text-foreground/30 hover:text-primary transition-all duration-500 hover:tracking-widest"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto border-t border-primary/10 pt-8">
              <p className="text-primary/40 text-[10px] uppercase tracking-[0.5em] mb-2">Reservations</p>
              <a href="tel:+918010000249" className="font-serif text-3xl text-primary underline">08010000249</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;