import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#1E90FF] py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Travel Guide
          </Link>
          <div className="flex space-x-8">
            <Link href="/" className="text-white hover:text-gray-200 transition">
              홈
            </Link>
            <Link href="/recommendations" className="text-white hover:text-gray-200 transition">
              여행지 추천
            </Link>
            <Link href="/about" className="text-white hover:text-gray-200 transition">
              소개
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-200 transition">
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 