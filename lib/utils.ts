import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 추천 병원 목업 데이터 타입 정의 및 데이터 추가
export interface IClinic {
  id: string;
  name: string;
  location: string;
  rating: number;
  thumbnailUrl: string;
}

export const mockClinics: IClinic[] = [
  {
    id: '1',
    name: '서울베스트의원',
    location: '서울 강남구',
    rating: 4.8,
    thumbnailUrl: '/globe.svg',
  },
  {
    id: '2',
    name: '부산프리미엄의원',
    location: '부산 해운대구',
    rating: 4.7,
    thumbnailUrl: '/vercel.svg',
  },
  {
    id: '3',
    name: '대구스마일의원',
    location: '대구 수성구',
    rating: 4.6,
    thumbnailUrl: '/next.svg',
  },
  {
    id: '4',
    name: '광주메디컬의원',
    location: '광주 동구',
    rating: 4.5,
    thumbnailUrl: '/window.svg',
  },
  {
    id: '5',
    name: '인천뷰티의원',
    location: '인천 연수구',
    rating: 4.4,
    thumbnailUrl: '/file.svg',
  },
];
