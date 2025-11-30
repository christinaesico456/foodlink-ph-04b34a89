import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect, useState, useRef } from "react";
import feedingImg from "@/assets/feeding-program.jpg";
import childrenImg from "@/assets/children-feeding.jpg";

// --- 1. ANIMATED COUNTER COMPONENT ---
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

// --- 2. MAIN HOME COMPONENT ---
const Home = () => {
  const { completeTask } = useGamification(); // Use completeTask instead of recordAction

  useEffect(() => {
    // Use the new API - just pass the task ID
    completeTask('page_visit');
  }, []);

  const statsData = [
    { value: "10.9%", label: "Food Insecurity Rate", sub: "(PSA 2021)", icon: Users, source: "Philippine Statistics Authority", hoverColor: "primary" },
    { value: "33.4%", label: "Child Stunting Rate", sub: "(UNICEF 2022)", icon: Heart, source: "UNICEF Philippines", hoverColor: "accent" },
    { value: "450+", label: "Active Programs", sub: "in Cavite", icon: Target, source: "Cavite PSWDO 2023", hoverColor: "secondary" },
    { value: "50K+", label: "Individuals Served", sub: "Monthly", icon: TrendingUp, source: "Cavite LGUs Combined Data", hoverColor: "earth" }
  ];

  return (
    <div className="bg-background">
      
      {/* ================= HERO SECTION - FULL SCREEN ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,163,37,0.1),transparent_50%)]"></div>
        
        <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
          <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">SDG 2: Zero Hunger</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-foreground">
                Together<br /><span className="text-primary">we nourish every</span><br />Filipino's tomorrow
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Join the movement to end hunger in the Philippines. Together, we can ensure 
                every Filipino has access to nutritious food and a better future.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/get-involved">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group">
                    Get Involved <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 font-bold">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative h-[350px] lg:h-[420px] xl:h-[500px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img src={feedingImg} alt="Feeding program" className="relative z-10 w-full h-full object-cover rounded-3xl shadow-4xl border-2 border-primary/60" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION - FULL SCREEN ================= */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-r from-primary/30 via-accent/25 to-secondary/30 backdrop-blur-sm overflow-hidden z-0">
        
        {/* TOP FADE - Subtle blend */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>

        {/* BOTTOM FADE - Subtle blend */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20 animate-pulse"></div>
        
        <div className="w-full px-8 md:px-16 lg:px-20 relative z-20">
          <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, i) => {
              const hoverBgClass = `hover:bg-${stat.hoverColor}/40`
              const hoverGlowClass = `bg-${stat.hoverColor}/20`
              const hoverIconClass = `group-hover/card:text-${stat.hoverColor}`

              return (
                <div key={i} className="relative group/card">
                  <div className={`h-full flex flex-col items-center justify-center text-center p-8 lg:p-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-2 ${hoverBgClass} hover:shadow-2xl`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${hoverGlowClass} rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative mb-6 p-4 rounded-full bg-white group-hover/card:bg-background group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300">
                      <stat.icon className={`h-8 w-8 text-foreground ${hoverIconClass}`} />
                    </div>

                    <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-foreground mb-2 tracking-tight">
                      <AnimatedCounter value={stat.value} />
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm lg:text-base font-bold text-foreground/80">{stat.label}</div>
                      <div className="text-xs font-medium text-foreground/60">{stat.sub}</div>
                    </div>

                    <div className="mt-6 text-xs text-foreground/80 font-medium uppercase tracking-wider">
                      Source: {stat.source}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= MISSION SECTION - FULL SCREEN ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden z-10">
        
        <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
          <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Image */}
            <div className="relative h-[350px] lg:h-[420px] xl:h-[500px] animate-fade-in order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-earth/20 rounded-3xl blur-3xl"></div>
              <img 
                src={childrenImg} 
                alt="Mission" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-4xl border-2 border-secondary/20" 
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6 animate-fade-in order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/30">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-accent">Our Mission</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                Zero Hunger <span className="text-secondary">Starts Here</span>
              </h2>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                FoodLink PH connects communities, organizations, and individuals in the fight 
                against hunger across Cavite Province.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Support 50k+ Caviteños", 
                  "Partner with 25+ LGUs", 
                  "Sustainable food security", 
                  "Empower communities"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">{point}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-secondary/50 hover:bg-secondary/80 font-bold group h-14 px-8">
                    Read Our Story <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button size="lg" className="bg-accent hover:bg-primary/90 text-accent-foreground font-bold group h-14 px-8">
                    Take Quiz <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION - FULL SCREEN ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(218,163,37,0.15),transparent_50%)]"></div>
        
        <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground">
              Be Part of the <span className="text-primary">Solution</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every action counts. Whether you volunteer, donate, or spread awareness 
              you're helping create a hunger-free Cavite.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link to="/get-involved">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-14 group">
                  Take Action Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/organizations">
                <Button size="lg" variant="outline" className="hover:bg-secondary/60 font-bold px-10 h-14">
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