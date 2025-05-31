'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/slides/slide1.png',
      title: '당신만의 특별한 여행을 찾아보세요',
      description: '계절과 테마에 맞는 최적의 여행지를 추천해드립니다',
    },
    {
      image: '/images/slides/slide2.png',
      title: '다양한 여행지의 매력을 발견하세요',
      description: '국내외 다양한 여행지의 특별한 경험을 만나보세요',
    },
    {
      image: '/images/slides/slide3.png',
      title: '완벽한 여행을 위한 가이드',
      description: '여행 계획부터 실용적인 정보까지 한 번에',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5초마다 슬라이드 전환

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* 히어로 섹션 with 슬라이더 */}
      <section className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  {slide.description}
                </p>
                <Link
                  href="/recommendations"
                  className="inline-block bg-[#1E90FF] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                >
                  여행지 추천받기
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* 인기 여행지 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">인기 여행지</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.background = 'linear-gradient(to bottom right, #3B82F6, #8B5CF6)';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 여행 테마 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">여행 테마</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{theme.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                <p className="text-gray-600 text-sm">{theme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 여행 팁 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">여행 팁</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelTips.map((tip) => (
              <div key={tip.id} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1E90FF] rounded-full flex items-center justify-center text-white text-2xl">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-[#1E90FF] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">지금 바로 여행을 시작하세요</h2>
          <p className="text-xl mb-8 opacity-90">
            당신에게 맞는 최적의 여행지를 찾아보세요
          </p>
          <Link
            href="/recommendations"
            className="inline-block bg-white text-[#1E90FF] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            여행지 추천받기
          </Link>
        </div>
      </section>
    </main>
  );
}

const popularDestinations = [
  {
    id: 1,
    name: '제주도',
    description: '아름다운 해변과 한라산이 있는 대한민국의 대표적인 휴양지',
    image: '/images/destinations/jeju.png',
  },
  {
    id: 2,
    name: '도쿄',
    description: '현대와 전통이 공존하는 일본의 수도',
    image: '/images/destinations/tokyo.png',
  },
  {
    id: 3,
    name: '방콕',
    description: '화려한 사원과 현대적인 쇼핑몰이 공존하는 태국의 수도',
    image: '/images/destinations/bangkok.png',
  },
];

const themes = [
  {
    id: 1,
    name: '휴양',
    description: '편안한 휴식과 힐링을 원하는 여행',
    icon: '🏖️',
  },
  {
    id: 2,
    name: '자연',
    description: '아름다운 자연을 만끽하는 여행',
    icon: '🌲',
  },
  {
    id: 3,
    name: '문화',
    description: '다양한 문화와 역사를 경험하는 여행',
    icon: '🏛️',
  },
  {
    id: 4,
    name: '음식',
    description: '맛있는 음식을 즐기는 여행',
    icon: '🍜',
  },
];

const travelTips = [
  {
    id: 1,
    title: '여행 시기 선택',
    description: '여행지의 날씨와 관광 시즌을 고려하여 최적의 시기를 선택하세요.',
    icon: '📅',
  },
  {
    id: 2,
    title: '필수 준비물',
    description: '여행지의 날씨와 활동에 맞는 준비물을 챙기세요.',
    icon: '🎒',
  },
  {
    id: 3,
    title: '현지 문화',
    description: '여행지의 문화와 관습을 미리 알아두면 더 풍부한 경험을 할 수 있습니다.',
    icon: '🌏',
  },
  {
    id: 4,
    title: '안전 수칙',
    description: '여행지의 안전 정보를 확인하고 필요한 보험을 준비하세요.',
    icon: '🛡️',
  },
]; 