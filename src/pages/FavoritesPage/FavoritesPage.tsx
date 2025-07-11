import { useFavorites } from '@/contexts/FavoriteContext';
import CardItem from '@/pages/HomePage/components/CardItem';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleViewDetail = (course: any) => {
    // Có thể thêm logic để mở modal hoặc navigate đến trang chi tiết
    console.log('View detail:', course);
  };

  const handleRemoveAll = () => {
    favorites.forEach(course => removeFromFavorites(course.name));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6">
      <div className="px-5 md:px-10 lg:px-20">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Khóa học yêu thích
              </h1>
              <p className="text-sm text-gray-600">
                {favorites.length} khóa học đã yêu thích
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={handleRemoveAll}
              className="text-red-600 hover:bg-red-50"
            >
              Xóa tất cả
            </Button>
          )}
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Chưa có khóa học yêu thích
            </h3>
            <p className="mb-6 text-center text-gray-600 max-w-md">
              Bạn chưa yêu thích khóa học nào. Hãy khám phá các khóa học và nhấn vào biểu tượng trái tim để thêm vào danh sách yêu thích.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90"
            >
              Khám phá khóa học
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {favorites.map((course, index) => (
              <CardItem
                key={`${course.name}-${index}`}
                course={course}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
