import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { CommercialProperties } from '@/entities';
import { ArrowRight } from 'lucide-react';
import OfficeSpacesCarousel from './OfficeSpacesCarousel';

interface PropertiesSectionProps {
  onOpenPopup?: () => void;
}

export default function PropertiesSection({ onOpenPopup }: PropertiesSectionProps) {
  const [properties, setProperties] = useState<CommercialProperties[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<CommercialProperties>('commercialproperties', {}, { limit: 6 });
      setProperties(result.items);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="properties" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Available Office Spaces
          </h2>
          <p className="font-paragraph text-sm sm:text-base md:text-lg text-gray-600">
            Browse our curated selection of verified commercial properties across Pune's leading business hubs.
          </p>
        </motion.div>

        {/* Properties Carousel */}
        <div className="mb-8 sm:mb-12">
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-80 sm:h-96 animate-pulse" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <OfficeSpacesCarousel properties={properties} onOpenPopup={onOpenPopup} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-sm sm:text-base">No properties available at the moment.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!isLoading && properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm sm:text-base"
            >
              Load More Properties
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
