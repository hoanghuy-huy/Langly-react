import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
type Teacher = {
  image: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  language: string;
};

interface TeacherCardPreviewProps {
  teacher: Teacher;
}

const CardItem = ({ teacher }: TeacherCardPreviewProps) => {
  return (
    <div className="group w-full overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="h-[180px] w-full transform object-cover object-top transition-all duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {teacher.name}
          </h3>
          <div className="cursor-pointer">
            <Heart />
          </div>
        </div>

        <p className="line-clamp-2 overflow-hidden text-sm break-words text-gray-500">
          {teacher.description}
        </p>

        <p className="text-sm text-gray-600">
          Language: <span className="font-medium">{teacher.language}</span>
        </p>

        <p className="text-sm text-[var(--primary-color)]">
          Rating {teacher.rating}
        </p>

        <p className="text-base font-bold text-gray-900">
          {teacher.price.toLocaleString()} VND
        </p>

        <div className="w-full">
          <Button
            variant="outline"
            className="mt-2 w-full cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white"
          >
            View more
          </Button>
        </div>
      </div>
    </div>
  );
};

CardItem.Skeleton = () => {
  return (
    <div className="w-full rounded-xl bg-white shadow-sm">
      <Skeleton className="h-[180px] w-full rounded-t-xl" />

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />

        <Skeleton className="h-4 w-1/3" />

        <Skeleton className="h-4 w-1/4" />

        <Skeleton className="h-5 w-1/2" />

        <Skeleton className="mt-2 h-9 w-full rounded-md" />
      </div>
    </div>
  );
};

export default CardItem;
