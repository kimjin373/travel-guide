import { Destination } from '../types';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

const destinationsFilePath = path.join(__dirname, '../data/destinations.json');

interface DestinationInput {
  budget: number;
  startDate: Date;
  endDate: Date;
  people: number;
  accommodationTier: number;
  themes: string[];
}

export async function getDestinations(input: DestinationInput): Promise<Destination[]> {
  try {
    logger.info('Starting to fetch destinations from local file...');
    
    // Read destinations from the local JSON file
    const data = fs.readFileSync(destinationsFilePath, 'utf-8');
    const destinationsJson = JSON.parse(data);
    const allDestinations: Destination[] = destinationsJson.destinations;

    logger.info(`Found ${allDestinations.length} destinations in local file.`);

    // 여행 기간에 따른 필터링
    const startMonth = input.startDate.getMonth() + 1; // 1-12
    const filteredByMonth = allDestinations.filter(dest => 
      dest.recommendedMonths.includes(startMonth)
    );

    // 테마 기반 필터링
    const filteredByTheme = input.themes.length > 0
      ? filteredByMonth.filter(dest => 
          input.themes.some(theme => dest.themes.includes(theme))
        )
      : filteredByMonth;

    // 예산 기반 필터링 (기본 비용 계산)
    const filteredByBudget = filteredByTheme.filter(dest => {
      const baseCost = calculateBaseCost(dest, input);
      return baseCost <= input.budget;
    });

    // 계절 점수와 테마 점수를 고려한 정렬
    const sortedDestinations = filteredByBudget.sort((a, b) => {
      const scoreA = (a.seasonScore * 0.6) + (a.themeScore * 0.4);
      const scoreB = (b.seasonScore * 0.6) + (b.themeScore * 0.4);
      return scoreB - scoreA;
    });

    logger.info(`Filtered to ${sortedDestinations.length} destinations based on criteria.`);
    
    return sortedDestinations;
  } catch (error) {
    logger.error('Error reading destinations from local file:', error);
    throw new Error('Failed to read destinations from local file');
  }
}

function calculateBaseCost(destination: Destination, input: DestinationInput): number {
  // 기본 비용 계산 (항공권 + 호텔 + 식비 + 활동비)
  const duration = calculateDuration(input.startDate, input.endDate);
  const baseFlightCost = 300000; // 기본 항공권 비용
  const baseHotelCost = 100000 * input.accommodationTier; // 숙소 등급에 따른 기본 비용
  const baseFoodCost = 50000 * duration; // 일일 식비
  const baseActivityCost = 30000 * duration; // 일일 활동비

  return (baseFlightCost + (baseHotelCost * duration) + baseFoodCost + baseActivityCost) * input.people;
}

function calculateDuration(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
  return diffDays > 0 ? diffDays : 1; // 최소 1일
}

function removeDuplicates(destinations: Destination[]): Destination[] {
  const unique = [];
  const names = new Set();
  for (const dest of destinations) {
    if (!names.has(dest.name)) {
      unique.push(dest);
      names.add(dest.name);
    }
  }
  return unique;
}

// Helper function to calculate food cost (simple mock)
function calculateFoodCost(destination: Destination, input: {
  budget: number;
  startDate: Date;
  endDate: Date;
  people: number;
}): number {
  // TODO: Implement more sophisticated food cost calculation
  return 50000 * calculateDuration(input.startDate, input.endDate) * input.people;
}

// Helper function to calculate activity cost (simple mock)
function calculateActivityCost(destination: Destination, input: {
  budget: number;
  startDate: Date;
  endDate: Date;
  people: number;
}): number {
  // TODO: Implement activity cost calculation based on destination and duration
  return 30000 * calculateDuration(input.startDate, input.endDate) * input.people;
}

// Helper function to calculate recommendation score (simple mock)
function calculateRecommendationScore({
  totalCost,
  budget,
  weather,
  exchangeRate
}: {
  totalCost: number;
  budget: number;
  weather: any;
  exchangeRate: any;
}): number {
  // TODO: Implement more sophisticated scoring algorithm
  const budgetScore = budget > 0 ? (1 - Math.min(totalCost / budget, 1)) : 0;
  // Assuming weather and exchange rate are already factored in or mocked elsewhere
  // const weatherScore = weather.temperature >= 20 && weather.temperature <= 30 ? 1 : 0.5;
  // const exchangeRateScore = exchangeRate.rate > 0.001 ? 1 : 0.5; // Assuming a favorable rate is > 0.001 for JPY

  // return (budgetScore * 0.5 + weatherScore * 0.3 + exchangeRateScore * 0.2);
  return budgetScore; // For now, simple score based on budget
} 