import { Skeleton } from '@/components/ui/skeleton';

const MainSectionSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full h-full flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
        >
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
      ))}
    </div>
  );
};

export default MainSectionSkeleton;
