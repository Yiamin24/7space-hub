import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { Locations } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin } from 'lucide-react';

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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <section id="locations" className="py-16 lg:py-24 bg-[-warm -light -grey]">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div style={{ minHeight: '400px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
              Locations We Cover
            </h2>
            <p className="font-paragraph text-lg text-[-soft -graphite] max-w-3xl mx-auto">
              Prime commercial hubs across Pune with excellent connectivity and infrastructure
            </p>
          </motion.div>

          {/* Locations Grid */}
          {isLoading ? null : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {locations.map((location, idx) => (
                <motion.div
                  key={location._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    {location.locationImage && (
                      <div className="relative overflow-hidden">
                        <Image
                          src={location.locationImage}
                          alt={location.locationName || 'Location'}
                          width={400}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center text-white">
                            <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                            <h3 className="font-heading text-xl font-semibold">
                              {location.locationName}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {location.description && (
                      <div className="p-4">
                        <p className="font-paragraph text-sm text-[-soft -graphite] line-clamp-2">
                          {location.description}
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
