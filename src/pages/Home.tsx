import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkYWEzMjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2IDYtMi42ODYgNi02ek0wIDJjMC0zLjMxNC0yLjY4Ni02LTYtNnMtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDYgNi0yLjY4NiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/20 rounded-full border border-primary/30">
              <span className="text-sm font-semibold text-primary">SDG 2: Zero Hunger</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              Connecting Communities to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Fight Hunger
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              FoodLink PH bridges the gap between those who need help and those who can provide it. 
              Together, we can end hunger in the Philippines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-involved">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 group">
                  Get Involved
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 animate-bounce-slow hidden lg:block">
          <div className="w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-20 right-20 animate-bounce-slow animation-delay-1000 hidden lg:block">
          <div className="w-16 h-16 bg-accent/20 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              FoodLink PH is dedicated to raising awareness about hunger issues and connecting people 
              with local NGOs and LGUs that run feeding programs and food donation drives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Connect Communities",
                description: "Link those in need with organizations and volunteers ready to help",
                color: "text-primary"
              },
              {
                icon: Heart,
                title: "Spread Awareness",
                description: "Educate people about hunger issues and sustainable food practices",
                color: "text-accent"
              },
              {
                icon: TrendingUp,
                title: "Drive Action",
                description: "Encourage volunteering, donations, and advocacy for SDG 2",
                color: "text-secondary"
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card border-border"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex p-4 bg-muted rounded-full mb-4">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join us in the fight against hunger. Every action counts.
          </p>
          <Link to="/get-involved">
            <Button 
              size="lg" 
              className="bg-background text-primary hover:bg-background/90 font-semibold px-8 animate-pulse-glow"
            >
              Take Action Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
