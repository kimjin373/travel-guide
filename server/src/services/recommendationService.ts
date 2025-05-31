import axios from 'axios';
import { TravelRecommendation } from '../types';
import { getFlightPrices } from './flightService';
import { getHotelPrices } from './hotelService';
import { getWeatherData } from './weatherService';
import { getExchangeRate } from './currencyService';
import { getDestinations } from './destinationService';
import { logger } from '../utils/logger';

interface RecommendationInput {
  budget: number;
  startDate: Date;
  endDate: Date;
  people: number;
  accommodationTier: number;
  themes: string[];
}

export async function getRecommendations(input: RecommendationInput): Promise<TravelRecommendation[]> {
  try {
    logger.info('getRecommendations: Starting to fetch destinations...');
    const destinations = await getDestinations(input);
    logger.info(`getRecommendations: Found ${destinations.length} destinations.`);

    if (destinations.length === 0) {
      logger.warn('getRecommendations: No destinations found.');
      return [];
    }

    // 테마 기반 필터링
    const filteredDestinations = input.themes.length > 0
      ? destinations.filter(dest => 
          input.themes.some(theme => dest.themes.includes(theme))
        )
      : destinations;

    if (filteredDestinations.length === 0) {
      logger.warn('getRecommendations: No destinations match the selected themes.');
      return [];
    }

    logger.info('getRecommendations: Collecting detailed information for each destination...');
    const recommendations = await Promise.all(
      filteredDestinations.map(async (destination) => {
        try {
          // 각 API 호출을 개별적으로 처리하고 실패 시 기본값 사용
          let flightPrice = 0;
          let hotelPrice = 0;
          let weather = { temperature: 25, condition: '맑음' };
          let exchangeRate = { code: 'KRW', rate: 1 };

          try {
            flightPrice = await getFlightPrices(destination, input);
          } catch (error) {
            logger.warn(`Failed to get flight prices for ${destination.name}:`, error);
            flightPrice = 300000; // 기본값 설정
          }

          try {
            hotelPrice = await getHotelPrices(destination, input);
          } catch (error) {
            logger.warn(`Failed to get hotel prices for ${destination.name}:`, error);
            hotelPrice = 100000; // 기본값 설정
          }

          try {
            weather = await getWeatherData(destination, input.startDate);
          } catch (error) {
            logger.warn(`Failed to get weather data for ${destination.name}:`, error);
          }

          try {
            exchangeRate = await getExchangeRate(destination);
          } catch (error) {
            logger.warn(`Failed to get exchange rate for ${destination.name}:`, error);
          }

          const duration = calculateDuration(input.startDate, input.endDate);
          const totalCost = calculateTotalCost({
            flightPrice,
            hotelPrice,
            people: input.people,
            duration
          });

          // 테마 매칭 점수 계산
          const themeScore = calculateThemeScore(destination.themes, input.themes);
          
          const score = calculateRecommendationScore({
            totalCost,
            budget: input.budget,
            weather,
            exchangeRate,
            themeScore
          });

          logger.info(`getRecommendations: Processed ${destination.name}. Total Cost: ${totalCost}, Score: ${score}`);

          return {
            destination: destination.name,
            totalCost,
            score,
            breakdown: {
              flight: flightPrice * input.people,
              hotel: hotelPrice * input.people * duration,
              food: calculateFoodCost(destination, input),
              activity: calculateActivityCost(destination, input)
            },
            images: destination.images,
            climate: {
              temperature: weather.temperature,
              weather: weather.condition
            },
            currency: {
              code: exchangeRate.code,
              rate: exchangeRate.rate
            },
            description: destination.description,
            coordinates: destination.coordinates,
            themes: destination.themes
          };
        } catch (destError) {
          logger.error(`getRecommendations: Error processing destination ${destination.name}:`, destError);
          return null;
        }
      })
    );

    const validRecommendations = recommendations.filter(rec => rec !== null) as TravelRecommendation[];

    if (validRecommendations.length === 0) {
      logger.warn('getRecommendations: No valid recommendations after processing.');
      return [];
    }

    const filteredAndSortedRecommendations = validRecommendations
      .filter(rec => rec.totalCost <= input.budget)
      .sort((a, b) => b.score - a.score);

    logger.info(`getRecommendations: Final recommendations count after filtering/sorting: ${filteredAndSortedRecommendations.length}`);

    return filteredAndSortedRecommendations;
  } catch (error) {
    logger.error('getRecommendations: Error getting recommendations:', error);
    throw error;
  }
}

// Helper functions
function calculateDuration(startDate: Date, endDate: Date): number {
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}

function calculateTotalCost({
  flightPrice,
  hotelPrice,
  people,
  duration
}: {
  flightPrice: number;
  hotelPrice: number;
  people: number;
  duration: number;
}): number {
  return (flightPrice + hotelPrice * duration) * people;
}

function calculateFoodCost(destination: any, input: RecommendationInput): number {
  return 50000 * calculateDuration(input.startDate, input.endDate) * input.people;
}

function calculateActivityCost(destination: any, input: RecommendationInput): number {
  return 30000 * calculateDuration(input.startDate, input.endDate) * input.people;
}

function calculateThemeScore(destinationThemes: string[], selectedThemes: string[]): number {
  if (selectedThemes.length === 0) return 1;
  
  const matchingThemes = selectedThemes.filter(theme => 
    destinationThemes.includes(theme)
  ).length;
  
  return matchingThemes / selectedThemes.length;
}

function calculateRecommendationScore({
  totalCost,
  budget,
  weather,
  exchangeRate,
  themeScore
}: {
  totalCost: number;
  budget: number;
  weather: any;
  exchangeRate: any;
  themeScore: number;
}): number {
  const budgetScore = budget > 0 ? (1 - Math.min(totalCost / budget, 1)) : 0;
  const weatherScore = weather.temperature >= 20 && weather.temperature <= 30 ? 1 : 0.5;
  const exchangeRateScore = exchangeRate.rate > 0.001 ? 1 : 0.5;

  return (
    budgetScore * 0.4 + 
    weatherScore * 0.2 + 
    exchangeRateScore * 0.1 + 
    themeScore * 0.3
  );
} 