import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, ArrowRight, MapPin, Maximize2, IndianRupee, Building2, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import HeroSection from '@/components/sections/HeroSection';
import PropertiesSection from '@/components/sections/PropertiesSection';
import LocationsSection from '@/components/sections/LocationsSection';
import PropertyTypesSection from '@/components/sections/PropertyTypesSection';
import BudgetAreaSection from '@/components/sections/BudgetAreaSection';
import ContactSection from '@/components/sections/ContactSection';
import FeaturedPrioritySection from '@/components/sections/FeaturedPrioritySection';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const handleResize = () => checkMobile();
    const handleScroll = () => setShowWhatsApp(window.scrollY > 300);
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210', '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground selection:bg-primary/20">
      <Header />

      <main className="relative w-full overflow-hidden pt-16 lg:pt-0">
        {/* HERO SECTION */}
        <HeroSection isMobile={isMobile} />

        {/* FEATURED PRIORITY SECTION */}
        <FeaturedPrioritySection />

        {/* PROPERTIES EXPLORER */}
        <PropertiesSection />

        {/* LOCATIONS SECTION */}
        <LocationsSection />

        {/* PROPERTY TYPES */}
        <PropertyTypesSection />

        {/* BUDGET & AREA CALCULATOR */}
        <BudgetAreaSection />

        {/* CONTACT FORM */}
        <ContactSection />

        {/* LEGAL DISCLAIMER STRIP */}
        <div className="w-full bg-gray-50 py-6 px-4 border-t border-gray-200">
          <div className="max-w-[120rem] mx-auto text-center">
            <p className="text-xs text-gray-600 leading-relaxed">
              Brokerage is applicable from both owner and tenant. In case of a 3-year lock-in, brokerage from the owner is 2 months' rent.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 p-3 flex gap-2 shadow-lg">
        <a href="tel:+919876543210" className="flex-1 bg-foreground text-white h-12 rounded-lg flex items-center justify-center font-bold gap-2 text-sm">
          <Phone className="w-4 h-4" /> Call
        </a>
        <button onClick={handleWhatsAppClick} className="flex-1 bg-[#25D366] text-white h-12 rounded-lg flex items-center justify-center font-bold gap-2 text-sm">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
      </div>

      {/* DESKTOP FLOATING WHATSAPP */}
      <AnimatePresence>
        {showWhatsApp && !isMobile && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleWhatsAppClick}
            className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 hover:shadow-2xl"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-8 w-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
