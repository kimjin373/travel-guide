export interface TravelRecommendation {
  destination: string;
  totalCost: number;
  score: number;
  breakdown: {
    flight: number;
    hotel: number;
    food: number;
    activity: number;
  };
  images: string[];
  climate: {
    temperature: number;
    weather: string;
  };
  currency: {
    code: string;
    rate: number;
  };
  description?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  themes?: string[];
}

export interface WeatherData {
  temperature: number;
  condition: string;
}

export interface ExchangeRate {
  code: string;
  rate: number;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  images: string[];
  coordinates: {
    lat: number;
    lon: number;
  };
  themes: string[];
  seasonScore: number;
  themeScore: number;
  recommendedMonths: number[];
  monthlyClimate: {
    [key: number]: {
      temperature: number;
      precipitation: number;
    };
  };
  highlights: {
    [key: string]: string[];
  };
}

export interface FlightPrice {
  price: number;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
} 