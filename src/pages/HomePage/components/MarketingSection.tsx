import SearchBox from './SearchBox';
import AnimatedTypewriter from './Typewriter';

const MarketingSection = () => {
  const words = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Japanese',
  ];
  return (
    <section className="relative flex h-[80vh] w-full items-start justify-center gap-6 overflow-hidden bg-[#f7f2ed] pt-14 pb-14">
      <div className="relative hidden h-full flex-1/12 lg:block">
        <div className="h-full">
          <img
            src="https://static1.wyzantcdn.com/homepage/search-panel/left-panel-bg.png"
            alt="left"
            className="h-full object-cover object-right"
          />
        </div>
      </div>
      <div className="flex h-full flex-shrink grow flex-col items-center justify-between">
        <div className="max-w-[704px] text-center text-5xl font-medium">
          <h2>
            Trust the nation's largest network for{' '}
            <AnimatedTypewriter words={words} /> tutors
          </h2>
        </div>
        <div className="w-full">
          <SearchBox />
        </div>
        <ul className="mx-auto mt-6 max-w-lg space-y-4 text-left text-sm text-gray-700 md:flex">
          <li className="flex items-start gap-2 text-center md:flex-col md:items-center md:text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path d="M0 11L11 0L22 11L11 22L0 11Z" fill="#B1D15D"></path>
            </svg>
            <span>
              More than <strong>4 million 5-star reviews</strong>
            </span>
          </li>
          <li className="flex items-start gap-2 text-center md:flex-col md:items-center md:text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path d="M0 11L11 0L22 11L11 22L0 11Z" fill="#F9B040"></path>
            </svg>
            <span>
              <strong>65,000 expert tutors</strong> in 300+ subjects
            </span>
          </li>
          <li className="flex items-start gap-2 text-center md:flex-col md:items-center md:text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path d="M0 11L11 0L22 11L11 22L0 11Z" fill="#60AD56"></path>
            </svg>
            <span>
              Find a great match with our <strong>Good Fit Guarantee</strong>
            </span>
          </li>
        </ul>
      </div>
      <div className="relative hidden h-full flex-1/12 overflow-hidden lg:block">
        <img
          src="https://static1.wyzantcdn.com/homepage/search-panel/right-panel-bg.png"
          alt="marketing section image 2"
          className="h-full object-cover object-left"
        />
      </div>
    </section>
  );
};

export default MarketingSection;
