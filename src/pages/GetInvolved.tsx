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
  const { addImpact, completeMission } = useGamification();
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
    window.dispatchEvent(new CustomEvent('page-visit', { detail: { page: 'get-involved' } }));
    addImpact('peopleReached', 20, 'Taking action against hunger');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addImpact('actionsCompleted', 1);
    addImpact('peopleReached', 100, 'Volunteering to help fight hunger!');
    completeMission('volunteer_interest');
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
      description: "Join feeding programs in Cavite municipalities. Help pack meals, serve at community kitchens, or organize food drives in your barangay.",
      details: [
        "Weekly feeding programs in Bacoor, Imus, and Dasmariñas",
        "Monthly food distribution drives across 23 municipalities",
        "Community kitchen assistance (2-4 hours/week)",
        "Food sorting and packaging at local warehouses"
      ],
      action: "Sign Up to Volunteer",
      color: "primary"
    },
    {
      icon: DollarSign,
      title: "Donate",
      description: "Support local feeding programs serving 50,000+ Caviteños monthly. Every ₱50 provides a nutritious meal for a child in need.",
      details: [
        "₱50 = 1 meal for a malnourished child",
        "₱500 = Weekly groceries for a family of 4",
        "₱2,000 = Monthly food support for 1 household",
        "₱10,000 = Community feeding program for 200 people"
      ],
      action: "Learn About Donations",
      color: "secondary"
    },
    {
      icon: Share2,
      title: "Spread Awareness",
      description: "Amplify the message. Share stories, statistics, and solutions about hunger in the Philippines to educate your community and social networks.",
      details: [
        "Share SDG 2 infographics on Facebook, Twitter, Instagram",
        "Post stories of local heroes fighting hunger in Cavite",
        "Tag @FoodLinkPH and use #ZeroHungerCavite",
        "Organize awareness campaigns in schools and workplaces"
      ],
      action: "Share on Social Media",
      color: "accent"
    },
    {
      icon: Megaphone,
      title: "Advocate",
      description: "Contact local officials and support policies that improve food security, nutrition programs, and agricultural support in Cavite Province.",
      details: [
        "Sign petitions for expanded school feeding programs",
        "Email provincial representatives about food security",
        "Attend town hall meetings on hunger issues",
        "Support local farmers and sustainable agriculture policies"
      ],
      action: "Take Action",
      color: "earth"
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

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            {actionCards.map((card, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 hover:border-primary/40"
                onClick={() => {
                  addImpact('peopleReached', 10, `Exploring: ${card.title}`);
                  addImpact('actionsCompleted', 1);
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`flex-shrink-0 p-4 bg-${card.color}/10 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className={`h-8 w-8 text-${card.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {card.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{detail}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary font-bold"
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
