import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { PropertyTypes } from '@/entities';
import { Image } from '@/components/ui/image';
import { Building2 } from 'lucide-react';

export default function PropertyTypesSection() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPropertyTypes();
  }, []);

  const loadPropertyTypes = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<PropertyTypes>('propertytypes');
      const sortedTypes = result.items.sort((a, b) => 
        (a.displayOrder || 0) - (b.displayOrder || 0)
      );
      setPropertyTypes(sortedTypes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <section id="types" className="py-16 lg:py-24 bg-background">
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
              Property Types
            </h2>
            <p className="font-paragraph text-lg text-[-soft -graphite] max-w-3xl mx-auto">
              Diverse commercial office spaces tailored to your business needs
            </p>
          </motion.div>

          {/* Property Types Grid */}
          {isLoading ? null : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {propertyTypes.map((type, idx) => (
                <motion.div
                  key={type._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full">
                    {type.typeImage ? (
                      <div className="relative overflow-hidden">
                        <Image
                          src={type.typeImage}
                          alt={type.typeName || 'Property Type'}
                          width={400}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-heading text-lg font-semibold text-white">
                            {type.typeName}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[-warm -light -grey] h-48 flex items-center justify-center">
                        <Building2 className="h-16 w-16 text-primary" />
                      </div>
                    )}
                    
                    {type.description && (
                      <div className="p-4">
                        <p className="font-paragraph text-sm text-[-soft -graphite] line-clamp-3">
                          {type.description}
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
