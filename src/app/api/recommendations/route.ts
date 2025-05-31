import { NextResponse } from 'next/server';
import destinations from '@/data/destinations.json';

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  themes: string[];
  images: string[];
  recommendedMonths: number[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { theme, month } = body;

    // 테마와 추천 월이 일치하는 여행지 필터링
    const recommendations = destinations.destinations
      .filter(destination => 
        destination.themes.includes(theme) && 
        destination.recommendedMonths.includes(month)
      )
      .map(({ id, name, country, description, themes, images, recommendedMonths }) => ({
        id,
        name,
        country,
        description,
        themes,
        images,
        recommendedMonths
      }));

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error in recommendations API:', error);
    return NextResponse.json(
      { message: '추천 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

function calculateTotalCost(
  destination: any,
  startDate: Date,
  endDate: Date,
  people: number,
  accommodationTier: string
) {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const peopleCount = Number(people) || 1;
  
  // 항공권 비용
  const flightCost = destination.costs.flight.economy * peopleCount;
  
  // 숙박 비용
  const hotelTier = accommodationTier || 'standard';
  const hotelCost = destination.costs.hotel[hotelTier] * days * peopleCount;
  
  // 일일 경비
  const dailyCost = (
    destination.costs.dailyExpense.food +
    destination.costs.dailyExpense.transportation +
    destination.costs.dailyExpense.activities
  ) * days * peopleCount;

  return flightCost + hotelCost + dailyCost;
}

function calculateBudgetScore(totalCost: number, budget: number) {
  if (!budget) return 0.5; // 예산 정보가 없는 경우 중립적인 점수 반환
  
  const ratio = totalCost / budget;
  if (ratio <= 0.8) return 1; // 예산의 80% 이하
  if (ratio <= 1) return 0.8; // 예산의 80-100%
  if (ratio <= 1.2) return 0.5; // 예산의 100-120%
  return 0.2; // 예산의 120% 초과
} 