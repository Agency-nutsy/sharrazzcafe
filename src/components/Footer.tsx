import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// --- THE DRIFTING EMBERS BACKGROUND ---
const FooterEmbers = () => {
  const embers = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-background to-background" />
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute bottom-0 rounded-full bg-[#d4af37]"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            boxShadow: "0 0 10px rgba(212,175,55,0.8)",
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 40 - 20], // Slight horizontal sway
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-primary/20 bg-background pt-20 pb-10 mt-12 overflow-hidden">
      
      {/* Background Embers */}
      <FooterEmbers />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-block group">
            <h3 className="font-serif text-5xl text-primary font-bold tracking-[0.1em] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-500">
              736 A.D.
            </h3>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 opacity-70">
            <span className="w-12 h-[1px] bg-primary" />
            <p className="text-primary text-xs tracking-[0.4em] uppercase">Old Charm. New Age Flair.</p>
            <span className="w-12 h-[1px] bg-primary" />
          </div>
        </div>

        {/* 3 Columns enclosed in a subtle glass container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left bg-white/5 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl mb-12">
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest">Explore</h4>
            <div className="flex flex-col gap-4">
              {["Home", "About", "Menu", "Gallery", "Contact"].map((name) => (
                <Link
                  key={name}
                  to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
                  className="text-muted-foreground text-sm uppercase tracking-[0.2em] hover:text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest">Find Us</h4>
            <div className="flex flex-col gap-5 text-sm text-muted-foreground">
              <a 
                href="https://www.google.com/maps/place/736+A.D.+Culinary+Bar/@28.6942977,77.2035745,17z/data=!4m6!3m5!1s0x390cfd3b9353747f:0x3c9180eadc67e204!8m2!3d28.6945251!4d77.2039635!16s%2Fg%2F11j27jsgzg?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 justify-center md:justify-start hover:text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-300"
              >
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="leading-relaxed max-w-[200px] text-left uppercase tracking-widest text-[10px]">
                  G-15/B, Vijay Nagar,<br/>Hudson Lane, New Delhi
                </span>
              </a>
              <div className="flex items-center gap-3 justify-center md:justify-start group">
                <Phone className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+918010000249" className="hover:text-primary tracking-widest transition-colors">+91 8010000249</a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start group">
                <Phone className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+918010000248" className="hover:text-primary tracking-widest transition-colors">+91 8010000248</a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest">Connect</h4>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-6">Join the legacy online.</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://instagram.com/736adcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com/736ad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-6 border-t border-white/5">
          <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} 736 A.D. Culinary Bar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;