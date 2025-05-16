import { useState, useEffect, useCallback } from 'react';
import { getRandomQuote } from './quotes';

const generateRandomGradient = () => {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + Math.floor(Math.random() * 120) + 120) % 360;
  const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
  const lightness1 = Math.floor(Math.random() * 20) + 20; // 20-40%
  const lightness2 = Math.floor(Math.random() * 20) + 30; // 30-50%

  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
  const color2 = `hsl(${hue2}, ${saturation}%, ${lightness2}%)`;
  
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

function EncouragementPage() {
  const [quote, setQuote] = useState('');
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const updateContentAndBackground = useCallback(() => {
    setQuote(getRandomQuote());
    const newGradient = generateRandomGradient();
    setBackgroundStyle({
      background: newGradient,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)', // For Safari
    });
  }, []);

  useEffect(() => {
    updateContentAndBackground();
  }, [updateContentAndBackground]);

  const handleRefresh = () => {
    updateContentAndBackground();
  };

  const handleShare = async () => {
    const shareData = {
      title: '點亮 - 每日鼓勵',
      text: `${quote} - 來自「點亮」App`,
      url: window.location.href, // Or a specific link to the app/PWA
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('內容成功分享！');
      } else {
        // Fallback for browsers that do not support Web Share API
        alert(`分享您的鼓勵語：\n${quote}`);
        console.log('Web Share API 不支援，請手動複製分享。');
      }
    } catch (err) {
      console.error('分享失敗：', err);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white p-4 transition-all duration-1000 ease-in-out relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out -z-10"
        style={backgroundStyle}
      ></div>
      <div 
        className="absolute inset-0 backdrop-blur-md -z-10"
        style={{backgroundColor: 'rgba(0,0,0,0.1)'}} // Slight overlay to ensure text readability
      ></div>

      <h1 className="text-4xl font-bold mb-8 text-shadow-lg animate-fade-in-down z-10">鼓勵你的話</h1>
      <p className="text-2xl text-center mb-12 min-h-[100px] flex items-center justify-center text-shadow-md animate-fade-in animation-delay-300 z-10">
        {quote}
      </p>
      <div className="flex space-x-4 animate-fade-in-up animation-delay-600 z-10">
        <button 
          onClick={handleRefresh}
          className="px-8 py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-xl shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75 text-lg"
        >
          刷新
        </button>
        <button 
          onClick={handleShare}
          className="px-8 py-4 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-semibold rounded-xl shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75 text-lg"
        >
          分享
        </button>
      </div>
      <style>
        {`
          .text-shadow-lg {
            text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
          }
          .text-shadow-md {
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
          }
          @keyframes fade-in-down {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.8s ease-out forwards;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          .animation-delay-600 {
            animation-delay: 0.6s;
          }
          .-z-10 {
            z-index: -10;
           }
        `}
      </style>
    </div>
  );
}

export default EncouragementPage;

