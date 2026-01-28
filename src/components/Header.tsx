import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Properties', href: '#properties' },
    { label: 'Locations', href: '#locations' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210', '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center shrink-0">
              <div className="font-heading font-bold text-xl lg:text-2xl text-primary">7Doors</div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-paragraph text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCallClick}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button
                size="sm"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BA5A]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 z-30 bg-white lg:hidden" 
          style={{ top: '64px' }}
        >
          <nav className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-paragraph text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleCallClick}
                className="w-full border-primary text-primary"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] text-white hover:bg-[#20BA5A]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </nav>
        </motion.div>
      )}

      {/* Mobile Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden border-t border-gray-200 bg-white shadow-lg">
        <button
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center h-14 font-paragraph font-semibold text-primary border-r border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Phone className="mr-2 h-5 w-5" />
          Call
        </button>
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center h-14 font-paragraph font-semibold text-[#25D366] hover:bg-gray-50 transition-colors"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          WhatsApp
        </button>
      </div>
    </>
  );
}
