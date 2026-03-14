import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Phone, ChevronDown, Calendar, Armchair, Star, Music, MapPin, Instagram } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import heroImg from "@/assets/736 ad hero.png";
import img2 from "@/assets/restaurant-2.webp";
import img3 from "@/assets/restaurant-3.webp";
import img4 from "@/assets/restaurant-4.webp";

// --- THE SAND VORTEX REVEAL SYSTEM ---
const HeroSandVortex = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"swirling" | "shattering">("swirling");

  // Generate particles once so they don't reshuffle
  const particles = useMemo(() => {
    return Array.from({ length: 140 }).map((_, i) => ({
      id: i,
      angle: (i / 140) * Math.PI * 2,
      radius: 10 + Math.random() * 350,
      size: Math.random() * 3 + 1,
      speed: 2 + Math.random() * 4,
    }));
  }, []);

  useEffect(() => {
    const shatterTimer = setTimeout(() => setPhase("shattering"), 3000);
    const completeTimer = setTimeout(onComplete, 4200); // Allow time for shatter animation
    return () => {
      clearTimeout(shatterTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={phase === "shattering" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 z-[50] bg-background flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#d4af37]"
            style={{
              width: p.size,
              height: p.size,
              x: Math.cos(p.angle) * p.radius,
              y: Math.sin(p.angle) * p.radius,
              boxShadow: "0 0 10px rgba(212,175,55,0.8)",
            }}
            animate={phase === "shattering" ? {
              x: Math.cos(p.angle) * (p.radius + 800),
              y: Math.sin(p.angle) * (p.radius + 800),
              opacity: 0,
              scale: 0,
            } : {
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ 
              duration: phase === "shattering" ? 1.5 : 2, 
              repeat: phase === "swirling" ? Infinity : 0,
              ease: "easeOut" 
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// MAGNETIC LIQUID GOLD BUTTON COMPONENT
const MagneticButton = ({ children, to, href, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[30deg] transition-all duration-700 ease-in-out group-hover:translate-x-[150%] pointer-events-none z-0" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  return to ? <Link to={to} className="inline-block">{innerContent}</Link> : <a href={href} className="inline-block">{innerContent}</a>;
};

const stats = [
  { icon: Calendar, label: "Est. 2018", end: 2018, prefix: "", isYear: true },
  { icon: Armchair, label: "Seats", end: 150, prefix: "", suffix: "+" },
  { icon: Star, label: "Rated", end: 4.3, prefix: "", suffix: "★", isDecimal: true },
  { icon: Music, label: "Live Music Nightly", end: 0, prefix: "", isText: true },
];

const Counter = ({ end, isDecimal, isYear, isText, suffix }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || isText) return;
    const duration = 1500;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, isText]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (isText) return <span ref={ref} className="font-serif text-3xl md:text-4xl text-primary">♪</span>;
  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl text-primary">
      {isYear ? Math.floor(count) : isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix || ""}
    </span>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [started, text]);

  return <span ref={ref} className="inline-block">{displayed}<span className="border-r-2 border-primary ml-1 animate-pulse" /></span>;
};

const PremiumHeading = ({ title }: { title: string }) => {
  const letters = Array.from(title);
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } } };
  const child = { hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } };
  return (
    <div className="text-center mb-16">
      <motion.h2 variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="font-serif text-3xl md:text-5xl tracking-wider flex justify-center flex-wrap relative">
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className={`${letter === " " ? "w-3" : ""} inline-block`}>
            <span className="bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]" style={{ backgroundImage: "linear-gradient(110deg, #a17b20 0%, #d4af37 30%, #fffbd6 50%, #d4af37 70%, #a17b20 100%)", backgroundSize: "200% auto", animation: "moltenGold 4s linear infinite" }}>{letter}</span>
          </motion.span>
        ))}
      </motion.h2>
      <style>{`@keyframes moltenGold { to { background-position: 200% center; } }`}</style>
    </div>
  );
};

const experiences = [
  { title: "Live Music Nights", desc: "Every night comes alive with soulful acoustics and electrifying beats.", img: img2 },
  { title: "Rooftop Lounge", desc: "Dine under the stars with panoramic views of North Campus.", img: img3 },
  { title: "Signature Cocktails", desc: "Crafted by master mixologists — each sip tells a story.", img: img4 },
];

