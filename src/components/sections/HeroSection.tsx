import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Building2, IndianRupee, Maximize2, MessageCircle } from 'lucide-react';

export default function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [location, setLocation] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [budget, setBudget] = useState('');

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = [
    { value: '300-600', label: '300-600 sq.ft' },
    { value: '600-1000', label: '600-1000 sq.ft' },
    { value: '1000-1800', label: '1000-1800 sq.ft' },
    { value: '1800+', label: 'Above 1800 sq.ft' },
  ];
  const budgets = [
    '₹40k - ₹75k',
    '₹75k - ₹1.2L',
    '₹1.2L - ₹2L',
    '₹2L - ₹3L',
    '₹3L+',
  ];

  const handleGetOptions = () => {
    const message = `Hi, I'm looking for a commercial office space in Pune.\\\\n\\\\nLocation: ${location || 'Any'}\\\\nCarpet Area: ${carpetArea || 'Any'}\\\\nBudget: ${budget || 'Any'}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="home" className="relative w-full bg-white py-20 lg:py-24">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-white opacity-40 pointer-events-none" />
      
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
                Commercial Office Spaces in Pune
              </h1>
              
              <p className="font-paragraph text-base sm:text-lg md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Discover 100+ verified office spaces across Pune's premier business districts. From plug-and-play solutions to bare shell options, we connect you with the perfect workspace for your business.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 border-y border-gray-200">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-center text-primary">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="font-heading text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground">100+</p>
                <p className="font-paragraph text-xs sm:text-sm text-gray-600">Verified Spaces</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center text-primary">
                  <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="font-heading text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground">₹40k+</p>
                <p className="font-paragraph text-xs sm:text-sm text-gray-600">Monthly Rent</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-center text-primary">
                  <Maximize2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="font-heading text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground">300-3000</p>
                <p className="font-paragraph text-xs sm:text-sm text-gray-600">Sq.Ft Range</p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-2 sm:pt-4"
            >
              <Button
                size="lg"
                onClick={handleGetOptions}
                className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Options on WhatsApp
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Quick Requirement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-fit w-full"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 w-full lg:sticky lg:top-24">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-600 rounded-t-2xl" />
              
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-6">
                Quick Requirement
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Preferred Location
                  </label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full border-gray-300 focus:border-primary">
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
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Carpet Area
                  </label>
                  <Select value={carpetArea} onValueChange={setCarpetArea}>
                    <SelectTrigger className="w-full border-gray-300 focus:border-primary">
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
                  <label className="font-paragraph text-sm font-semibold text-foreground mb-2 block">
                    Budget
                  </label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="w-full border-gray-300 focus:border-primary">
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

                <Button
                  onClick={handleGetOptions}
                  className="w-full bg-primary text-white hover:bg-primary/90 mt-6 shadow-lg"
                  size="lg"
                >
                  Get Matching Options
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
