import { MainSection, MarketingSection } from './components';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <MarketingSection />
      <MainSection />
    </div>
  );
};

export default HomePage;
