
import React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioItemProps {
  title: string;
  category: string;
  imageUrl: string;
  delay: string;
  className?: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  category,
  imageUrl,
  delay,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl opacity-0 animate-fade-in hover-card",
        delay,
        className
      )}
    >
      <div
        className="h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-designer-dark/80 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <p className="text-designer-yellow text-sm font-medium mb-2">
          {category}
        </p>
        <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
          {title}
        </h3>
        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="flex items-center text-white gap-2 bg-designer-purple/80 hover:bg-designer-purple px-4 py-2 rounded-lg text-sm font-medium">
            View Project <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  // Sample portfolio items
  const portfolioItems = [
    {
      title: "Neon Dreams",
      category: "Brand Identity",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      delay: "delay-100",
    },
    {
      title: "Abstract Waves",
      category: "Digital Art",
      imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      delay: "delay-200",
    },
    {
      title: "Vibrant Gradients",
      category: "UI Design",
      imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      delay: "delay-300",
    },
    {
      title: "Tech Minimalism",
      category: "Web Design",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      delay: "delay-100",
    },
    {
      title: "Creative Flow",
      category: "Motion Graphics",
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      delay: "delay-200",
    },
    {
      title: "Golden Hour",
      category: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      delay: "delay-300",
    },
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore a selection of my recent design projects, showcasing my creative approach and aesthetic sensibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              title={item.title}
              category={item.category}
              imageUrl={item.imageUrl}
              delay={item.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
