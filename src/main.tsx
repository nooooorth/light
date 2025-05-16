import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function Root() {
  useEffect(() => {
    // 立即添加预加载类来阻止所有动画
    document.documentElement.classList.add('preload');
    
    // 使用 requestAnimationFrame 来确保在下一帧开始动画
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('preload');
        document.documentElement.classList.add('ready');
      });
    });

    return () => {
      document.documentElement.classList.remove('preload', 'ready');
    };
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
