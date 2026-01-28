import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Building2, IndianRupee, Maximize2 } from 'lucide-react';

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [budget, setBudget] = useState('');
  const [furnishing, setFurnishing] = useState('');

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = [
    { value: '300-600', label: '300-600 sq.ft (10% priority)' },
    { value: '600-1000', label: '600-1000 sq.ft (50% priority)' },
    { value: '1000-1800', label: '1000-1800 sq.ft (30% priority)' },
    { value: '1800+', label: 'Above 1800 sq.ft (10% priority)' },
  ];
  const budgets = [
    '₹40,000 - ₹75,000',
    '₹75,000 - ₹1,20,000',
    '₹1,20,000 - ₹2,00,000',
    '₹2,00,000 - ₹3,00,000',
    'Above ₹3,00,000',
  ];
  const furnishingTypes = ['Plug & Play', 'Semi-Furnished', 'Bare Shell', 'Warm Shell'];

  const handleGetOptions = () => {
    const message = `Hi, I'm looking for a commercial office space in Pune.\n\nLocation: ${location || 'Any'}\nCarpet Area: ${carpetArea || 'Any'}\nBudget: ${budget || 'Any'}\nFurnishing: ${furnishing || 'Any'}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleExploreClick = () => {
    const element = document.querySelector('#properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-background pt-20 lg:pt-0">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Commercial Office Spaces for Lease in Pune
              </h1>
              <p className="font-paragraph text-lg lg:text-xl text-[-soft -graphite] leading-relaxed max-w-2xl">
                100+ verified commercial properties across Baner, Balewadi, Wakad, Aundh, Hinjewadi, PCMC & Pashan.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="space-y-2">
                <div className="flex items-center text-primary">
                  <Building2 className="h-6 w-6 mr-2" />
                </div>
                <p className="font-heading text-2xl lg:text-3xl font-bold text-foreground">100+</p>
                <p className="font-paragraph text-sm text-[-soft -graphite]">Listings</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-primary">
                  <IndianRupee className="h-6 w-6 mr-2" />
                </div>
                <p className="font-heading text-2xl lg:text-3xl font-bold text-foreground">₹40k - ₹3L+</p>
                <p className="font-paragraph text-sm text-[-soft -graphite]">Budget Range</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-primary">
                  <Maximize2 className="h-6 w-6 mr-2" />
                </div>
                <p className="font-heading text-2xl lg:text-3xl font-bold text-foreground">350 - 3000</p>
                <p className="font-paragraph text-sm text-[-soft -graphite]">sq.ft</p>
              </div>
            </div>

            {/* CTAs - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                size="lg"
                onClick={handleGetOptions}
                className="bg-primary text-primary-foreground hover:bg-[-subtle -highlight]"
              >
                Get Options on WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleExploreClick}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Explore Properties
              </Button>
            </div>

            {/* CTA - Mobile (Single) */}
            <div className="lg:hidden">
              <Button
                size="lg"
                onClick={handleGetOptions}
                className="w-full bg-primary text-primary-foreground hover:bg-[-subtle -highlight]"
              >
                Get Options on WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right: Quick Requirement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[-warm -light -grey] rounded-2xl p-6 lg:p-8 shadow-sm border border-[-borders]"
          >
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Quick Requirement
            </h3>
            <div className="space-y-4">
              <div>
                <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                  Carpet Area
                </label>
                <Select value={carpetArea} onValueChange={setCarpetArea}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select carpet area" />
                  </SelectTrigger>
                  <SelectContent>
                    {carpetAreas.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                  Budget
                </label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                  Furnishing Type
                </label>
                <Select value={furnishing} onValueChange={setFurnishing}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select furnishing" />
                  </SelectTrigger>
                  <SelectContent>
                    {furnishingTypes.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGetOptions}
                className="w-full bg-primary text-primary-foreground hover:bg-[-subtle -highlight] mt-6"
                size="lg"
              >
                Get Matching Options
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
