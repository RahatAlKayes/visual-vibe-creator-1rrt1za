import React, { useState } from "react";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast("Please fill in all required fields", {
        description: "Name, email and message are required",
        position: "top-center",
        duration: 3000
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Form submission success
      toast("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
        position: "top-center"
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast("Failed to send message", {
        description: "Please try again later",
        position: "top-center",
        duration: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-lg text-gray-600">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="opacity-0 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 font-display">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-designer-purple/10 flex items-center justify-center text-designer-purple">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instagram</p>
                    <a 
                      href="https://instagram.com/1rrt1za" 
                      className="text-lg font-medium hover:text-designer-purple transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @1rrt1za
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-designer-teal/10 flex items-center justify-center text-designer-teal">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href="mailto:rahatalkayes@gmail.com" 
                      className="text-lg font-medium hover:text-designer-teal transition-colors"
                    >
                      rahatalkayes@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-designer-pink/10 flex items-center justify-center text-designer-pink">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href="tel:+11234567890" 
                      className="text-lg font-medium hover:text-designer-pink transition-colors"
                    >
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-designer-orange/10 flex items-center justify-center text-designer-orange">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 glass-card p-8 opacity-0 animate-fade-in delay-200">
            <h3 className="text-2xl font-bold mb-6 font-display">Send a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  type="text" 
                  placeholder="Message subject" 
                  className="w-full"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  className="min-h-[120px] w-full"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-gradient-to-r from-designer-purple to-designer-teal hover:opacity-90 transition-opacity text-white font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
