
import React, { useState } from "react";
import { 
  Plus, Trash2, Edit, Save, X, Image, ExternalLink, Lock, 
  AlertTriangle, Check, EyeOff, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  link?: string;
}

const PortfolioAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Admin password - in a real app, this would be handled securely on the backend
  const ADMIN_PASSWORD = "admin123"; // You should change this!

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLogin(false);
      
      // In a real app, you'd fetch items from a database
      // For demo purposes, we'll use the same data from Portfolio.tsx
      const sampleItems: PortfolioItem[] = [
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
      ];
      
      setPortfolioItems(sampleItems);
      toast.success("Logged in successfully", {
        description: "You now have access to manage your portfolio",
      });
    } else {
      toast.error("Invalid password", {
        description: "Please check your password and try again",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPortfolioItems([]);
    toast("Logged out successfully", {
      description: "Admin session ended",
    });
  };

  const handleAddItem = () => {
    setCurrentItem({
      id: Date.now(),
      title: "",
      category: "",
      imageUrl: "",
    });
    setIsEditing(false);
    setShowItemDialog(true);
  };

  const handleEditItem = (item: PortfolioItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    setShowItemDialog(true);
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
      toast("Item deleted", {
        description: "Portfolio item has been removed",
      });
    }
  };

  const handleSaveItem = () => {
    if (!currentItem) return;
    
    if (!currentItem.title || !currentItem.category || !currentItem.imageUrl) {
      toast.error("Missing required fields", {
        description: "Please fill in all required fields",
      });
      return;
    }
    
    if (isEditing) {
      setPortfolioItems(portfolioItems.map(item => 
        item.id === currentItem.id ? currentItem : item
      ));
      toast.success("Item updated", {
        description: "Portfolio item has been updated",
      });
    } else {
      setPortfolioItems([...portfolioItems, currentItem]);
      toast.success("Item added", {
        description: "New portfolio item has been added",
      });
    }
    
    setShowItemDialog(false);
    setCurrentItem(null);
  };

  return (
    <section id="admin" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-display">
              Portfolio Management
            </h2>
            
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="px-4 py-2 border-designer-purple text-designer-purple"
              >
                <Lock className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button 
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 bg-gradient-to-r from-designer-purple to-designer-teal text-white"
              >
                <Lock className="mr-2 h-4 w-4" /> Admin Login
              </Button>
            )}
          </div>
          
          {isAuthenticated ? (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Portfolio Items</h3>
                <Button 
                  onClick={handleAddItem}
                  className="bg-designer-purple text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Item
                </Button>
              </div>
              
              {portfolioItems.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500">No portfolio items found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Click the "Add New Item" button to create your first portfolio item
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="h-12 w-12 rounded-md overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640";
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditItem(item)}
                            className="h-8 w-8 p-0 text-gray-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 text-amber-500">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Important Notes</h4>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>In a production environment, this admin panel would be secured with proper authentication</li>
                      <li>Changes made here are for demonstration purposes and won't be saved permanently</li>
                      <li>For real implementation, you would connect this to your own database or CMS</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Lock className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Admin Area</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This area is password protected. Login to manage your portfolio items, 
                upload new work, and customize your portfolio.
              </p>
              <Button 
                onClick={() => setShowLogin(true)}
                className="mt-6 bg-designer-purple text-white"
              >
                Login to Admin Panel
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Use "admin123" for demonstration purposes
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLogin}
              className="bg-designer-purple text-white"
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add/Edit Item Dialog */}
      <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Portfolio Item" : "Add Portfolio Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="Enter title"
                value={currentItem?.title || ""}
                onChange={(e) => setCurrentItem({ 
                  ...currentItem!, 
                  title: e.target.value 
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <Input
                placeholder="E.g., UI Design, Brand Identity, etc."
                value={currentItem?.category || ""}
                onChange={(e) => setCurrentItem({ 
                  ...currentItem!, 
                  category: e.target.value 
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL *</label>
              <div className="flex">
                <Input
                  placeholder="Enter image URL"
                  value={currentItem?.imageUrl || ""}
                  onChange={(e) => setCurrentItem({ 
                    ...currentItem!, 
                    imageUrl: e.target.value 
                  })}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => {
                    // In a real app, you would open a file picker or image library
                    toast.info("Image Picker", {
                      description: "In a production app, this would open an image upload dialog",
                    });
                  }}
                >
                  <Image size={16} />
                </Button>
              </div>
              {currentItem?.imageUrl && (
                <div className="mt-2 h-20 w-20 rounded-md overflow-hidden">
                  <img
                    src={currentItem.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640";
                    }}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter description"
                value={currentItem?.description || ""}
                onChange={(e) => setCurrentItem({ 
                  ...currentItem!, 
                  description: e.target.value 
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">External Link (optional)</label>
              <div className="flex">
                <Input
                  placeholder="E.g., https://example.com"
                  value={currentItem?.link || ""}
                  onChange={(e) => setCurrentItem({ 
                    ...currentItem!, 
                    link: e.target.value 
                  })}
                  className="flex-1"
                />
                {currentItem?.link && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => window.open(currentItem.link, '_blank')}
                  >
                    <ExternalLink size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowItemDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveItem}
              className="bg-designer-purple text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Item" : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioAdmin;
