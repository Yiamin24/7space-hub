import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { FeaturedProjects, CommercialProperties } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Building2, CheckCircle2, Phone } from 'lucide-react';

export default function FeaturedPrioritySection() {
  const [yashadaProject, setYashadaProject] = useState<FeaturedProjects | null>(null);
  const [yashadaProperties, setYashadaProperties] = useState<CommercialProperties[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadYashadaData();
  }, []);

  const loadYashadaData = async () => {
    try {
      setIsLoading(true);
      
      const projectsResult = await BaseCrudService.getAll<FeaturedProjects>('featuredprojects');
      const yashada = projectsResult.items.find(p => 
        p.projectName?.toLowerCase().includes('yashada')
      );
      setYashadaProject(yashada || null);

      const propertiesResult = await BaseCrudService.getAll<CommercialProperties>('commercialproperties');
      const yashadaProps = propertiesResult.items.filter(p => 
        p.isYashadaBusinessZone === true
      );
      setYashadaProperties(yashadaProps);
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleEnquire = (property?: CommercialProperties) => {
    const message = property 
      ? `Hi, I'm interested in ${property.propertyName || 'a property'} at Yashada Business Zone.\n\nCarpet Area: ${property.carpetArea} sq.ft\nRent: ${property.rentSlabLabel}\nFurnishing: ${property.furnishingType}`
      : 'Hi, I'm interested in Yashada Business Zone properties. Please share available options.';
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallBack = () => {
    window.location.href = 'tel:+919876543210';
  };

  const buildingFeatures = [
    'Grand common lobby',
    'Ample parking',
    'Energy-efficient design',
    'DG backup',
    'Rainwater harvesting',
    '12 ft floor-to-floor height',
    'Fire fighting system',
    'Vastu-compliant planning',
    'Multiple lifts',
  ];

  const locationAdvantages = [
    'Proposed metro station nearby',
    'Westend Mall (~0.5 km)',
    'D Mart (~1 km)',
    'Balewadi Stadium (~1.5 km)',
    'Hinjewadi IT Park (~9 km)',
  ];

  return (
    <section id="yashada" className="py-16 lg:py-24 bg-[-warm -light -grey]">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div style={{ minHeight: isLoading ? '600px' : 'auto' }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                  PRIORITY ASSET
                </Badge>
                <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
                  {yashadaProject?.projectName || 'Yashada Business Zone – Baner'}
                </h2>
                <p className="font-paragraph text-lg lg:text-xl text-[-soft -graphite] max-w-3xl mx-auto">
                  {yashadaProject?.projectDescription || '~30 active office options in a single premium business hub'}
                </p>
              </motion.div>

              {/* Main Image & Highlights */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {yashadaProject?.mainImage && (
                    <Image
                      src={yashadaProject.mainImage}
                      alt={yashadaProject.projectName || 'Yashada Business Zone'}
                      width={800}
                      className="w-full h-[400px] object-cover rounded-2xl"
                    />
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                      Highlights
                    </h3>
                    <div className="grid gap-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <p className="font-paragraph text-[-soft -graphite]">
                          {yashadaProject?.location || 'Baner prime commercial location'}
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Building2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <p className="font-paragraph text-[-soft -graphite]">
                          {yashadaProject?.activeOfficeOptionsCount || '~30'} Active Options
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <p className="font-paragraph text-[-soft -graphite]">
                          Plug & Play / Semi-Furnished / Bare Shell
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <p className="font-paragraph text-[-soft -graphite]">
                          {yashadaProject?.suitableFor || 'Suitable for IT / ITES & Corporate offices'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Features Grid */}
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-background rounded-2xl p-6 lg:p-8"
                >
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    Building Features
                  </h3>
                  <ul className="space-y-3">
                    {(yashadaProject?.buildingFeatures?.split('\n') || buildingFeatures).map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-paragraph text-[-soft -graphite]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-background rounded-2xl p-6 lg:p-8"
                >
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    Location Advantage
                  </h3>
                  <ul className="space-y-3">
                    {(yashadaProject?.locationAdvantages?.split('\n') || locationAdvantages).map((advantage, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="font-paragraph text-[-soft -graphite]">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Availability Cards */}
              {yashadaProperties.length > 0 && (
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 text-center">
                    Available Options
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {yashadaProperties.slice(0, 6).map((property, idx) => (
                      <motion.div
                        key={property._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                          <div className="space-y-2">
                            <p className="font-heading text-lg font-semibold text-foreground">
                              {property.carpetArea} sq.ft
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {property.rentSlabLabel}
                            </Badge>
                          </div>
                          <p className="font-paragraph text-sm text-[-soft -graphite]">
                            {property.furnishingType}
                          </p>
                          <Button
                            onClick={() => handleEnquire(property)}
                            className="w-full bg-primary text-primary-foreground hover:bg-[-subtle -highlight]"
                            size="sm"
                          >
                            Enquire Now
                          </Button>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
              >
                <Button
                  onClick={handleCallBack}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Request Call Back
                </Button>
                <Button
                  onClick={() => handleEnquire()}
                  size="lg"
                  className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20BA5A]"
                >
                  WhatsApp Now
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
