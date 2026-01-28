/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: commercialproperties
 * Interface for CommercialProperties
 */
export interface CommercialProperties {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  propertyName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  carpetArea?: number;
  /** @wixFieldType number */
  budgetMin?: number;
  /** @wixFieldType number */
  budgetMax?: number;
  /** @wixFieldType text */
  furnishingType?: string;
  /** @wixFieldType text */
  propertyType?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType boolean */
  isYashadaBusinessZone?: boolean;
  /** @wixFieldType text */
  highlights?: string;
  /** @wixFieldType text */
  rentSlabLabel?: string;
}


/**
 * Collection ID: featuredprojects
 * Interface for FeaturedProjects
 */
export interface FeaturedProjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType number */
  activeOfficeOptionsCount?: number;
  /** @wixFieldType text */
  suitableFor?: string;
  /** @wixFieldType text */
  buildingFeatures?: string;
  /** @wixFieldType text */
  locationAdvantages?: string;
}


/**
 * Collection ID: leadpriorityrules
 * Interface for LeadPriorityRules
 */
export interface LeadPriorityRules {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  carpetAreaRangeDisplay?: string;
  /** @wixFieldType number */
  minCarpetArea?: number;
  /** @wixFieldType number */
  maxCarpetArea?: number;
  /** @wixFieldType number */
  priorityPercentage?: number;
  /** @wixFieldType text */
  priorityLabel?: string;
}


/**
 * Collection ID: leads
 * Interface for Leads
 */
export interface Leads {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  preferredLocation?: string;
  /** @wixFieldType text */
  carpetArea?: string;
  /** @wixFieldType text */
  budget?: string;
  /** @wixFieldType text */
  furnishingType?: string;
  /** @wixFieldType text */
  moveInTimeline?: string;
}


/**
 * Collection ID: locations
 * Interface for Locations
 */
export interface Locations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  locationName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  locationImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: propertytypes
 * Interface for PropertyTypes
 */
export interface PropertyTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  typeName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  typeImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}
