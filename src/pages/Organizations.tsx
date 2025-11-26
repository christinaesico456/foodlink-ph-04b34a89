import { Card } from "@/components/ui/card";
import { Building2, MapPin, Phone, Globe, Mail, ArrowUpRight, ArrowRight } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import CaviteMap from "@/components/CaviteMap";

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

const Organizations = () => {
  const { recordAction } = useGamification();

  useEffect(() => {
    recordAction('view_org', 'Discovered Organizations', 15, '🏢');
  }, []);

  const organizations = [
    {
      name: "DSWD CALABARZON",
      type: "Government Agency",
      description: "Department of Social Welfare and Development - CALABARZON implements feeding programs, cash assistance, and livelihood projects for vulnerable families in Cavite.",
      location: "Regional Center, Calamba, Laguna (serves Cavite)",
      contact: "dswd.calabarzon@dswd.gov.ph",
      website: "https://fo4a.dswd.gov.ph/",
      focus: ["Feeding Programs", "Pantawid Pamilya", "Supplementary Feeding"],
      color: "primary"
    },
    {
      name: "Provincial Government of Cavite",
      type: "Local Government Unit",
      description: "Cavite Provincial Government coordinates various nutrition and food security programs across municipalities, including the Provincial Nutrition Council.",
      location: "Trece Martires City, Cavite",
      contact: "(046) 419-3164",
      website: "https://cavite.gov.ph/home/",
      focus: ["Nutrition Programs", "Agri Support", "Community Kitchens"],
      color: "secondary"
    },
    {
      name: "Rise Against Hunger Philippines",
      type: "Non-Profit Organization",
      description: "International hunger relief organization providing meal packing events and distributing food packages to communities in Metro Manila and nearby provinces including Cavite.",
      location: "Metro Manila (operates in Cavite)",
      website: "https://www.riseagainsthunger.org.ph/",
      focus: ["Food Distribution", "Meal Packing", "Community Outreach"],
      color: "accent"
    },
    {
      name: "Gawad Kalinga",
      type: "Non-Profit Organization",
      description: "Nation-building movement with active communities in Cavite focused on poverty alleviation, housing, and community development including food security programs.",
      location: "Multiple GK Villages in Cavite",
      website: "https://gk1world.com/",
      focus: ["Community Building", "Food Security", "Livelihood Programs"],
      color: "earth"
    },
    {
      name: "Philippine Red Cross - Cavite",
      type: "Humanitarian Organization",
      description: "Provides humanitarian services including disaster response, feeding programs, and health services to vulnerable populations across Cavite province.",
      location: "Various chapters across Cavite",
      contact: "cavite@redcross.org.ph",
      website: "https://redcross.org.ph/",
      focus: ["Emergency Feeding", "Disaster Response", "Health Services"],
      color: "primary"
    },
    {
      name: "World Vision Philippines",
      type: "Non-Profit Organization",
      description: "Child-focused organization with programs in Cavite addressing child hunger, malnutrition, and promoting sustainable agriculture in rural communities.",
      location: "Operates in multiple Cavite municipalities",
      website: "https://www.worldvision.org.ph/",
      focus: ["Child Nutrition", "Sustainable Agriculture", "Community Development"],
      color: "secondary"
    }
  ];

  return (
    <div className="bg-background">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-500px] lg:min-h-[600px] flex items-center overflow-hidden">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(218,163,37,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-8">
          <div className="max-w-4xl animate-fade-in space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Fighting Hunger Together</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
              Organizations in <br /><span className="text-primary">Cavite</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              These organizations are actively working to address hunger and food insecurity. 
              While they operate independently, their efforts create real impact in communities across the province.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE MAP SECTION ================= */}
      <section className="relative py-20 -mt-20 z-20">
        
        {/* Top Blender Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-80 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Explore <span className="text-primary">Cavite</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover feeding programs and food security initiatives across municipalities.
            </p>
          </div>
          
          {/* Map Container with Glow */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
            <CaviteMap />
          </div>
        </div>
      </section>

      {/* ================= ORGANIZATIONS GRID ================= */}
      <section className="relative py-16 bg-gradient-to-b from-background to-primary/5">
        
        {/* Section Header */}
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <div className="flex items-center gap-3 mb-8">
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {organizations.map((org, index) => {
              const styles = getColorStyle(org.color); // Get color styles safely

              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 p-8 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => {
                    recordAction('view_org', `Viewed ${org.name}`, 10, '🏢');
                    if (org.website) window.open(org.website, '_blank');
                  }}
                >
                  {/* Hover Glow Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 space-y-6">
                    {/* Card Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className={`text-2xl font-bold ${styles.text} group-hover:underline decoration-2 underline-offset-4 transition-all`}>
                          {org.name}
                        </h3>
                        <span className={`inline-block px-3 py-1 ${styles.bg} ${styles.text} text-xs font-bold uppercase tracking-wider rounded-full`}>
                          {org.type}
                        </span>
                      </div>
                      
                      {/* External Link Icon */}
                      <div className={`p-3 rounded-full ${styles.bg} group-hover:scale-110 transition-transform duration-300`}>
                        <ArrowUpRight className={`h-6 w-6 ${styles.text}`} />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {org.description}
                    </p>

                    {/* Focus Areas - Chips */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Focus Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {org.focus.map((area, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-background border border-border text-foreground/80 text-xs font-medium rounded-lg shadow-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer / Contact */}
                    <div className="pt-6 border-t border-border/40 grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className={`h-4 w-4 ${styles.text}`} />
                        <span className="truncate">{org.location}</span>
                      </div>
                      
                      {org.website && (
                        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                          <Globe className={`h-4 w-4 ${styles.text}`} />
                          <span className="font-medium">Visit Website</span>
                          <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Disclaimer Footer */}
          <div className="mt-10 max-w-3xl mx-auto text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground bg-muted/30 px-6 py-4 rounded-2xl inline-block border border-border/50">
              <span className="font-bold text-primary">Note:</span> This list is for informational purposes only. 
              We encourage you to contact these organizations directly to get involved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Organizations;