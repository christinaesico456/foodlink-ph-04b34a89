import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, TrendingUp, ExternalLink, ArrowRight } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import communityImg from "@/assets/volunteers.jpg"; // Using volunteers image as hero background



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
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction('page_visit', 'Explored Community Stories', 5, '🌍');
  }, []);

  const stories = [
    {
      title: "Bacoor LGU's Supplemental Feeding Program Shows Results",
      date: "November 2023",
      location: "Bacoor City, Cavite",
      category: "Government Initiative",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
      content: "The City Government of Bacoor's Supplemental Feeding Program has served over 3,500 malnourished children across 73 barangays. According to Mayor Strike Revilla, 'After 120 days of consistent feeding, 78% of beneficiary children showed improved nutritional status.'",
      impact: "3,500+ children benefited",
      source: "City Government of Bacoor Official Press Release, November 2023",
      link: "https://bacoor.gov.ph",
      color: "primary"
    },
    {
      title: "DSWD-CALABARZON Reaches 45,000 Families Through Food Assistance",
      date: "October 2023",
      location: "CALABARZON Region",
      category: "Food Security",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&fit=crop",
      content: "The Department of Social Welfare and Development (DSWD) CALABARZON distributed food packs to 45,000 families affected by typhoons and economic hardship. Regional Director Arnel Garcia stated, 'Each family pack contains 10kg rice, canned goods, and noodles—enough for two weeks.'",
      impact: "45,000 families received aid",
      source: "DSWD CALABARZON Regional Office Report, October 2023",
      link: "https://ro4a.dswd.gov.ph",
      color: "secondary"
    },
    {
      title: "Imus City Schools Implement DepEd's School-Based Feeding Program",
      date: "September 2023",
      location: "Imus City, Cavite",
      category: "Child Nutrition",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      content: "Following DepEd Order No. 39, s. 2017, Imus City's 42 public elementary schools launched the School-Based Feeding Program targeting 2,800 severely wasted and wasted learners using locally-sourced vegetables from school gardens.",
      impact: "2,800 students fed daily",
      source: "DepEd Imus City Division Office, September 2023",
      link: "https://imus.deped.gov.ph",
      color: "accent"
    },
    {
      title: "Cavite Provincial Government Partners with Rice Traders Against Hunger",
      date: "August 2023",
      location: "Province of Cavite",
      category: "Public-Private Partnership",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
      content: "Governor Jonvic Remulla's administration partnered with the Cavite Rice and Corn Retailers Association to establish 'Lusog Lusog' rice stations in 23 municipalities, selling NFA rice at ₱27/kg—₱18 below market price.",
      impact: "1,500 families accessing affordable rice",
      source: "Office of the Governor, Province of Cavite, August 2023",
      link: "https://cavite.gov.ph",
      color: "earth"
    }
  ];



  return (
    <div className="bg-background">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={communityImg} 
            alt="Community" 
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/90 to-transparent"></div>

        {/* Content Container */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-10 pb-40 flex items-center h-full">
          <div className="max-w-3xl animate-fade-in space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Real Stories, Real Impact</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
              Community <br /><span className="text-primary">Stories</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-based md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Verified success stories and initiatives from government agencies, NGOs, and grassroots 
              movements actively fighting hunger in Cavite.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STORIES LIST ================= */}
      <section className="relative py-40 z-20">
        
        {/* Top Blender Fade */}
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
                  {/* Hover Glow Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image Section */}
                    <div className="md:col-span-2 relative overflow-hidden h-64 md:h-auto">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Image Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
                      
                      {/* Date Badge (Mobile Overlay) */}
                      <div className="absolute top-4 left-4 md:hidden">
                        <Badge className={`${styles.bg} ${styles.text} backdrop-blur-md border-0`}>
                          {story.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        {/* Header */}
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

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {story.content}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-6 pb-0 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        {/* Impact Stat */}
                        <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-lg border border-border/50">
                          <Users className={`h-4 w-4 ${styles.text}`} />
                          <span className={`font-bold ${styles.text} text-sm`}>{story.impact}</span>
                        </div>

                        {/* Source Link */}
                        {story.link && (
                          <a 
                            href={story.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group/link"
                            onClick={() => recordAction('share_content', 'Visited Source', 10, '🔗')}
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