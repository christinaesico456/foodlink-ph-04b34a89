import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect, useState, useRef } from "react";
import feedingImg from "@/assets/feeding-program.jpg";
import childrenImg from "@/assets/children-feeding.jpg";
import { Card } from "@/components/ui/card"; // Ensuring Card is imported


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
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction('page_visit', 'Visited Home', 5, '🏠');
  }, []);

  const statsData = [
    { value: "10.9%", label: "Food Insecurity Rate", sub: "(PSA 2021)", icon: Users, source: "Philippine Statistics Authority" },
    { value: "33.4%", label: "Child Stunting Rate", sub: "(UNICEF 2022)", icon: Heart, source: "UNICEF Philippines" },
    { value: "450+", label: "Active Programs", sub: "in Cavite", icon: Target, source: "Cavite PSWDO 2023" },
    { value: "50K+", label: "Individuals Served", sub: "Monthly", icon: TrendingUp, source: "Cavite LGUs Combined Data" }
  ];

  return (
    <div className="bg-background">
      
      {/* ================= HERO SECTION ================= */}
      {/* We removed bottom padding so it sits flush with the Stats section blender */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,163,37,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">SDG 2: Zero Hunger</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
              Connecting<br /><span className="text-primary">Communities</span><br />to Fight Hunger
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
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
          <div className="relative h-[350px] lg:h-[450px] animate-fade-in mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img src={feedingImg} alt="Feeding program" className="relative z-10 w-full h-full object-cover rounded-3xl shadow-4xl border-2 border-primary/60" />
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      {/* We use -mt-20 to pull this section UP underneath the Hero fade, creating a deep overlap */}
      <section className="relative py-32 -mt-20 bg-gradient-to-r from-primary via-accent to-secondary overflow-hidden group z-0">
        
        {/* --- TOP BLENDER (Hero to Stats) --- */}
        {/* h-64 makes a very long, smooth fade from Cream to Transparent */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/60 to-transparent z-10 pointer-events-none"></div>

        {/* --- BOTTOM BLENDER (Stats to Mission) --- */}
        {/* Fades from Transparent back to Cream at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10 animate-pulse"></div>
        
        <div className="container mx-auto px-6 md:px-8 relative z-20 pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, i) => (
              <div key={i} className="relative group/card">
                <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative mb-6 p-4 rounded-full bg-white group-hover/card:scale-110 group-hover/card:rotate-6 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-black text-foreground mb-2 tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-bold text-foreground/80">{stat.label}</div>
                    <div className="text-sm font-medium text-foreground/60">{stat.sub}</div>
                  </div>
                  <div className="mt-6 text-xs text-foreground/80 font-medium uppercase tracking-wider">
                    Source: {stat.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* ================= MISSION SECTION ================= */}
      {/* CHANGED: Reduced 'py-32' to 'py-20 lg:py-24' to make it shorter. 
          Kept '-mt-20' to maintain the blended overlap. */}
      <section className="relative py-16 lg:py-16 -mt-20 overflow-hidden z-10">
        
        {/* Top Fade (Connects to Stats Section) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>

        {/* CHANGED: Reduced gap from 'gap-16' to 'gap-10' to bring image and text closer */}
        <div className="container mx-auto px-6 md:px-14 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Image - CHANGED: Reduced height from 'h-[500px]' to 'h-[400px]' */}
            <div className="relative h-[300px] lg:h-[400px] animate-fade-in order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-earth/20 rounded-3xl blur-3xl"></div>
              <img 
                src={childrenImg} 
                alt="Mission" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-4xl border-2 border-secondary/20" 
              />
            </div>
            
            {/* Content */}
            {/* CHANGED: Reduced 'space-y-8' to 'space-y-6' for tighter text */}
            <div className="space-y-6 animate-fade-in order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/30">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-accent">Our Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                Zero Hunger <span className="text-secondary">Starts Here</span>
              </h2>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                FoodLink PH connects communities, organizations, and individuals in the fight 
                against hunger across Cavite Province.
              </p>
              
              {/* CHANGED: Converted list to a 2-Column Grid (sm:grid-cols-2) 
                  This saves vertical space by putting items side-by-side. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-0 gap-y-1">
                {[
                  "Support 50k+ Caviteños", 
                  "Partner with 25+ LGUs", 
                  "Sustainable food security", 
                  "Empower communities"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground font-medium whitespace-nowrap">{point}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-secondary/50 hover:bg-secondary/80 font-bold group h-12">
                    Read Our Story <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button size="lg" className="bg-accent hover:bg-primary/90 text-accent-foreground font-bold group h-12">
                    Take Quiz <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-20 overflow-hidden">
        {/* Smooth connector from Mission to CTA */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(218,163,37,0.15),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-black text-foreground">
              Be Part of the <span className="text-primary">Solution</span>
            </h2>

            <p className="text-based text-muted-foreground leading-relaxed">
              Every action counts. Whether you volunteer, donate, or spread awareness 
              you're helping create a hunger-free Cavite.
            </p>


            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/get-involved">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 group">
                  Take Action Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>



              <Link to="/organizations">
                <Button size="lg" variant="outline" className="hover:bg-secondary/60 font-bold px-8">
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