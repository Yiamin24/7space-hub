import { motion } from 'framer-motion';
import { Building2, Briefcase, LayoutGrid, Sofa, Maximize2, Zap } from 'lucide-react';

export default function PropertyTypesSection() {
  const propertyTypes = [
    { id: 'it', label: 'IT / ITES Office Spaces', icon: Building2, desc: 'Specialized for tech companies' },
    { id: 'corp', label: 'Corporate Office Spaces', icon: Briefcase, desc: 'Professional corporate setups' },
    { id: 'plug', label: 'Plug-and-Play Offices', icon: LayoutGrid, desc: 'Ready to move in immediately' },
    { id: 'semi', label: 'Semi-Furnished Offices', icon: Sofa, desc: 'Partially equipped spaces' },
    { id: 'bare', label: 'Bare Shell / Warm Shell', icon: Maximize2, desc: 'Customizable blank canvas' },
    { id: 'boutique', label: 'Boutique Commercial Buildings', icon: Zap, desc: 'Premium exclusive spaces' },
    { id: 'business', label: 'Business Park Offices', icon: Building2, desc: 'Integrated business parks' },
  ];

  return (
    <section id="types" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Property Types & Solutions
          </h2>
          <p className="font-paragraph text-sm sm:text-base md:text-lg text-gray-600">
            Choose from 7 diverse office configurations tailored to your business requirements, budget, and operational needs.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {propertyTypes.map((type, i) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-sm sm:text-base">
                  {type.label}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                  {type.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
