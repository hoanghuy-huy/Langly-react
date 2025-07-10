'use client';
import { Typewriter } from 'react-simple-typewriter';

interface AnimatedTypewriterProps {
  words: string[];
}
const AnimatedTypewriter = ({ words }: AnimatedTypewriterProps) => {
  return (
    <span className="inline-block bg-lime-300 px-2 font-bold text-gray-900">
      <Typewriter
        words={words}
        loop={0}
        typeSpeed={150}
        deleteSpeed={150}
        delaySpeed={1500}
      />
    </span>
  );
};

export default AnimatedTypewriter;
