import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import communityImg from "@/assets/volunteers.jpg";

// Helper to safely map colors to Tailwind classes
const getColorStyle = (colorType) => {
  const styles = {
    primary: { text: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: "from-primary/20" },
    secondary: { text: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20", glow: "from-secondary/20" },
    accent: { text: "text-accent", bg: "bg-accent/10", border: "border-accent/20", glow: "from-accent/20" },
    earth: { text: "text-green-600", bg: "bg-green-600/10", border: "border-green-600/20", glow: "from-green-600/20" },
  };
  return styles[colorType] || styles.primary;
};

const Community = () => {
  // ✅ FIXED: Changed from recordAction to completeTask
  const { completeTask } = useGamification();

  useEffect(() => {
    // ✅ FIXED: Just pass the task ID
    completeTask("page_visit");
  }, []);

  const stories = [
    {
      title: "Bulil'Eats Feeding Program launches a 50-Day Supplementary Feeding Program in Bacoor",
      date: "September 2024",
      location: "Bacoor City, Cavite",
      category: "Government Initiative",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
      content:
        "The City Government of Bacoor's Supplemental Feeding Program has served over 3,500 malnourished children across 73 barangays. The initiative provides nutritious meals to improve the health and well-being of vulnerable children in the community.",
      impact: "3,500+ children benefited",
      source: "City Government of Bacoor",
      link: "https://bacoor.gov.ph/latest-news/bulileats-feeding-program-launches-a-50-day-supplementary-feeding-program-in-bacoor/",
      color: "primary",
    },
    {
      title: "A Garden Grows in the Heat: A Story of Community Sustainability and Surprise",
      date: "2024",
      location: "Lyceum of the Philippines University - Cavite",
      category: "Educational Initiative",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
      content:
        "LPU Cavite's community garden project demonstrates how educational institutions can contribute to food security through sustainable agriculture. The initiative teaches students practical farming skills while providing fresh produce to the community.",
      impact: "Community-based food production",
      source: "Lyceum of the Philippines University - Cavite",
      link: "https://cavite.lpu.edu.ph/academics/corporate-social-responsibility/cosel-news-and-events/a-garden-grows-in-the-heat-a-story-of-community-sustainability-and-surprise/",
      color: "earth",
    },
    {
      title: "DSWD Distributes Food Packs to Vulnerable Families in Cavite",
      date: "October 2023",
      location: "Various Municipalities, Cavite",
      category: "Food Security",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&fit=crop",
      content:
        "The Department of Social Welfare and Development continues its commitment to food security by distributing essential food packs to families affected by economic challenges. Each pack contains rice, canned goods, and other nutritious staples to support household food needs.",
      impact: "Thousands of families assisted",
      source: "Philippine News Agency",
      link: "https://www.pna.gov.ph/articles/1011883",
      color: "secondary",
    },
    {
      title: "Project PEARLS: Healthcare and Nutrition Programs Transform Lives",
      date: "Ongoing",
      location: "Metro Manila & Cavite Outreach",
      category: "NGO Initiative",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      content:
        "Project PEARLS provides comprehensive healthcare and nutrition services to underprivileged communities. Their programs include feeding initiatives, medical missions, and health education to address malnutrition and improve overall community wellness.",
      impact: "Ongoing community support",
      source: "Project PEARLS Foundation",
      link: "https://www.projectpearls.org/healthcare-and-nutrition/",
      color: "accent",
    },
  ];

  return (
    <div className="bg-background">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={communityImg}
            alt="Community"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-10 pb-40 flex items-center h-full">
          <div className="max-w-3xl animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Real Stories, Real Impact</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
              Community <br />
              <span className="text-primary">Stories</span>
            </h1>

            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Verified success stories and initiatives from government agencies, NGOs, and grassroots movements actively fighting hunger in Cavite.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STORIES LIST ================= */}
      <section className="relative py-40 z-20">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            {stories.map((story, index) => {
              const styles = getColorStyle(story.color);

              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  {/* 🔥 Prevent overlay from blocking clicks */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                  ></div>

                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image */}
                    <div className="md:col-span-2 relative overflow-hidden h-64 md:h-auto pointer-events-none md:pointer-events-auto">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10 pointer-events-none"></div>

                      <div className="absolute top-4 left-4 md:hidden">
                        <Badge className={`${styles.bg} ${styles.text} backdrop-blur-md border-0`}>
                          {story.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-3 mb-4 items-center">
                          <Badge className={`hidden md:inline-flex ${styles.bg} ${styles.text} border-0 px-3 py-1 text-xs uppercase tracking-wider`}>
                            {story.category}
                          </Badge>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Calendar className="h-3 w-3" />
                            <span>{story.date}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-tight">
                          {story.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                          <MapPin className={`h-4 w-4 ${styles.text}`} />
                          <span className="font-medium">{story.location}</span>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6">{story.content}</p>
                      </div>

                      {/* Footer */}
                      <div className="pt-6 pb-0 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50">
                          <Users className={`h-4 w-4 ${styles.text}`} />
                          <span className={`font-bold ${styles.text} text-sm`}>{story.impact}</span>
                        </div>

                        {/* 🔥 Fully working link */}
                        {story.link && (
                          <a
                            href={story.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-[5] pointer-events-auto inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group/link"
                            onClick={() => completeTask("case_study")}
                          >
                            Read Full Story
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;