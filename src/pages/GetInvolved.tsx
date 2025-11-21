import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HandHeart, Users, DollarSign, Share2, Heart, Megaphone, CheckCircle } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import volunteersImg from "@/assets/volunteers.jpg";

const GetInvolved = () => {
  const { addPoints } = useGamification();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interest: "",
    message: ""
  });

  useEffect(() => {
    addPoints(5, 'visited_get_involved');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPoints(20, 'submitted_volunteer_form');
    toast({
      title: "Thank you for your interest!",
      description: "We'll get back to you soon about volunteer opportunities.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      interest: "",
      message: ""
    });
  };

  const actionCards = [
    {
      icon: HandHeart,
      title: "Volunteer",
      description: "Join feeding programs, food drives, and community events in Cavite",
      action: "Sign Up to Volunteer",
      color: "primary",
      points: 10
    },
    {
      icon: DollarSign,
      title: "Donate",
      description: "Support local feeding programs and food banks serving Cavite communities",
      action: "Learn About Donations",
      color: "secondary",
      points: 10
    },
    {
      icon: Share2,
      title: "Spread Awareness",
      description: "Share SDG 2 content and help educate others about hunger issues",
      action: "Share on Social Media",
      color: "accent",
      points: 5
    },
    {
      icon: Megaphone,
      title: "Advocate",
      description: "Contact local officials and support policies that address food security",
      action: "Take Action",
      color: "earth",
      points: 10
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${volunteersImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Be the Change</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Get <span className="text-primary">Involved</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every action counts in the fight against hunger. Whether you have time, resources, 
              or just a voice—you can make a difference in Cavite communities.
            </p>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-black text-center mb-16 text-foreground">
            Ways to <span className="text-accent">Make an Impact</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {actionCards.map((card, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer"
                onClick={() => {
                  addPoints(card.points, `action_${card.title.toLowerCase()}`);
                  toast({
                    title: `+${card.points} points!`,
                    description: `You explored: ${card.title}`,
                  });
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className={`inline-flex p-4 bg-${card.color}/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className={`h-10 w-10 text-${card.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-primary/50 hover:bg-primary/10"
                  >
                    {card.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-accent/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-5xl font-black mb-6 text-foreground">
                Volunteer with <span className="text-primary">Us</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out this form and we'll connect you with volunteer opportunities in your area
              </p>
            </div>

            <Card className="bg-card/40 backdrop-blur-xl border-primary/20 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Dela Cruz"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+63 912 345 6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (City/Municipality) *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Bacoor, Imus, Dasmariñas"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">Area of Interest</Label>
                  <Input
                    id="interest"
                    placeholder="e.g., Feeding programs, Food drives, Community events"
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us why you want to volunteer..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="bg-background/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Application
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-12 text-primary-foreground">
            Together We Can Achieve More
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "15,000+", label: "Volunteers Nationwide" },
              { value: "2.8M", label: "Meals Served Monthly" },
              { value: "450+", label: "Active Programs" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-primary-foreground/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
