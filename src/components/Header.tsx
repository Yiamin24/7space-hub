import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

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
    { label: 'Yashada', href: '#yashada' },
    { label: 'Properties', href: '#properties' },
    { label: 'Locations', href: '#locations' },
    { label: 'Types', href: '#types' },
    { label: 'Budget & Area', href: '#budget-area' },
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
          isScrolled ? 'bg-background shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center">
              <Image
                src="https://static.wixstatic.com/media/cef78c_b23777aca95d4b86a409a2b77ea76dc8~mv2.png?originWidth=128&originHeight=128"
                alt="7Doors Logo"
                width={120}
                className="h-8 w-auto lg:h-10"
              />
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
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCallClick}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
              <Button
                size="sm"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BA5A]"
              >
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
        <div className="fixed inset-0 z-30 bg-background lg:hidden" style={{ top: '64px' }}>
          <nav className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-paragraph text-lg font-medium text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
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
                WhatsApp
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden border-t border-[-borders] bg-background">
        <button
          onClick={handleCallClick}
          className="flex-1 flex items-center justify-center h-14 font-paragraph font-semibold text-primary border-r border-[-borders]"
        >
          <Phone className="mr-2 h-5 w-5" />
          Call Now
        </button>
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center h-14 font-paragraph font-semibold text-[#25D366]"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>
    </>
  );
}
