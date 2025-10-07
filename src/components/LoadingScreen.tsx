import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center" dir="rtl">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-white/20 rounded-full animate-pulse mx-auto flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-xl">HMS</span>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white arabic-text">نظام إدارة الهوت سبوت</h1>
          <div className="w-64 bg-white/20 rounded-full h-2 mx-auto overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/80 arabic-text">جاري التحميل... {Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
};