// types/course.ts
export interface Course {
    id?: string;
    title: string;
    price: number;
    description: string;
    category: string;
    instructors: string;
    rating: number;
    thumb: string;
    skill_level: string;
    price_type: string;
    language: string;
    popular?: string;
    createdAt?: string | Date;
  }