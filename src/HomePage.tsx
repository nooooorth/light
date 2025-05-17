import { useNavigate } from "react-router-dom";
import { useRef, useMemo } from 'react';
import { PlayCircle } from 'lucide-react';

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
    // 柔和浅色：饱和度 40-60%，亮度 85-95%
    const saturation = Math.floor(Math.random() * 20) + 40;
    const lightness1 = Math.floor(Math.random() * 10) + 85;
    const lightness2 = Math.floor(Math.random() * 10) + 85;
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
      <header className="flex flex-col items-center justify-center flex-1 pt-24 mb-0">
        <h1 className="text-6xl font-bold tracking-tight animate-fade-in-down mb-6 text-zinc-700 drop-shadow-xl" style={{textShadow: '0 4px 16px rgba(165, 141, 99, 0.26), 0 1px 0 #fff'}}>点  亮</h1>
        <p className="mt-0 text-2xl italic text-zinc-500 animate-fade-in-up animation-delay-300 max-w-xl mx-auto font-cursive drop-shadow-md" style={{textShadow: '0 2px 8px rgba(0,0,0,0.14), 0 1px 0 #fff'}}>Lighting up your day</p>
      </header>
      <main className="flex flex-1 flex-col items-center animate-fade-in animation-delay-600 w-full">
        <div className="flex-1" />
        <button
          className="mb-12 p-0 bg-transparent border-0 shadow-none rounded-full focus:outline-none focus:ring-4 focus:ring-zinc-300 focus:ring-opacity-60 transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
          style={{backdropFilter: 'blur(1px)', WebkitBackdropFilter: 'blur(1px)'}}
          onClick={handleStartClick}
          aria-label="开始"
        >
          <PlayCircle size={64} color="#444" className="drop-shadow-md" />
        </button>
      </main>
      <style>{`
        .fade-out-bg {
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .font-cursive {
          font-family: 'Great Vibes', cursive;
          font-style: italic;
          letter-spacing: 0.04em;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}

export default HomePage;

