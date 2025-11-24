import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import feedingImg from "@/assets/feeding-program.jpg";
import childrenImg from "@/assets/children-feeding.jpg";

const Home = () => {
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction('page_visit', 'Visited Home', 5, '🏠');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,163,37,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">SDG 2: Zero Hunger</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-tight text-foreground">
              Connecting
              <br />
              <span className="text-primary">Communities</span>
              <br />
              to Fight Hunger
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Join the movement to end hunger in the Philippines. Together, we can ensure 
              every Filipino has access to nutritious food and a better future.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/get-involved">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
                >
                  Get Involved
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 font-bold"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative lg:h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img 
              src={feedingImg}
              alt="Community feeding program in Cavite"
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-r from-primary via-accent to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "10.9%", label: "Food Insecurity Rate (PSA 2021)", icon: Users, source: "Philippine Statistics Authority" },
              { value: "33.4%", label: "Child Stunting Rate (UNICEF 2022)", icon: Heart, source: "UNICEF Philippines" },
              { value: "450+", label: "Active Programs in Cavite", icon: Target, source: "Cavite PSWDO 2023" },
              { value: "50K+", label: "Individuals Served Monthly", icon: TrendingUp, source: "Cavite LGUs Combined Data" }
            ].map((stat, i) => (
              <Card 
                key={i} 
                className="text-center p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-primary-foreground" />
                <div className="text-5xl font-black text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-primary-foreground/70">
                  {stat.source}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative h-[500px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-earth/20 rounded-3xl blur-3xl"></div>
              <img 
                src={childrenImg}
                alt="Children receiving meals"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-secondary/20"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/30">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-accent">Our Mission</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-foreground">
                Zero Hunger
                <br />
                <span className="text-secondary">Starts Here</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                FoodLink PH connects communities, organizations, and individuals in the fight 
                against hunger across Cavite Province. We believe that no one should go to bed 
                hungry, and together, we're making that vision a reality.
              </p>
              
              <div className="space-y-4">
                {[
                  "Support 50,000+ Caviteños monthly through feeding programs",
                  "Partner with 25+ local organizations and LGUs",
                  "Advocate for sustainable food security solutions",
                  "Empower communities through education and resources"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-secondary/50 hover:bg-secondary/10 font-bold group mt-4"
                >
                  Read Our Story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/quiz">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold group mt-4"
                >
                  Take Knowledge Quiz
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(218,163,37,0.15),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-black text-foreground">
              Be Part of the
              <br />
              <span className="text-primary">Solution</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every action counts. Whether you volunteer, donate, or spread awareness—
              you're helping create a hunger-free Cavite.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/get-involved">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 group"
                >
                  Take Action Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/organizations">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 font-bold px-8"
                >
                  Explore Organizations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
