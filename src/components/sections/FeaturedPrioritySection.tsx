import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { MapPin, Building2, MessageCircle, Check } from 'lucide-react';

export default function FeaturedPrioritySection() {
  const features = [
    'Grand common lobby',
    'Ample parking',
    'Energy-efficient design',
    'DG backup',
    'Rainwater harvesting',
    '12 ft floor-to-floor height',
  ];

  const nearby = [
    { name: 'Proposed metro station', dist: 'nearby' },
    { name: 'Westend Mall', dist: '~0.5 km' },
    { name: 'D Mart', dist: '~1 km' },
    { name: 'Balewadi Stadium', dist: '~1.5 km' },
  ];

  return (
    <section id="yashada" className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://static.wixstatic.com/media/cef78c_efe29874903f4b278777d962cfe87d07~mv2.png?originWidth=896&originHeight=448"
                alt="Yashada Business Zone"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
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
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200 hidden md:block max-w-xs"
            >
              <div className="text-sm text-gray-600 uppercase tracking-wider font-bold mb-2">Availability</div>
              <div className="text-2xl font-heading font-bold text-primary">~30 Active Options</div>
              <div className="mt-2 text-sm text-gray-600">Ready for Fit-out</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Yashada Business Zone
              </h2>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
                ~30 active office options in a single premium business hub. Plug & Play, Semi-Furnished & Bare Shell options suitable for IT/ITES & Corporate offices.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Building Features
                </h4>
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location Advantage
                </h4>
                <ul className="space-y-3">
                  {nearby.map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-gray-600 text-sm border-b border-gray-200 pb-2 last:border-0">
                      <span>{item.name}</span>
                      <span className="font-semibold text-foreground">{item.dist}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white hover:bg-primary/90 shadow-lg"
                size="lg"
              >
                Enquire Now
              </Button>
              <Button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
