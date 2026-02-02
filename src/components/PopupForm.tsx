import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Leads } from '@/entities';

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupForm({ isOpen, onClose }: PopupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: '',
    carpetArea: '',
    budget: '',
    furnishingType: '',
    moveInTimeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = ['300-600', '600-1200', '1200-2500', '2500-4000'];
  const budgets = ['₹40k-₹75k', '₹75k-₹1.2L', '₹1.2L-₹2L', '₹2L-₹3L', '₹3L+'];
  const furnishingTypes = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
  const timelines = ['Immediate', 'Within 1 Month', '1-3 Months', '3+ Months'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await BaseCrudService.create<Leads>('leads', {
        _id: crypto.randomUUID(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredLocation: formData.preferredLocation,
        carpetArea: formData.carpetArea,
        budget: formData.budget,
        furnishingType: formData.furnishingType,
        moveInTimeline: formData.moveInTimeline,
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredLocation: '',
        carpetArea: '',
        budget: '',
        furnishingType: '',
        moveInTimeline: '',
      });

      setTimeout(() => {
        setSubmitStatus('idle');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
          >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-3 sm:p-4 md:p-6 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">
                    Find Your Ideal Office Space
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                    Share your requirements and we'll connect you with verified spaces
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-3 sm:p-4 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-foreground">Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="border-gray-300 text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-foreground">Phone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                        className="border-gray-300 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-foreground">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      required
                      className="border-gray-300 text-sm"
                    />
                  </div>

                  {/* Location & Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-foreground">Preferred Location</label>
                      <Select value={formData.preferredLocation} onValueChange={(value) => handleSelectChange('preferredLocation', value)}>
                        <SelectTrigger className="border-gray-300 text-sm">
                          <SelectValue placeholder="Select Location" />
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
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-foreground">Carpet Area</label>
                      <Select value={formData.carpetArea} onValueChange={(value) => handleSelectChange('carpetArea', value)}>
                        <SelectTrigger className="border-gray-300 text-sm">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent>
                          {carpetAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area} sq.ft
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Budget & Furnishing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-foreground">Budget</label>
                      <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger className="border-gray-300 text-sm">
                          <SelectValue placeholder="Select Budget" />
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
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-foreground">Furnishing Type</label>
                      <Select value={formData.furnishingType} onValueChange={(value) => handleSelectChange('furnishingType', value)}>
                        <SelectTrigger className="border-gray-300 text-sm">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {furnishingTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-foreground">Move-in Timeline</label>
                    <Select value={formData.moveInTimeline} onValueChange={(value) => handleSelectChange('moveInTimeline', value)}>
                      <SelectTrigger className="border-gray-300 text-sm">
                        <SelectValue placeholder="Select Timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white hover:bg-primary/90 mt-4 sm:mt-6 shadow-lg text-sm sm:text-base"
                    size="lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Matching Offices'}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm font-medium text-center"
                    >
                      ✓ Thank you! We'll contact you soon with matching options.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm font-medium text-center"
                    >
                      ✗ Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
