import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { Utensils, Sparkles, Users, MapPin, Clock } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import img5 from "@/assets/restaurant-5.webp";
import img6 from "@/assets/restaurant-8.webp";

const pillars = [
  { icon: Utensils, title: "The Food", desc: "A global menu crafted with passion — from tandoori classics to continental marvels, every plate is a masterpiece." },
  { icon: Sparkles, title: "The Vibe", desc: "Dim lights, deep beats, rooftop breezes. An ambiance that transforms every evening into an unforgettable experience." },
  { icon: Users, title: "The People", desc: "A team dedicated to hospitality, making every guest feel like royalty from the moment they walk in." },
];

// --- REUSABLE FADE TEXT ---
const FadeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-foreground/70 leading-relaxed md:text-lg mb-10 font-light"
    >
      {children}
    </motion.p>
  );
};

// --- THE 3D LANTERN GLOW CARD COMPONENT ---
const LanternCard = ({ pillar, delay }: { pillar: any; delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <SectionReveal delay={delay}>
      <div 
        ref={cardRef}
        onMouseMove={onMouseMove}
        className="group relative p-10 border border-primary/10 bg-background hover:bg-black/40 transition-colors duration-500 rounded-lg overflow-hidden h-full flex flex-col items-center text-center"
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 100%)",
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-10" />
        
        <div className="relative z-10 flex flex-col items-center">
          <pillar.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
          <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-primary transition-colors duration-300">{pillar.title}</h3>
          <p className="text-foreground/60 text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {pillar.desc}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
};

// --- THE SCROLL-LINKED HOURGLASS COMPONENT ---
const ScrollHourglass = ({ progress }: { progress: any }) => {
  // Top sand shrinks down as user scrolls
  const topSandHeight = useTransform(progress, [0, 1], ["100%", "0%"]);
  // Bottom sand fills up as user scrolls
  const bottomSandHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-12 h-20 flex flex-col items-center justify-between opacity-80">
      {/* The glass frame (SVG) */}
      <svg viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1" className="absolute inset-0 w-full h-full text-primary/40 z-20">
        <path d="M2 2 H22 M2 38 H22 M4 2 L12 18 L20 2 M4 38 L12 22 L20 38" />
      </svg>
      
      {/* Top Bulb */}
      <div className="relative w-[16px] h-[16px] mt-[2px] overflow-hidden rounded-t-[2px]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
        <motion.div 
          className="absolute bottom-0 w-full bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]"
          style={{ height: topSandHeight }}
        />
      </div>

      {/* The falling sand stream (Only visible when scrolling between 5% and 95%) */}
      <motion.div 
        className="w-[1px] h-full bg-primary/60 absolute top-1/2 -translate-y-1/2 z-10"
        style={{ 
          opacity: useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) 
        }}
      />

      {/* Bottom Bulb */}
      <div className="relative w-[16px] h-[16px] mb-[2px] overflow-hidden rounded-b-[2px]" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}>
        <motion.div 
          className="absolute bottom-0 w-full bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]"
          style={{ height: bottomSandHeight }}
        />
      </div>
    </div>
  );
};


const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);

  const breakRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: breakScroll } = useScroll({ target: breakRef, offset: ["start end", "end start"] });
  const breakY = useTransform(breakScroll, [0, 1], ["-20%", "20%"]);
  const breakScale = useTransform(breakScroll, [0, 1], [1.1, 1]);

  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start center", "end center"] 
  });

  return (
    <main className="bg-background min-h-screen">
      
      {/* --- 1. THE HERO TITLE (Blurred Reveal) --- */}
      <section ref={heroRef} className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-[-5%] -z-10" style={{ y: heroY }}>
          <img src={img5} alt="736 A.D. interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>
        
        <div className="text-center z-10 px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-primary mb-4 drop-shadow-2xl">
              OUR STORY
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">
              Forged in history. Crafted for today.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] bg-gradient-to-b from-primary to-transparent mx-auto mt-12"
          />
        </div>
      </section>

      {/* --- 2. THE STICKY SCROLL STORY & HOURGLASS --- */}
      <section ref={storyRef} className="max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* Sticky Left Column */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-40 flex items-start gap-6">
              
              {/* THE DYNAMIC HOURGLASS */}
              <div className="hidden md:block mt-2">
                 <ScrollHourglass progress={storyScroll} />
              </div>

              <SectionReveal>
                <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wider mb-6 leading-tight">
                  Where Legends <br/>
                  <span className="text-primary italic">Dine</span>
                </h2>
                <div className="w-16 h-[2px] bg-primary mb-6 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                <p className="text-primary/60 text-xs tracking-widest uppercase">
                  Est. 2018 — Hudson Lane
                </p>
              </SectionReveal>

            </div>
          </div>

          {/* Scrolling Right Column (No more thread, just pure text) */}
          <div className="md:col-span-7 md:pl-12 md:border-l border-primary/10">
            <FadeText>
              Born on the legendary Hudson Lane, 736 A.D. is more than a restaurant — it's a destination where ancient charm meets the electric energy of modern nightlife. Since 2018, we've been the heartbeat of North Campus.
            </FadeText>
            <FadeText>
              From our iconic rooftop lounge to the soul-stirring live music that fills every corner, 736 A.D. offers an experience that lingers long after the night ends. Our global cuisine, signature cocktails, and flavored hookah make every visit unique.
            </FadeText>
            <FadeText>
              Whether it's a casual evening with friends or a celebration worth remembering, our doors are always open to those seeking an escape from the ordinary.
            </FadeText>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-primary/20 mt-12 space-y-4"
            >
              <div className="flex items-start gap-3 text-primary">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-foreground/80 text-sm leading-relaxed tracking-wider">
                  G-15/B, Vijay Nagar, Hudson Lane,<br/>New Delhi 110009
                </p>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <Clock className="w-5 h-5 shrink-0" />
                <p className="text-foreground/80 text-sm tracking-widest uppercase">
                  Open Every Day · 11:00 AM – 12:30 AM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. THE CINEMATIC PARALLAX BREAK --- */}
      <section ref={breakRef} className="relative h-[60vh] w-full overflow-hidden my-12">
        <motion.div 
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{ y: breakY, scale: breakScale }}
        >
          <img 
            src={img6} 
            alt="736 AD Ambiance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <SectionReveal>
            <div className="text-center">
              <div className="w-16 h-[1px] bg-primary mx-auto mb-8 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-wide italic leading-relaxed drop-shadow-2xl max-w-4xl mx-auto">
                "Where every night becomes a memory <span className="text-primary">worth keeping.</span>"
              </blockquote>
              <div className="w-16 h-[1px] bg-primary mx-auto mt-8 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* --- 4. THE THREE PILLARS (With Lantern Glow) --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="text-center mb-20">
          <SectionReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-widest mb-4">OUR PILLARS</h2>
            <p className="text-muted-foreground text-xs tracking-widest uppercase">The foundation of 736 A.D.</p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <LanternCard key={i} pillar={p} delay={i * 0.15} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default About;