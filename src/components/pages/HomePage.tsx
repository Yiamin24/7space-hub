import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, Phone, ArrowRight, MapPin, Maximize2, IndianRupee, Building2, Check, ChevronUp, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import HeroSection from '@/components/sections/HeroSection';
import MaskedHeroSection from '@/components/sections/MaskedHeroSection';
import PropertiesSection from '@/components/sections/PropertiesSection';
import LocationsSection from '@/components/sections/LocationsSection';
import PropertyTypesSection from '@/components/sections/PropertyTypesSection';
import BudgetAreaSection from '@/components/sections/BudgetAreaSection';
import ContactSection from '@/components/sections/ContactSection';
import FeaturedPrioritySection from '@/components/sections/FeaturedPrioritySection';
 
export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [location, setLocation] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [budget, setBudget] = useState('');
  
  // Modern Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => {
      setShowFloatingActions(window.scrollY > 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210', '_blank');
  };

  const handleGetOptions = () => {
    const message = `Hi, I'm looking for a commercial office space in Pune.\n\nLocation: ${location || 'Any'}\nCarpet Area: ${carpetArea || 'Any'}\nBudget: ${budget || 'Any'}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = [
    { value: '300-600', label: '300-600 sq.ft' },
    { value: '600-1000', label: '600-1000 sq.ft' },
    { value: '1000-1800', label: '1000-1800 sq.ft' },
    { value: '1800+', label: 'Above 1800 sq.ft' },
  ];
  const budgets = ['₹40k - ₹75k', '₹75k - ₹1.2L', '₹1.2L - ₹2L', '₹2L - ₹3L', '₹3L+'];

  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground selection:bg-primary/20">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="relative w-full overflow-hidden">
        <MaskedHeroSection />
        <HeroSection isMobile={isMobile} />

        {/* FEATURED SECTION - Clean Grid */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 lg:py-32 bg-white border-t border-gray-100"
        >
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 lg:mb-24"
            >
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-primary/70">Why Choose Us</span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
                Premium Real Estate Solutions
              </h2>
              <p className="font-paragraph text-lg text-gray-600 max-w-2xl mx-auto">
                Curated spaces designed for ambitious businesses seeking excellence and growth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Building2, title: 'Verified Listings', desc: 'All properties thoroughly vetted and verified' },
                { icon: MapPin, title: 'Prime Locations', desc: 'Strategically located across Pune\'s business hubs' },
                { icon: Maximize2, title: 'Flexible Spaces', desc: 'From 300 to 3000+ sq.ft options available' },
                { icon: Check, title: 'Expert Support', desc: '24/7 dedicated assistance for your needs' },
                { icon: IndianRupee, title: 'Transparent Pricing', desc: 'No hidden charges, clear cost breakdown' },
                { icon: MessageCircle, title: 'Quick Response', desc: 'Instant replies to your inquiries' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-blue-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="font-paragraph text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <FeaturedPrioritySection />
        <PropertiesSection />
        <LocationsSection />
        <PropertyTypesSection />
        <BudgetAreaSection />
        <ContactSection />

        {/* FOOTER LEGAL */}
        <div className="w-full bg-white py-12 lg:py-16 px-4 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Commercial Terms</p>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Brokerage is applicable from both owner and tenant. In case of a 3-year lock-in, brokerage from the owner is equivalent to 2 months' rent. All transactions are subject to local regulations.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* MOBILE FLOATING NAV */}
      <AnimatePresence>
        {isMobile && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex gap-3 p-2 bg-white/90 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-2xl"
          >
            <a href="tel:+919876543210" className="flex-1 bg-foreground text-white h-12 rounded-xl flex items-center justify-center font-bold gap-2 text-sm active:scale-95 transition-transform">
              <Phone className="w-4 h-4" /> Call
            </a>
            <button onClick={handleWhatsAppClick} className="flex-1 bg-[#25D366] text-white h-12 rounded-xl flex items-center justify-center font-bold gap-2 text-sm active:scale-95 transition-transform">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP FLOATING ACTIONS */}
      <AnimatePresence>
        {showFloatingActions && !isMobile && (
          <motion.div 
            className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 text-foreground shadow-lg hover:bg-foreground hover:text-white transition-all"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-8 w-8" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
