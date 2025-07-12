import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CardItem from './CardItem';
import MainSectionSkeleton from './MainSectionSkeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Course = {
  image: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  category: string;
  instructor: string;
  duration: string;
  level: string;
};

const MainSection = () => {
  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Backend Development',
    'Frontend Development',
    'DevOps',
  ];

  const courses: Course[] = [
    {
      image: '/teacher.jpg',
      name: 'React Masterclass 2024',
      description: 'Học React từ cơ bản đến nâng cao với dự án thực tế',
      rating: 4.8,
      price: 899000,
      category: 'Frontend Development',
      instructor: 'Nguyễn Văn A',
      duration: '25 giờ',
      level: 'Intermediate',
    },
    {
      image: '/teacher.jpg',
      name: 'Python cho Data Science',
      description: 'Khóa học Python chuyên sâu cho Data Science và ML',
      rating: 4.9,
      price: 699000,
      category: 'Data Science',
      instructor: 'Trần Thị B',
      duration: '30 giờ',
      level: 'Beginner',
    },
    {
      image: '/teacher.jpg',
      name: 'Node.js Backend Development',
      description: 'Xây dựng RESTful APIs và microservices với Node.js',
      rating: 4.6,
      price: 799000,
      category: 'Backend Development',
      instructor: 'Phạm Thị D',
      duration: '28 giờ',
      level: 'Intermediate',
    },
    {
      image: '/teacher.jpg',
      name: 'Machine Learning với Python',
      description: 'Machine Learning từ cơ bản đến nâng cao',
      rating: 4.9,
      price: 1299000,
      category: 'Machine Learning',
      instructor: 'Hoàng Văn E',
      duration: '35 giờ',
      level: 'Advanced',
    },
    {
      image: '/teacher.jpg',
      name: 'Flutter Mobile Development',
      description: 'Phát triển app mobile cross-platform với Flutter',
      rating: 4.8,
      price: 999000,
      category: 'Mobile Development',
      instructor: 'Vũ Thị F',
      duration: '32 giờ',
      level: 'Intermediate',
    },
    {
      image: '/teacher.jpg',
      name: 'UI/UX Design Fundamentals',
      description: 'Thiết kế giao diện người dùng hiện đại với Figma',
      rating: 4.7,
      price: 599000,
      category: 'Frontend Development',
      instructor: 'Lê Văn C',
      duration: '20 giờ',
      level: 'Beginner',
    },
    {
      image: '/teacher.jpg',
      name: 'AWS Cloud Practitioner',
      description: 'Chứng chỉ AWS Cloud Practitioner cho người mới bắt đầu',
      rating: 4.7,
      price: 399000,
      category: 'DevOps',
      instructor: 'Đỗ Văn H',
      duration: '15 giờ',
      level: 'Beginner',
    },
    {
      image: '/teacher.jpg',
      name: 'Digital Marketing Mastery',
      description: 'Chiến lược marketing online toàn diện',
      rating: 4.5,
      price: 499000,
      category: 'Web Development',
      instructor: 'Ngô Văn G',
      duration: '18 giờ',
      level: 'Beginner',
    },
    {
      image: '/teacher.jpg',
      name: 'Vue.js Complete Course',
      description: 'Học Vue.js từ cơ bản đến xây dựng ứng dụng thực tế',
      rating: 4.8,
      price: 750000,
      category: 'Frontend Development',
      instructor: 'Lý Thị I',
      duration: '22 giờ',
      level: 'Intermediate',
    },
    {
      image: '/teacher.jpg',
      name: 'Docker & Kubernetes',
      description: 'Containerization và orchestration với Docker & K8s',
      rating: 4.6,
      price: 850000,
      category: 'DevOps',
      instructor: 'Trần Văn K',
      duration: '24 giờ',
      level: 'Advanced',
    },
  ];

  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1500);
  };

  const handleCategoryClick = (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    setVisibleCount(4);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handlePriceRangeClick = (priceRange: string) => {
    setLoading(true);
    setSelectedPriceRange(priceRange);
    setVisibleCount(4);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setVisibleCount(4);
  };

  const handleViewDetail = (course: Course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

    const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

    let matchesPriceRange = true;
    switch (selectedPriceRange) {
      case '<500K':
        matchesPriceRange = course.price < 500000;
        break;
      case '500K-1M':
        matchesPriceRange = course.price >= 500000 && course.price <= 1000000;
        break;
      case '>1M':
        matchesPriceRange = course.price > 1000000;
        break;
      default:
        matchesPriceRange = true;
    }

    const matchesSearch = searchTerm === '' ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPriceRange && matchesSearch;
  });

  const visibleCourses = filteredCourses.slice(0, visibleCount);

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6">
      <div className="px-5 md:px-10 lg:px-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Khóa học lập trình nổi bật
        </h2>

        {/* Search Bar + Price Dropdown */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="relative max-w-md flex-1">
            <Input
              type="text"
              placeholder="Tìm kiếm khóa học, giảng viên..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent bg-white placeholder:text-gray-400 "
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="w-full sm:w-48 flex flex-col gap-1">
            <label className="mb-1 text-xs font-medium text-gray-600 ml-1">Khoảng giá</label>
            <Select value={selectedPriceRange} onValueChange={handlePriceRangeClick}>
              <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white px-4 py-4 text-sm font-medium shadow-sm focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] flex items-center gap-2 min-w-[200px]">
                <Tag className="mr-2 h-4 w-4 text-[var(--primary-color)]" />
                <SelectValue placeholder="Tất cả mức giá" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border shadow-lg bg-white">
                <SelectItem value="All" className="rounded-md px-3 py-2 data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:text-white">
                  Tất cả mức giá
                </SelectItem>
                <SelectItem value="<500K" className="rounded-md px-3 py-2 data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:text-white">
                  Dưới 500K
                </SelectItem>
                <SelectItem value="500K-1M" className="rounded-md px-3 py-2 data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:text-white">
                  500K - 1 triệu
                </SelectItem>
                <SelectItem value=">1M" className="rounded-md px-3 py-2 data-[state=checked]:bg-[var(--primary-color)] data-[state=checked]:text-white">
                  Trên 1 triệu
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              variant={selectedCategory === category ? 'default' : 'ghost'}
              className={`rounded-2xl text-sm font-medium shadow-sm cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <MainSectionSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {visibleCourses.map((course, index) => (
              <CardItem key={index} course={course} onViewDetail={handleViewDetail} />
            ))}
          </div>
        )}

        {!loading && visibleCount < filteredCourses.length && (
          <div className="my-10 flex w-full justify-center">
            <Button
              variant="outline"
              onClick={handleViewMore}
              className="hover:bg-[var(--primary-color)] hover:text-white"
            >
              Xem thêm khóa học
            </Button>
          </div>
        )}
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.name}</DialogTitle>
            <DialogDescription>{selectedCourse?.description}</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <>
              <img
                src={selectedCourse.image}
                alt={selectedCourse.name}
                className="w-full h-64 object-cover rounded mb-4 object-top"
              />
              <div className="space-y-2 text-sm">
                <p><b>Giảng viên:</b> {selectedCourse.instructor}</p>
                <p><b>Thời lượng:</b> {selectedCourse.duration}</p>
                <p><b>Trình độ:</b> {selectedCourse.level}</p>
                <p><b>Đánh giá:</b> {selectedCourse.rating}</p>
                <p><b>Giá:</b> {selectedCourse.price.toLocaleString()} VND</p>
                <p><b>Danh mục:</b> {selectedCourse.category}</p>
              </div>
            </>
          )}
          <DialogClose asChild>
            <Button variant="outline" className="mt-4 w-full cursor-pointer hover:bg-[var(--primary-color)] hover:text-white">Đóng</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainSection;
