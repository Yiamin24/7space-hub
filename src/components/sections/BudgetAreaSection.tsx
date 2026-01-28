import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Target } from 'lucide-react';

export default function BudgetAreaSection() {
  const budgetRanges = [
    { label: '₹40,000 - ₹75,000', desc: 'Entry Level' },
    { label: '₹75,000 - ₹1.5 Lakh', desc: 'Mid Range' },
    { label: '₹1.5 Lakh - ₹3 Lakh', desc: 'Premium' },
    { label: '₹3 Lakh+', desc: 'Ultra Premium' },
  ];

  const areaRanges = [
    { label: '350 - 600 sq.ft', desc: 'Compact' },
    { label: '600 - 1000 sq.ft', desc: 'Standard' },
    { label: '1000 - 1800 sq.ft', desc: 'Large' },
    { label: '1800+ sq.ft', desc: 'Enterprise' },
  ];

  const priorityRules = [
    { range: '600–1000 sq.ft', priority: 50, label: 'High Priority', desc: 'Most Sought After' },
    { range: '1000–1800 sq.ft', priority: 30, label: 'Medium Priority', desc: 'Growing Demand' },
    { range: '300–600 sq.ft', priority: 10, label: 'Standard', desc: 'Niche Segment' },
    { range: 'Above 1800 sq.ft', priority: 10, label: 'Standard', desc: 'Enterprise Grade' },
  ];

  return (
    <section id="budget-area" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Budget & Carpet Area Guide
          </h2>
          <p className="font-paragraph text-sm sm:text-base md:text-lg text-gray-300">
            Explore our comprehensive range of office spaces tailored to your budget and space requirements.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 lg:grid-cols-2 items-start">
          {/* Left: Budget & Area Ranges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Budget Range */}
            <div>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold">Budget Range</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {budgetRanges.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 hover:bg-white/15 transition-colors"
                  >
                    <div className="font-bold text-base sm:text-lg text-primary">{item.label}</div>
                    <div className="text-xs sm:text-sm text-gray-300">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Carpet Area */}
            <div>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold">Carpet Area Range</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {areaRanges.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 hover:bg-white/15 transition-colors"
                  >
                    <div className="font-bold text-base sm:text-lg text-primary">{item.label}</div>
                    <div className="text-xs sm:text-sm text-gray-300">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg mt-4 text-sm sm:text-base"
              size="lg"
            >
              Get Best Options
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>

          {/* Right: Lead Weightage & Priority */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Lead Weightage System</h3>
              <p className="font-paragraph text-sm sm:text-base text-gray-300 leading-relaxed mb-6 sm:mb-8">
                Our intelligent matching system prioritizes your requirements based on carpet area to connect you with the most suitable office spaces quickly and efficiently.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {priorityRules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-5"
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div>
                      <div className="font-bold text-base sm:text-lg text-white">{rule.range}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{rule.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-heading font-bold text-primary">{rule.priority}%</div>
                      <div className="text-xs text-gray-400">{rule.label}</div>
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rule.priority}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        rule.priority >= 50
                          ? 'bg-primary'
                          : rule.priority >= 30
                          ? 'bg-indigo-400'
                          : 'bg-gray-500'
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
              <div className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Overall Requirement Range</div>
              <div className="text-xl sm:text-2xl font-heading font-bold text-primary">350 - 3000 sq.ft</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">Comprehensive coverage for all business sizes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
