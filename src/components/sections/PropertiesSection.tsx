import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { CommercialProperties } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Maximize2, IndianRupee, ArrowRight } from 'lucide-react';

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
      const result = await BaseCrudService.getAll<CommercialProperties>('commercialproperties', [], { limit: 6 });
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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 sm:h-96 animate-pulse" />
            ))
          ) : properties.length > 0 ? (
            properties.map((property, index) => (
              <PropertyCard key={property._id} property={property} index={index} onOpenPopup={onOpenPopup} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
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

function PropertyCard({ property, index, onOpenPopup }: { property: CommercialProperties; index: number; onOpenPopup?: () => void }) {
  const formatPrice = (price?: number) => {
    if (!price) return 'Contact';
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}k`;
    return `₹${price}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
        {property.mainImage ? (
          <Image
            src={property.mainImage}
            alt={property.propertyName || 'Office Space'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Maximize2 className="h-8 w-8 sm:h-12 sm:w-12" />
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-md text-xs font-bold text-foreground">
          {property.propertyType || 'Office'}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="flex-1">
            <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-foreground mb-1">
              {property.propertyName || 'Commercial Space'}
            </h3>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              {property.location || 'Pune'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary text-base sm:text-lg">
              {formatPrice(property.budgetMin)}
            </div>
            <div className="text-xs text-gray-600">/month</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 border-t border-b border-gray-200">
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Area</div>
            <div className="font-semibold text-foreground text-xs sm:text-sm">
              {property.carpetArea ? `${property.carpetArea} sq.ft` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Furnishing</div>
            <div className="font-semibold text-foreground text-xs sm:text-sm">
              {property.furnishingType || 'N/A'}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button onClick={onOpenPopup} className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-gray-100 text-foreground font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white text-xs sm:text-sm">
          Get Details
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  );
}
