import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import { Phone, ChevronDown, Calendar, Armchair, Star, MapPin, Instagram, Utensils } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import heroImg from "@/assets/litup hero.png";
import img2 from "@/assets/litup home 1.png";
import img3 from "@/assets/litup home 2.png";
import img4 from "@/assets/litup home 3.png";

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

// ── VIGNETTE BURN HERO INTRO ────────────────
const HeroVignetteBurn = ({ onComplete }: { onComplete: () => void }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    if (isMobile) {
      el.style.background = "rgb(4,2,1)";
      el.style.transition = "opacity 1.5s ease-in-out";
      
      const timer1 = setTimeout(() => {
        el.style.opacity = "0";
      }, 500);
      
      const timer2 = setTimeout(() => {
        onComplete();
      }, 2000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    const W = window.innerWidth;
    const H = window.innerHeight;
    const MAX_R = Math.sqrt(W * W + H * H) / 2 * 1.15;

    const BURN_DURATION = 1900;
    const FADE_START    = 1750;
    const TOTAL         = 2400;

    const start = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - start;

      if (elapsed >= TOTAL) {
        el.style.opacity = "0";
        onComplete();
        return;
      }

      const burnP  = Math.min(1, elapsed / BURN_DURATION);
      const eased  = 1 - Math.pow(1 - burnP, 2.4);
      const r      = eased * MAX_R;

      const glowP  = burnP < 0.45 ? burnP / 0.45 : 1 - ((burnP - 0.45) / 0.55);
      const g      = Math.max(0, glowP);

      const r0 = Math.max(0, r - 55);
      const r1 = Math.max(0, r - 18);
      const r2 = r + 22;
      const r3 = r + 65;
      const r4 = r + 130;

      el.style.background = `radial-gradient(circle at 50% 50%,
        transparent ${r0}px,
        rgba(255,245,180,${0.95 * g}) ${r1}px,
        rgba(255,90,0,${0.80 * g})   ${r2}px,
        rgba(120,20,0,${0.55 * g})   ${r3}px,
        rgba(4,2,1,1)                ${r4}px
      )`;

      if (elapsed >= FADE_START) {
        const fp = (elapsed - FADE_START) / (TOTAL - FADE_START);
        el.style.opacity = String(Math.max(0, 1 - fp));
      }

      rafId = requestAnimationFrame(animate);
    };

    el.style.background = "rgb(4,2,1)";
    el.style.opacity    = "1";
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete, isMobile]);

  return (
    <div
      ref={divRef}
      className="absolute inset-0 z-[50] pointer-events-none"
      style={{ background: "rgb(4,2,1)", opacity: 1 }}
    />
  );
};

// ── MAGNETIC BUTTON ────────────────
const MagneticButton = ({ children, to, href, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: any) => {
    if (!ref.current || isMobile) return; 
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

// ── EMBER SPOTLIGHT CARD COMPONENT ────────────────
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();

  const spotlightBackground = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 90, 0, 0.20), transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return; 
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{ background: spotlightBackground }}
        />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

// ── 3D PARALLAX GLASS TILT CARD COMPONENT ────────────────
const TiltCard = ({ exp }: { exp: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isMobile = useIsMobile();
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; 
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative h-80 md:h-96">
      <motion.div
        style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 group cursor-pointer overflow-visible rounded-xl shadow-2xl border border-primary/10 hover:border-primary/40 transition-colors duration-500"
      >
        <div className="absolute inset-0 rounded-xl bg-[#0a0402] overflow-hidden z-10">
          <img src={exp.img} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0402] via-[#0a0402]/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none" style={{ transform: isMobile ? "none" : "translateZ(60px)" }}>
          <h3 className="font-serif text-2xl text-primary mb-2 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">{exp.title}</h3>
          <p className="text-foreground/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">{exp.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

// ── GLOWING KINETIC MARQUEE ────────────────
const GlowingMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-[#0a0402]/80 border-y border-primary/20 flex group z-20 shadow-[0_0_30px_rgba(255,90,0,0.1)] backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0402] via-transparent to-[#0a0402] z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-3xl md:text-5xl font-serif text-transparent font-bold tracking-[0.15em] mx-6 transition-all duration-500 group-hover:text-primary cursor-default" style={{ WebkitTextStroke: "1px rgba(255,90,0,0.4)" }}>
            ✦ PREMIUM LOUNGE ✦ WOODFIRED PIZZAS ✦ SIGNATURE SHAKES ✦ PURE VEG 
          </span>
        ))}
      </div>
      <style>{`.animate-marquee { animation: marquee 25s linear infinite; } .group:hover .animate-marquee { animation-play-state: paused; }`}</style>
    </div>
  );
};

