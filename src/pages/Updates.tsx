import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";
import feedingImg from "@/assets/feeding-program.jpg";
import childrenImg from "@/assets/children-feeding.jpg";

const Updates = () => {
  const { addPoints } = useGamification();

  useEffect(() => {
    addPoints(5, 'visited_updates');
  }, []);

  const updates = [
    {
      title: "Community Feeding Program Reaches 500 Families in Bacoor",
      date: "November 15, 2025",
      location: "Bacoor, Cavite",
      category: "Feeding Program",
      image: feedingImg,
      content: "Local volunteers and the Bacoor LGU successfully distributed hot meals and food packs to 500 families in Barangay Molino. The initiative is part of the city's ongoing commitment to address food insecurity among vulnerable communities.",
      impact: "500 families served",
      color: "primary"
    },
    {
      title: "School Feeding Program Expands to 15 Elementary Schools",
      date: "November 10, 2025",
      location: "Imus, Cavite",
      category: "Child Nutrition",
      image: childrenImg,
      content: "The Department of Education and local nutrition councils launched an expanded school feeding program targeting undernourished students. Daily nutritious meals are now provided to over 2,000 students across 15 public elementary schools.",
      impact: "2,000+ children benefited",
      color: "secondary"
    },
    {
      title: "Urban Garden Project Trains 100 Families in Sustainable Farming",
      date: "November 5, 2025",
      location: "Dasmariñas, Cavite",
      category: "Agriculture Training",
      image: feedingImg,
      content: "Families in urban poor communities received training and starter kits for home vegetable gardens. The project aims to improve household food security while promoting sustainable agriculture practices.",
      impact: "100 families trained",
      color: "accent"
    },
    {
      title: "Food Rescue Initiative Prevents 5 Tons of Food Waste",
      date: "October 28, 2025",
      location: "Cavite Province",
      category: "Food Recovery",
      image: childrenImg,
      content: "A collaborative effort between restaurants, markets, and food banks successfully rescued and redistributed 5 tons of surplus food that would have gone to waste. The recovered food fed over 1,500 individuals in need.",
      impact: "5 tons of food rescued",
      color: "earth"
    },
    {
      title: "Mobile Food Pantry Serves Remote Barangays",
      date: "October 20, 2025",
      location: "Maragondon & Naic, Cavite",
      category: "Food Distribution",
      image: feedingImg,
      content: "A mobile food pantry program reached isolated rural communities in the mountainous areas of Maragondon and Naic, providing fresh produce, rice, and canned goods to families with limited access to markets.",
      impact: "12 barangays reached",
      color: "primary"
    },
    {
      title: "Youth Volunteers Pack 10,000 Meal Kits for Typhoon Relief",
      date: "October 12, 2025",
      location: "Trece Martires, Cavite",
      category: "Disaster Response",
      image: childrenImg,
      content: "Over 200 youth volunteers came together to pack emergency meal kits for families affected by recent flooding. The response demonstrated the power of community solidarity in times of crisis.",
      impact: "10,000 meal kits prepared",
      color: "secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--gradient-glow)' }}></div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `bounce-slow ${Math.random() * 10 + 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Latest News & Impact Stories</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Recent <span className="text-primary">Updates</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay informed about the latest feeding programs, success stories, and community initiatives 
              addressing hunger in Cavite.
            </p>
          </div>
        </div>
      </section>

      {/* Updates Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {updates.map((update, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => addPoints(3, 'read_update')}
              >
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Image */}
                  <div className="md:col-span-2 relative overflow-hidden">
                    <img 
                      src={update.image} 
                      alt={update.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`bg-${update.color}/20 text-${update.color} hover:bg-${update.color}/30`}>
                        {update.category}
                      </Badge>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {update.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{update.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{update.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {update.content}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-accent" />
                      <span className="font-semibold text-accent">{update.impact}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/5 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl border-primary/20 p-12">
              <h3 className="text-3xl font-black mb-4 text-foreground">
                Want to Share Your Story?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                If your organization or community has success stories to share, 
                we'd love to hear from you and highlight your impact.
              </p>
              <div className="text-primary font-semibold">
                Contact us to feature your initiative
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Updates;
