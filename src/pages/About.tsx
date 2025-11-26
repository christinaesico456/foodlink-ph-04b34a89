import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, Users, Leaf, Heart, Zap } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect, useState, useRef } from "react";
import agricultureImg from "@/assets/agriculture-cavite.jpg";

// --- ANIMATED COUNTER HELPER ---
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimate = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimate.current) {
          hasAnimate.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuad = (t) => t * (2 - t);
            setCount(progress === 1 ? numericValue : numericValue * easeOutQuad(progress));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [numericValue, duration]);

  const displayCount = value.includes('.') ? count.toFixed(1) : Math.floor(count);
  return <span ref={nodeRef} className="tabular-nums">{displayCount}{suffix}</span>;
};

const About = () => {
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction('learn_fact', 'Learning About Hunger', 10, '📚');
  }, []);

  const hungerFacts = [
    {
      icon: AlertCircle,
      stat: "10.9%",
      label: "Filipinos experience food insecurity",
      description: "Philippine Statistics Authority reports 10.9% food insecurity rate",
      color: "text-primary", // unified color handling
      bg: "bg-primary/10",
      source: "Philippine Statistics Authority, 2021"
    },
    {
      icon: TrendingDown,
      stat: "33.4%",
      label: "Child stunting rate",
      description: "UNICEF data shows 33.4% of Filipino children under 5 are stunted",
      color: "text-accent",
      bg: "bg-accent/10",
      source: "UNICEF Philippines, 2022"
    },
    {
      icon: Users,
      stat: "1.08M",
      label: "Households in Cavite",
      description: "With estimated 20.3% rural poverty incidence in CALABARZON",
      color: "text-secondary",
      bg: "bg-secondary/10",
      source: "Philippine Statistics Authority, 2020 Census"
    }
  ];

  const solutions = [
    {
      title: "Sustainable Agriculture",
      description: "Support local farmers in Cavite through better farming techniques, crop diversification, and fair market access.",
      icon: Leaf,
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      title: "Community Feeding Programs",
      description: "Regular feeding initiatives in barangays across Cavite provide nutritious meals to vulnerable families and children.",
      icon: Heart,
      gradient: "from-accent/20 to-accent/5"
    },
    {
      title: "Food Waste Reduction",
      description: "Connecting surplus food from restaurants and markets to communities in need through efficient distribution systems.",
      icon: Zap,
      gradient: "from-primary/20 to-primary/5"
    }
  ];

  return (
    <div className="bg-background">
      
             {/* ================= HERO SECTION (Background Image Layout) ================= */}
      {/* 1. HEIGHT: Reduced to 400px (mobile) and 500px (desktop) */}
      <section className="relative min-h-[400px] lg:min-h-[500px] flex items-center overflow-hidden">
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img 
            src={agricultureImg} 
            alt="Agriculture Background" 
            className="w-full h-full object-cover object-center filter brightness-75"
          />
        </div>

        {/* GRADIENT OVERLAY (Text Readability) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/60 to-transparent"></div>

        {/* BOTTOM BLENDER (Fades image into the next section) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/90 to-transparent z-5"></div>

        {/* CONTENT CONTAINER */}
        {/* 
           CRITICAL FIX HERE: 
           - Changed 'pt-20' to 'pt-24' (Just enough to clear navbar)
           - Changed 'pb-48/pb-72' to 'pb-12' (Removes the huge empty space at the bottom)
        */}
        <div className="container mx-auto px-6 md:px-12 relative z-20 pt-12 pb-12">
          
          <div className="max-w-3xl space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">The Reality of Hunger</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-foreground">
              Understanding
              <br />
              <span className="text-primary">Zero Hunger</span>
            </h1>
            
            {/* Paragraph */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Hunger remains a pressing issue in the Philippines, particularly in regions like 
              Cavite. Despite our agricultural heritage, millions of Filipinos still lack access 
              to adequate nutrition due to poverty.
            </p>
          </div>
        </div>
      </section>


      {/* ================= HUNGER IN NUMBERS (Interactive) ================= */}
      <section className="relative py-16 lg:py-30 overflow-hidden z-10 bg-gradient-to-r from-secondary via-primary/80 to-accent/80">
        
        {/* Top Blender Fade */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10 animate-pulse"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 pt-16">
          <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-16 drop-shadow-md">
            Hunger in <span className="text-white/90 decoration-4 decoration-primary/90">Numbers</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {hungerFacts.map((fact, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/90 backdrop-blur-md p-8 hover:bg-secondary/90 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => recordAction('learn_fact', 'Read Hunger Fact', 5, '📊')}
              >
                {/* Floating Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex p-4 rounded-full bg-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    <fact.icon className="h-8 w-8 text-primary/90" />
                  </div>
                  
                  <div className="text-5xl font-black mb-2 text-primary/90 tracking-tight">
                    <AnimatedCounter value={fact.stat} />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 text-primary/90">
                    {fact.label}
                  </h3>
                  
                  <p className="text-sm text-primary/90 mb-4">
                    {fact.description}
                  </p>

                  <div className="text-xs text-primary/90 uppercase tracking-widest font-medium border-t border-white/10 pt-4">
                    Source: {fact.source}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Blender Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* ================= SUSTAINABLE SOLUTIONS ================= */}
      <section className="relative py-24 lg:py-32 overflow-hidden z-10">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Sustainable <span className="text-secondary">Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SDG 2 goes beyond feeding the hungry—it's about building a sustainable food system 
              that ensures everyone has access to nutritious food year-round.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer h-full"
                onClick={() => recordAction('learn_fact', 'Explored Solution', 5, '💡')}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <solution.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
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

      {/* ================= ABOUT CAVITE SECTION ================= */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-foreground text-center">
              Focus on <span className="text-primary">Cavite</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-justify">
              <p>
                Cavite, known as the "Historical Capital of the Philippines," is home to over 4 million people. 
                While the province has seen rapid urbanization, many rural communities still face food insecurity challenges.
              </p>
              
              <p>
                Agricultural areas in municipalities like Indang, Maragondon, and Naic continue to be vital food sources, 
                yet many farmers struggle with limited resources and market access. Urban poor communities in cities like 
                Bacoor, Imus, and Dasmariñas face rising food costs that make nutritious meals unaffordable.
              </p>
              
              <div className="pt-4 border-t border-border">
                <p className="text-primary font-bold text-xl text-center">
                  FoodLink PH connects these communities with local government units (LGUs), NGOs, and volunteers 
                  working to ensure no Caviteño goes hungry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;