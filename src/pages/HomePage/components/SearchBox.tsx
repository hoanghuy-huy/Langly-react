import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const trendingTopics = [
  'English Speaking',
  'Basic Grammar',
  'IELTS Preparation',
  'Basic Grammar',
  'IELTS Preparation',
];

const HeroSection = () => {
  return (
    <section className="bg-[#f7f2ed] px-4 text-center">
      <div className="mx-auto mt-6 flex w-full max-w-md overflow-hidden rounded-md border border-blue-300 bg-white shadow-md">
        <Input
          className="flex-1 rounded-none border-0 px-4 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="What would you like to learn?"
        />
        <button className="flex items-center justify-center bg-[#f36f25] px-4 text-white">
          <Search size={18} />
        </button>
      </div>

      <div className="mx-auto mt-4 max-w-md text-left">
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-800">
          <span>📈 Trending:</span>
          {trendingTopics.map((topic, i) => (
            <Button
              key={i}
              size={'sm'}
              className="inline-block rounded-full bg-[#e9dfd7] px-3 py-1 text-xs text-gray-800 hover:text-white"
            >
              {topic}
            </Button>
          ))}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
