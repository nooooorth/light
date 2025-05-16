import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomQuote } from './quotes'; // Ensure quotes.ts is also localized
import { RefreshCw, Share2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

const generateRandomGradient = () => {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + Math.floor(Math.random() * 120) + 120) % 360;
  const saturation = Math.floor(Math.random() * 30) + 70;
  const lightness1 = Math.floor(Math.random() * 20) + 20;
  const lightness2 = Math.floor(Math.random() * 20) + 30;
  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
  const color2 = `hsl(${hue2}, ${saturation}%, ${lightness2}%)`;
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

function EncouragementPage() {
  const [quote, setQuote] = useState('');
  const [gradient1, setGradient1] = useState(generateRandomGradient());
  const [gradient2, setGradient2] = useState(generateRandomGradient());
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);
  const [isUsingGradient1AsPrimary, setIsUsingGradient1AsPrimary] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);

  const updateQuoteAndBackground = useCallback(() => {
    setQuote(getRandomQuote());
    const newGradient = generateRandomGradient();
    if (isUsingGradient1AsPrimary) {
      setGradient2(newGradient);
      setOpacity1(0);
      setOpacity2(1);
    } else {
      setGradient1(newGradient);
      setOpacity2(0);
      setOpacity1(1);
    }
    setIsUsingGradient1AsPrimary(prev => !prev);
  }, [isUsingGradient1AsPrimary]);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleRefresh = () => {
    updateQuoteAndBackground();
  };

  const handleShare = async () => {
    const shareData = {
      title: '点亮 - 每日鼓励',
      text: `${quote} - 来自「点亮」App`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('内容成功分享！');
      } else {
        alert(`分享您的鼓励语：\n${quote}`);
        console.log('Web Share API 不支持，请手动复制分享。');
      }
    } catch (err) {
      console.error('分享失败：', err);
    }
  };

  const handleSaveAsImage = () => {
    if (pageRef.current) {
      html2canvas(pageRef.current, {
        useCORS: true,
        backgroundColor: null,
        onclone: (_document) => { // Changed 'document' to '_document' to indicate unused
        }
      }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'dianliang-quote.png'; // Consider localizing filename if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(err => {
        console.error('图片生成失败：', err);
        alert('抱歉，生成图片失败，请稍后再试。');
      });
    }
  };

  const commonBackgroundLayerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0',
    zIndex: -20,
    transition: 'opacity 1s ease-in-out',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  return (
    <div 
      ref={pageRef}
      className="flex flex-col items-center justify-center min-h-screen text-white p-4 relative overflow-hidden animate-page-fade-in"
    >
      <div
        style={{
          ...commonBackgroundLayerStyle,
          background: gradient1,
          opacity: opacity1,
        }}
      ></div>
      <div
        style={{
          ...commonBackgroundLayerStyle,
          background: gradient2,
          opacity: opacity2,
        }}
      ></div>
      <div 
        className="absolute inset-0 -z-10"
        style={{backgroundColor: 'rgba(0,0,0,0.2)'}} 
      ></div>

      <h1 className="text-4xl font-bold mb-8 text-shadow-lg animate-fade-in-down z-10">鼓励你的话</h1>
      <p className="text-2xl text-center mb-12 min-h-[100px] flex items-center justify-center text-shadow-md animate-fade-in animation-delay-300 z-10">
        {quote}
      </p>
      <div className="flex space-x-4 animate-fade-in-up animation-delay-600 z-10">
        <button 
          onClick={handleRefresh}
          aria-label="刷新鼓励语和背景"
          className="p-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-full shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75"
        >
          <RefreshCw size={28} />
        </button>
        <button 
          onClick={handleShare}
          aria-label="分享鼓励语"
          className="p-4 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-semibold rounded-full shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
        >
          <Share2 size={28} />
        </button>
        <button 
          onClick={handleSaveAsImage}
          aria-label="保存为图片"
          className="p-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-full shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
        >
          <Download size={28} />
        </button>
      </div>
      <style>
        {`
          @keyframes page-fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-page-fade-in {
            animation: page-fade-in 0.3s ease-out forwards;
          }
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
        `}
      </style>
    </div>
  );
}

export default EncouragementPage;