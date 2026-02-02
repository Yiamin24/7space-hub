import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Target } from 'lucide-react';

interface BudgetAreaSectionProps {
  onOpenPopup?: () => void;
}

export default function BudgetAreaSection({ onOpenPopup }: BudgetAreaSectionProps) {
  const budgetRanges = [
    { label: '₹40,000 - ₹75,000', desc: 'Entry Level' },
    { label: '₹75,000 - ₹1.5 Lakh', desc: 'Mid Range' },
    { label: '₹1.5 Lakh - ₹3 Lakh', desc: 'Premium' },
    { label: '₹3 Lakh+', desc: 'Ultra Premium' },
  ];

  const areaRanges = [
    { label: '300 - 600 sq.ft', desc: 'Compact' },
    { label: '600 - 1200 sq.ft', desc: 'Standard' },
    { label: '1200 - 2500 sq.ft', desc: 'Large' },
    { label: '2500 - 4000 sq.ft', desc: 'Enterprise' },
  ];

  const priorityRules = [
    { range: '600–1200 sq.ft', priority: 50, label: 'High Priority', desc: 'Most Sought After' },
    { range: '1200–2500 sq.ft', priority: 30, label: 'Medium Priority', desc: 'Growing Demand' },
    { range: '300–600 sq.ft', priority: 10, label: 'Standard', desc: 'Niche Segment' },
    { range: '2500–4000 sq.ft', priority: 10, label: 'Standard', desc: 'Enterprise Grade' },
  ];

  return (
    <section id="budget-area" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            Budget & Carpet Area Guide
          </h2>
          <p className="font-paragraph text-xs sm:text-sm md:text-base text-gray-300">
            Explore our comprehensive range of office spaces tailored to your budget and space requirements.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-16 lg:grid-cols-2 items-start">
          {/* Left: Budget & Area Ranges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Budget Range */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold">Budget Range</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {budgetRanges.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-2 sm:p-3 hover:bg-slate-700/60 transition-colors"
                  >
                    <div className="font-bold text-sm sm:text-base text-slate-200">{item.label}</div>
                    <div className="text-xs text-slate-300">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Carpet Area */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold">Carpet Area Range</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {areaRanges.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-lg p-2 sm:p-3 hover:bg-slate-700/60 transition-colors"
                  >
                    <div className="font-bold text-sm sm:text-base text-slate-200">{item.label}</div>
                    <div className="text-xs text-slate-300">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              onClick={onOpenPopup}
              className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg mt-3 text-xs sm:text-sm"
              size="lg"
            >
              Get Best Options
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </motion.div>

          {/* Right: Lead Weightage & Priority */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Lead Weightage System</h3>
              <p className="font-paragraph text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Our intelligent matching system prioritizes your requirements based on carpet area to connect you with the most suitable office spaces quickly and efficiently.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {priorityRules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 sm:p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm sm:text-base text-white">{rule.range}</div>
                      <div className="text-xs text-gray-400">{rule.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-heading font-bold text-slate-300">{rule.priority}%</div>
                      <div className="text-xs text-gray-400">{rule.label}</div>
                    </div>
                  </div>
                  <div className="h-1 sm:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rule.priority}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        rule.priority >= 50
                          ? 'bg-slate-400'
                          : rule.priority >= 30
                          ? 'bg-slate-500'
                          : 'bg-gray-500'
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
              <div className="font-bold text-white mb-1 text-xs sm:text-sm">Overall Requirement Range</div>
              <div className="text-lg sm:text-xl font-heading font-bold text-slate-200">300 - 4000 sq.ft</div>
              <div className="text-xs text-gray-300 mt-1">Comprehensive coverage for all business sizes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
