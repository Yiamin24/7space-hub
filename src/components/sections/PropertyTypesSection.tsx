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
    <section id="types" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Property Types & Solutions
          </h2>
          <p className="font-paragraph text-lg text-gray-600">
            Choose from 7 diverse office configurations tailored to your business requirements, budget, and operational needs.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {propertyTypes.map((type, i) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white p-6 lg:p-8 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {type.label}
                </h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
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
