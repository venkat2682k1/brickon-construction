export type NavSection = 'home' | 'about' | 'our-story' | 'projects' | 'pricing' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Villas' | 'Industrial' | 'Interiors';
  location: string;
  year: string;
  areaSqFt: number;
  duration: string;
  completionDate: string;
  image: string;
  gallery: string[];
  description: string;
  scope: string[];
  structuralHighlights: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  features: string[];
  image: string;
  deliverables: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  metric?: string;
  image: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  pricePerSqFt: number;
  idealFor: string;
  description: string;
  features: string[];
  specifications: {
    structure: string;
    flooring: string;
    doorsWindows: string;
    electricalPlumbing: string;
    finishes: string;
  };
}

export interface CostEstimateInput {
  projectType: 'residential_standard' | 'luxury_villa' | 'commercial_office' | 'duplex_home' | 'industrial_warehouse';
  areaSqFt: number;
  finishQuality: 'standard' | 'premium' | 'ultra_luxury';
  floors: number;
  addons: {
    smartHome: boolean;
    solarPanels: boolean;
    landscaping: boolean;
    interiorDesign: boolean;
    rainwaterHarvesting: boolean;
    basementParking: boolean;
  };
}

export interface CostEstimateResult {
  baseCost: number;
  addonsCost: number;
  architecturalAndPermitCost: number;
  totalCost: number;
  estimatedTimelineMonths: number;
  pricePerSqFt: number;
}
