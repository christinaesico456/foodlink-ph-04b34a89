import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, TrendingUp, ExternalLink } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useEffect } from "react";

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
      content: "The City Government of Bacoor's Supplemental Feeding Program has served over 3,500 malnourished children across 73 barangays. According to Mayor Strike Revilla, 'After 120 days of consistent feeding, 78% of beneficiary children showed improved nutritional status.' The program provides hot meals during school days, targeting severely wasted and wasted children identified through Operation Timbang.",
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
      content: "The Department of Social Welfare and Development (DSWD) CALABARZON distributed food packs to 45,000 families affected by typhoons and economic hardship. Regional Director Arnel Garcia stated, 'Each family pack contains 10kg rice, canned goods, and noodles—enough for two weeks.' The program prioritizes families with pregnant women, persons with disabilities, and senior citizens.",
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
      content: "Following DepEd Order No. 39, s. 2017, Imus City's 42 public elementary schools launched the School-Based Feeding Program targeting 2,800 severely wasted and wasted learners. Schools Superintendent Dr. Emma Galagen reported, 'Meals are prepared by trained parent volunteers using locally-sourced vegetables from school gardens, ensuring freshness and community involvement.'",
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
      content: "Governor Jonvic Remulla's administration partnered with the Cavite Rice and Corn Retailers Association to establish 'Lusog Lusog' rice stations in 23 municipalities. 'We're selling NFA rice at ₱27/kg—₱18 below market price—to 1,500 registered low-income families weekly,' said Provincial Agriculture Officer Carlito Balidoy. The program aims to ensure stable rice supply while supporting local farmers.",
      impact: "1,500 families accessing affordable rice",
      source: "Office of the Governor, Province of Cavite, August 2023",
      link: "https://cavite.gov.ph",
      color: "earth"
    },
    {
      title: "Tagaytay Market Vendors Donate 500kg of Fresh Produce Weekly",
      date: "Ongoing Since July 2023",
      location: "Tagaytay City, Cavite",
      category: "Community Initiative",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
      content: "Vendors at Mahogany Market organized 'Tanim Bayan, Lusog Bayan' (People's Harvest, Healthy Nation), donating unsold fresh vegetables and fruits to five partner community kitchens. Market administrator Maria Gonzales shared, 'Instead of discarding produce at day's end, 35 vendors pool donations averaging 500kg weekly. This feeds about 300 families through weekend community meals.'",
      impact: "300 families served weekly",
      source: "Tagaytay Market Vendors Association & City Social Welfare, July 2023",
      link: "https://tagaytay.gov.ph",
      color: "primary"
    },
    {
      title: "Kawit Community Pantry Movement Continues After Two Years",
      date: "Started April 2021, Still Active",
      location: "Kawit, Cavite",
      category: "Grassroots Movement",
      image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=600&fit=crop",
      content: "Inspired by the national community pantry movement, Kawit's 'Maginhawa Community Pantry' has operated continuously for over two years at Barangay Magdalo. Organizer Patricia Reyes explained, 'We rely on individual donors and partner stores. Daily, 50-80 families take what they need—vegetables, rice, canned goods, bread. The motto remains: Give what you can, take what you need.'",
      impact: "70+ families helped daily",
      source: "Interview with Maginhawa Community Pantry Kawit, November 2023",
      link: "https://facebook.com/MaginhawaKawit",
      color: "secondary"
    },
    {
      title: "Trece Martires City Implements Urban Agriculture Program",
      date: "June 2023 Launch",
      location: "Trece Martires City, Cavite",
      category: "Food Production",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
      content: "Through the Department of Agriculture's 'Plant, Plant, Plant' program, Trece Martires trained 200 households in container gardening and vertical farming. City Agriculturist Engr. Ramon Torres noted, 'Families received free seeds, soil, and containers. After 60 days, participants reported saving ₱300-500 monthly on vegetables and even selling surplus to neighbors.'",
      impact: "200 households trained",
      source: "City Agriculture Office, Trece Martires, June 2023",
      link: "https://trecemartires.gov.ph",
      color: "accent"
    },
    {
      title: "Rosario Parish Expands 'Puso ng Simbahan' Feeding Ministry",
      date: "Since 2019, Expanded 2023",
      location: "Rosario, Cavite",
      category: "Faith-Based Program",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
      content: "St. Isidore Labrador Parish's 'Puso ng Simbahan' (Heart of the Church) feeding program now serves 150 elderly and persons with disabilities every Sunday. Parish priest Fr. Antonio Mercado shared, 'Parishioner volunteers prepare lugaw (rice porridge), bread, and coffee after morning mass. What began feeding 30 seniors has grown through community generosity and commitment.'",
      impact: "150 vulnerable individuals fed weekly",
      source: "St. Isidore Labrador Parish Bulletin, Rosario, October 2023",
      link: "https://rosariocavite.org",
      color: "earth"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-4xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Real Stories, Real Impact</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
              Community <span className="text-primary">Stories</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Verified success stories and initiatives from government agencies, NGOs, and grassroots 
              movements actively fighting hunger in Cavite.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {stories.map((story, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Image */}
                  <div className="md:col-span-2 relative overflow-hidden h-64 md:h-auto">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                        {story.category}
                      </Badge>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{story.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{story.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {story.content}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span className="font-semibold text-accent">{story.impact}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>Source:</strong> {story.source}
                      </p>
                      {story.link && (
                        <a 
                          href={story.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                          onClick={() => recordAction('share_content', 'Visited Source', 10, '🔗')}
                        >
                          <ExternalLink className="h-3 w-3" />
                          Visit Official Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/5 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;