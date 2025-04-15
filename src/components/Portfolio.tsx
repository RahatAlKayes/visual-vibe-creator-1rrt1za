import React, { useState, useEffect } from "react";
import { ExternalLink, Bookmark, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  link?: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  category,
  imageUrl,
  delay,
  className,
}) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640";
  
  const handleImageError = () => {
    setImageError(true);
  };

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
        style={{ backgroundImage: `url(${imageError ? fallbackImageUrl : imageUrl})` }}
      >
        <img 
          src={imageUrl} 
          alt="" 
          className="hidden" 
          onError={handleImageError} 
        />
      </div>
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
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "Neon Dreams",
      category: "Brand Identity",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      description: "A vibrant brand identity project for a music festival."
    },
    {
      id: 2,
      title: "Abstract Waves",
      category: "Digital Art",
      imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      description: "Abstract digital art piece exploring motion and color."
    },
    {
      id: 3,
      title: "Vibrant Gradients",
      category: "UI Design",
      imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      description: "UI design system using vibrant gradients for a tech startup."
    },
  ]);

  // Get unique categories from actual portfolio items
  const categories = ["all", ...new Set(portfolioItems.map(item => item.category.toLowerCase()))];
  
  // Filter items based on active filter
  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.toLowerCase() === activeFilter);

  // Subscribe to portfolio items changes from admin panel
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolioItems') {
        const items = e.newValue ? JSON.parse(e.newValue) : [];
        setPortfolioItems(items);
      }
    };

    // Load initial items from localStorage
    const storedItems = localStorage.getItem('portfolioItems');
    if (storedItems) {
      setPortfolioItems(JSON.parse(storedItems));
    }

    // Listen for changes
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore a selection of my recent design projects, showcasing my creative approach and aesthetic sensibilities.
          </p>
        </div>
        
        {/* Portfolio Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm mr-2">
            <Filter size={14} className="mr-1" /> Filter:
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? "bg-designer-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All Work" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioItem
              key={item.id}
              title={item.title}
              category={item.category}
              imageUrl={item.imageUrl}
              delay={`delay-${(index % 3 + 1) * 100}`}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#admin" 
            className="inline-flex items-center px-6 py-3 rounded-full border-2 border-designer-purple text-designer-purple font-medium hover:bg-designer-purple/10 transition-colors"
          >
            <Bookmark size={18} className="mr-2" />
            Manage Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