const stats = [
  { icon: Calendar, label: "Est.", end: 2017, prefix: "", isYear: true },
  { icon: Armchair, label: "Seats", end: 60, prefix: "", suffix: "+" },
  { icon: Star, label: "Rated", end: 3.8, prefix: "", suffix: "★", isDecimal: true },
  { icon: Utensils, label: "Pure Veg Menu", end: 0, prefix: "", isText: true },
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
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, isText]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (isText) return <span ref={ref} className="relative font-serif text-3xl md:text-4xl text-primary">✓</span>;
  return (
    <span ref={ref} className="relative font-serif text-3xl md:text-4xl text-primary">
      {isYear ? Math.floor(count) : isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix || ""}
    </span>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted]     = useState(false);
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

  return <span ref={ref} className="relative inline-block">{displayed}<span className="border-r-2 border-primary ml-1 animate-pulse" /></span>;
};

const PremiumHeading = ({ title }: { title: string }) => {
  const letters = Array.from(title);
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } } };
  const child = { hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } };
  return (
    <div className="relative text-center mb-16">
      <motion.h2
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative font-serif text-3xl md:text-5xl tracking-wider flex justify-center flex-wrap"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className={`${letter === " " ? "w-3" : ""} inline-block`}>
            <span
              className="bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(200,30,0,0.6)]"
              style={{
                backgroundImage: "linear-gradient(110deg, #8a1c00 0%, #ff4500 25%, #cc2900 50%, #ff4500 75%, #8a1c00 100%)",
                backgroundSize: "200% auto",
                animation: "emberFlow 4s linear infinite",
              }}
            >
              {letter}
            </span>
          </motion.span>
        ))}
      </motion.h2>
      <style>{`@keyframes emberFlow { to { background-position: 200% center; } }`}</style>
    </div>
  );
};

const experiences = [
  { title: "Cozy Lounge Ambiance", desc: "Settle into our 2nd floor lounge on Hudson Lane — the perfect escape from the busy street below.", img: img2 },
  { title: "Party & Group Events", desc: "Celebrate birthdays and special occasions with personalized setups and a dedicated reservations team.", img: img3 },
  { title: "Signature Shakes & Drinks", desc: "From Cold Coffee to Kitkat Shakes — every sip on our menu is crafted to light up your day.", img: img4 },
];

