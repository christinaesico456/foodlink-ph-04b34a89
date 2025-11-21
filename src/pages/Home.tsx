import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Heart, TrendingUp, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";

const Home = () => {
  const { addPoints } = useGamification();

  useEffect(() => {
    addPoints(5, 'visited_home');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Futuristic Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--gradient-glow)' }}></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `bounce-slow ${Math.random() * 10 + 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">SDG 2: Zero Hunger</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-none">
                <span className="block text-foreground">Fight</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-glow">
                  Hunger
                </span>
                <span className="block text-foreground">Together</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                FoodLink PH connects communities with NGOs and local programs. 
                <span className="text-primary font-semibold"> Every action creates impact.</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/get-involved">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 group shadow-xl hover:shadow-2xl transition-all"
                    onClick={() => addPoints(5, 'cta_click')}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Get Involved
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/50 text-foreground hover:bg-primary/10 font-bold px-8 backdrop-blur-sm"
                    onClick={() => addPoints(3, 'learn_more')}
                  >
                    Discover More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Interactive Stats */}
            <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-card/40 backdrop-blur-xl border-primary/20 p-8 shadow-2xl">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Real-Time Impact</h3>
                  
                  <div className="space-y-4">
                    {[
                      { value: '2.8M', label: 'Filipinos Fed Monthly', color: 'text-primary' },
                      { value: '450+', label: 'Active Programs', color: 'text-accent' },
                      { value: '15K', label: 'Volunteers', color: 'text-secondary' },
                    ].map((stat, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                        onClick={() => addPoints(2, 'stat_click')}
                      >
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {stat.label}
                        </span>
                        <span className={`text-3xl font-black ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Diagonal Layout */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-accent/10 -skew-y-3 transform origin-top-left"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mb-20 animate-fade-in">
            <h2 className="text-5xl font-black mb-6 text-foreground">
              Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Raising awareness and connecting communities with local NGOs and LGUs 
              running feeding programs across the Philippines.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Connect Communities",
                description: "Link those in need with organizations and volunteers ready to help",
                color: "primary",
                gradient: "from-primary/20 to-primary/5"
              },
              {
                icon: Heart,
                title: "Spread Awareness",
                description: "Educate people about hunger issues and sustainable food practices",
                color: "accent",
                gradient: "from-accent/20 to-accent/5"
              },
              {
                icon: TrendingUp,
                title: "Drive Action",
                description: "Encourage volunteering, donations, and advocacy for SDG 2",
                color: "secondary",
                gradient: "from-secondary/20 to-secondary/5"
              }
            ].map((item, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => addPoints(3, 'mission_card')}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 bg-${item.color}/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-10 w-10 text-${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Split Design */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-earth/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="h-16 w-16 text-background mx-auto mb-6 animate-bounce-slow" />
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-primary-foreground">
              Ready to Make an Impact?
            </h2>
            <p className="text-2xl mb-12 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands making a difference. Every action creates ripples of change.
            </p>
            <Link to="/get-involved">
              <Button 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 hover:scale-110 font-bold px-12 py-6 text-lg shadow-2xl transition-all duration-300"
                onClick={() => addPoints(10, 'final_cta')}
              >
                <Zap className="mr-2 h-6 w-6" />
                Start Your Journey
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
