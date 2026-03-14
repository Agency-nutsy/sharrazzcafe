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

  const maskImage = useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <SectionReveal delay={delay} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX: y, rotateY: x }}
        className="relative h-full w-full bg-black/40 border border-primary/20 rounded-2xl overflow-hidden group perspective-1000 shadow-2xl"
      >
        {/* The Lantern Glow Mask */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 100%)",
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
      className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary tracking-[0.2em] mb-4 flex justify-center flex-wrap"
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
  <main className="pt-32 pb-24 bg-background min-h-screen relative overflow-hidden">
    
    {/* Ambient Background Glow */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-6xl h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

    {/* --- 1. HERO SECTION --- */}
    <section className="px-4 text-center mb-24 relative z-10">
      <StaggeredTitle text="GET IN TOUCH" />
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        className="text-muted-foreground text-xs md:text-sm tracking-[0.5em] uppercase"
      >
        Your Table Awaits
      </motion.p>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_15px_rgba(212,175,55,0.8)]" 
      />
    </section>

    {/* --- 2. OBSIDIAN COORDINATES (3D TILES) --- */}
    <section className="px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Tile: Contact Info (Takes up 2 columns) */}
        <MagneticTile delay={0.1} className="lg:col-span-2 min-h-[500px]">
          <div className="p-8 md:p-12 flex flex-col h-full justify-between">
            <div>
              <h2 className="font-serif text-3xl text-white mb-10 tracking-widest border-b border-primary/20 pb-6">
                The Details
              </h2>
              
              <div className="space-y-8">
                {/* Location - Clickable Direct Maps Link */}
                <a 
                  href="https://www.google.com/maps/place/736+ad/data=!4m2!3m1!1s0x390cfd3b9353747f:0x3c9180eadc67e204?sa=X&ved=1t:242&ictx=111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 tracking-[0.2em] uppercase mb-1">Location</p>
                    <p className="text-foreground/90 text-sm leading-relaxed tracking-wider group-hover:text-primary transition-colors duration-300">
                      G-15/B, Vijay Nagar,<br/>Hudson Lane, New Delhi 110009
                    </p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 tracking-[0.2em] uppercase mb-1">Hours</p>
                    <p className="text-foreground/90 text-sm tracking-wider">
                      Mon – Sun<br/>11:00 AM – 12:30 AM
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="p-3 rounded-full bg-white/5 border border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 tracking-[0.2em] uppercase mb-1">Reservations</p>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+918010000249" className="text-foreground/90 text-sm tracking-widest hover:text-primary transition-colors">+91 8010000249</a>
                      <a href="tel:+918010000248" className="text-foreground/90 text-sm tracking-widest hover:text-primary transition-colors">+91 8010000248</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials at the bottom of the card */}
            <div className="pt-8 mt-8 border-t border-primary/20 flex gap-4">
              <a href="https://instagram.com/736adcafe" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/736ad" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </MagneticTile>

        {/* Right Tile: The Map (Takes up 3 columns) */}
        <MagneticTile delay={0.3} className="lg:col-span-3 min-h-[500px]">
          {/* FIX: Changed the href to the standard Maps view link (.../3) 
            so it opens perfectly in a new tab without the iframe error.
          */}
          <a 
            href="https://www.google.com/maps/place/736+ad/data=!4m2!3m1!1s0x390cfd3b9353747f:0x3c9180eadc67e204?sa=X&ved=1t:242&ictx=111" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full w-full relative group cursor-pointer"
          >
            {/* The iframe STILL uses the embed link (.../4) to render visually on the site */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8369014643044!2d77.2039635!3d28.6945251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3b9353747f%3A0x3c9180eadc67e204!2s736%20A.D.%20Culinary%20Bar!5e0!3m2!1sen!2sin!4v1773503943996!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: "grayscale(1) invert(1) contrast(1.2) sepia(0.5) hue-rotate(180deg)", 
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="736 A.D. Location"
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            />
            
            {/* The golden tint overlay to make the map match the site theme */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
            
            {/* Direct Call to Action button floating on the map */}
            <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
              <a
                href="tel:+918010000249"
                onClick={(e) => e.stopPropagation()} // Prevents map link from triggering when calling
                className="relative inline-flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-md border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
            
            {/* Hover overlay hint telling them to click */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 pointer-events-none">
                <span className="font-serif text-primary text-xl tracking-widest drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">Open in Maps</span>
            </div>
          </a>
        </MagneticTile>

      </div>
    </section>

    {/* --- 3. FINAL TEXT FOOTER SIGNATURE --- */}
    <section className="mt-24 text-center px-4 relative z-10">
      <SectionReveal>
        <p className="font-serif text-2xl md:text-4xl text-white/50 tracking-wider italic">
          "The legend continues."
        </p>
      </SectionReveal>
    </section>
    
  </main>
);

export default Contact;