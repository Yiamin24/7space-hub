// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Check, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  Search, 
  LayoutGrid, 
  Sofa, 
  Briefcase, 
  Maximize, 
  IndianRupee,
  Menu,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- 1. DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES ---

const LOCATIONS = [
  "Baner", "Balewadi", "Wakad", "Aundh", "Hinjewadi", "PCMC", "Pashan"
];

const PROPERTY_TYPES = [
  { id: 'it', label: "IT / ITES Office Spaces", icon: <Building2 className="w-6 h-6" /> },
  { id: 'corp', label: "Corporate Office Spaces", icon: <Briefcase className="w-6 h-6" /> },
  { id: 'plug', label: "Plug-and-Play Offices", icon: <LayoutGrid className="w-6 h-6" /> },
  { id: 'semi', label: "Semi-Furnished Offices", icon: <Sofa className="w-6 h-6" /> },
  { id: 'bare', label: "Bare Shell / Warm Shell", icon: <Maximize className="w-6 h-6" /> },
  { id: 'boutique', label: "Boutique Commercial Buildings", icon: <Building2 className="w-6 h-6" /> },
  { id: 'park', label: "Business Park Offices", icon: <Building2 className="w-6 h-6" /> }
];

const PRIORITY_ASSET = {
  name: "Yashada Business Zone",
  location: "Baner",
  tagline: "~30 active office options in a single premium business hub",
  highlights: [
    "Baner prime commercial location",
    "~30 Active Options",
    "Plug & Play / Semi-Furnished / Bare Shell",
    "Suitable for IT / ITES & Corporate offices"
  ],
  features: [
    "Grand common lobby", "Ample parking", "Energy-efficient design", 
    "DG backup", "Rainwater harvesting", "12 ft floor-to-floor height",
    "Fire fighting system", "Vastu-compliant planning", "Multiple lifts"
  ],
  nearby: [
    { name: "Proposed metro station", dist: "nearby" },
    { name: "Westend Mall", dist: "~0.5 km" },
    { name: "D Mart", dist: "~1 km" },
    { name: "Balewadi Stadium", dist: "~1.5 km" },
    { name: "Hinjewadi IT Park", dist: "~9 km" }
  ]
};

const LEAD_PRIORITY_RULES = [
  { range: "600–1000 sq.ft", priority: "50%", label: "High Priority", color: "bg-[#4F46E5]" },
  { range: "1000–1800 sq.ft", priority: "30%", label: "Medium Priority", color: "bg-[#6366F1]" },
  { range: "300–600 sq.ft", priority: "10%", label: "Standard", color: "bg-[#71717A]" },
  { range: "Above 1800 sq.ft", priority: "10%", label: "Standard", color: "bg-[#71717A]" }
];

const BUDGET_RANGES = ["₹40,000 - ₹75,000", "₹75,000 - ₹1.5 Lakh", "₹1.5 Lakh - ₹3 Lakh", "₹3 Lakh+"];
const AREA_RANGES = ["350 - 600 sq.ft", "600 - 1000 sq.ft", "1000 - 1800 sq.ft", "1800+ sq.ft"];

// --- 2. UTILITY COMPONENTS ---

const SectionHeading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A2E34] tracking-tight ${className}`}>
    {children}
  </h2>
);

const SectionSubtext = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`font-paragraph text-lg text-[#52525B] leading-relaxed ${className}`}>
    {children}
  </p>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#4F46E5]/10 text-[#4F46E5]">
    {children}
  </span>
);

