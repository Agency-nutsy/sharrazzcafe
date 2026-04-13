import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Wine, UtensilsCrossed, Coffee as CoffeeIcon } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// ── MASSIVE SHARRAZZ MENU DATA ────────────────
const menuData = [
  {
    tab: "Bites & Snacks",
    categories: [
      {
        name: "Puff",
        items: [
          { name: "Veg. Puff", price: "₹25.00" },
          { name: "Egg Puff", price: "₹30.00" },
          { name: "Garlic Chicken Puff", price: "₹40.00" },
          { name: "Mushroom Puff", price: "₹48.00" },
          { name: "Chilli Paneer Puff", price: "₹55.00" },
          { name: "Chilli Chicken Puff", price: "₹60.00" },
        ],
      },
      {
        name: "Bread Roll",
        items: [
          { name: "Soya Manchurian", price: "₹30.00" },
          { name: "Corn Bread Roll", price: "₹40.00" },
          { name: "Paneer Bread Roll", price: "₹45.00" },
          { name: "Chicken Bread Roll", price: "₹48.00" },
          { name: "Chicken 65 Bread Roll", price: "₹48.00" },
        ],
      },
      {
        name: "Burger",
        items: [
          { name: "Veg Burger", price: "₹65.00" },
          { name: "Chicken Burger", price: "₹80.00" },
          { name: "Chicken Spl. Burger", price: "₹125.00" },
        ],
      },
      {
        name: "Snacks",
        items: [
          { name: "French Fries", price: "₹50.00", description: "150g" },
          { name: "Chicken Nuggets", price: "₹60.00", description: "(4pcs) 160g" },
          { name: "Veg Spring Roll", price: "₹60.00", description: "(6 pcs) 160g" },
          { name: "Chicken Spring Roll", price: "₹60.00", description: "(6 pcs) 160g" },
        ],
      },
      {
        name: "Sandwiches",
        items: [
          { name: "Chicken Sandwich", price: "₹80.00" },
          { name: "Paneer Sandwich", price: "₹80.00" },
          { name: "Brown Bread Sandwich", price: "₹95.00" },
          { name: "Spl. Chicken Sandwich", price: "₹110.00" },
          { name: "Spl. Paneer Sandwich", price: "₹110.00" },
        ],
      },
    ],
  },
  {
    tab: "Starters & Rolls",
    categories: [
      {
        name: "Starter - Veg",
        items: [
          { name: "Paneer Malai Tikka", price: "₹150.00", description: "200g" },
        ],
      },
      {
        name: "Starter - Non Veg",
        items: [
          { name: "Chicken Lollipop", price: "₹150.00", description: "180g" },
        ],
      },
      {
        name: "Veg Roll",
        items: [
          { name: "Soya Tikka Roll", price: "₹249.00" },
          { name: "Chaap Roll", price: "₹229.00" },
          { name: "Panner Tikka Roll", price: "₹249.00" },
        ],
      },
      {
        name: "Non Veg Roll",
        items: [
          { name: "Chicken Tikka", price: "₹269.00" },
          { name: "Butter Chicken", price: "₹269.00" },
          { name: "Seekh Roll", price: "₹249.00" },
        ],
      },
      {
        name: "Momos",
        items: [
          { name: "Veg Momos", price: "₹229.00" },
          { name: "Paneer Momos", price: "₹299.00" },
          { name: "Chilli Momos", price: "₹329.00" },
          { name: "Tandoori Momos", price: "₹329.00" },
          { name: "Malai Momos", price: "₹339.00" },
          { name: "Achari Momos", price: "₹339.00" },
          { name: "Kurkure Momos", price: "₹329.00" },
        ],
      },
    ],
  },
  {
    tab: "Mains & Healthy",
    categories: [
      {
        name: "Italian Cuisine",
        items: [
          { name: "Roasted Veg Pasta", price: "₹70.00", description: "250 gm" },
          { name: "Pasta With Creamy Mushroom", price: "₹80.00", description: "250g" },
          { name: "Pasta With Chicken", price: "₹80.00", description: "250gm" },
        ],
      },
      {
        name: "Healthy",
        items: [
          { name: "Cottage Cheese Steak With Rice", price: "₹249.00" },
          { name: "Grilled Chicken Steak With Sauté Veggie-Demi Glaze", price: "₹329.00" },
          { name: "Peri Peri Mushroom Grilled Chicken With Rice And Vegetables", price: "₹449.00" },
        ],
      },
      {
        name: "Veg Mains",
        items: [
          { name: "Moughlai Paneer", price: "₹100.00", description: "150 gm" },
          { name: "Kadai Mushroom", price: "₹120.00", description: "150 gm" },
        ],
      },
      {
        name: "Non Veg Mains",
        items: [
          { name: "Chicken Butter Masala", price: "₹170.00", description: "200 gm" },
          { name: "Mutton Kassa", price: "₹150.00", description: "200 gm" },
        ],
      },
    ],
  },
  {
    tab: "Indian Staples",
    categories: [
      {
        name: "Biryani",
        items: [
          { name: "Veg Biryani", price: "₹100.00", description: "500g" },
          { name: "Chicken Biryani", price: "₹150.00", description: "500g" },
          { name: "Mutton Biryani", price: "₹210.00", description: "500g" },
        ],
      },
      {
        name: "Paratha, Rice, Dal",
        items: [
          { name: "Paratha", price: "₹40.00", description: "2 pcs" },
          { name: "Plain Rice", price: "₹30.00", description: "200 gm" },
          { name: "Ghee Rice", price: "₹40.00", description: "200 gm" },
          { name: "Dal Makhani", price: "₹60.00", description: "200 gm" },
        ],
      },
      {
        name: "Breads",
        items: [
          { name: "Tandoori Roti", price: "₹30.00" },
          { name: "Tandoori Butter Roti", price: "₹40.00" },
          { name: "Lacha Parantha", price: "₹50.00" },
          { name: "Pudina Parantha", price: "₹55.00" },
          { name: "Mirchi Parantha", price: "₹60.00" },
          { name: "Cream Parantha", price: "₹65.00" },
          { name: "Plain Naan", price: "₹60.00" },
          { name: "Butter Naan", price: "₹70.00" },
          { name: "Garlic Naan", price: "₹75.00" },
          { name: "Papad", price: "₹15.00" },
          { name: "Masala Papad", price: "₹25.00" },
          { name: "Stuffed Naan", price: "₹85.00" },
        ],
      },
      {
        name: "Raita",
        items: [
          { name: "Plain Raita", price: "₹60.00" },
          { name: "Boondi Raita", price: "₹80.00" },
          { name: "Mix Raita", price: "₹80.00" },
          { name: "Pineapple Raita", price: "₹90.00" },
        ],
      },
    ],
  },
  {
    tab: "Bakery & Desserts",
    categories: [
      {
        name: "Pastry",
        items: [
          { name: "Choco Truffle Tart", price: "₹25.00" },
          { name: "Black Forest Pastry", price: "₹35.00" },
          { name: "Rainbow Pastry", price: "₹35.00" },
          { name: "White Forest Pastry", price: "₹35.00" },
          { name: "Marble Pastry", price: "₹35.00" },
          { name: "Opera Pastry", price: "₹35.00" },
          { name: "Mango Mania Pastry", price: "₹35.00" },
          { name: "Choco Truffle Pastry", price: "₹40.00" },
          { name: "Coffee Choco Pastry", price: "₹40.00" },
          { name: "Red Velvet Pastry", price: "₹50.00" },
        ],
      },
      {
        name: "Cakes",
        items: [
          { name: "Regular Cake", price: "₹250.00", description: "1kg/500gm/300gm" },
          { name: "Red Velvet Cake", price: "₹625.00", description: "1kg/500gm" },
          { name: "Pinata Cake", price: "₹600.00", description: "1 kg/600gm" },
          { name: "Cake Choco Truffle", price: "₹500.00", description: "1 kg/500gm" },
          { name: "Cake Choco Coffee", price: "₹500.00", description: "1 kg/500gm" },
          { name: "Cake Rainbow", price: "₹500.00", description: "1 kg/500 gm" },
          { name: "Rose Cake", price: "₹250.00", description: "300 gm" },
          { name: "Sun Flower Cake", price: "₹250.00", description: "300gm" },
          { name: "Heart Shape Cake", price: "₹250.00", description: "Strawberry/choco, 300gm" },
        ],
      },
      {
        name: "Dry Cake & Swiss Roll",
        items: [
          { name: "Marble Cake", price: "₹125.00", description: "300gm" },
          { name: "Coffee Walnut Dry Cake", price: "₹150.00", description: "300gm" },
          { name: "Strawberry Swiss Roll", price: "₹30.00" },
          { name: "Coffee Choco Swiss Roll", price: "₹30.00" },
        ],
      },
      {
        name: "Brownie & Mousse",
        items: [
          { name: "Almond Brownie", price: "₹48.00" },
          { name: "Brownie With Ice Cream", price: "₹80.00" },
          { name: "Cappucino Mousse", price: "₹48.00" },
          { name: "Orange Mousse", price: "₹48.00" },
          { name: "Red Velvet Mousse", price: "₹48.00" },
          { name: "Pineapple Mousse", price: "₹48.00" },
        ],
      },
      {
        name: "Traditional Desserts",
        items: [
          { name: "Podapitha", price: "₹60.00", description: "200g" },
          { name: "Kheer (Rasmalai)", price: "₹50.00", description: "200g" },
        ],
      },
    ],
  },
  {
    tab: "Beverages",
    categories: [
      {
        name: "Mocktails",
        items: [
          { name: "Fresh Lime Soda", price: "₹149.00" },
          { name: "Virgin Mojito", price: "₹199.00" },
          { name: "Green Apple Mojito", price: "₹199.00" },
          { name: "Peach Mojito", price: "₹199.00" },
          { name: "Cranberry Mojito", price: "₹199.00" },
          { name: "Watermelon Mojito Mocktail", price: "₹199.00" },
          { name: "Sharrazz Mojito", price: "₹209.00" },
          { name: "Ice Cream Soda", price: "₹199.00" },
          { name: "Green Apple Ice Cream Soda", price: "₹199.00" },
          { name: "Kiwi Ice Cream Soda", price: "₹199.00" },
          { name: "Water Malon Ice Cream Soda", price: "₹199.00" },
          { name: "Blue Lagoon", price: "₹199.00" },
          { name: "Kuch Bhi", price: "₹219.00" },
          { name: "Cola Mojito", price: "₹199.00" },
        ],
      },
      {
        name: "Shakes",
        items: [
          { name: "Chocolate Brownie Shake", price: "₹259.00" },
          { name: "Oreo Shake", price: "₹239.00" },
          { name: "Kitkat Shake", price: "₹239.00" },
          { name: "Blueberry Shake", price: "₹239.00" },
          { name: "Butter Scotch Shake", price: "₹239.00" },
          { name: "Oero Chocolate Shake (Vanila)", price: "₹239.00" },
          { name: "Oero Chocolate Shake (Strawberry)", price: "₹239.00" },
          { name: "Black Curant Shake", price: "₹239.00" },
          { name: "Nutrella Brownie Shake", price: "₹299.00" },
          { name: "Fruit Punch", price: "₹249.00" },
        ],
      },
      {
        name: "Coffee & Tea",
        items: [
          { name: "Cold Coffee", price: "₹199.00" },
          { name: "Mocha", price: "₹199.00" },
          { name: "Black Hot Coffee", price: "₹150.00" },
          { name: "Cappuccino", price: "₹149.00" },
          { name: "Irish Coffee", price: "₹179.00" },
          { name: "Hazel Nut Cappuccino", price: "₹199.00" },
          { name: "Tea", price: "₹59.00" },
        ],
      },
      {
        name: "Smoothies & Juices",
        items: [
          { name: "Mango Smoothie", price: "₹189.00" },
          { name: "Strawberry Smoothie", price: "₹189.00" },
          { name: "Banana Smoothie", price: "₹189.00" },
          { name: "Kiwi Smoothie", price: "₹189.00" },
          { name: "Orange Juice", price: "₹169.00" },
          { name: "Mix Juice", price: "₹169.00" },
          { name: "Cranberry Juice", price: "₹169.00" },
          { name: "Pineapple Juice", price: "₹169.00" },
          { name: "Mango Juice", price: "₹169.00" },
        ],
      },
      {
        name: "Pitchers",
        items: [
          { name: "Coke / Sprite / Fanta", price: "₹399.00" },
          { name: "Virgin Mojito Pitcher", price: "₹499.00" },
          { name: "Water Melon Mojito Pitcher", price: "₹499.00" },
          { name: "Green Apple Mojito Pitcher", price: "₹499.00" },
          { name: "Ice Tea Pitcher", price: "₹499.00" },
        ],
      },
      {
        name: "Aerated Drinks",
        items: [
          { name: "Coke / Sprite / Fanta", price: "₹119.00" },
          { name: "Redbull", price: "₹249.00" },
          { name: "Soda Flavor", price: "₹99.00" },
          { name: "Mineral Water", price: "₹49.00" },
          { name: "Ice Tea", price: "₹159.00" },
        ],
      },
    ],
  },
];

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

