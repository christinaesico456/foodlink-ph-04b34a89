import { Card } from "@/components/ui/card";
import { Building2, MapPin, Phone, Globe, Mail } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import CaviteMap from "@/components/CaviteMap";

const Organizations = () => {
  const { addImpact, completeMission } = useGamification();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('page-visit', { detail: { page: 'organizations' } }));
    addImpact('peopleReached', 30, 'Discovering organizations fighting hunger');
    completeMission('find_organizations');
  }, []);

  const organizations = [
    {
      name: "DSWD CALABARZON",
      type: "Government Agency",
      description: "Department of Social Welfare and Development - CALABARZON implements feeding programs, cash assistance, and livelihood projects for vulnerable families in Cavite.",
      location: "Regional Center, Calamba, Laguna (serves Cavite)",
      contact: "dswd.calabarzon@dswd.gov.ph",
      website: "https://ro4a.dswd.gov.ph/",
      focus: ["Feeding Programs", "Pantawid Pamilya", "Supplementary Feeding"],
      color: "primary"
    },
    {
      name: "Provincial Government of Cavite",
      type: "Local Government Unit",
      description: "Cavite Provincial Government coordinates various nutrition and food security programs across municipalities, including the Provincial Nutrition Council.",
      location: "Trece Martires City, Cavite",
      contact: "(046) 419-3164",
      website: "https://cavite.gov.ph/",
      focus: ["Nutrition Programs", "Agri Support", "Community Kitchens"],
      color: "secondary"
    },
    {
      name: "Rise Against Hunger Philippines",
      type: "Non-Profit Organization",
      description: "International hunger relief organization providing meal packing events and distributing food packages to communities in Metro Manila and nearby provinces including Cavite.",
      location: "Metro Manila (operates in Cavite)",
      website: "https://www.riseagainsthunger.ph/",
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--gradient-glow)' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Fighting Hunger Together</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Organizations in <span className="text-primary">Cavite</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              These organizations are actively working to address hunger and food insecurity in Cavite. 
              While they operate independently, their efforts create real impact in communities across the province.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">Interactive Map</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Explore <span className="text-primary">Cavite</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover feeding programs and food security initiatives across Cavite municipalities
              </p>
            </div>
            
            <CaviteMap />
          </div>
        </div>
      </section>

      {/* Organizations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {organizations.map((org, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => {
                  addImpact('peopleReached', 10, `Discovering: ${org.name}`);
                  if (org.website) {
                    window.open(org.website, '_blank');
                  }
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${org.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-4">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {org.name}
                        </h3>
                        <span className={`inline-block px-3 py-1 bg-${org.color}/20 text-${org.color} text-sm font-semibold rounded-full`}>
                          {org.type}
                        </span>
                      </div>
                      <Building2 className={`h-12 w-12 text-${org.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {org.description}
                  </p>

                  {/* Focus Areas */}
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-2">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {org.focus.map((area, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-muted text-foreground text-xs font-medium rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="pt-4 border-t border-border/50 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{org.location}</span>
                    </div>
                    
                    {org.contact && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {org.contact.includes('@') ? (
                          <>
                            <Mail className="h-4 w-4 text-primary" />
                            <span>{org.contact}</span>
                          </>
                        ) : (
                          <>
                            <Phone className="h-4 w-4 text-primary" />
                            <span>{org.contact}</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    {org.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-primary" />
                        <a 
                          href={org.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-muted/50 backdrop-blur-xl border-primary/20 p-8">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                <strong className="text-foreground">Note:</strong> This list is for informational purposes only. 
                FoodLink PH is not affiliated with these organizations. We encourage you to contact them directly 
                to learn more about their programs or to get involved in their initiatives.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Organizations;
