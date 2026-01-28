import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BudgetAreaSection() {
  const budgetRanges = [
    '₹40,000 - ₹75,000',
    '₹75,000 - ₹1.5 Lakh',
    '₹1.5 Lakh - ₹3 Lakh',
    '₹3 Lakh+',
  ];

  const areaRanges = [
    '350 - 600 sq.ft',
    '600 - 1000 sq.ft',
    '1000 - 1800 sq.ft',
    '1800+ sq.ft',
  ];

  const priorityRules = [
    { range: '600–1000 sq.ft', priority: 50, label: 'High Priority' },
    { range: '1000–1800 sq.ft', priority: 30, label: 'Medium Priority' },
    { range: '300–600 sq.ft', priority: 10, label: 'Standard' },
    { range: 'Above 1800 sq.ft', priority: 10, label: 'Standard' },
  ];

  return (
    <section id="budget-area" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Selectors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-200"
          >
            <h3 className="font-heading text-3xl font-bold text-foreground mb-8">
              Find Your Perfect Match
            </h3>

            <div className="space-y-8">
              {/* Budget Range */}
              <div>
                <label className="block text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary focus:ring-2 focus:ring-primary transition-all text-left"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carpet Area */}
              <div>
                <label className="block text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                  Carpet Area
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {areaRanges.map((area) => (
                    <button
                      key={area}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary focus:ring-2 focus:ring-primary transition-all text-left"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg"
                size="lg"
              >
                Get Best Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right: Priority Logic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                How We Match Your Needs
              </h2>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
                Our intelligent matching system prioritizes your requirements based on carpet area to connect you with the most suitable office spaces quickly.
              </p>
            </div>

            <div className="space-y-6">
              {priorityRules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-foreground text-lg">{rule.range}</span>
                    <span className="text-sm font-semibold text-gray-600">{rule.label}</span>
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rule.priority}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        rule.priority >= 50
                          ? 'bg-primary'
                          : rule.priority >= 30
                          ? 'bg-indigo-500'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div className="text-sm text-gray-600 text-right">{rule.priority}% Priority</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
