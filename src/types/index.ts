export interface TravelInput {
  budget: number;
  startDate: Date | null;
  endDate: Date | null;
  people: number;
  accommodationTier: number;
}

export interface TravelRecommendation {
  id: number;
  name: string;
  country: string;
  description: string;
  themes: string[];
  images: string[];
  recommendedMonths: number[];
}

export interface Theme {
  id: string;
  label: string;
}

export interface Climate {
  month: number;
  avgTemp: number;
  rainDays: number;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  seasonScore: number;
  themeScore: number;
  recommendedMonths: number[];
  themes: string[];
  monthlyClimate: Climate[];
  images: string[];
  highlights: {
    [key: string]: string[];
  };
}

export interface RecommendationRequest {
  startDate: string;
  endDate: string;
  themes: string[];
}

export interface RecommendationResponse {
  destinations: Destination[];
  totalCount: number;
} 