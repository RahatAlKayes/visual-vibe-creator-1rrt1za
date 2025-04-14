
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className,
  gradient = false 
}) => {
  return (
    <div className="overflow-hidden">
      <h1 
        className={cn(
          "opacity-0 animate-fade-in", 
          gradient && "gradient-text",
          className
        )}
      >
        {text}
      </h1>
    </div>
  );
};

export default AnimatedText;
