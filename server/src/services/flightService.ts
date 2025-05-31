import axios from 'axios';
import { Destination, FlightPrice } from '../types';

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

interface FlightInput {
  budget: number;
  startDate: Date;
  endDate: Date;
  people: number;
}

interface AviationStackFlight {
  airline: {
    name: string;
  };
  flight: {
    iata: string;
  };
  departure: {
    scheduled: string;
  };
  arrival: {
    scheduled: string;
  };
  distance: number;
}

export async function getFlightPrices(destination: Destination, input: FlightInput): Promise<number> {
  try {
    const flights = await searchFlights(destination, input);
    
    if (flights.length === 0) {
      throw new Error('No flights found for the given criteria');
    }

    // 가장 저렴한 항공권 가격 반환
    const cheapestFlight = flights.reduce((prev, current) => 
      prev.price < current.price ? prev : current
    );

    return cheapestFlight.price;
  } catch (error) {
    console.error('Error fetching flight prices:', error);
    throw new Error('Failed to fetch flight prices');
  }
}

async function searchFlights(destination: Destination, input: FlightInput): Promise<FlightPrice[]> {
  try {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: {
        access_key: AVIATIONSTACK_API_KEY,
        dep_iata: 'ICN', // 인천공항
        arr_iata: getAirportCode(destination.name),
        date: formatDate(input.startDate)
      }
    });

    if (!response.data.data) {
      return [];
    }

    return response.data.data.map((flight: AviationStackFlight) => ({
      price: calculateFlightPrice(flight, input),
      airline: flight.airline.name,
      flightNumber: flight.flight.iata,
      departureTime: flight.departure.scheduled,
      arrivalTime: flight.arrival.scheduled
    }));
  } catch (error) {
    console.error('Error searching flights:', error);
    throw new Error('Failed to search flights');
  }
}

function getAirportCode(destination: string): string {
  // 주요 도시의 공항 코드 매핑
  const airportCodes: { [key: string]: string } = {
    '도쿄, 일본': 'NRT', // 나리타 공항
    '오사카, 일본': 'KIX',
    '방콕, 태국': 'BKK',
    '파리, 프랑스': 'CDG',
    '뉴욕, 미국': 'JFK',
    '런던, 영국': 'LHR',
    '시드니, 호주': 'SYD',
    '싱가포르': 'SIN',
    '홍콩': 'HKG',
    '타이페이, 대만': 'TPE'
  };

  return airportCodes[destination] || 'ICN';
}

function calculateFlightPrice(flight: AviationStackFlight, input: FlightInput): number {
  // 실제 API에서는 가격 정보를 직접 제공하지 않을 수 있으므로,
  // 거리와 시즌을 기반으로 한 예상 가격 계산
  const basePrice = 300000; // 기본 가격 30만원
  const distanceMultiplier = getDistanceMultiplier(flight);
  const seasonMultiplier = getSeasonMultiplier(input.startDate);
  
  return Math.round(basePrice * distanceMultiplier * seasonMultiplier);
}

function getDistanceMultiplier(flight: AviationStackFlight): number {
  // 거리에 따른 가격 승수 계산
  const distance = flight.distance || 1000;
  return 1 + (distance / 10000);
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

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
} 