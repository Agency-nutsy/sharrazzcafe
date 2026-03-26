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
      {/* FIXED: Smoothly fades into transparent so there is NO harsh dividing line */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0402] via-[#0a0402]/40 to-transparent" />
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute bottom-0 rounded-full bg-[#ff5a00]"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            boxShadow: "0 0 10px rgba(255,90,0,0.8)",
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.8, 0],
            x: [0, Math.random() * 40 - 20],
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
    /* FIXED: Removed 'bg-background' from here so it doesn't block the animated magma */
    <footer className="relative w-full pt-20 pb-10 mt-12 overflow-hidden">

      {/* Background Embers */}
      <FooterEmbers />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Section */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-block group">
            <h3 className="font-serif text-5xl text-primary font-bold tracking-[0.1em] group-hover:drop-shadow-[0_0_20px_rgba(255,90,0,0.6)] transition-all duration-500">
              LITUP
            </h3>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 opacity-70">
            <span className="w-12 h-[1px] bg-primary" />
            <p className="text-primary text-xs tracking-[0.4em] uppercase">Good Vibes. Great Food. Lit Up.</p>
            <span className="w-12 h-[1px] bg-primary" />
          </div>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left bg-white/5 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl mb-12">

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest">Explore</h4>
            <div className="flex flex-col gap-4">
              {/* ADDED "Gallery" right after "Menu" */}
              {["Home", "About", "Menu", "Gallery", "Contact"].map((name) => (
                <Link
                  key={name}
                  to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
                  className="text-muted-foreground text-sm uppercase tracking-[0.2em] hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,90,0,0.8)] transition-all duration-300 flex items-center gap-2 group"
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
                href="https://maps.app.goo.gl/njeAnprbvRjrBVoz9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 justify-center md:justify-start hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,90,0,0.8)] transition-all duration-300"
              >
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="leading-relaxed max-w-[200px] text-left uppercase tracking-widest text-[10px]">
                  F-21, 2nd Floor, Opp. NDPL Office,<br />
                  Hudson Lane, GTB Nagar,<br />
                  New Delhi – 110009
                </span>
              </a>
              <div className="flex items-center gap-3 justify-center md:justify-start group">
                <Phone className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+917982488464" className="hover:text-primary tracking-widest transition-colors">
                  +91 79824 88464
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start group">
                <Phone className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+918506827807" className="hover:text-primary tracking-widest transition-colors">
                  +91 85068 27807
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl text-white mb-6 tracking-widest">Connect</h4>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-6">
              Follow us for daily vibes & updates.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://instagram.com/the_lit_up_cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,90,0,0.6)] group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com/litupdelhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,90,0,0.6)] group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-6 border-t border-white/5">
          <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} The Litup Cafe & Lounge. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;