// --- THE ROSE SHATTER TRANSITION PARTICLES ---
const ShatterParticles = ({ isMobile }: { isMobile: boolean }) => {
  const particles = useMemo(() => {
    const count = isMobile ? 15 : 40; 
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * (isMobile ? 250 : 400),
      y: (Math.random() - 0.5) * (isMobile ? 250 : 400),
      size: Math.random() * 3 + 1,
      duration: 0.4 + Math.random() * 0.4,
    }));
  }, [isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          // Glowing hot rose pink
          className="absolute rounded-full bg-[#ff2d85] shadow-[0_0_10px_rgba(255,45,133,0.8)]"
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
  
  const isMobile = useIsMobile();
  const menuHeaderRef = useRef<HTMLElement>(null);

  // Handle the shatter transition timing
  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setActiveTab(newTab);
    
    if (menuHeaderRef.current) {
      const yOffset = isMobile ? 80 : 120; 
      const y = menuHeaderRef.current.getBoundingClientRect().top + window.scrollY - yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    
    setTimeout(() => setIsTransitioning(false), 600); 
  };

  return (
    <main className="pt-32 pb-24 relative aura-bg text-foreground min-h-screen">
      
      {/* SHARRAZZ AURA ANIMATION CSS & MOBILE SCROLLBAR HIDER */}
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
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Isolated Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <section ref={menuHeaderRef} className="px-4 text-center mb-8 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-primary tracking-[0.15em] mb-4 drop-shadow-[0_0_15px_rgba(255,45,133,0.5)]">SHARRAZZ MENU</h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">Rooftop Flavors. Late Night Cravings.</p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_10px_rgba(255,45,133,0.8)]" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* --- FIXED STICKY CRYSTAL CAPSULE TABS --- */}
      <section className="sticky top-20 z-[90] px-4 py-4 mb-12 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-center pointer-events-auto">
          
          <div className="flex flex-nowrap md:flex-wrap overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-2 p-2 bg-[#0f050a]/80 backdrop-blur-xl md:rounded-full rounded-2xl border border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] w-full max-w-full">
            {menuData.map((section) => {
              const isActive = activeTab === section.tab;
              return (
                <button
                  key={section.tab}
                  onClick={() => handleTabChange(section.tab)}
                  className={`relative shrink-0 snap-start px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 overflow-hidden ${
                    isActive ? "text-[#0f050a]" : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {/* The Rose Fill for Active Tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(255,45,133,0.6)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {section.tab.toLowerCase().includes("beverage") ? (
                      <Wine size={14} className={isActive ? "text-[#0f050a]" : "text-primary"} />
                    ) : section.tab.toLowerCase().includes("bakery") ? (
                      <CoffeeIcon size={14} className={isActive ? "text-[#0f050a]" : "text-primary"} />
                    ) : (
                      <UtensilsCrossed size={14} className={isActive ? "text-[#0f050a]" : "text-primary"} />
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
          {isTransitioning && <ShatterParticles isMobile={isMobile} />}

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
                    <h3 className="font-serif text-3xl md:text-4xl text-primary tracking-widest text-center drop-shadow-[0_0_8px_rgba(255,45,133,0.4)]">
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
                        transition={{ delay: ii * 0.02, duration: 0.4 }}
                        // Added dark aesthetic glass background and rose border glow
                        className="group relative flex flex-col justify-between p-4 -mx-4 rounded-xl border border-transparent hover:border-primary/20 hover:bg-[#0f050a]/60 hover:backdrop-blur-sm transition-all duration-500 cursor-default hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                      >
                        {/* The Active Marker (Left Vertical Bar) */}
                        <div className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center shadow-[0_0_10px_rgba(255,45,133,0.8)]" />

                        <div className="flex items-baseline justify-between gap-4 mb-2 transform transition-all duration-500 group-hover:translate-x-3">
                          <h4 className="font-serif text-xl text-white group-hover:text-primary transition-colors duration-300">
                            {item.name}
                          </h4>
                          
                          {/* The Dotted Line & Strike */}
                          <div className="flex-grow border-b border-dotted border-white/20 relative top-[-6px]">
                            {/* The solid rose line that shoots across */}
                            <div className="absolute top-[1px] left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,45,133,0.8)]" />
                          </div>
                          
                          {item.price && (
                            <span className="font-serif text-xl text-primary tracking-wider whitespace-nowrap transform transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,45,133,0.8)]">
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
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(255,45,133,0.5)]" />
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-8">Ready to secure a rooftop table?</p>
              <a
                href="tel:+919899282709"
                className="relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden group border border-primary/30 rounded-sm hover:shadow-[0_0_20px_rgba(255,45,133,0.4)] transition-all duration-500"
              >
                <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-colors duration-500" />
                <Phone className="w-4 h-4 text-primary group-hover:text-[#0f050a] relative z-10 transition-colors duration-500" />
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-primary group-hover:text-[#0f050a] relative z-10 transition-colors duration-500">
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