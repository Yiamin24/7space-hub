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
    { name: 'Baner', image: 'https://static.wixstatic.com/media/cef78c_28c19df83a204c9c9beb8f3e964fec31~mv2.png?originWidth=256&originHeight=256', displayOrder: 1 },
    { name: 'Balewadi', image: 'https://static.wixstatic.com/media/cef78c_e06c813327404f939229dd82a09383a4~mv2.png?originWidth=256&originHeight=256', displayOrder: 2 },
    { name: 'Wakad', image: 'https://static.wixstatic.com/media/cef78c_ef3498e5e489417ca80d038f20b8fe1e~mv2.png?originWidth=256&originHeight=256', displayOrder: 3 },
    { name: 'Aundh', image: 'https://static.wixstatic.com/media/cef78c_40f8de4ac0f84e01acc89b82979825dc~mv2.png?originWidth=256&originHeight=256', displayOrder: 4 },
    { name: 'Hinjewadi', image: 'https://static.wixstatic.com/media/cef78c_5a27814c3eca4def86457e687aa16077~mv2.png?originWidth=256&originHeight=256', displayOrder: 5 },
    { name: 'PCMC', image: 'https://static.wixstatic.com/media/cef78c_ccae30bd7333481d93e1951c82e942f2~mv2.png?originWidth=256&originHeight=256', displayOrder: 6 },
    { name: 'Pashan', image: 'https://static.wixstatic.com/media/cef78c_ac015516689e42699888e2f44268d4c0~mv2.png?originWidth=256&originHeight=256', displayOrder: 7 },
  ];

  const displayLocations = locations.length > 0 ? locations : defaultLocations;

  return (
    <section id="locations" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Primary Focus Locations
          </h2>
          <p className="font-paragraph text-sm sm:text-base md:text-lg text-gray-600">
            Explore office spaces in Pune's 7 most sought-after business districts with excellent connectivity, infrastructure, and business ecosystem.
          </p>
        </motion.div>

        {/* Locations Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 rounded-lg sm:rounded-xl animate-pulse" />
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
      className="group relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <Image
        src={location.locationImage || location.image || 'https://static.wixstatic.com/media/cef78c_c3f12195e0e0441196b18d796f94388e~mv2.png?originWidth=256&originHeight=256'}
        alt={location.locationName || location.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6">
        <h3 className="text-white font-heading text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
          {location.locationName || location.name}
        </h3>
        <div className="flex items-center text-white/80 text-xs sm:text-sm group-hover:text-white transition-colors">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          View Properties
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
