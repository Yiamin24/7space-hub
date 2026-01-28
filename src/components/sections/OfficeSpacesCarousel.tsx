import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CommercialProperties } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Maximize2, ArrowRight } from 'lucide-react';

interface OfficeSpacesCarouselProps {
  properties: CommercialProperties[];
  onOpenPopup?: () => void;
}

export default function OfficeSpacesCarousel({ properties, onOpenPopup }: OfficeSpacesCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [xPosition, setXPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCardsPerView(mobile ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Infinite carousel animation
  useEffect(() => {
    const cardWidth = 100 / cardsPerView;
    const totalWidth = properties.length * cardWidth;

    const animate = () => {
      setXPosition((prev) => {
        const newPos = prev - 0.5;
        // Reset to start when we've scrolled one full set
        if (newPos <= -totalWidth) {
          return 0;
        }
        return newPos;
      });
    };

    animationRef.current = setInterval(animate, 30);

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [cardsPerView, properties.length]);

  const formatPrice = (price?: number) => {
    if (!price) return 'Contact';
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}k`;
    return `₹${price}`;
  };

  if (properties.length === 0) return null;

  // Duplicate properties for seamless loop
  const duplicatedProperties = [...properties, ...properties];
  const cardWidth = 100 / cardsPerView;

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
      >
        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-8"
          style={{
            x: `${xPosition}%`,
          }}
          transition={{ type: 'tween', duration: 0 }}
        >
          {duplicatedProperties.map((property, index) => (
            <div
              key={`${property._id}-${index}`}
              className="flex-shrink-0"
              style={{
                width: `calc(${cardWidth}% - ${(4 * (cardsPerView - 1)) / cardsPerView}rem)`,
              }}
            >
              <PropertyCard
                property={property}
                onOpenPopup={onOpenPopup}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

function PropertyCard({ property, onOpenPopup }: { property: CommercialProperties; onOpenPopup?: () => void }) {
  const formatPrice = (price?: number) => {
    if (!price) return 'Contact';
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}k`;
    return `₹${price}`;
  };

  return (
    <div className="group bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
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
      <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="flex-1">
            <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 line-clamp-2">
              {property.propertyName || 'Commercial Space'}
            </h3>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{property.location || 'Pune'}</span>
            </div>
          </div>
          <div className="text-right ml-2 flex-shrink-0">
            <div className="font-bold text-primary text-base sm:text-lg">
              {formatPrice(property.budgetMin)}
            </div>
            <div className="text-xs text-gray-600">/month</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 border-t border-b border-gray-200 my-auto">
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
        <button
          onClick={onOpenPopup}
          className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-gray-100 text-foreground font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white text-xs sm:text-sm"
        >
          Get Details
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
