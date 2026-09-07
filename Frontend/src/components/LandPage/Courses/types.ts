
interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    students: number;
    rating: number;
    lessons: number;
    progress?: number;
    isPublished: boolean;
    thumbnail: string;
    category: string;
    teacher: {
      name: string;
    };
  }
  
  interface CardProps {
    course: Course;
    isPurchased: boolean;
  }

  export type { Course, CardProps };