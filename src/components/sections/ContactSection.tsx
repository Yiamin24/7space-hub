import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { Leads } from '@/entities';
import { CheckCircle2, Send } from 'lucide-react';

export default function ContactSection() {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = ['300-600 sq.ft', '600-1000 sq.ft', '1000-1800 sq.ft', 'Above 1800 sq.ft'];
  const budgets = [
    '₹40,000 - ₹75,000',
    '₹75,000 - ₹1,20,000',
    '₹1,20,000 - ₹2,00,000',
    '₹2,00,000 - ₹3,00,000',
    'Above ₹3,00,000',
  ];
  const furnishingTypes = ['Plug & Play', 'Semi-Furnished', 'Bare Shell', 'Warm Shell'];
  const timelines = ['Immediate', 'Within 1 month', '1-3 months', '3-6 months', 'Flexible'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in at least your name and phone number');
      return;
    }

    setIsSubmitting(true);

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

      setIsSubmitted(true);
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
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      alert('Failed to submit. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    const message = `Hi, I'm interested in commercial office spaces in Pune.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nLocation: ${formData.preferredLocation || 'Any'}\nCarpet Area: ${formData.carpetArea || 'Any'}\nBudget: ${formData.budget || 'Any'}\nFurnishing: ${formData.furnishingType || 'Any'}\nMove-in: ${formData.moveInTimeline || 'Flexible'}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
            Get Available Options Quickly
          </h2>
          <p className="font-paragraph text-lg text-[-soft -graphite] max-w-3xl mx-auto">
            Share your requirements and we'll connect you with the best matching properties
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                      <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground">
                    Thank You!
                  </h3>
                  <p className="font-paragraph text-[-soft -graphite]">
                    We've received your requirements and will get back to you shortly with matching options.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Preferred Location
                      </label>
                      <Select value={formData.preferredLocation} onValueChange={(value) => handleInputChange('preferredLocation', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
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

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Carpet Area
                      </label>
                      <Select value={formData.carpetArea} onValueChange={(value) => handleInputChange('carpetArea', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select carpet area" />
                        </SelectTrigger>
                        <SelectContent>
                          {carpetAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Budget
                      </label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
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
                        Furnishing Type
                      </label>
                      <Select value={formData.furnishingType} onValueChange={(value) => handleInputChange('furnishingType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select furnishing" />
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

                    <div>
                      <label className="font-paragraph text-sm font-medium text-foreground mb-2 block">
                        Move-in Timeline
                      </label>
                      <Select value={formData.moveInTimeline} onValueChange={(value) => handleInputChange('moveInTimeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
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

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-[-subtle -highlight]"
                      size="lg"
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Get Matching Offices
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      variant="outline"
                      className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                      size="lg"
                    >
                      WhatsApp Requirement
                    </Button>
                  </div>

                  <div className="text-center pt-4">
                    <p className="font-paragraph text-sm text-[-soft -graphite]">
                      <CheckCircle2 className="inline h-4 w-4 mr-1 text-primary" />
                      Verified options • Fast response • Site visit assistance
                    </p>
                  </div>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
