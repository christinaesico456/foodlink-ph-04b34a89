import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, Users, Leaf, Heart, Zap } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import agricultureImg from "@/assets/agriculture-cavite.jpg";

const About = () => {
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction('learn_fact', 'Learning About Hunger', 10, '📚');
  }, []);

  const hungerFacts = [
    {
      icon: AlertCircle,
      stat: "16.2M",
      label: "Filipinos experience food insecurity",
      description: "Nearly 1 in 6 Filipinos struggle to access nutritious food daily",
      color: "primary"
    },
    {
      icon: TrendingDown,
      stat: "28.8%",
      label: "Child malnutrition rate",
      description: "Over 1 in 4 children under 5 are stunted due to chronic malnutrition",
      color: "accent"
    },
    {
      icon: Users,
      stat: "3.5M",
      label: "Households in Cavite",
      description: "Thousands of families in Cavite face daily food challenges",
      color: "secondary"
    }
  ];

  const solutions = [
    {
      title: "Sustainable Agriculture",
      description: "Support local farmers in Cavite through better farming techniques, crop diversification, and fair market access.",
      icon: Leaf,
      color: "from-secondary/20 to-secondary/5"
    },
    {
      title: "Community Feeding Programs",
      description: "Regular feeding initiatives in barangays across Cavite provide nutritious meals to vulnerable families and children.",
      icon: Heart,
      color: "from-accent/20 to-accent/5"
    },
    {
      title: "Food Waste Reduction",
      description: "Connecting surplus food from restaurants and markets to communities in need through efficient distribution systems.",
      icon: Zap,
      color: "from-primary/20 to-primary/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${agricultureImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up pt-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">The Reality of Hunger in the Philippines</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Understanding <span className="text-primary">Zero Hunger</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Hunger remains a pressing issue in the Philippines, particularly in regions like Cavite. 
              Despite our agricultural heritage, millions of Filipinos still lack access to adequate nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section - Interactive Cards */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-black text-center mb-16 text-foreground">
            Hunger in <span className="text-accent">Numbers</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {hungerFacts.map((fact, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer"
                onClick={() => recordAction('learn_fact', 'Read Hunger Fact', 5, '📊')}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${fact.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 bg-${fact.color}/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <fact.icon className={`h-10 w-10 text-${fact.color}`} />
                  </div>
                  
                  <div className={`text-6xl font-black mb-4 text-${fact.color} group-hover:scale-110 transition-transform duration-300`}>
                    {fact.stat}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {fact.label}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {fact.description}
                  </p>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Solutions */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-accent/5 -skew-y-2 transform origin-top-right"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-foreground">
              Sustainable <span className="text-secondary">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              SDG 2 goes beyond feeding the hungry—it's about building a sustainable food system 
              that ensures everyone has access to nutritious food year-round.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => recordAction('learn_fact', 'Explored Solution', 5, '💡')}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <solution.icon className="h-16 w-16 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Cavite Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-8 text-foreground">
              Focus on <span className="text-primary">Cavite</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Cavite, known as the "Historical Capital of the Philippines," is home to over 4 million people. 
                While the province has seen rapid urbanization, many rural communities still face food insecurity challenges.
              </p>
              
              <p>
                Agricultural areas in municipalities like Indang, Maragondon, and Naic continue to be vital food sources, 
                yet many farmers struggle with limited resources and market access. Urban poor communities in cities like 
                Bacoor, Imus, and Dasmariñas face rising food costs that make nutritious meals unaffordable.
              </p>
              
              <p className="text-primary font-semibold">
                FoodLink PH connects these communities with local government units (LGUs), NGOs, and volunteers 
                working to ensure no Caviteño goes hungry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
