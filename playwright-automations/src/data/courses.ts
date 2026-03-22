export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  category: string;
  level: string;
  duration: string;
  students: number;
  thumbnail: string;
  description: string;
  whatYouLearn: string[];
  requirements: string[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Complete React Developer in 2024: Zero to Mastery',
    instructor: 'Andrei Neagoie',
    rating: 4.7,
    reviews: 28453,
    price: 14.99,
    originalPrice: 89.99,
    category: 'Web Development',
    level: 'All Levels',
    duration: '40.5 hours',
    students: 312450,
    thumbnail: 'https://picsum.photos/seed/react/320/180',
    description:
      'Learn React from scratch and become a job-ready React developer. This course covers everything from the fundamentals to advanced patterns used at top companies.',
    whatYouLearn: [
      'Build production-grade React applications',
      'Master React Hooks and Context API',
      'Implement Redux and state management',
      'Work with REST APIs and GraphQL',
      'Write unit and integration tests',
      'Deploy apps to production',
    ],
    requirements: [
      'Basic HTML, CSS, and JavaScript knowledge',
      'A computer with internet access',
      'No prior React experience needed',
    ],
  },
  {
    id: 2,
    title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
    instructor: 'Jonas Schmedtmann',
    rating: 4.8,
    reviews: 192341,
    price: 12.99,
    originalPrice: 79.99,
    category: 'Web Development',
    level: 'All Levels',
    duration: '68 hours',
    students: 850000,
    thumbnail: 'https://picsum.photos/seed/js/320/180',
    description:
      'The most complete and in-depth JavaScript course on the internet. Go from a total beginner to an advanced developer with a beautiful portfolio of projects.',
    whatYouLearn: [
      'Master JavaScript fundamentals',
      'How JavaScript works behind the scenes',
      'Asynchronous JavaScript: Promises, async/await',
      'Modern ES6+ features',
      'Object-Oriented Programming',
      'Functional programming techniques',
    ],
    requirements: [
      'No coding experience needed',
      'Any computer and OS works',
      'Basic understanding of how websites work',
    ],
  },
  {
    id: 3,
    title: 'Python Bootcamp: From Zero to Hero in Python 3',
    instructor: 'Jose Portilla',
    rating: 4.6,
    reviews: 453210,
    price: 13.99,
    originalPrice: 74.99,
    category: 'Data Science',
    level: 'Beginner',
    duration: '22 hours',
    students: 1200000,
    thumbnail: 'https://picsum.photos/seed/python/320/180',
    description:
      'Learn Python like a professional! Start from the basics and go all the way to creating your own applications and games.',
    whatYouLearn: [
      'Python 3 fundamentals',
      'Object-Oriented Programming',
      'Web scraping with BeautifulSoup',
      'Data analysis with NumPy and Pandas',
      'Machine learning introduction',
      'Automation scripts',
    ],
    requirements: [
      'Access to a computer',
      'No prior programming experience required',
    ],
  },
];
