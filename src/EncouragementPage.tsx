import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getRandomQuote } from './quotes'; // Ensure quotes.ts is also localized
import { RefreshCw, Share2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

const gradientDirections = [
  'to bottom right',
  'to top left',
  'to bottom left',
  'to top right',
  'to right',
  'to left',
  'to top',
  'to bottom',
  '135deg',
  '225deg',
  '45deg',
  '315deg',
];

const generateRandomGradient = () => {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + Math.floor(Math.random() * 120) + 120) % 360;
  const saturation = Math.floor(Math.random() * 30) + 70;
  const lightness1 = Math.floor(Math.random() * 20) + 20;
  const lightness2 = Math.floor(Math.random() * 20) + 30;
  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
  const color2 = `hsl(${hue2}, ${saturation}%, ${lightness2}%)`;
  const direction = gradientDirections[Math.floor(Math.random() * gradientDirections.length)];
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
};

function EncouragementPage() {
  const location = useLocation();
  // 优先使用首页传递的渐变色
  const initialGradient = location.state && location.state.bg ? location.state.bg : generateRandomGradient();
  const [quote, setQuote] = useState('');
  const [gradient1, setGradient1] = useState(initialGradient);
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
    // 生成一个只包含背景和鼓励语的隐藏节点用于截图
    const bg = gradient1;
    const temp = document.createElement('div');
    temp.style.position = 'fixed';
    temp.style.left = '0';
    temp.style.top = '0';
    temp.style.width = '800px';
    temp.style.height = '800px';
    temp.style.background = bg;
    temp.style.display = 'flex';
    temp.style.flexDirection = 'column';
    temp.style.justifyContent = 'center';
    temp.style.alignItems = 'center';
    temp.style.zIndex = '9999';
    temp.style.color = 'white';
    temp.style.fontFamily = 'inherit';
    temp.innerHTML = `
      <div style="flex:1;display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
        <span style="font-size:2.5rem;font-weight:bold;text-align:center;line-height:1.4;text-shadow:0 2px 8px rgba(0,0,0,0.25);max-width:90%;word-break:break-all;">${quote}</span>
      </div>
      <div style="position:absolute;right:32px;bottom:32px;font-size:1rem;opacity:0.7;letter-spacing:2px;">来自点亮</div>
    `;
    document.body.appendChild(temp);
    html2canvas(temp, {
      useCORS: true,
      backgroundColor: null,
      width: 800,
      height: 800,
      windowWidth: 800,
      windowHeight: 800,
    }).then(canvas => {
      document.body.removeChild(temp);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'dianliang-quote.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(err => {
      document.body.removeChild(temp);
      console.error('图片生成失败：', err);
      alert('抱歉，生成图片失败，请稍后再试。');
    });
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

      <h1 className="text-1xl font-bold mt-8 mb-6 text-shadow-lg animate-fade-in-down z-10 opacity-60 select-none pointer-events-none">Hi, 这世界总有人爱你</h1>
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-xl mx-auto z-10 flex-1 flex flex-col justify-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-xl px-8 py-10 flex items-center justify-center min-h-[120px] transition-all duration-300 border-dashed hover:border-solid hover:border-blue-300/60 group">
            <p className="text-2xl text-center font-semibold text-shadow-md text-white drop-shadow-lg select-text">
              {quote}
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 animate-fade-in-up animation-delay-600 z-10 action-bar mt-auto mb-8">
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