'use client';

import React from 'react';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* 메인 소개 섹션 */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Travel Guide 소개</h1>
          <p className="text-xl text-gray-600 mb-8">
            당신만의 특별한 여행을 찾아드립니다
          </p>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Travel Guide는 계절과 테마에 맞는 최적의 여행지를 추천해드리는 서비스입니다. 
              단순한 여행지 추천을 넘어, 당신의 취향과 상황에 맞는 맞춤형 여행 정보를 제공합니다.
            </p>
          </div>
        </section>

        {/* 주요 특징 섹션 */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">주요 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">맞춤형 추천</h3>
              <p className="text-gray-600">
                선호하는 테마와 계절을 기반으로 최적의 여행지를 추천해드립니다.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">다양한 여행지</h3>
              <p className="text-gray-600">
                국내외 다양한 여행지의 상세 정보를 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3">실용적 정보</h3>
              <p className="text-gray-600">
                여행 계획에 도움이 되는 실용적인 정보를 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 비전 섹션 */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 비전</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Travel Guide는 모든 여행자들이 자신에게 맞는 완벽한 여행지를 찾을 수 있도록 돕는 것을 목표로 합니다. 
              우리는 단순한 여행지 추천을 넘어, 각 여행자에게 특별한 경험을 선사하고자 합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              앞으로도 지속적으로 서비스를 개선하고 발전시켜 나가며, 
              더 많은 여행자들에게 가치 있는 정보를 제공하도록 하겠습니다.
            </p>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">문의하기</h2>
          <p className="text-gray-600 mb-8">
            서비스에 대한 문의사항이나 제안사항이 있으시다면 언제든지 연락해주세요.
          </p>
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <p className="text-gray-700">
              대표: 김진현<br />
              이메일: kimjin373@Kentech.ac.kr<br />
              전화: 010-2831-7965
            </p>
          </div>
        </section>
      </div>
    </main>
  );
} 