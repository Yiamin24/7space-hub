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
    <footer className="bg-foreground text-white py-12 lg:py-16">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-2xl text-primary">7Doors</div>
            <p className="font-paragraph text-sm text-gray-300 leading-relaxed">
              Connecting businesses with ideal office spaces across Pune. Verified listings, expert guidance, and seamless leasing solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-paragraph text-sm text-gray-300 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-start gap-3 text-gray-300 hover:text-primary transition-colors">
                <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                <span className="font-paragraph text-sm">+91 98765 43210</span>
              </a>
              <a href="mailto:info@7doors.in" className="flex items-start gap-3 text-gray-300 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                <span className="font-paragraph text-sm">info@7doors.in</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <span className="font-paragraph text-sm">Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-[#25D366] transition-colors">
                <span className="font-paragraph text-sm">WhatsApp</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                <span className="font-paragraph text-sm">Call Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Legal Disclosure */}
          <p className="font-paragraph text-xs text-gray-400 leading-relaxed mb-4">
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
