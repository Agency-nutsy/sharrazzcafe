import { useRef, MouseEvent, useState, useEffect } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// ── CUSTOM HOOK: DETECT MOBILE FOR PERFORMANCE ────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// --- 3D INTERACTIVE TILE COMPONENT ---
const MagneticTile = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Physics for the tilt
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Physics for the glow
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return; 
    
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate center for tilt
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) / 25); 
    y.set((clientY - centerY) / 25);
    
    // Exact cursor position for the glow
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const maskImage = useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(255, 90, 0, 0.4), transparent)`;

  return (
    <SectionReveal delay={delay} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: isMobile ? 0 : y, rotateY: isMobile ? 0 : x }}
        className="relative h-full w-full bg-[#0a0402]/80 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden group perspective-1000 shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(255,90,0,0.15)] transition-shadow duration-500"
      >
        <motion.div
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={isMobile ? {
            background: "radial-gradient(circle at center, rgba(255,90,0,0.08) 0%, transparent 80%)"
          } : {
            background: "radial-gradient(circle at center, rgba(255,90,0,0.15) 0%, transparent 100%)",
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        />
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </motion.div>
    </SectionReveal>
  );
};

// --- STAGGERED LETTER ANIMATION FOR HERO ---
const StaggeredTitle = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };
  const child = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.h1 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className="font-serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-primary tracking-widest md:tracking-[0.2em] mb-4 flex justify-center flex-nowrap drop-shadow-[0_0_15px_rgba(255,90,0,0.5)]"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className={letter === " " ? "w-3 md:w-8 shrink-0" : "shrink-0"}>
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Contact = () => (
  <main className="pt-32 pb-24 relative magma-bg text-foreground min-h-screen overflow-hidden">
    
    <style>{`
      @keyframes magmaBreath {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 50% 100%; }
      }
      .magma-bg {
        background-color: transparent;
        background-image: 
          radial-gradient(circle at 15% 50%, rgba(255, 60, 0, 0.25), transparent 50%),
          radial-gradient(circle at 85% 30%, rgba(200, 20, 0, 0.35), transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(255, 100, 0, 0.2), transparent 60%);
        background-attachment: fixed;
        background-size: 200% 200%;
        animation: magmaBreath 12s ease-in-out infinite alternate;
      }
    `}</style>

    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-6xl h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

    {/* --- 1. HERO SECTION --- */}
    <section className="px-4 text-center mb-16 md:mb-24 relative z-10 overflow-hidden">
      <div className="max-w-full overflow-x-hidden">
        <StaggeredTitle text="GET IN TOUCH" />
      </div>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        className="text-muted-foreground text-xs md:text-sm tracking-[0.5em] uppercase font-bold"
      >
        Your Table Awaits
      </motion.p>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_15px_rgba(255,90,0,1)]" 
      />
    </section>

    {/* --- 2. OBSIDIAN COORDINATES (3D TILES) --- */}
    <section className="px-4 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        
        {/* Left Tile: Contact Info */}
        <MagneticTile delay={0.1} className="lg:col-span-2 h-auto lg:min-h-[500px]">
          <div className="p-6 md:p-12 flex flex-col h-full justify-between">
            <div>
              <h2 className="font-serif text-3xl text-white mb-8 md:mb-10 tracking-widest border-b border-primary/20 pb-4 md:pb-6 drop-shadow-[0_0_8px_rgba(255,90,0,0.4)]">
                The Details
              </h2>
              
              <div className="space-y-6 md:space-y-8">
                {/* Location */}
                <a 
                  href="https://maps.google.com/?q=The+Litup+Cafe,+Hudson+Lane,+Delhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 md:gap-5 group cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.4)] shrink-0">
                    <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/80 tracking-[0.2em] uppercase mb-1">Location</p>
                    <p className="text-foreground/90 text-xs md:text-sm leading-relaxed tracking-wider group-hover:text-white transition-colors duration-300">
                      The Litup Cafe & Lounge<br/>F-21, 2nd Floor, Opp. NDPL Office,<br/>Hudson Lane, GTB Nagar,<br/>Delhi – 110009
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-4 md:gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.4)] shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/80 tracking-[0.2em] uppercase mb-1">Hours</p>
                    <p className="text-foreground/90 text-xs md:text-sm tracking-wider">
                      Mon – Sun<br/>11:30 AM – 12:00 AM
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 md:gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.4)] shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/80 tracking-[0.2em] uppercase mb-1">Reservations</p>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+917982488464" className="text-foreground/90 text-xs md:text-sm tracking-widest hover:text-white transition-colors">+91 79824 88464</a>
                      <a href="tel:+918506827807" className="text-foreground/90 text-xs md:text-sm tracking-widest hover:text-white transition-colors">+91 85068 27807</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-primary/20 flex gap-4">
              <a href="https://instagram.com/the_lit_up_cafe" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,90,0,0.6)]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/litupdelhi" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,90,0,0.6)]">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </MagneticTile>

        {/* Right Tile: The Map */}
        <MagneticTile delay={0.3} className="lg:col-span-3 h-[400px] lg:h-auto lg:min-h-[500px]">
          {/* 🔥 THE FIX: Real, working map links for both the click wrapper and the iframe */}
          <a 
            href="https://maps.google.com/?q=The+Litup+Cafe,+Hudson+Lane,+Delhi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full w-full relative group cursor-pointer"
          >
            <iframe
              src="https://maps.google.com/maps?q=The+Litup+Cafe,+Hudson+Lane,+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: "grayscale(1) invert(0.9) contrast(1.2) hue-rotate(180deg)", 
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Litup Cafe Location"
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            />
            
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none transition-colors duration-500 group-hover:bg-primary/10" />
            
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 pointer-events-auto">
              <a
                href="tel:+917982488464"
                onClick={(e) => e.stopPropagation()} 
                className="relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#0a0402]/80 backdrop-blur-md border border-primary/50 text-primary text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,90,0,0.4)]"
              >
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                Call Now
              </a>
            </div>
            
            <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0a0402]/40 pointer-events-none">
                <span className="font-serif text-primary text-xl tracking-widest drop-shadow-[0_0_15px_rgba(255,90,0,1)]">Open in Maps</span>
            </div>
          </a>
        </MagneticTile>

      </div>
    </section>

    {/* --- 3. FINAL TEXT FOOTER SIGNATURE --- */}
    <section className="mt-16 md:mt-24 text-center px-4 relative z-10">
      <SectionReveal>
        <p className="font-serif text-xl md:text-4xl text-primary/60 tracking-wider italic drop-shadow-[0_0_8px_rgba(255,90,0,0.4)]">
          "Come as you are, leave lit up."
        </p>
      </SectionReveal>
    </section>
    
  </main>
);

export default Contact;