import React from 'react';
import Image from 'next/image';
import { TravelRecommendation, Destination } from '@/types';
import Link from 'next/link';

interface RecommendationListProps {
  destinations: Destination[];
}

export default function RecommendationList({ destinations }: RecommendationListProps) {
  const getSeasonScore = (score: number) => {
    const stars = Math.round(score * 5);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  const getThemeScore = (score: number) => {
    const stars = Math.round(score * 5);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <Link
          key={destination.id}
          href={`/destinations/${destination.id}`}
          className="group"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="relative h-48">
              <Image
                src={destination.images[0]}
                alt={destination.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {destination.name}, {destination.country}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {destination.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">계절 적합도</span>
                  <span className="text-[#FFD700]">{getSeasonScore(destination.seasonScore)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">테마 적합도</span>
                  <span className="text-[#FFD700]">{getThemeScore(destination.themeScore)}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">추천 시기:</span>
                <p className="text-sm text-gray-700">
                  {destination.recommendedMonths.map(month => `${month}월`).join(', ')}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {destination.themes.map((theme) => (
                  <span
                    key={theme}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 