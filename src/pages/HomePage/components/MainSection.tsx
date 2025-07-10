import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CardItem from './CardItem';

type Teacher = {
  image: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  language: string;
};

const MainSection = () => {
  const languages = [
    'All',
    'English',
    'Spanish',
    'Japanese',
    'Korean',
    'French',
    'German',
    'Italian',
  ];

  const teachers: Teacher[] = [
    {
      image: '/teacher.jpg',
      name: 'John Doe',
      description: 'Experienced English teacher with a focus on conversation.',
      rating: 4.8,
      price: 200000,
      language: 'English',
    },
    {
      image: '/teacher.jpg',
      name: 'Maria Garcia',
      description: 'Native Spanish tutor helping students achieve fluency.',
      rating: 4.5,
      price: 150000,
      language: 'Spanish',
    },
    {
      image: '/teacher.jpg',
      name: 'Akira Tanaka',
      description: 'Passionate Japanese teacher with cultural insights.',
      rating: 4.9,
      price: 180000,
      language: 'Japanese',
    },
    {
      image: '/teacher.jpg',
      name: 'Leah Kim',
      description: 'Certified Korean instructor with 5 years of experience.',
      rating: 4.7,
      price: 220000,
      language: 'Korean',
    },
    {
      image: '/teacher.jpg',
      name: 'Pierre Dupont',
      description: 'French language coach specializing in beginners.',
      rating: 4.6,
      price: 170000,
      language: 'French',
    },
    {
      image: '/teacher.jpg',
      name: 'Sophia Müller',
      description: 'German tutor with a background in linguistics.',
      rating: 4.8,
      price: 190000,
      language: 'German',
    },
    {
      image: '/teacher.jpg',
      name: 'Giulia Rossi',
      description: 'Italian teacher with engaging methods for beginners.',
      rating: 4.7,
      price: 185000,
      language: 'Italian',
    },
    {
      image: '/teacher.jpg',
      name: 'Carlos Martínez',
      description: 'Experienced Spanish coach with international background.',
      rating: 4.6,
      price: 160000,
      language: 'Spanish',
    },
    {
      image: '/teacher.jpg',
      name: 'Emma Thompson',
      description: 'English teacher specializing in business communication.',
      rating: 4.9,
      price: 210000,
      language: 'English',
    },
    {
      image: '/teacher.jpg',
      name: 'Jean Moreau',
      description: 'French tutor focusing on pronunciation and grammar.',
      rating: 4.5,
      price: 175000,
      language: 'French',
    },
  ];

  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1500);
  };

  const handleLanguageClick = (lang: string) => {
    setLoading(true);
    setSelectedLanguage(lang);
    setVisibleCount(4);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const filteredTeachers =
    selectedLanguage === 'All'
      ? teachers
      : teachers.filter((t) => t.language === selectedLanguage);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6">
      <div className="px-5 md:px-10 lg:px-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Pick Languages
        </h2>

        <div className="mb-6 flex flex-wrap gap-2">
          {languages.map((language) => (
            <Button
              key={language}
              onClick={() => handleLanguageClick(language)}
              variant={selectedLanguage === language ? 'default' : 'ghost'}
              className={`rounded-2xl text-sm font-medium shadow-sm ${
                selectedLanguage === language
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {language}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {visibleTeachers.map((teacher, index) => (
            <CardItem key={index} teacher={teacher} />
          ))}

          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <CardItem.Skeleton key={`skeleton-${i}`} />
            ))}
        </div>

        {!loading && visibleCount < filteredTeachers.length && (
          <div className="my-10 flex w-full justify-center">
            <Button
              variant="outline"
              onClick={handleViewMore}
              className="hover:bg-[var(--primary-color)] hover:text-white"
            >
              View more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSection;
