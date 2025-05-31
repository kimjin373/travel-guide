import React from 'react';

export interface FilterOptions {
  continent?: string;
  theme?: string;
  season?: string;
  minCost?: number;
  maxCost?: number;
}

export type SortOption = 'score' | 'cost-asc' | 'cost-desc';

interface FilterSortProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterSort({ onFilterChange, onSortChange }: FilterSortProps) {
  const seasons = ['봄', '여름', '가을', '겨울'];
  const themes = ['휴양', '액티비티', '문화', '자연'];
  const durations = ['단기여행 (1~2일)', '중기여행 (3~5일)', '장기여행 (6일 이상)'];
  const sortOptions = [
    { value: 'season', label: '계절 적합도 순' },
    { value: 'theme', label: '테마 적합도 순' },
    { value: 'score', label: '종합 점수 순' },
  ];

  const handleSeasonChange = (season: string) => {
    // TODO: Implement season filter logic
  };

  const handleThemeChange = (theme: string) => {
    // TODO: Implement theme filter logic
  };

  const handleDurationChange = (duration: string) => {
    // TODO: Implement duration filter logic
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* 계절 필터 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">계절</h3>
          <div className="space-y-2">
            {seasons.map((season) => (
              <label key={season} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#1E90FF]"
                  onChange={() => handleSeasonChange(season)}
                />
                <span className="ml-2 text-gray-700">{season}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 테마 필터 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">테마</h3>
          <div className="space-y-2">
            {themes.map((theme) => (
              <label key={theme} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-[#1E90FF]"
                  onChange={() => handleThemeChange(theme)}
                />
                <span className="ml-2 text-gray-700">{theme}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 여행 기간 필터 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">여행 기간</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  className="form-radio h-4 w-4 text-[#1E90FF]"
                  onChange={() => handleDurationChange(duration)}
                />
                <span className="ml-2 text-gray-700">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">정렬</h3>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 