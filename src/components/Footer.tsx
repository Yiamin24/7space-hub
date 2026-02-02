import { Image } from '@/components/ui/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Properties', href: '#properties' },
    { label: 'Locations', href: '#locations' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-white py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <div className="font-heading font-bold text-xl sm:text-2xl text-primary">7Doors</div>
            <p className="font-paragraph text-xs sm:text-sm text-gray-300 leading-relaxed">
              Connecting businesses with ideal office spaces across Pune. Verified listings, expert guidance, and seamless leasing solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-paragraph text-xs sm:text-sm text-gray-300 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Get in Touch
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a href="tel:+919740740366" className="flex items-start gap-2 sm:gap-3 text-gray-300 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                <span className="font-paragraph text-xs sm:text-sm">+91 97407 40366</span>
              </a>
              <a href="mailto:official@7doors.in" className="flex items-start gap-2 sm:gap-3 text-gray-300 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                <span className="font-paragraph text-xs sm:text-sm">official@7doors.in</span>
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-gray-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0" />
                <span className="font-paragraph text-xs sm:text-sm">Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Connect
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a href="https://wa.me/919740740366" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-[#25D366] transition-colors">
                <span className="font-paragraph text-xs sm:text-sm">WhatsApp</span>
              </a>
              <a href="tel:+919740740366" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                <span className="font-paragraph text-xs sm:text-sm">Call Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          {/* Legal Disclosure */}
          <p className="font-paragraph text-xs text-gray-400 leading-relaxed mb-3 sm:mb-4">
            <span className="font-semibold text-gray-300">Legal Disclosure:</span> Brokerage is applicable from both owner and tenant. In case of a 3-year lock-in, brokerage from the owner is 2 months' rent.
          </p>
          <p className="font-paragraph text-xs text-gray-500">
            © {new Date().getFullYear()} 7Doors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
