import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { LeadPriorityRules } from '@/entities';
import { TrendingUp } from 'lucide-react';

export default function BudgetAreaSection() {
  const [priorityRules, setPriorityRules] = useState<LeadPriorityRules[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedCarpetArea, setSelectedCarpetArea] = useState('');

  const budgets = [
    '₹40,000 - ₹75,000',
    '₹75,000 - ₹1,20,000',
    '₹1,20,000 - ₹2,00,000',
    '₹2,00,000 - ₹3,00,000',
    'Above ₹3,00,000',
  ];

  useEffect(() => {
    loadPriorityRules();
  }, []);

  const loadPriorityRules = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<LeadPriorityRules>('leadpriorityrules');
      const sortedRules = result.items.sort((a, b) => 
        (b.priorityPercentage || 0) - (a.priorityPercentage || 0)
      );
      setPriorityRules(sortedRules);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleGetOptions = () => {
    const message = `Hi, I'm looking for a commercial office space.\n\nBudget: ${selectedBudget || 'Any'}\nCarpet Area: ${selectedCarpetArea || 'Any'}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getPriorityColor = (percentage?: number) => {
    if (!percentage) return 'bg-[-stone -grey]';
    if (percentage >= 50) return 'bg-primary';
    if (percentage >= 30) return 'bg-[-subtle -highlight]';
    return 'bg-[-stone -grey]';
  };

  return (
    <section id="budget-area" className="py-16 lg:py-24 bg-[-warm -light -grey]">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div style={{ minHeight: '400px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
              Budget & Carpet Area Match
            </h2>
            <p className="font-paragraph text-lg text-[-soft -graphite] max-w-3xl mx-auto">
              Find the perfect office space within your budget and space requirements
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Selectors */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="p-6 lg:p-8 space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    Select Your Requirements
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Budget Range
                      </label>
                      <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Carpet Area
                      </label>
                      <Select value={selectedCarpetArea} onValueChange={setSelectedCarpetArea}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select carpet area" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityRules.map((rule) => (
                            <SelectItem key={rule._id} value={rule.carpetAreaRangeDisplay || ''}>
                              {rule.carpetAreaRangeDisplay}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleGetOptions}
                  className="w-full bg-primary text-primary-foreground hover:bg-[-subtle -highlight]"
                  size="lg"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Get Best Options
                </Button>
              </Card>
            </motion.div>

            {/* Priority Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Lead Priority Weightage
                </h3>
                <p className="font-paragraph text-sm text-[-soft -graphite] mb-6">
                  Our priority system ensures you get the best matching properties based on your carpet area requirements
                </p>
              </div>

              {isLoading ? null : (
                <div className="space-y-4">
                  {priorityRules.map((rule, idx) => (
                    <motion.div
                      key={rule._id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-heading text-lg font-semibold text-foreground">
                              {rule.carpetAreaRangeDisplay}
                            </p>
                            <p className="font-paragraph text-sm text-[-soft -graphite]">
                              {rule.priorityLabel}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-heading text-2xl font-bold text-primary">
                              {rule.priorityPercentage}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="w-full bg-[-borders] rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${rule.priorityPercentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${getPriorityColor(rule.priorityPercentage)}`}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
