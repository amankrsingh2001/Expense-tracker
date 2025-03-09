
import React, { forwardRef } from "react";

type MotionProps = {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

// Create a namespace for our motion components
const motion = {
  div: forwardRef<HTMLDivElement, MotionProps>(
    (
      { 
        initial, 
        animate, 
        transition, 
        className = "", 
        children, 
        style = {},
        ...props 
      }, 
      ref
    ) => {
      // Create animation classes based on props
      let animationClass = "";
      let transitionStyle = { ...style };
      
      if (initial && animate) {
        if (initial.opacity === 0 && animate.opacity === 1) {
          animationClass += " animate-fade-in";
        }
        
        if (initial.y === 20 && animate.y === 0) {
          animationClass += " animate-fade-in-up";
        }
        
        if (initial.scale && animate.scale) {
          transitionStyle.transform = `scale(${animate.scale})`;
          transitionStyle.transition = `transform ${transition?.duration || 0.3}s ease-in-out`;
        }
        
        if (transition?.delay) {
          transitionStyle.animationDelay = `${transition.delay}s`;
        }
      }
      
      return (
        <div ref={ref} className={`${className} ${animationClass}`.trim()}style={transitionStyle}
          {...props}
        >
          {children}
        </div>
      );
    }
  ),
};

// Export the motion object directly
export { motion };