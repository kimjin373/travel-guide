import { NextResponse } from 'next/server';
import destinations from '@/data/destinations.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');
  const theme = searchParams.get('theme');

  let filteredDestinations = destinations.destinations;

  // 월별 필터링
  if (month) {
    const monthNum = parseInt(month);
    filteredDestinations = filteredDestinations.filter(dest =>
      dest.recommendedMonths.includes(monthNum)
    );
  }

  // 테마별 필터링
  if (theme) {
    filteredDestinations = filteredDestinations.filter(dest =>
      dest.themes.includes(theme)
    );
  }

  return NextResponse.json({
    destinations: filteredDestinations,
    totalCount: filteredDestinations.length
  });
} 