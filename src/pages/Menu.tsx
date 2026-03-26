import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Wine, UtensilsCrossed } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { menuData } from "@/data/menuData";

// --- THE EMBER SHATTER TRANSITION PARTICLES ---
const ShatterParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      size: Math.random() * 3 + 1,
      duration: 0.4 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          // Glowing hot ember orange
          className="absolute rounded-full bg-[#ff5a00] shadow-[0_0_10px_rgba(255,90,0,0.8)]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState(menuData[0].tab);
  const activeSection = menuData.find((s) => s.tab === activeTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle the shatter transition timing
  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setActiveTab(newTab);
    
    // Scrolls the user smoothly up to right below the header so they see the new items instantly
    window.scrollTo({ top: 320, behavior: "smooth" });
    
    setTimeout(() => setIsTransitioning(false), 600); // Matches particle animation
  };

  return (
    /* FIXED: Removed overflow-hidden so the sticky tabs can function perfectly */
    <main className="pt-32 pb-24 relative magma-bg text-foreground min-h-screen">
      
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

      {/* Isolated Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <section className="px-4 text-center mb-8 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-primary tracking-[0.15em] mb-4 drop-shadow-[0_0_15px_rgba(255,90,0,0.5)]">THE MENU</h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">A Curated Culinary Experience</p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_10px_rgba(255,90,0,0.8)]" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* --- FIXED STICKY CRYSTAL CAPSULE TABS --- */}
      {/* Set to top-20 so it docks perfectly under your scrolling navbar without overlapping */}
      <section className="sticky top-20 z-[90] px-4 py-4 mb-12 pointer-events-none">
        <div className="max-w-4xl mx-auto flex justify-center pointer-events-auto">
          {/* Dark magma glassmorphism */}
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-[#0a0402]/80 backdrop-blur-xl rounded-full border border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            {menuData.map((section) => {
              const isActive = activeTab === section.tab;
              return (
                <button
                  key={section.tab}
                  onClick={() => handleTabChange(section.tab)}
                  className={`relative px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 overflow-hidden ${
                    isActive ? "text-[#0a0402]" : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {/* The Ember Fill for Active Tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(255,90,0,0.6)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {section.tab.toLowerCase().includes("drink") || section.tab.toLowerCase().includes("bar") || section.tab.toLowerCase().includes("hookah") ? (
                      <Wine size={14} className={isActive ? "text-[#0a0402]" : "text-primary"} />
                    ) : (
                      <UtensilsCrossed size={14} className={isActive ? "text-[#0a0402]" : "text-primary"} />
                    )}
                    {section.tab}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items (The Golden Ledger) */}
      <section className="px-4 relative z-10 min-h-[800px]">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Render Particles when changing tabs */}
          {isTransitioning && <ShatterParticles />}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {activeSection?.categories.map((cat, ci) => (
                <div key={ci} className="mb-20">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary/50" />
                    <h3 className="font-serif text-3xl md:text-4xl text-primary tracking-widest text-center drop-shadow-[0_0_8px_rgba(255,90,0,0.4)]">
                      {cat.name}
                    </h3>
                    <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary/50" />
                  </div>

                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={ii}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: ii * 0.05, duration: 0.5 }}
                        // Added dark magma glass background and border glow
                        className="group relative flex flex-col justify-between p-4 -mx-4 rounded-xl border border-transparent hover:border-primary/20 hover:bg-[#0a0402]/60 hover:backdrop-blur-sm transition-all duration-500 cursor-default hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                      >
                        {/* The Active Marker (Left Vertical Bar) */}
                        <div className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center shadow-[0_0_10px_rgba(255,90,0,0.8)]" />

                        <div className="flex items-baseline justify-between gap-4 mb-2 transform transition-all duration-500 group-hover:translate-x-3">
                          <h4 className="font-serif text-xl text-white group-hover:text-primary transition-colors duration-300">
                            {item.name}
                          </h4>
                          
                          {/* The Dotted Line & Golden Strike */}
                          <div className="flex-grow border-b border-dotted border-white/20 relative top-[-6px]">
                            {/* The solid ember line that shoots across */}
                            <div className="absolute top-[1px] left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,90,0,0.8)]" />
                          </div>
                          
                          {item.price && (
                            <span className="font-serif text-xl text-primary tracking-wider whitespace-nowrap transform transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,90,0,0.8)]">
                              {item.price}
                            </span>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-foreground/50 text-xs tracking-wide leading-relaxed pr-8 transform transition-all duration-500 group-hover:translate-x-3 group-hover:text-foreground/80">
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action Footer */}
          <SectionReveal>
            <div className="text-center mt-24 pt-16 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(255,90,0,0.5)]" />
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-8">Ready to experience the legacy?</p>
              <a
                href="tel:+917982488464"
                className="relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden group border border-primary/30 rounded-sm hover:shadow-[0_0_20px_rgba(255,90,0,0.4)] transition-all duration-500"
              >
                <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-colors duration-500" />
                <Phone className="w-4 h-4 text-primary group-hover:text-[#0a0402] relative z-10 transition-colors duration-500" />
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-primary group-hover:text-[#0a0402] relative z-10 transition-colors duration-500">
                  Call for Reservations
                </span>
              </a>
            </div>
          </SectionReveal>
          
        </div>
      </section>
    </main>
  );
};

export default Menu;