const PrimaryButton = ({ children, onClick, className = "", fullWidth = false }: any) => (
  <button 
    onClick={onClick}
    className={`
      relative overflow-hidden group bg-[#4F46E5] text-white font-medium py-4 px-8 rounded-lg 
      transition-all duration-300 hover:bg-[#4338ca] hover:shadow-lg hover:-translate-y-0.5
      focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]
      ${fullWidth ? 'w-full' : ''} ${className}
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  </button>
);

const SecondaryButton = ({ children, onClick, className = "", fullWidth = false }: any) => (
  <button 
    onClick={onClick}
    className={`
      relative overflow-hidden group bg-white border border-[#E4E4E7] text-[#2A2E34] font-medium py-4 px-8 rounded-lg 
      transition-all duration-300 hover:bg-[#F6F6F4] hover:border-[#d4d4d8]
      focus:ring-2 focus:ring-offset-2 focus:ring-[#E4E4E7]
      ${fullWidth ? 'w-full' : ''} ${className}
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  </button>
);

// --- 3. MAIN PAGE COMPONENT ---

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
    <div className="min-h-screen bg-background font-paragraph text-[#2A2E34] selection:bg-[#4F46E5]/20">
      <Header />

      <main className="relative w-full overflow-clip">
        {/* HERO SECTION */}
        <HeroSection isMobile={isMobile} />

        {/* PRIORITY ASSET SECTION */}
        <PriorityAssetSection />

        {/* PROPERTIES EXPLORER */}
        <PropertiesSection />

        {/* LOCATIONS MARQUEE */}
        <LocationsSection />

        {/* PROPERTY TYPES */}
        <PropertyTypesSection />

        {/* BUDGET & AREA CALCULATOR */}
        <BudgetAreaSection />

        {/* CONTACT FORM */}
        <ContactSection />

        {/* LEGAL DISCLAIMER STRIP */}
        <div className="w-full bg-[#F6F6F4] py-6 px-4 border-t border-[#E4E4E7]">
          <div className="max-w-[100rem] mx-auto text-center">
            <p className="text-xs text-[#71717A] leading-relaxed">
              Brokerage is applicable from both owner and tenant. In case of a 3-year lock-in, brokerage from the owner is 2 months’ rent.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E4E4E7] p-4 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="tel:+919876543210" className="flex-1 bg-[#2A2E34] text-white h-12 rounded-lg flex items-center justify-center font-bold gap-2">
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button onClick={handleWhatsAppClick} className="flex-1 bg-[#25D366] text-white h-12 rounded-lg flex items-center justify-center font-bold gap-2">
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

// --- 4. SUB-COMPONENTS (SECTIONS) ---

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex items-center bg-[#F6F6F4] overflow-hidden pt-20 md:pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#2A2E34 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-[100rem] mx-auto w-full px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="space-y-4">
            <Badge>Premium Commercial Leasing</Badge>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-[#2A2E34] leading-[1.1] tracking-tight">
              Commercial Office Spaces for Lease in Pune
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-[#52525B] max-w-2xl leading-relaxed">
              100+ verified commercial properties across Baner, Balewadi, Wakad, Aundh, Hinjewadi, PCMC & Pashan.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E4E4E7]/60">
            <div>
              <div className="font-heading text-2xl md:text-3xl font-bold text-[#4F46E5]">100+</div>
              <div className="text-sm text-[#71717A]">Listings</div>
            </div>
            <div>
              <div className="font-heading text-2xl md:text-3xl font-bold text-[#4F46E5]">₹40k+</div>
              <div className="text-sm text-[#71717A]">Starting Rent</div>
            </div>
            <div>
              <div className="font-heading text-2xl md:text-3xl font-bold text-[#4F46E5]">3000+</div>
              <div className="text-sm text-[#71717A]">Max Sq.Ft</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <PrimaryButton onClick={() => window.open('https://wa.me/919876543210', '_blank')} className="w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" /> Get Options on WhatsApp
            </PrimaryButton>
            <SecondaryButton onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto">
              Explore Properties
            </SecondaryButton>
          </div>
        </motion.div>

        {/* Right Card - Quick Requirement */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full"
        >
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-[#E4E4E7] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] to-[#6366F1]" />
            
            <h3 className="font-heading text-2xl font-bold mb-6 text-[#2A2E34]">Quick Requirement</h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#52525B]">Preferred Location</label>
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg appearance-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent outline-none transition-all">
                    <option value="">Select Location</option>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#52525B]">Carpet Area</label>
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg appearance-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent outline-none transition-all">
                    <option value="">Select Area</option>
                    {AREA_RANGES.map(area => <option key={area} value={area}>{area}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#52525B]">Budget</label>
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg appearance-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent outline-none transition-all">
                    <option value="">Select Budget</option>
                    {BUDGET_RANGES.map(budget => <option key={budget} value={budget}>{budget}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                </div>
              </div>

              <PrimaryButton fullWidth className="mt-2">
                Get Matching Options
              </PrimaryButton>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PriorityAssetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="yashada" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Image & Visuals */}
          <div className="lg:w-1/2 relative group">
            <div className="relative h-[60vh] min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://static.wixstatic.com/media/cef78c_efe29874903f4b278777d962cfe87d07~mv2.png?originWidth=896&originHeight=448" 
                alt="Yashada Business Zone"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[#4F46E5]" />
                  <span className="font-medium">Baner, Pune</span>
                </div>
                <div className="text-3xl font-heading font-bold">Yashada Business Zone</div>
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-[#E4E4E7] hidden md:block max-w-xs"
            >
              <div className="text-sm text-[#71717A] uppercase tracking-wider font-bold mb-2">Availability</div>
              <div className="text-2xl font-heading font-bold text-[#4F46E5]">~30 Active Options</div>
              <div className="mt-2 text-sm text-[#52525B]">Ready for Fit-out</div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div ref={ref} className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <Badge>PRIORITY ASSET</Badge>
            </div>
            
            <SectionHeading className="mb-4">{PRIORITY_ASSET.name}</SectionHeading>
            <SectionSubtext className="mb-8">{PRIORITY_ASSET.tagline}</SectionSubtext>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-bold text-[#2A2E34] mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#4F46E5]" /> Building Features
                </h4>
                <ul className="space-y-2">
                  {PRIORITY_ASSET.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#52525B] text-sm">
                      <Check className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#2A2E34] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#4F46E5]" /> Location Advantage
                </h4>
                <ul className="space-y-2">
                  {PRIORITY_ASSET.nearby.map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-[#52525B] text-sm border-b border-dashed border-[#E4E4E7] pb-1 last:border-0">
                      <span>{item.name}</span>
                      <span className="font-medium text-[#2A2E34]">{item.dist}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Enquire Now
              </PrimaryButton>
              <SecondaryButton onClick={() => window.open('https://wa.me/919876543210', '_blank')}>
                <MessageCircle className="w-5 h-5" /> WhatsApp Now
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertiesSection() {
  return (
    <section id="properties" className="py-24 bg-[#F6F6F4]">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <SectionHeading className="mb-4">Explore 100+ Commercial Properties</SectionHeading>
            <SectionSubtext>Curated office spaces across Pune's prime business districts.</SectionSubtext>
          </div>
          
          {/* Filters (Visual Only for this demo) */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {['Location', 'Carpet Area', 'Budget', 'Furnishing'].map((filter) => (
              <button key={filter} className="whitespace-nowrap px-4 py-2 bg-white border border-[#E4E4E7] rounded-full text-sm font-medium text-[#52525B] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors">
                {filter} <ChevronDown className="w-3 h-3 inline ml-1" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <PropertyCard key={item} index={item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <SecondaryButton className="min-w-[200px]">Load More Properties</SecondaryButton>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ index }: { index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden border border-[#E4E4E7] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden">
        <Image 
          src="https://static.wixstatic.com/media/cef78c_e79ef588033a4287925e9551f706faa3~mv2.png?originWidth=576&originHeight=384" 
          alt="Office Space"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#2A2E34]">
          IT / ITES
        </div>
        {index === 2 && (
          <div className="absolute top-4 right-4 bg-[#4F46E5] text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
            High Priority
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#2A2E34] mb-1">Premium Office Space</h3>
            <div className="flex items-center text-[#71717A] text-sm">
              <MapPin className="w-4 h-4 mr-1" /> Baner, Pune
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#4F46E5]">₹1.2L</div>
            <div className="text-xs text-[#71717A]">/month</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#E4E4E7]">
          <div>
            <div className="text-xs text-[#71717A] uppercase tracking-wider">Area</div>
            <div className="font-medium text-[#2A2E34]">1,200 sq.ft</div>
          </div>
          <div>
            <div className="text-xs text-[#71717A] uppercase tracking-wider">Furnishing</div>
            <div className="font-medium text-[#2A2E34]">Furnished</div>
          </div>
        </div>

        <button className="w-full mt-4 py-3 bg-[#F6F6F4] text-[#2A2E34] font-medium rounded-lg hover:bg-[#2A2E34] hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-[#4F46E5] group-hover:text-white">
          Get Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function LocationsSection() {
  return (
    <section id="locations" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12 mb-12">
        <SectionHeading>Locations We Cover</SectionHeading>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="relative w-full">
        <div className="flex gap-6 px-4 md:px-8 lg:px-12 overflow-x-auto pb-8 no-scrollbar snap-x">
          {LOCATIONS.map((loc, i) => (
            <div key={loc} className="snap-center shrink-0 w-[280px] md:w-[350px] h-[400px] relative rounded-2xl overflow-hidden group cursor-pointer">
              <Image 
                src="https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png" 
                alt={loc}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-white font-heading text-3xl font-bold mb-2">{loc}</h3>
                <div className="flex items-center text-white/80 text-sm group-hover:translate-x-2 transition-transform">
                  View Properties <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyTypesSection() {
  return (
    <section id="types" className="py-24 bg-[#F6F6F4]">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading className="mb-4">Property Types</SectionHeading>
          <SectionSubtext>Specialized spaces designed for every business need.</SectionSubtext>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PROPERTY_TYPES.map((type, i) => (
            <motion.div 
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-xl border border-[#E4E4E7] hover:border-[#4F46E5] hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#F6F6F4] flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                {type.icon}
              </div>
              <h4 className="font-bold text-[#2A2E34] group-hover:text-[#4F46E5] transition-colors">{type.label}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BudgetAreaSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Calculator/Selector */}
          <div className="bg-[#F6F6F4] p-8 md:p-12 rounded-3xl">
            <h3 className="font-heading text-3xl font-bold text-[#2A2E34] mb-8">Find Your Perfect Match</h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-[#52525B] uppercase tracking-wider mb-4">Budget Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {BUDGET_RANGES.map(range => (
                    <button key={range} className="px-4 py-3 bg-white border border-[#E4E4E7] rounded-lg text-sm font-medium text-[#2A2E34] hover:border-[#4F46E5] hover:text-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5] transition-all text-left">
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#52525B] uppercase tracking-wider mb-4">Carpet Area</label>
                <div className="grid grid-cols-2 gap-3">
                  {AREA_RANGES.map(area => (
                    <button key={area} className="px-4 py-3 bg-white border border-[#E4E4E7] rounded-lg text-sm font-medium text-[#2A2E34] hover:border-[#4F46E5] hover:text-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5] transition-all text-left">
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <PrimaryButton fullWidth>Get Best Options</PrimaryButton>
            </div>
          </div>

          {/* Right: Priority Logic Visualization */}
          <div>
            <SectionHeading className="mb-6">Smart Lead Priority</SectionHeading>
            <SectionSubtext className="mb-10">
              We prioritize your requirements based on carpet area to ensure the fastest turnaround for high-demand configurations.
            </SectionSubtext>

            <div className="space-y-6">
              {LEAD_PRIORITY_RULES.map((rule, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-[#2A2E34] text-lg">{rule.range}</span>
                    <span className="text-sm font-medium text-[#52525B]">{rule.label}</span>
                  </div>
                  <div className="h-4 w-full bg-[#F6F6F4] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: rule.priority }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${rule.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#2A2E34] text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4F46E5]/5 skew-x-12 pointer-events-none" />
      
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <Badge>Contact Us</Badge>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6">
              Get Available Options Quickly
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-md">
              Verified options • Fast response • Site visit assistance. 
              Fill the form to get a curated list of properties.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#4F46E5]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Call Us Directly</div>
                  <div className="text-xl font-bold">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">WhatsApp Support</div>
                  <div className="text-xl font-bold">Chat Now</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-[#2A2E34] p-8 md:p-10 rounded-2xl shadow-2xl">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#52525B]">Name</label>
                  <input type="text" className="w-full h-12 px-4 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg focus:ring-2 focus:ring-[#4F46E5] outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#52525B]">Phone</label>
                  <input type="tel" className="w-full h-12 px-4 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg focus:ring-2 focus:ring-[#4F46E5] outline-none" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#52525B]">Email</label>
                <input type="email" className="w-full h-12 px-4 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg focus:ring-2 focus:ring-[#4F46E5] outline-none" placeholder="john@company.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#52525B]">Preferred Location</label>
                  <div className="relative">
                    <select className="w-full h-12 px-4 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg appearance-none outline-none">
                      <option>Select Location</option>
                      {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#52525B]">Carpet Area</label>
                  <div className="relative">
                    <select className="w-full h-12 px-4 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg appearance-none outline-none">
                      <option>Select Area</option>
                      {AREA_RANGES.map(a => <option key={a}>{a}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#52525B]">Move-in Timeline</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-[#F6F6F4] border border-[#E4E4E7] rounded-lg appearance-none outline-none">
                    <option>Immediate</option>
                    <option>Within 1 Month</option>
                    <option>1-3 Months</option>
                    <option>3+ Months</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                </div>
              </div>

              <PrimaryButton fullWidth className="mt-4">Get Matching Offices</PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}