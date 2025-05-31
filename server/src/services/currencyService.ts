import { Destination, ExchangeRate } from '../types';

export async function getExchangeRate(destination: Destination): Promise<ExchangeRate> {
  // TODO: Implement actual exchange rate API integration
  // For now, return mock data
  const rates: { [key: string]: ExchangeRate } = {
    '제주도, 대한민국': {
      code: 'KRW',
      rate: 1.0
    },
    '도쿄, 일본': {
      code: 'JPY',
      rate: 0.0075 // 1 JPY = 0.0075 KRW
    },
    '방콕, 태국': {
      code: 'THB',
      rate: 0.037 // 1 THB = 0.037 KRW
    },
    '파리, 프랑스': {
      code: 'EUR',
      rate: 1400 // 1 EUR = 1400 KRW
    },
    '뉴욕, 미국': {
      code: 'USD',
      rate: 1300 // 1 USD = 1300 KRW
    }
  };
  
  return rates[destination.name] || {
    code: 'KRW',
    rate: 1.0
  };
} 