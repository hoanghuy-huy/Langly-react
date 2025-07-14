import { Button } from '@/components/ui/button';
import { Heart, Clock, User, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useFavorites } from '@/contexts/FavoriteContext';
import { saveToViewHistory } from '@/services/viewHistoryService';

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
  viewedAt?: string; // Timestamp khi xem
};

interface CourseCardPreviewProps {
  course: Course;
  onViewDetail?: (course: Course) => void;
}

const CardItem = ({ course, onViewDetail }: CourseCardPreviewProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(course);
  };

    const handleViewDetail = () => {
    // Lưu vào lịch sử xem
    saveToViewHistory(course);

    // Gọi callback gốc
    if (onViewDetail) {
      onViewDetail(course);
    }
  };

  return (
    <div className="group w-full h-full flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={course.image}
          alt={course.name}
          className="h-[180px] w-full object-cover object-top transition-all duration-300 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Course+Image';
          }}
        />
        <div className="absolute top-2 right-2">
          <div
            className={`cursor-pointer rounded-full p-1 transition-colors ${
              isFavorite(course.name)
                ? 'bg-red-500 text-white'
                : 'bg-white/80 hover:bg-red-500 hover:text-white'
            }`}
            onClick={handleFavoriteClick}
            tabIndex={0}
            role="button"
            aria-label="Yêu thích"
          >
            <Heart size={16} className={isFavorite(course.name) ? 'fill-current' : ''} />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[48px]">
            {course.name}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-500 min-h-[40px]">
            {course.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={14} />
          <span className="font-medium">{course.instructor}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={14} />
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {course.level}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <span className="text-sm text-gray-500">(100 đánh giá)</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-[var(--primary-color)]">
            {formatPrice(course.price)}
          </p>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {course.category}
          </span>
        </div>

        <div className="mt-auto w-full">
          <Button
            variant="outline"
            className="w-full cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white"
            onClick={handleViewDetail}
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

CardItem.Skeleton = () => {
  return (
    <div className="w-full h-full flex flex-col rounded-xl bg-white shadow-sm">
      <Skeleton className="h-[180px] w-full rounded-t-xl" />
      <div className="flex flex-col flex-1 gap-3 p-4">
        <div>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full mt-2" />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="mt-auto">
          <Skeleton className="mt-2 h-9 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
