import { motion } from 'framer-motion';
import { Building2, Briefcase, LayoutGrid, Sofa, Maximize2 } from 'lucide-react';

export default function PropertyTypesSection() {
  const propertyTypes = [
    { id: 'it', label: 'IT / ITES Office Spaces', icon: Building2 },
    { id: 'corp', label: 'Corporate Office Spaces', icon: Briefcase },
    { id: 'plug', label: 'Plug-and-Play Offices', icon: LayoutGrid },
    { id: 'semi', label: 'Semi-Furnished Offices', icon: Sofa },
    { id: 'bare', label: 'Bare Shell / Warm Shell', icon: Maximize2 },
    { id: 'boutique', label: 'Boutique Commercial Buildings', icon: Building2 },
  ];

  return (
    <section id="types" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Office Space Solutions
          </h2>
          <p className="font-paragraph text-lg text-gray-600">
            Choose from a variety of office configurations tailored to your business requirements and budget.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyTypes.map((type, i) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {type.label}
                </h4>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
