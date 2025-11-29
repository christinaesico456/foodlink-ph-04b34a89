import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, Users, Leaf, Heart, Zap } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect, useState, useRef } from "react";
import agricultureImg from "@/assets/agriculture-cavite.jpg";

// --- ANIMATED COUNTER ---
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !triggered.current) {
        triggered.current = true;
        let start = null;
        const animate = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = progress * (2 - progress);
          setCount(progress === 1 ? numericValue : numericValue * eased);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue, duration]);

  const display = value.includes(".") ? count.toFixed(1) : Math.floor(count);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
};

const About = () => {
  // ✅ FIXED: Changed from recordAction to completeTask
  const { completeTask } = useGamification();

  useEffect(() => {
    // ✅ FIXED: Just pass the task ID
    completeTask("learn_fact");
  }, []);

  const hungerFacts = [
    {
      icon: AlertCircle,
      stat: "10.9%",
      label: "Filipinos experience food insecurity",
      description: "Based on PSA's national food insecurity report.",
      color: "text-primary",
      bg: "bg-primary/10",
      source: "Philippine Statistics Authority, 2021"
    },
    {
      icon: TrendingDown,
      stat: "33.4%",
      label: "Child stunting rate",
      description: "UNICEF reports high stunting among Filipino children under 5.",
      color: "text-secondary",
      bg: "bg-secondary/10",
      source: "UNICEF Philippines, 2022"
    },
    {
      icon: Users,
      stat: "1.08M",
      label: "Households in Cavite",
      description: "Approximately 20.3% poverty incidence in CALABARZON rural areas.",
      color: "text-accent",
      bg: "bg-accent/10",
      source: "PSA, 2020 Census"
    }
  ];

  const solutions = [
    {
      title: "Sustainable Agriculture",
      description: "Empower Cavite farmers through crop diversity & improved techniques.",
      icon: Leaf,
      gradient: "from-primary/10 to-transparent"
    },
    {
      title: "Community Feeding Programs",
      description: "Barangay-based weekly feeding for children and vulnerable families.",
      icon: Heart,
      gradient: "from-secondary/10 to-transparent"
    },
    {
      title: "Food Waste Reduction",
      description: "Redirect surplus food from markets to communities in need.",
      icon: Zap,
      gradient: "from-accent/10 to-transparent"
    }
  ];

  return (
    <div className="bg-background text-foreground">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        
        {/* Simpler Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={agricultureImg}
            alt="Agriculture Background"
            className="w-full h-full object-cover object-center brightness-75"
          />
        </div>

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/10 z-10"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 py-16">
          <div className="max-w-3xl space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/15 border border-primary/30 rounded-full">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">The Reality of Hunger</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Understanding <br />
              <span className="text-primary">Zero Hunger</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Hunger continues to affect millions of Filipinos—particularly in Cavite—despite our
              rich agricultural foundation.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HUNGER IN NUMBERS ================= */}
      <section className="py-20 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
            Hunger in <span className="text-primary">Numbers</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {hungerFacts.map((fact, i) => (
              <Card
                key={i}
                className={`p-8 border border-border bg-white hover:shadow-xl transition-all rounded-2xl cursor-pointer`}
                onClick={() => completeTask("learn_fact")}
              >
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-full ${fact.bg}`}>
                    <fact.icon className={`h-8 w-8 ${fact.color}`} />
                  </div>

                  <div className={`text-5xl font-black ${fact.color}`}>
                    <AnimatedCounter value={fact.stat} />
                  </div>

                  <h3 className="text-lg font-semibold">{fact.label}</h3>

                  <p className="text-sm text-muted-foreground">{fact.description}</p>

                  <p className="text-[11px] text-muted-foreground pt-4 border-t">
                    Source: {fact.source}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black">
              Sustainable <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              SDG 2 aims to transform food systems so no Filipino goes hungry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <Card
                key={i}
                className="p-8 border border-border bg-white hover:shadow-xl transition rounded-2xl relative overflow-hidden cursor-pointer"
                onClick={() => completeTask("learn_fact")}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sol.gradient} opacity-60`}></div>

                <div className="relative z-10 text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full inline-block">
                    <sol.icon className="h-10 w-10 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold">{sol.title}</h3>

                  <p className="text-muted-foreground">{sol.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT CAVITE ================= */}
      <section className="py-24 bg-muted/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto bg-white border border-border p-10 rounded-3xl shadow-md">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-8">
              Focus on <span className="text-primary">Cavite</span>
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Cavite—home to over 4 million people—continues to face food access challenges
                despite rapid urbanization.
              </p>
              <p>
                Rural farmers in towns like Indang and Maragondon face market limitations, while
                urban poor families in Bacoor and Imus struggle with rising food prices.
              </p>

              <p className="text-center font-bold text-primary pt-4 border-t border-border">
                FoodLink PH strengthens local support networks to ensure every Caviteño has access
                to nutritious food.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;