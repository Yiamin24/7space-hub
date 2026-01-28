import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { CommercialProperties } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Maximize2, IndianRupee, ArrowRight } from 'lucide-react';

export default function PropertiesSection() {
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
    <section id="properties" className="py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Available Office Spaces
          </h2>
          <p className="font-paragraph text-lg text-gray-600">
            Browse our curated selection of verified commercial properties across Pune's leading business hubs.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse" />
            ))
          ) : properties.length > 0 ? (
            properties.map((property, index) => (
              <PropertyCard key={property._id} property={property} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No properties available at the moment.</p>
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
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Load More Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ property, index }: { property: CommercialProperties; index: number }) {
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
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {property.mainImage ? (
          <Image
            src={property.mainImage}
            alt={property.propertyName || 'Office Space'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Maximize2 className="h-12 w-12" />
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-foreground">
          {property.propertyType || 'Office'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-heading text-xl font-bold text-foreground mb-1">
              {property.propertyName || 'Commercial Space'}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location || 'Pune'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary text-lg">
              {formatPrice(property.budgetMin)}
            </div>
            <div className="text-xs text-gray-600">/month</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Area</div>
            <div className="font-semibold text-foreground">
              {property.carpetArea ? `${property.carpetArea} sq.ft` : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Furnishing</div>
            <div className="font-semibold text-foreground">
              {property.furnishingType || 'N/A'}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 py-3 bg-gray-100 text-foreground font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
          Get Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