const reviews = [
  { author: "Riya Sharma", text: "The rooftop lounge is absolutely breathtaking! Paired with their signature cocktails and live acoustic music, it was the perfect evening. A must-visit in North Campus.", rating: 5, date: "2 weeks ago" },
  { author: "Aman Verma", text: "Old world charm perfectly blended with modern flair. The staff is incredibly attentive, and the ambiance makes you want to stay for hours. The food quality is exceptional.", rating: 5, date: "1 month ago" },
  { author: "Sneha Gupta", text: "A hidden gem in Hudson Lane! The exotic pizza was delicious and the live music creates an electrifying atmosphere. This is easily my favorite spot for a weekend night out.", rating: 5, date: "3 months ago" }
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["20px", "-20px"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["20px", "-20px"]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth - 0.5);
    mouseY.set(clientY / window.innerHeight - 0.5);
  };

  return (
    <main className="relative bg-background">
      {/* 1. HERO SECTION */}
      <section 
        ref={heroRef} 
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen overflow-hidden flex items-center justify-center perspective-1000"
      >
        {/* Intro Vortex Overlay (Stays on top for 3s) */}
        <AnimatePresence>
          {!isIntroComplete && (
            <HeroSandVortex onComplete={() => setIsIntroComplete(true)} />
          )}
        </AnimatePresence>

        {/* Hero Content Background (Always here, but behind the vortex) */}
        <motion.div 
          className="absolute inset-[-5%] z-0" 
          style={{ y: heroY, x: bgX, y: bgY }}
        >
          <img src={heroImg} alt="736 A.D. interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>

        {/* Hero Content Text (Always on top of the image, below the vortex) */}
        <div className="text-center px-4 relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-auto">
          <motion.div style={{ x: textX, y: textY }}>
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="font-serif text-6xl sm:text-7xl md:text-9xl font-bold text-shimmer tracking-wider">736 A.D.</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-4 text-foreground/80 text-lg md:text-xl tracking-[0.25em] uppercase font-light"><TypewriterText text="Old Charm. New Age Flair." /></motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton to="/menu" className="btn-gold px-8 py-3 rounded text-sm tracking-widest uppercase font-semibold">Explore Menu</MagneticButton>
              <MagneticButton href="tel:+918010000249" className="px-8 py-3 rounded border border-primary/40 text-primary text-sm tracking-widest uppercase font-semibold hover:bg-primary/10 transition-colors"><Phone className="w-4 h-4" />Call to Reserve</MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 z-20"><ChevronDown className="w-6 h-6" /></motion.div>
      </section>

      {/* --- WHY 736 A.D. --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Why 736 A.D.?" /></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-card border border-primary/10 rounded p-6 text-center relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_8px_30px_-5px_rgba(212,175,55,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-all duration-500" />
                    <div className="group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all duration-500"><Counter {...stat} /></div>
                    <p className="text-muted-foreground text-xs tracking-widest uppercase mt-3 group-hover:text-primary/80 transition-colors duration-500">{stat.label}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SIGNATURE EXPERIENCES --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Signature Experiences" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div className="relative group rounded-md h-80 md:h-96 cursor-pointer overflow-hidden shadow-lg shadow-black/40">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="w-[200%] h-[200%] animate-spin bg-[conic-gradient(from_0deg,transparent_0%,transparent_75%,rgba(212,175,55,1)_100%)]" style={{ animationDuration: '2.5s' }} />
                  </div>
                  <div className="absolute inset-[2px] rounded bg-background overflow-hidden z-10">
                    <img src={exp.img} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl text-primary mb-2 group-hover:text-white transition-colors duration-300 drop-shadow-md">{exp.title}</h3>
                      <p className="text-foreground/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{exp.desc}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- GUESTS SAY --- */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="What Our Guests Say" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div className="bg-card border border-primary/20 rounded p-8 relative transition-all duration-500 h-full flex flex-col group hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_12px_40px_-10px_rgba(212,175,55,0.2)] overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent transition-all duration-700 ease-out group-hover:h-2/3 pointer-events-none z-0" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-5 h-5 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }} />
                      ))}
                    </div>
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed italic mb-8 flex-grow group-hover:text-foreground transition-colors duration-300">"{review.text}"</p>
                    <div className="flex items-center justify-between border-t border-primary/10 pt-6 mt-auto relative">
                      <div className="absolute top-[-1px] left-0 w-0 h-[1px] bg-primary transition-all duration-700 group-hover:w-full" />
                      <span className="font-serif text-primary text-lg tracking-wide">{review.author}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">{review.date}</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIND US --- */}
      <section className="py-24 px-4 bg-background border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Find Us" /></SectionReveal>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <SectionReveal delay={0.1} className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="w-full max-w-sm aspect-square rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors duration-500 shadow-xl shadow-black/20">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8369014643044!2d77.2039635!3d28.6945251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3b9353747f%3A0x3c9180eadc67e204!2s736%20A.D.%20Culinary%20Bar!5e0!3m2!1sen!2sin!4v1773471690389!5m2!1sen!2sin" className="w-full h-full" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="736 A.D. Location"></iframe>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2} className="w-full md:w-1/2 flex flex-col gap-8 justify-center items-center md:items-start text-foreground/80">
              <a href="https://www.google.com/maps/place/736+A.D.+Culinary+Bar/@28.6942977,77.2035745,17z/data=!4m6!3m5!1s0x390cfd3b9353747f:0x3c9180eadc67e204!8m2!3d28.6945251!4d77.2039635!16s%2Fg%2F11j27jsgzg?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-primary transition-colors duration-300 group text-left">
                <MapPin className="w-6 h-6 text-primary mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div><h3 className="font-serif text-xl text-primary mb-2">Location</h3><p className="max-w-xs leading-relaxed">736 A.D. Culinary Bar<br />Thekedaar Surjeet Singh Marg, Block G,<br />Vijay Nagar, Delhi, 110033</p></div>
              </a>
              <a href="tel:08010000249" className="flex items-center gap-4 hover:text-primary transition-colors duration-300 group"><Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" /><div><h3 className="font-serif text-xl text-primary mb-1">Reservations</h3><p className="tracking-widest">08010000249</p></div></a>
              <a href="https://www.instagram.com/736adcafe/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-primary transition-colors duration-300 group"><Instagram className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" /><div><h3 className="font-serif text-xl text-primary mb-1">Follow Us</h3><p className="tracking-widest">@736adcafe</p></div></a>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;