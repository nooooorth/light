import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef, useMemo } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);
  // 动态生成渐变色
  const gradientDirections = [
    'to bottom right', 'to top left', 'to bottom left', 'to top right',
    'to right', 'to left', 'to top', 'to bottom',
    '135deg', '225deg', '45deg', '315deg',
  ];
  const homeGradient = useMemo(() => {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + Math.floor(Math.random() * 120) + 120) % 360;
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness1 = Math.floor(Math.random() * 20) + 20;
    const lightness2 = Math.floor(Math.random() * 20) + 30;
    const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
    const color2 = `hsl(${hue2}, ${saturation}%, ${lightness2}%)`;
    const direction = gradientDirections[Math.floor(Math.random() * gradientDirections.length)];
    return `linear-gradient(${direction}, ${color1}, ${color2})`;
  }, []);
  const handleStartClick = () => {
    if (bgRef.current) {
      bgRef.current.classList.add('fade-out-bg');
      setTimeout(() => {
        navigate('/encouragement', { state: { bg: homeGradient } });
      }, 600);
    } else {
      navigate('/encouragement', { state: { bg: homeGradient } });
    }
  };

  return (
    <div ref={bgRef} style={{ background: homeGradient }} className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-8 animate-page-fade-in transition-colors duration-700">
      <header className="text-center mb-22">
        <h1 className="text-6xl font-bold tracking-tight animate-fade-in-down mb-6">
          点  亮
        </h1>
        <p className="mt-0 text-2xl text-slate-300 animate-fade-in-up animation-delay-300 max-w-xl mx-auto">
          在每个瞬间，发现一束光
        </p>
      </header>
      <main className="flex flex-col items-center animate-fade-in animation-delay-600 w-full mt-32">
        <Button 
          size="lg" 
          className="group px-12 py-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-full shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 flex items-center justify-center mb-4"
          onClick={handleStartClick}
        >
          开始
        </Button>
      </main>
      <style>{`
        .fade-out-bg {
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}

export default HomePage;

