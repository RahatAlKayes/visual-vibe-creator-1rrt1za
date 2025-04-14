
import React from "react";
import { Palette, Code, Monitor, Camera, Lightbulb, Brush } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  icon, 
  title, 
  description, 
  delay,
  className
}) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl hover-card opacity-0 animate-fade-in glass-card",
        className,
        delay
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-designer-purple/10 flex items-center justify-center mb-4 text-designer-purple">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const About: React.FC = () => {
  const skills = [
    {
      icon: <Palette size={24} />,
      title: "Visual Design",
      description: "Creating visually stunning designs that speak to your audience.",
      delay: "delay-100",
      className: "bg-designer-purple/5"
    },
    {
      icon: <Code size={24} />,
      title: "Web Design",
      description: "Building beautiful, responsive web interfaces that engage users.",
      delay: "delay-200",
      className: "bg-designer-teal/5"
    },
    {
      icon: <Monitor size={24} />,
      title: "UI/UX Design",
      description: "Crafting intuitive user experiences that guide and delight.",
      delay: "delay-300",
      className: "bg-designer-pink/5"
    },
    {
      icon: <Camera size={24} />,
      title: "Photography",
      description: "Capturing moments and creating visual stories through images.",
      delay: "delay-100",
      className: "bg-designer-orange/5"
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Creative Direction",
      description: "Guiding creative projects from concept to completion.",
      delay: "delay-200",
      className: "bg-designer-yellow/5"
    },
    {
      icon: <Brush size={24} />,
      title: "Illustration",
      description: "Creating custom illustrations that bring ideas to life.",
      delay: "delay-300",
      className: "bg-designer-purple/5"
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 opacity-0 animate-fade-in">
            I'm a passionate visual designer with a keen eye for aesthetics and functionality. My approach combines creative vision with strategic thinking to deliver designs that not only look amazing but also achieve their purpose.
          </p>
          <p className="text-lg text-gray-600 opacity-0 animate-fade-in delay-200">
            With expertise across digital and print media, I create cohesive visual experiences that help brands connect with their audience authentically and memorably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              delay={skill.delay}
              className={skill.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
