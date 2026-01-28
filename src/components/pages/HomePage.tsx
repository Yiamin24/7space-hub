import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, Phone, ArrowRight, MapPin, Maximize2, IndianRupee, Building2, Check, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import MaskedHeroSection from '@/components/sections/MaskedHeroSection';
import HeroSection from '@/components/sections/HeroSection';
import PropertiesSection from '@/components/sections/PropertiesSection';
import LocationsSection from '@/components/sections/LocationsSection';
import PropertyTypesSection from '@/components/sections/PropertyTypesSection';
import BudgetAreaSection from '@/components/sections/BudgetAreaSection';
import ContactSection from '@/components/sections/ContactSection';
import FeaturedPrioritySection from '@/components/sections/FeaturedPrioritySection';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  
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
      // Show floating actions after scrolling 400px
      setShowFloatingActions(window.scrollY > 400);
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

  return (
    <div className="min-h-screen bg-[#FBFCFE] font-paragraph text-slate-900 selection:bg-primary/20">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="relative w-full overflow-hidden">
        {/* Subtle Background Glows for Modernity */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          {/* MASKED HERO SECTION - Full screen with text mask effect */}
          <MaskedHeroSection />

          {/* HERO SECTION */}
          <HeroSection isMobile={isMobile} />

          {/* Portfolio Overview Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-16 lg:py-24 bg-white"
          >
            <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 lg:p-12 border border-gray-200">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                  Portfolio Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">100+</div>
                    <p className="font-paragraph text-gray-600">Commercial Properties Available for Leasing</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">7</div>
                    <p className="font-paragraph text-gray-600">Primary Focus Locations Across Pune</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">7</div>
                    <p className="font-paragraph text-gray-600">Property Types & Solutions</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
          
          <FeaturedPrioritySection />

          <PropertiesSection />

          <LocationsSection />

          <PropertyTypesSection />

          <BudgetAreaSection />

          <ContactSection />

          {/* LEGAL DISCLAIMER STRIP - Refined Typography */}
          <div className="w-full bg-white py-16 lg:py-20 px-4 border-t border-gray-100">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-2">
                Commercial Terms
              </p>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Brokerage is applicable from both owner and tenant. In case of a 3-year lock-in, 
                brokerage from the owner is equivalent to 2 months' rent. All transactions are subject to local regulations.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* MOBILE FIXED BOTTOM NAV - Glassmorphism Style */}
      <AnimatePresence>
        {isMobile && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50 flex gap-3 p-2 bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl"
          >
            <a href="tel:+919876543210" className="flex-1 bg-slate-900 text-white h-12 rounded-xl flex items-center justify-center font-bold gap-2 text-sm active:scale-95 transition-transform">
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
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 shadow-lg hover:bg-slate-900 hover:text-white transition-all"
            >
              <ChevronUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-110 hover:rotate-[10deg]"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}