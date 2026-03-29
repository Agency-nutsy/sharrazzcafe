import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";

const FloatingWidgets = () => {
  return (
    // Wrapper fixed to the bottom right of the screen
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 items-end pointer-events-none">
      
      {/* --- WHATSAPP BUTTON (Icon Only) --- */}
      <motion.a
        href="https://wa.me/917982488464" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        // Changed padding to p-3 md:p-4 to make it a perfect circle
        className="pointer-events-auto group relative flex items-center justify-center p-3 md:p-4 bg-[#0a0402]/80 backdrop-blur-md border border-[#25D366]/50 rounded-full text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
      >
        {/* Increased icon size slightly since the text is gone */}
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </motion.a>

      {/* --- GET DIRECTIONS BUTTON (Icon Only) --- */}
      <motion.a
        href="https://maps.app.goo.gl/fpu7nAwNfm6zTAZk9"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Directions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        // Changed padding to p-3 md:p-4 to make it a perfect circle
        className="pointer-events-auto group relative flex items-center justify-center p-3 md:p-4 bg-[#0a0402]/80 backdrop-blur-md border border-primary/50 rounded-full text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,90,0,0.2)] hover:shadow-[0_0_25px_rgba(255,90,0,0.6)]"
      >
        {/* Increased icon size slightly since the text is gone */}
        <MapPin className="w-6 h-6 md:w-7 md:h-7" />
      </motion.a>

    </div>
  );
};

export default FloatingWidgets;