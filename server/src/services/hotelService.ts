import { Destination } from '../types';

interface HotelInput {
  budget: number;
  startDate: Date;
  endDate: Date;
  people: number;
  accommodationTier: number;
}

export async function getHotelPrices(destination: Destination, input: HotelInput): Promise<number> {
  // TODO: Implement actual hotel price API integration
  // For now, return mock data
  const basePrice = 100000; // 10만원
  const seasonMultiplier = getSeasonMultiplier(input.startDate);
  const destinationMultiplier = getDestinationMultiplier(destination.name);
  const tierMultiplier = getTierMultiplier(input.accommodationTier);
  
  return basePrice * seasonMultiplier * destinationMultiplier * tierMultiplier;
}

function getSeasonMultiplier(date: Date): number {
  const month = date.getMonth();
  
  // 여름(6-8월)과 겨울(12-2월)은 성수기
  if (month >= 5 && month <= 7) return 1.5; // 여름
  if (month === 11 || month <= 1) return 1.5; // 겨울
  
  // 봄(3-5월)과 가을(9-11월)은 준성수기
  if ((month >= 2 && month <= 4) || (month >= 8 && month <= 10)) return 1.2;
  
  return 1.0; // 비수기
}

function getDestinationMultiplier(destination: string): number {
  // 목적지별 가격 차등 적용
  const multipliers: { [key: string]: number } = {
    '제주도, 대한민국': 1.0,
    '도쿄, 일본': 1.5,
    '방콕, 태국': 0.8,
    '파리, 프랑스': 1.8,
    '뉴욕, 미국': 2.0
  };
  
  return multipliers[destination] || 1.3;
}

function getTierMultiplier(tier: number): number {
  // 숙박 등급별 가격 차등 적용
  const multipliers: { [key: number]: number } = {
    1: 0.7,  // 저가
    2: 1.0,  // 중가
    3: 1.5,  // 고가
    4: 2.0,  // 최고가
    5: 3.0   // 럭셔리
  };
  
  return multipliers[tier] || 1.0;
} 