
import React from "react";
import { ArrowDownCircle, Award, CupSoda } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-designer-purple/20 rounded-full filter blur-3xl opacity-70 animate-float"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-designer-teal/20 rounded-full filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }}></div>
      
      {/* 3D Design Elements */}
      <div className="absolute left-10 top-1/4 animate-float" style={{ animationDelay: "1s" }}>
        <CupSoda size={48} className="text-designer-purple opacity-60" />
      </div>
      <div className="absolute right-10 bottom-1/4 animate-float" style={{ animationDelay: "1.5s" }}>
        <Award size={48} className="text-designer-teal opacity-60" />
      </div>
      
      <div className="container px-6 flex flex-col items-center text-center z-10">
        <div className="mb-8 opacity-0 animate-fade-in">
          <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
            <AvatarImage src="/lovable-uploads/c41a8674-14ec-4801-97e1-e56c4eecd650.png" alt="Rahat Al Kayes" />
            <AvatarFallback>RAK</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="py-3 px-5 rounded-full bg-white/80 shadow-md mb-10 opacity-0 animate-fade-in">
          <span className="text-sm font-medium">Designer & Visual Artist</span>
        </div>
        
        <AnimatedText 
          text="Creative Design" 
          className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight font-display delay-200" 
          gradient
        />
        
        <AnimatedText 
          text="That Captures Attention" 
          className="text-4xl md:text-6xl font-bold mb-8 tracking-tight font-display delay-300" 
        />
        
        <p className="max-w-xl text-gray-600 mb-10 text-lg opacity-0 animate-fade-in delay-400">
          I create immersive visual experiences that blend bold aesthetics with purposeful design, helping brands stand out in today's digital landscape.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 opacity-0 animate-fade-in delay-500">
          <a 
            href="#portfolio" 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-designer-purple to-designer-teal text-white font-medium hover:shadow-lg transition-all"
          >
            View My Work
          </a>
          <a 
            href="#community" 
            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-medium hover:border-designer-purple transition-all group"
          >
            <Award className="inline-block mr-2 group-hover:text-designer-purple" size={20} />
            Join Design Contest
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-designer-purple animate-bounce"
      >
        <ArrowDownCircle size={36} />
      </a>
    </section>
  );
};

export default Hero;
