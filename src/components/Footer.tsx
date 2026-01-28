import { Image } from '@/components/ui/image';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Yashada Business Zone', href: '#yashada' },
    { label: 'Properties', href: '#properties' },
    { label: 'Locations', href: '#locations' },
    { label: 'Property Types', href: '#types' },
    { label: 'Budget & Area', href: '#budget-area' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[-warm -light -grey] py-12 lg:py-16">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Logo & Legal */}
          <div className="space-y-6">
            <Image
              src="https://static.wixstatic.com/media/cef78c_b23b1a79df4b4f7e97ae7f773585e4b3~mv2.png?originWidth=128&originHeight=128"
              alt="7Doors Logo"
              width={140}
              className="h-10 w-auto"
            />
            <p className="font-paragraph text-sm text-[-soft -graphite] leading-relaxed max-w-md">
              Premium commercial office spaces for lease in Pune. Verified listings across Baner, Balewadi, Wakad, Aundh, Hinjewadi, PCMC & Pashan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-paragraph text-sm text-[-soft -graphite] transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <p className="font-paragraph text-sm text-[-soft -graphite]">
                <span className="font-semibold text-foreground">Phone:</span> +91 98765 43210
              </p>
              <p className="font-paragraph text-sm text-[-soft -graphite]">
                <span className="font-semibold text-foreground">Email:</span> info@7doors.in
              </p>
              <p className="font-paragraph text-sm text-[-soft -graphite]">
                <span className="font-semibold text-foreground">Location:</span> Pune, Maharashtra
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclosure */}
        <div className="mt-12 pt-8 border-t border-[-borders]">
          <p className="font-paragraph text-xs text-[-soft -graphite] leading-relaxed max-w-4xl">
            <span className="font-semibold text-foreground">Legal Disclosure:</span> Brokerage is applicable from both owner and tenant. In case of a 3-year lock-in, brokerage from the owner is 2 months' rent.
          </p>
          <p className="font-paragraph text-xs text-[-stone -grey] mt-4">
            © {new Date().getFullYear()} 7Doors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
