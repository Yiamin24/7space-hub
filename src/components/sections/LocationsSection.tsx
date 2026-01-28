import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Locations } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, ArrowRight } from 'lucide-react';

export default function LocationsSection() {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Locations>('locations');
      const sortedLocations = result.items.sort((a, b) =>
        (a.displayOrder || 0) - (b.displayOrder || 0)
      );
      setLocations(sortedLocations);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultLocations = [
    { name: 'Baner', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
    { name: 'Balewadi', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
    { name: 'Wakad', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
    { name: 'Aundh', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
    { name: 'Hinjewadi', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
    { name: 'PCMC', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
    { name: 'Pashan', image: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png' },
  ];

  const displayLocations = locations.length > 0 ? locations : defaultLocations;

  return (
    <section id="locations" className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Locations Across Pune
          </h2>
          <p className="font-paragraph text-lg text-gray-600">
            Explore office spaces in Pune's most sought-after business districts with excellent connectivity and amenities.
          </p>
        </motion.div>

        {/* Locations Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
            ))
          ) : (
            displayLocations.map((location, i) => (
              <LocationCard
                key={location._id || location.name}
                location={location}
                index={i}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location, index }: { location: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05 }}
      className="group relative h-64 rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <Image
        src={location.locationImage || location.image || 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png'}
        alt={location.locationName || location.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-white font-heading text-2xl font-bold mb-2">
          {location.locationName || location.name}
        </h3>
        <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors">
          <MapPin className="w-4 h-4 mr-1" />
          View Properties
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
