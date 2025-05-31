'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Destination } from '@/types';

// TODO: Replace with actual API call
const mockDestination: Destination = {
  id: 1,
  name: '제주도',
  country: '대한민국',
  description: '아름다운 해변과 한라산이 있는 대한민국의 대표적인 휴양지입니다.',
  seasonScore: 0.9,
  themeScore: 0.85,
  recommendedMonths: [4, 5, 6, 9, 10],
  themes: ['휴양', '자연', '문화'],
  monthlyClimate: [
    { month: 1, avgTemp: 6, rainDays: 10 },
    { month: 2, avgTemp: 7, rainDays: 9 },
    // ... 나머지 월 데이터
  ],
  images: [
    '/images/jeju1.jpg',
    '/images/jeju2.jpg',
    '/images/jeju3.jpg',
  ],
  highlights: {
    '봄': ['유채꽃 축제', '한라산 등산'],
    '여름': ['해변 수영', '서귀포 해변'],
    '가을': ['단풍 명소', '감귤 수확'],
    '겨울': ['눈꽃 축제', '온천'],
  },
};

export default function DestinationPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'climate' | 'highlights'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const getSeasonScore = (score: number) => {
    const stars = Math.round(score * 5);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* 이미지 갤러리 */}
        <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={mockDestination.images[0]}
            alt={mockDestination.name}
            fill
            className="object-cover"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
          >
            <svg
              className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* 기본 정보 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {mockDestination.name}, {mockDestination.country}
          </h1>
          <p className="text-gray-600 mb-6">{mockDestination.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">계절 적합도</h3>
              <div className="text-[#FFD700] text-xl">
                {getSeasonScore(mockDestination.seasonScore)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">테마 적합도</h3>
              <div className="text-[#FFD700] text-xl">
                {getSeasonScore(mockDestination.themeScore)}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {mockDestination.themes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center ${
                activeTab === 'overview'
                  ? 'text-[#1E90FF] border-b-2 border-[#1E90FF]'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              개요
            </button>
            <button
              className={`flex-1 py-4 text-center ${
                activeTab === 'climate'
                  ? 'text-[#1E90FF] border-b-2 border-[#1E90FF]'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('climate')}
            >
              기후
            </button>
            <button
              className={`flex-1 py-4 text-center ${
                activeTab === 'highlights'
                  ? 'text-[#1E90FF] border-b-2 border-[#1E90FF]'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('highlights')}
            >
              하이라이트
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">추천 시기</h3>
                <p className="text-gray-700">
                  {mockDestination.recommendedMonths.map(month => `${month}월`).join(', ')}
                </p>
              </div>
            )}

            {activeTab === 'climate' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">월별 기후</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockDestination.monthlyClimate.map((climate) => (
                    <div
                      key={climate.month}
                      className="bg-gray-50 p-4 rounded-lg text-center"
                    >
                      <div className="font-semibold">{climate.month}월</div>
                      <div className="text-gray-600">
                        평균 {climate.avgTemp}°C
                      </div>
                      <div className="text-gray-600">
                        강수일 {climate.rainDays}일
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'highlights' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">계절별 하이라이트</h3>
                <div className="grid gap-6">
                  {Object.entries(mockDestination.highlights).map(([season, spots]) => (
                    <div key={season}>
                      <h4 className="text-lg font-semibold mb-2">{season}</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {spots.map((spot) => (
                          <li key={spot}>{spot}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 