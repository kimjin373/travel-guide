import { Destination, WeatherData } from '../types';

export async function getWeatherData(destination: Destination, date: Date): Promise<WeatherData> {
  // TODO: Implement actual weather API integration
  // For now, return mock data based on destination and season
  const month = date.getMonth();
  const season = getSeason(month);
  
  return {
    temperature: getAverageTemperature(destination.name, season),
    condition: getWeatherCondition(destination.name, season)
  };
}

function getSeason(month: number): string {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

function getAverageTemperature(destination: string, season: string): number {
  const temperatures: { [key: string]: { [key: string]: number } } = {
    '제주도, 대한민국': {
      spring: 15,
      summer: 28,
      autumn: 20,
      winter: 5
    },
    '도쿄, 일본': {
      spring: 18,
      summer: 30,
      autumn: 22,
      winter: 8
    },
    '방콕, 태국': {
      spring: 32,
      summer: 33,
      autumn: 31,
      winter: 30
    },
    '파리, 프랑스': {
      spring: 15,
      summer: 25,
      autumn: 18,
      winter: 5
    },
    '뉴욕, 미국': {
      spring: 15,
      summer: 28,
      autumn: 18,
      winter: 0
    }
  };
  
  return temperatures[destination]?.[season] || 20;
}

function getWeatherCondition(destination: string, season: string): string {
  const conditions: { [key: string]: { [key: string]: string } } = {
    '제주도, 대한민국': {
      spring: '맑음',
      summer: '맑음',
      autumn: '맑음',
      winter: '흐림'
    },
    '도쿄, 일본': {
      spring: '맑음',
      summer: '맑음',
      autumn: '맑음',
      winter: '맑음'
    },
    '방콕, 태국': {
      spring: '맑음',
      summer: '비',
      autumn: '맑음',
      winter: '맑음'
    },
    '파리, 프랑스': {
      spring: '맑음',
      summer: '맑음',
      autumn: '흐림',
      winter: '비'
    },
    '뉴욕, 미국': {
      spring: '맑음',
      summer: '맑음',
      autumn: '맑음',
      winter: '눈'
    }
  };
  
  return conditions[destination]?.[season] || '맑음';
} 