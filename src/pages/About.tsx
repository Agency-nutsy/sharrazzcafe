import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { Utensils, Sparkles, Users, MapPin, Clock } from "lucide-react";
import { MouseEvent } from "react";
import SectionReveal from "@/components/SectionReveal";
// Note: Keep these imports, but they now represent Sharrazz visuals in the new theme
import img5 from "@/assets/about 1.webp"; 
import img6 from "@/assets/about 2.png";

// ── CUSTOM HOOK: DETECT MOBILE ────────────────
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

const pillars = [
  { icon: Utensils, title: "The Flavors", desc: "A global fusion menu featuring Italian pastas, Mexican delights, and North Indian classics—crafted for the soul." },
  { icon: Sparkles, title: "The Rooftop", desc: "An aesthetic open-air escape in the heart of Satya Niketan—the ultimate spot for sunsets and late-night vibes." },
  { icon: Users, title: "The Community", desc: "The go-to hangout for South Campus students and foodies, where every face becomes a familiar friend." },
];

// --- 1. THE ELEGANT GLOW SCROLL TEXT ---
const SmolderingText = ({ children }: { children: string }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 85%", "end 60%"] 
  });

  const words = children.split(" ");
  
  return (
    <p ref={textRef} className="relative text-xl md:text-2xl font-light leading-relaxed mb-10 flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        // Transitions from a deep muted purple to the soft rose-white
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]); 
        const color = useTransform(scrollYProgress, [start, end], ["#4a2a4a", "#fdf6e3"]); 
        
        return (
          <motion.span 
            key={i} 
            style={isMobile ? { opacity: 1, color: "#fdf6e3" } : { opacity, color }} 
            className="transition-colors duration-300"
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

// --- 2. ROSE RADIANCE TRACING CARDS ---
const LanternCard = ({ pillar, delay }: { pillar: any; delay: number }) => {
  return (
    <SectionReveal delay={delay}>
      <div className="group relative p-10 bg-[#0f050a]/60 backdrop-blur-md hover:bg-[#0f050a]/90 transition-all duration-700 rounded-xl overflow-hidden h-full flex flex-col items-center text-center shadow-lg hover:-translate-y-2 cursor-pointer border border-white/5">
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" xmlns="http://www.w3.org/2000/svg">
          <rect 
            x="0" y="0" width="100%" height="100%" rx="12" ry="12" 
            fill="none" stroke="rgba(255, 45, 133, 0.6)" strokeWidth="2"
            strokeDasharray="0 2000" 
            strokeDashoffset="0"
            className="transition-all duration-1000 ease-in-out group-hover:stroke-dasharray-[2000_0] shadow-[0_0_15px_rgba(255,45,133,0.8)]"
          />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex flex-col items-center">
          <pillar.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-125 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(255,45,133,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,45,133,1)]" />
          <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-primary transition-colors duration-300 tracking-wide">{pillar.title}</h3>
          <p className="text-foreground/60 text-sm leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
            {pillar.desc}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
};

// --- THE ROSE SAND HOURGLASS ---
const ScrollHourglass = ({ progress }: { progress: any }) => {
  const topSandHeight = useTransform(progress, [0, 1], ["100%", "0%"]);
  const bottomSandHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-12 h-20 flex flex-col items-center justify-between opacity-80 mt-2">
      <svg viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="1" className="absolute inset-0 w-full h-full text-primary/30 z-20">
        <path d="M2 2 H22 M2 38 H22 M4 2 L12 18 L20 2 M4 38 L12 22 L20 38" />
      </svg>
      <div className="relative w-[16px] h-[16px] mt-[2px] overflow-hidden rounded-t-[2px]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
        <motion.div
          className="absolute bottom-0 w-full bg-primary shadow-[0_0_10px_rgba(255,45,133,1)]"
          style={{ height: topSandHeight }}
        />
      </div>
      <motion.div
        className="w-[1px] h-full bg-primary/60 absolute top-1/2 -translate-y-1/2 z-10"
        style={{ opacity: useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
      />
      <div className="relative w-[16px] h-[16px] mb-[2px] overflow-hidden rounded-b-[2px]" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}>
        <motion.div
          className="absolute bottom-0 w-full bg-primary shadow-[0_0_10px_rgba(255,45,133,1)]"
          style={{ height: bottomSandHeight }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const desktopHeroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroY = isMobile ? 0 : desktopHeroY; 

  const breakRef = useRef<HTMLElement>(null);
  const { scrollYProgress: breakScroll } = useScroll({ target: breakRef, offset: ["start end", "end start"] });
  const desktopBreakY = useTransform(breakScroll, [0, 1], ["-20%", "20%"]);
  const desktopBreakScale = useTransform(breakScroll, [0, 1], [1.1, 1]);
  const breakY = isMobile ? 0 : desktopBreakY; 
  const breakScale = isMobile ? 1 : desktopBreakScale; 

  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start center", "end center"]
  });

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
  function handleImageMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return; 
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const roseMask = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, transparent 10%, black 80%)`;

  return (
    <main className="relative aura-bg text-foreground min-h-screen overflow-hidden">
      
      <style>{`
        @keyframes auraBreath {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 50% 100%; }
        }
        .aura-bg {
          background-color: transparent;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(255, 45, 133, 0.15), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(212, 175, 55, 0.1), transparent 60%);
          background-attachment: fixed;
          background-size: 200% 200%;
          animation: auraBreath 12s ease-in-out infinite alternate;
        }
      `}</style>

      {/* --- 1. THE HERO TITLE --- */}
      <section ref={heroRef} className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div className="absolute inset-x-0 -top-[300px] -bottom-[300px] -z-10 bg-[#0c0810]" style={{ y: heroY }}>
          <img src={img5} alt="Sharrazz Rooftop Ambiance" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0810]/60 via-transparent to-[#0f050a]" />
        </motion.div>

        <div className="text-center z-10 px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-primary mb-4 drop-shadow-[0_0_15px_rgba(255,45,133,0.5)]">
              SHARRAZZ STORY
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">
              Aesthetic Rooftop. Satya Niketan's Finest.
            </p>
          </motion.div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] bg-gradient-to-b from-primary to-transparent mx-auto mt-12 shadow-[0_0_10px_rgba(255,45,133,1)]"
          />
        </div>
      </section>

      {/* --- 2. THE STICKY SCROLL STORY & HOURGLASS --- */}
      <section ref={storyRef} className="max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

          <div className="md:col-span-5 relative">
            <div className="sticky top-40 flex items-start gap-6">
              <div className="hidden md:block">
                <ScrollHourglass progress={storyScroll} />
              </div>

              <SectionReveal>
                <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wider mb-6 leading-tight drop-shadow-xl">
                  Skyline Dining<br />
                  <span className="text-primary italic">In Satya</span>
                </h2>
                <div className="w-16 h-[2px] bg-primary mb-6 shadow-[0_0_15px_rgba(255,45,133,1)]" />
                <p className="text-primary/60 text-xs tracking-widest uppercase font-bold">
                  Opposite Sri Venkateswara College
                </p>
              </SectionReveal>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-12 md:border-l border-primary/10 pt-12 md:pt-0">
            <SmolderingText>
              Located in the heart of South Campus, Sharrazz Cafe & Rooftop Dining was envisioned as a premium yet accessible escape for the vibrant student community of Satya Niketan. 
            </SmolderingText>
            <SmolderingText>
              Perched on the 3rd floor, our rooftop offers an panoramic view of the neighborhood, providing the perfect backdrop for long conversations, birthday celebrations, or a quiet date under the stars. 
            </SmolderingText>
            <SmolderingText>
              We believe that good food shouldn't have a curfew. That's why we stay open until 3:00 AM, serving up our signature pastas, sizzling snacks, and refreshing shakes to the night owls and early risers alike. 
            </SmolderingText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-primary/20 mt-16 space-y-4"
            >
              <div className="flex items-start gap-3 text-primary group cursor-default">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,45,133,0.8)] transition-all" />
                <p className="text-foreground/80 text-sm leading-relaxed tracking-wider group-hover:text-white transition-colors">
                  298, Third Floor, Satya Niketan,<br />
                  South Moti Bagh, New Delhi – 110021
                </p>
              </div>
              <div className="flex items-center gap-3 text-primary group cursor-default">
                <Clock className="w-5 h-5 shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,45,133,0.8)] transition-all" />
                <p className="text-foreground/80 text-sm tracking-widest uppercase group-hover:text-white transition-colors">
                  Open Every Day · 11:00 AM – 03:00 AM
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- 3. THE CINEMATIC PARALLAX BREAK (Rose Reveal) --- */}
      <section 
        ref={breakRef} 
        onMouseMove={handleImageMouseMove}
        className="relative h-[60vh] w-full overflow-hidden my-12 cursor-crosshair group"
      >
        <motion.div
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{ y: breakY, scale: breakScale }}
        >
          <img src={img6} alt="Sharrazz Ambiance" className="w-full h-full object-cover grayscale brightness-[0.3] contrast-125" />
          
          <motion.img 
            src={img6} alt="Sharrazz Ambiance Highlight" 
            className="absolute inset-0 w-full h-full object-cover saturate-[1.1]" 
            style={isMobile ? {} : { WebkitMaskImage: roseMask, maskImage: roseMask }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f050a] via-transparent to-[#0f050a] pointer-events-none" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <SectionReveal>
            <div className="text-center">
              <div className="w-16 h-[1px] bg-primary mx-auto mb-8 shadow-[0_0_15px_rgba(255,45,133,1)]" />
              <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-wide italic leading-relaxed drop-shadow-2xl max-w-4xl mx-auto">
                "Elevate your mood, elevate your dining.{" "}
                <span className="text-primary font-bold">Under the open sky.</span>"
              </blockquote>
              <div className="w-16 h-[1px] bg-primary mx-auto mt-8 shadow-[0_0_15px_rgba(255,45,133,1)]" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* --- 4. THE THREE PILLARS (Rose Tracing Borders) --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="text-center mb-20">
          <SectionReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(255,45,133,0.4)]">OUR PILLARS</h2>
            <p className="text-muted-foreground text-xs tracking-widest uppercase font-bold">The foundation of Sharrazz</p>
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