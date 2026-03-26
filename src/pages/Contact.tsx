import { useRef, MouseEvent } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// --- 3D INTERACTIVE TILE COMPONENT ---
const MagneticTile = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Physics for the tilt
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Physics for the glow
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate center for tilt
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) / 25); // Subtle tilt
    y.set((clientY - centerY) / 25);
    
    // Exact cursor position for the glow
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Changed glow to the hot ember orange
  const maskImage = useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(255, 90, 0, 0.4), transparent)`;

  return (
    <SectionReveal delay={delay} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: y, rotateY: x }}
        // Updated to the dark magma glassmorphism style
        className="relative h-full w-full bg-[#0a0402]/80 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden group perspective-1000 shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(255,90,0,0.15)] transition-shadow duration-500"
      >
        {/* The Ember Glow Mask */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at center, rgba(255,90,0,0.15) 0%, transparent 100%)",
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        />
        {/* Inner Content */}
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
      className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary tracking-[0.2em] mb-4 flex justify-center flex-wrap drop-shadow-[0_0_15px_rgba(255,90,0,0.5)]"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className={letter === " " ? "w-4 md:w-8" : ""}>
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};


const Contact = () => (
  /* INJECTED MAGMA BG DIRECTLY INTO MAIN WRAPPER */
  <main className="pt-32 pb-24 relative magma-bg text-foreground min-h-screen overflow-hidden">
    
    {/* MAGMA ANIMATION CSS */}
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

    {/* Ambient Background Glow */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-6xl h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

    {/* --- 1. HERO SECTION --- */}
    <section className="px-4 text-center mb-24 relative z-10">
      <StaggeredTitle text="GET IN TOUCH" />
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
    <section className="px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Tile: Contact Info (Takes up 2 columns) */}
        <MagneticTile delay={0.1} className="lg:col-span-2 min-h-[500px]">
          <div className="p-8 md:p-12 flex flex-col h-full justify-between">
            <div>
              <h2 className="font-serif text-3xl text-white mb-10 tracking-widest border-b border-primary/20 pb-6 drop-shadow-[0_0_8px_rgba(255,90,0,0.4)]">
                The Details
              </h2>
              
              <div className="space-y-8">
                {/* Location - DIRECT MAPS LINK UPDATED */}
                <a 
                  href="https://www.google.com/maps/place/litup+cafe/data=!4m2!3m1!1s0x390cfdf25ec4aa73:0x839847192c9ab5cb?sa=X&ved=1t:242&ictx=111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.4)]">
                    <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/80 tracking-[0.2em] uppercase mb-1">Location</p>
                    <p className="text-foreground/90 text-sm leading-relaxed tracking-wider group-hover:text-white transition-colors duration-300">
                      The Litup Cafe & Lounge<br/>F-21, 2nd Floor, Opp. NDPL Office,<br/>Hudson Lane, GTB Nagar,<br/>Delhi – 110009
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.4)]">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/80 tracking-[0.2em] uppercase mb-1">Hours</p>
                    <p className="text-foreground/90 text-sm tracking-wider">
                      Mon – Sun<br/>11:30 AM – 12:00 AM
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,90,0,0.4)]">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/80 tracking-[0.2em] uppercase mb-1">Reservations</p>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+917982488464" className="text-foreground/90 text-sm tracking-widest hover:text-white transition-colors">+91 79824 88464</a>
                      <a href="tel:+918506827807" className="text-foreground/90 text-sm tracking-widest hover:text-white transition-colors">+91 85068 27807</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials at the bottom of the card */}
            <div className="pt-8 mt-8 border-t border-primary/20 flex gap-4">
              <a href="https://instagram.com/the_lit_up_cafe" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,90,0,0.6)]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/litupdelhi" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,90,0,0.6)]">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </MagneticTile>

        {/* Right Tile: The Map (Takes up 3 columns) */}
        <MagneticTile delay={0.3} className="lg:col-span-3 min-h-[500px]">
          {/* EMBED LINK UPDATED */}
          <a 
            href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.805565947981!2d77.2043207!3d28.695462299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf25ec4aa73%3A0x839847192c9ab5cb!2sThe%20litup%20cafe!5e0!3m2!1sen!2sin!4v1774514916358!5m2!1sen!2sin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full w-full relative group cursor-pointer"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.805565947981!2d77.2043207!3d28.695462299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf25ec4aa73%3A0x839847192c9ab5cb!2sThe%20litup%20cafe!5e0!3m2!1sen!2sin!4v1774514916358!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                // Adjusted filter to create a dark, glowing heated map look
                filter: "grayscale(1) invert(0.9) contrast(1.2) hue-rotate(180deg)", 
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Litup Cafe Location"
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            />
            
            {/* The magma tint overlay to make the map match the site theme */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none transition-colors duration-500 group-hover:bg-primary/10" />
            
            {/* Direct Call to Action button floating on the map */}
            <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
              <a
                href="tel:+917982488464"
                onClick={(e) => e.stopPropagation()} // Prevents map link from triggering when calling
                className="relative inline-flex items-center gap-3 px-6 py-3 bg-[#0a0402]/80 backdrop-blur-md border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,90,0,0.4)]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
            
            {/* Hover overlay hint telling them to click */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0a0402]/40 pointer-events-none">
                <span className="font-serif text-primary text-xl tracking-widest drop-shadow-[0_0_15px_rgba(255,90,0,1)]">Open in Maps</span>
            </div>
          </a>
        </MagneticTile>

      </div>
    </section>

    {/* --- 3. FINAL TEXT FOOTER SIGNATURE --- */}
    <section className="mt-24 text-center px-4 relative z-10">
      <SectionReveal>
        <p className="font-serif text-2xl md:text-4xl text-primary/60 tracking-wider italic drop-shadow-[0_0_8px_rgba(255,90,0,0.4)]">
          "Come as you are, leave lit up."
        </p>
      </SectionReveal>
    </section>
    
  </main>
);

export default Contact;