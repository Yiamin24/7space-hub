import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Leads } from '@/entities';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: '',
    carpetArea: '',
    budget: '',
    moveInTimeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = ['300-600', '600-1000', '1000-1800', '1800+'];
  const budgets = ['₹40k-₹75k', '₹75k-₹1.2L', '₹1.2L-₹2L', '₹2L-₹3L', '₹3L+'];
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
        moveInTimeline: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-foreground text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full bg-primary/5 skew-x-12 pointer-events-none" />

      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-16 lg:grid-cols-2">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Find Your Ideal Office Space
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Share your requirements and we'll connect you with verified office spaces that match your needs. Fast response, expert guidance, and site visit assistance.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-3 sm:space-y-4">
              <motion.a
                href="tel:+919740740366"
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">Call Us Directly</div>
                  <div className="text-base sm:text-lg font-bold truncate">+91 97407 40366</div>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/919740740366"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">WhatsApp Support</div>
                  <div className="text-base sm:text-lg font-bold">Chat Now</div>
                </div>
              </motion.a>

              <motion.a
                href="mailto:official@7doors.in"
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">Email Us</div>
                  <div className="text-base sm:text-lg font-bold truncate">official@7doors.in</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white text-foreground p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl"
          >
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Send Your Requirements</h3>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-foreground">Name</label>
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
                  <label className="text-xs sm:text-sm font-bold text-foreground">Phone</label>
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
                <label className="text-xs sm:text-sm font-bold text-foreground">Email</label>
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

              {/* Budget & Timeline */}
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
                  className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm font-medium"
                >
                  ✓ Thank you! We'll contact you soon with matching options.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm font-medium"
                >
                  ✗ Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
