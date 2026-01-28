import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { CommercialProperties } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Maximize2, IndianRupee, Sofa } from 'lucide-react';

export default function PropertiesSection() {
  const [properties, setProperties] = useState<CommercialProperties[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<CommercialProperties[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [locationFilter, setLocationFilter] = useState('');
  const [carpetAreaFilter, setCarpetAreaFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [furnishingFilter, setFurnishingFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');

  const locations = ['Baner', 'Balewadi', 'Wakad', 'Aundh', 'Hinjewadi', 'PCMC', 'Pashan'];
  const carpetAreas = ['300-600', '600-1000', '1000-1800', '1800+'];
  const budgets = ['₹40k-₹75k', '₹75k-₹1.2L', '₹1.2L-₹2L', '₹2L-₹3L', '₹3L+'];
  const furnishingTypes = ['Plug & Play', 'Semi-Furnished', 'Bare Shell', 'Warm Shell'];
  const propertyTypes = [
    'IT / ITES office',
    'Corporate office',
    'Plug-and-play office',
    'Semi-furnished office',
    'Bare shell office',
    'Boutique commercial',
    'Business park office',
  ];

  useEffect(() => {
    loadProperties();
  }, [skip]);

  useEffect(() => {
    applyFilters();
  }, [properties, locationFilter, carpetAreaFilter, budgetFilter, furnishingFilter, propertyTypeFilter]);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<CommercialProperties>('commercialproperties', [], { skip, limit: 50 });
      
      if (skip === 0) {
        setProperties(result.items);
      } else {
        setProperties(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
      setTotalCount(result.totalCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (locationFilter) {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    if (carpetAreaFilter) {
      filtered = filtered.filter(p => {
        const area = p.carpetArea || 0;
        if (carpetAreaFilter === '300-600') return area >= 300 && area < 600;
        if (carpetAreaFilter === '600-1000') return area >= 600 && area < 1000;
        if (carpetAreaFilter === '1000-1800') return area >= 1000 && area < 1800;
        if (carpetAreaFilter === '1800+') return area >= 1800;
        return true;
      });
    }

    if (budgetFilter) {
      filtered = filtered.filter(p => {
        const min = p.budgetMin || 0;
        const max = p.budgetMax || 0;
        
        if (budgetFilter === '₹40k-₹75k') return min <= 75000 && max >= 40000;
        if (budgetFilter === '₹75k-₹1.2L') return min <= 120000 && max >= 75000;
        if (budgetFilter === '₹1.2L-₹2L') return min <= 200000 && max >= 120000;
        if (budgetFilter === '₹2L-₹3L') return min <= 300000 && max >= 200000;
        if (budgetFilter === '₹3L+') return max >= 300000;
        return true;
      });
    }

    if (furnishingFilter) {
      filtered = filtered.filter(p => 
        p.furnishingType?.toLowerCase().includes(furnishingFilter.toLowerCase())
      );
    }

    if (propertyTypeFilter) {
      filtered = filtered.filter(p => 
        p.propertyType?.toLowerCase().includes(propertyTypeFilter.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleLoadMore = () => {
    setSkip(prev => prev + 50);
  };

  const handleGetDetails = (property: CommercialProperties) => {
    const message = `Hi, I'm interested in ${property.propertyName || 'a property'}.\n\nLocation: ${property.location}\nCarpet Area: ${property.carpetArea} sq.ft\nBudget: ₹${property.budgetMin?.toLocaleString()} - ₹${property.budgetMax?.toLocaleString()}\nFurnishing: ${property.furnishingType}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const clearFilters = () => {
    setLocationFilter('');
    setCarpetAreaFilter('');
    setBudgetFilter('');
    setFurnishingFilter('');
    setPropertyTypeFilter('');
  };

  const isTopPriority = (carpetArea?: number) => {
    if (!carpetArea) return false;
    return carpetArea >= 600 && carpetArea < 1000;
  };

  return (
    <section id="properties" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
        <div style={{ minHeight: '600px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
              Explore 100+ Commercial Properties
            </h2>
            <p className="font-paragraph text-lg text-[-soft -graphite] max-w-3xl mx-auto">
              Find the perfect office space across Pune's prime commercial locations
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[-warm -light -grey] rounded-2xl p-6 mb-12"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={carpetAreaFilter} onValueChange={setCarpetAreaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Carpet Area" />
                </SelectTrigger>
                <SelectContent>
                  {carpetAreas.map(area => (
                    <SelectItem key={area} value={area}>{area} sq.ft</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map(budget => (
                    <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={furnishingFilter} onValueChange={setFurnishingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Furnishing" />
                </SelectTrigger>
                <SelectContent>
                  {furnishingTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(locationFilter || carpetAreaFilter || budgetFilter || furnishingFilter || propertyTypeFilter) && (
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>

          {/* Properties Grid */}
          {isLoading && skip === 0 ? null : (
            <>
              {filteredProperties.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProperties.map((property, idx) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                        {property.mainImage && (
                          <div className="relative">
                            <Image
                              src={property.mainImage}
                              alt={property.propertyName || 'Commercial Property'}
                              width={400}
                              className="w-full h-48 object-cover"
                            />
                            {isTopPriority(property.carpetArea) && (
                              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                                Top Priority
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                          <div className="space-y-2 flex-1">
                            <h3 className="font-heading text-xl font-semibold text-foreground">
                              {property.propertyName || 'Commercial Office Space'}
                            </h3>
                            
                            <div className="space-y-2">
                              <div className="flex items-center text-[-soft -graphite]">
                                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="font-paragraph text-sm">{property.location}</span>
                              </div>
                              
                              <div className="flex items-center text-[-soft -graphite]">
                                <Maximize2 className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="font-paragraph text-sm">{property.carpetArea} sq.ft</span>
                              </div>
                              
                              <div className="flex items-center text-[-soft -graphite]">
                                <IndianRupee className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="font-paragraph text-sm">
                                  ₹{property.budgetMin?.toLocaleString()} - ₹{property.budgetMax?.toLocaleString()}
                                </span>
                              </div>
                              
                              <div className="flex items-center text-[-soft -graphite]">
                                <Sofa className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="font-paragraph text-sm">{property.furnishingType}</span>
                              </div>
                            </div>

                            {property.propertyType && (
                              <Badge variant="secondary" className="text-xs">
                                {property.propertyType}
                              </Badge>
                            )}
                          </div>

                          <Button
                            onClick={() => handleGetDetails(property)}
                            className="w-full bg-primary text-primary-foreground hover:bg-[-subtle -highlight]"
                          >
                            Get Details
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-paragraph text-lg text-[-soft -graphite]">
                    No properties found matching your filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}

              {/* Load More */}
              {hasNext && !isLoading && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
