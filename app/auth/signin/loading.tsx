"use client"

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";




const Loading = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const duration = 2000; 
    const interval = 20; 
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;
    
    const timer = setInterval(() => {
      currentProgress += increment;
      

      const randomFactor = Math.random() * 0.5;
      const adjustedIncrement = increment * (1 + randomFactor);
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        

        setTimeout(() => {
          setShowContent(false);

          setTimeout(() => {
            onFinished();
          }, 600);
        }, 300);
      } else {
        setProgress(Math.min(currentProgress, 100));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onFinished]);
  if (!showContent) return null;
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-600 animate-fade-in">
      <div className={cn(
        "relative transition-all duration-1000",
        showContent ? "opacity-100" : "opacity-0 translate-y-5"
      )}>
        <div className="mb-12">
          <div className="relative flex justify-center">
            <div className="animate-spin-slow">
              <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#f0f0f0" 
                  strokeWidth="8"
                />
                <path 
                  d="M5 50 A 45 45 0 0 1 95 50" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-6 opacity-90">
          <div className="w-72 mx-auto">
            <Progress value={progress} className="h-1 bg-gray-100" />
          </div>
          <p className="mt-6 text-sm text-gray-500 animate-pulse-slow">
            Loading experience...
          </p>
        </div>
      </div>
      

      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gray-50 rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-1/4 -right-10 w-20 h-20 bg-gray-50 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 -left-10 w-24 h-24 bg-gray-50 rounded-full animate-pulse-slow" style={{ animationDelay: '0.8s' }}></div>
      </div>
    </div>
  );
};
export default Loading;