const reviews = [
  { author: "Priya Mehta", text: "The ambiance on the 2nd floor is super cozy and the staff is incredibly warm. Had the Cold Coffee and Oreo Shake — both were amazing. Easily my go-to spot on Hudson Lane!", rating: 5, date: "2 weeks ago" },
  { author: "Aman Verma", text: "Ordered the Farmfresh Pizza and Cheese Fries — absolute value for money. The place has a great vibe and the service is quick and friendly. Will definitely come back!", rating: 5, date: "1 month ago" },
  { author: "Sneha Kapoor", text: "Perfect hangout spot near GTB Nagar! The Kitkat Shake is honestly addictive and the Cheese Chilly is a must-try. The lounge setting makes it great for groups too.", rating: 5, date: "3 weeks ago" },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  
  const desktopHeroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroY = isMobile ? 0 : desktopHeroY;

  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const bgX   = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY   = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["20px", "-20px"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["20px", "-20px"]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; 
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth - 0.5);
    mouseY.set(clientY / window.innerHeight - 0.5);
  };

  return (
    <main className="relative magma-bg text-foreground overflow-hidden">
      
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

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen overflow-hidden flex items-center justify-center perspective-1000"
      >
        <AnimatePresence>
          {!isIntroComplete && (
            <HeroVignetteBurn onComplete={() => setIsIntroComplete(true)} />
          )}
        </AnimatePresence>

        <motion.div className="absolute inset-[-5%] z-0" style={{ y: heroY, x: isMobile ? 0 : bgX }}>
          <img src={heroImg} alt="The Litup Cafe interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0402]/90 via-[#0a0402]/40 to-[#0a0402] opacity-95" />
        </motion.div>

        <div className="text-center px-4 relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-auto">
          <motion.div style={{ x: isMobile ? 0 : textX, y: isMobile ? 0 : textY }}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-serif text-6xl sm:text-7xl md:text-9xl font-bold text-shimmer tracking-wider drop-shadow-[0_0_15px_rgba(255,90,0,0.5)]"
            >
              LITUP
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-foreground/90 text-lg md:text-xl tracking-[0.25em] uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              <TypewriterText text="Good Vibes. Great Food. Lit Up." />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton to="/menu" className="btn-gold px-8 py-3 rounded text-sm tracking-widest uppercase font-semibold">
                Explore Menu
              </MagneticButton>
              <MagneticButton href="tel:+917982488464" className="px-8 py-3 rounded border border-primary/60 text-primary text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-black transition-colors bg-[#0a0402]/60 backdrop-blur-sm shadow-[0_0_15px_rgba(255,90,0,0.3)]">
                <Phone className="w-4 h-4" />Call to Reserve
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/80 z-20 drop-shadow-[0_0_10px_rgba(255,90,0,0.8)]">
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      <GlowingMarquee />

      {/* --- WHY LITUP CAFE --- */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Why Litup Cafe?" /></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <SpotlightCard className="bg-[#0a0402]/60 backdrop-blur-md border border-primary/20 rounded-xl p-6 text-center h-full hover:border-primary/50 transition-colors duration-500 shadow-lg">
                  <div className="relative z-10 flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,90,0,0.8)] transition-all duration-500" />
                    <div className="group-hover:drop-shadow-[0_0_12px_rgba(255,90,0,0.6)] transition-all duration-500">
                      <Counter {...stat} />
                    </div>
                    <p className="text-muted-foreground text-xs tracking-widest uppercase mt-3 group-hover:text-primary/90 transition-colors duration-500">{stat.label}</p>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SIGNATURE EXPERIENCES --- */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Signature Experiences" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <TiltCard exp={exp} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- GUESTS SAY --- */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="What Our Guests Say" /></SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <SpotlightCard className="bg-[#0a0402]/60 backdrop-blur-md border border-primary/20 rounded-xl p-8 relative transition-all duration-500 h-full flex flex-col hover:border-primary/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-2">
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent transition-all duration-700 ease-out group-hover:h-2/3 pointer-events-none z-0" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-5 h-5 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }} />
                      ))}
                    </div>
                    <p className="text-foreground/90 text-sm md:text-base leading-relaxed italic mb-8 flex-grow group-hover:text-white transition-colors duration-300">"{review.text}"</p>
                    <div className="flex items-center justify-between border-t border-primary/20 pt-6 mt-auto relative">
                      <div className="absolute top-[-1px] left-0 w-0 h-[1px] bg-primary transition-all duration-700 group-hover:w-full shadow-[0_0_10px_rgba(255,90,0,1)]" />
                      <span className="font-serif text-primary text-lg tracking-wide">{review.author}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">{review.date}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIND US --- */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionReveal><PremiumHeading title="Find Us" /></SectionReveal>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <SectionReveal delay={0.1} className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="w-full max-w-sm aspect-square rounded-xl overflow-hidden border border-primary/30 hover:border-primary/60 transition-colors duration-500 shadow-[0_0_30px_rgba(255,90,0,0.15)]">
                <iframe
                  src="https://maps.google.com/maps?q=The+Litup+Cafe,+Plot+No.+2516,+2nd+Floor,+Hudson+Lane,+GTB+Nagar,+Delhi+110009&output=embed"
                  className="w-full h-full"
                  style={{ border: 0, filter: "grayscale(0.8) contrast(1.2)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Litup Cafe Location"
                />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2} className="w-full md:w-1/2 flex flex-col gap-8 justify-center items-center md:items-start text-foreground/90">
              <a href="https://maps.app.goo.gl/njeAnprbvRjrBVoz9" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-primary transition-colors duration-300 group text-left">
                <MapPin className="w-6 h-6 text-primary mt-1 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,90,0,0.8)] transition-transform duration-300 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-primary mb-2">Location</h3>
                  <p className="max-w-xs leading-relaxed group-hover:text-white transition-colors">
                    The Litup Cafe & Lounge<br />
                    F-21, 2nd Floor, Opp. NDPL Office,<br />
                    Hudson Lane, GTB Nagar, Delhi – 110009
                  </p>
                </div>
              </a>
              <a href="tel:+917982488464" className="flex items-center gap-4 hover:text-primary transition-colors duration-300 group">
                <Phone className="w-6 h-6 text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,90,0,0.8)] transition-transform duration-300 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Reservations</h3>
                  <p className="tracking-widest group-hover:text-white transition-colors">+91 79824 88464</p>
                </div>
              </a>
              <a href="https://www.instagram.com/the_lit_up_cafe/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-primary transition-colors duration-300 group">
                <Instagram className="w-6 h-6 text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,90,0,0.8)] transition-transform duration-300 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-primary mb-1">Follow Us</h3>
                  <p className="tracking-widest group-hover:text-white transition-colors">@the_lit_up_cafe</p>
                </div>
              </a>
            </SectionReveal>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Index;