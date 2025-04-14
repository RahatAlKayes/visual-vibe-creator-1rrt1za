
import React, { useState } from "react";
import { Upload, Gallery, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

interface ArtworkProps {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

const ArtworkCard: React.FC<ArtworkProps> = ({
  id,
  title,
  artist,
  imageUrl,
  likes,
  comments,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640";

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover-card">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageError ? fallbackImage : imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{artist}</p>
        
        <div className="flex justify-between mt-4">
          <button 
            className={`flex items-center gap-1 text-sm ${liked ? 'text-red-500' : 'text-gray-600'}`}
            onClick={handleLike}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount}
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MessageSquare size={16} /> {comments}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Community: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Sample community artwork data
  const communityArtworks: ArtworkProps[] = [
    {
      id: 1,
      title: "Abstract Flow",
      artist: "Olivia Chen",
      imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "Urban Playground",
      artist: "Marco Steiner",
      imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      likes: 32,
      comments: 8,
    },
    {
      id: 3,
      title: "Digital Dreamscape",
      artist: "Alex Rivera",
      imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      likes: 68,
      comments: 15,
    },
    {
      id: 4,
      title: "Neon Nights",
      artist: "Sophia Kim",
      imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      likes: 51,
      comments: 9,
    },
    {
      id: 5,
      title: "Minimalist Space",
      artist: "David Parsons",
      imageUrl: "https://images.unsplash.com/photo-1581349437898-cebbe9831942?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      likes: 27,
      comments: 5,
    },
    {
      id: 6,
      title: "Color Harmony",
      artist: "Jasmine Wong",
      imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      likes: 39,
      comments: 11,
    },
  ];

  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      toast("Feature coming soon", {
        description: "Art/design upload will be available in the next update.",
        position: "top-center",
        duration: 3000
      });
    }, 1500);
  };

  return (
    <section id="community" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            <span className="gradient-text">Community Showcase</span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore amazing art and designs from talented creators in our community. Share your work and connect with fellow artists.
          </p>
        </div>

        <div className="glass-card p-8 mb-12 opacity-0 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-3/4">
              <h3 className="text-xl font-bold mb-4">Share Your Artwork</h3>
              <p className="text-gray-600 mb-6">
                Got a design you're proud of? Share it with the community and get feedback from other designers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Title of your artwork"
                  className="w-full"
                  disabled={isUploading}
                />
                <Input
                  type="file"
                  className="w-full"
                  disabled={isUploading}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full py-6 bg-gradient-to-r from-designer-purple to-designer-teal hover:opacity-90 transition-opacity text-white font-medium"
              >
                {isUploading ? "Uploading..." : (
                  <>
                    <Upload size={18} /> Upload Artwork
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityArtworks.map((artwork) => (
            <div key={artwork.id} className="opacity-0 animate-fade-in delay-100">
              <ArtworkCard {...artwork} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-4 border-designer-purple text-designer-purple hover:bg-designer-purple/10"
          >
            <Gallery size={18} className="mr-2" /> View All Community Art
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Community;
