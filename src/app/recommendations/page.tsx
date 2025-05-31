'use client';

import React, { useState } from 'react';
import { TravelRecommendation } from '@/types';

const themes = [
  { id: '휴양', label: '휴양' },
  { id: '자연', label: '자연' },
  { id: '문화', label: '문화' },
  { id: '쇼핑', label: '쇼핑' },
  { id: '음식', label: '음식' },
];

const months = [
  { id: 1, label: '1월' },
  { id: 2, label: '2월' },
  { id: 3, label: '3월' },
  { id: 4, label: '4월' },
  { id: 5, label: '5월' },
  { id: 6, label: '6월' },
  { id: 7, label: '7월' },
  { id: 8, label: '8월' },
  { id: 9, label: '9월' },
  { id: 10, label: '10월' },
  { id: 11, label: '11월' },
  { id: 12, label: '12월' },
];

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!selectedTheme) {
        throw new Error('테마를 선택해주세요.');
      }
      if (!selectedMonth) {
        throw new Error('여행 월을 선택해주세요.');
      }

      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: selectedTheme,
          month: selectedMonth
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '추천 목록을 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      if (!data || !Array.isArray(data)) {
        throw new Error('서버에서 잘못된 형식의 데이터를 반환했습니다.');
      }

      setRecommendations(data);
    } catch (err: any) {
      console.error('Error fetching recommendations:', err);
      setError(err.message || '추천 목록을 가져오는데 실패했습니다.');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-gray-600">추천 목록을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">여행지 추천</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 테마 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                선호하는 여행 테마
              </label>
              <div className="grid grid-cols-2 gap-3">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-3 rounded-lg border text-center transition ${
                      selectedTheme === theme.id
                        ? 'bg-[#1E90FF] text-white border-[#1E90FF]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 여행 월 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                여행 월
              </label>
              <div className="grid grid-cols-4 gap-3">
                {months.map(month => (
                  <button
                    key={month.id}
                    type="button"
                    onClick={() => setSelectedMonth(month.id)}
                    className={`p-3 rounded-lg border text-center transition ${
                      selectedMonth === month.id
                        ? 'bg-[#1E90FF] text-white border-[#1E90FF]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {month.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1E90FF] text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              여행지 추천받기
            </button>
          </form>

          {/* 추천 목록 */}
          {recommendations.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">추천 여행지</h2>
              <div className="space-y-4">
                {recommendations.map(destination => (
                  <div key={destination.id} className="border rounded-lg p-4">
                    <h3 className="text-xl font-semibold">{destination.name}, {destination.country}</h3>
                    <p className="text-gray-600 mt-2">{destination.description}</p>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">테마: </span>
                      {destination.themes.map(theme => (
                        <span key={theme} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">
                          {theme}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">추천 여행 시기: </span>
                      {destination.recommendedMonths.map(month => (
                        <span key={month} className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 mr-2">
                          {month}월
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 