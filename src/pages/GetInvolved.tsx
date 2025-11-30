import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HandHeart, Users, PhilippinePeso, Share2, Heart, Megaphone, CheckCircle, X, ExternalLink } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import volunteersImg from "@/assets/volunteers.jpg";
import qrFoodlink from "@/assets/qr_foodlink.jpg";

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

const GetInvolved = () => {
  const { completeTask, data } = useGamification();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showQRModal, setShowQRModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interest: "",
    message: ""
  });

  useEffect(() => {
    completeTask('page_visit');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Starting form submission...");
      
      // Save to Firebase Firestore with timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Submission timeout - check Firebase setup')), 10000)
      );

      const submitPromise = addDoc(collection(db, "volunteers"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        interest: formData.interest,
        message: formData.message,
        submittedAt: serverTimestamp(),
        userId: user?.uid || null,
        userEmail: user?.email || null,
        status: "pending"
      });

      await Promise.race([submitPromise, timeoutPromise]);

      console.log("Form submitted successfully!");

      // Complete gamification task
      completeTask('volunteer_form');

      // Show success message
      toast({
        title: "Thank you for your interest!",
        description: "We'll get back to you soon about volunteer opportunities.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        interest: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error submitting volunteer form:", error);
      
      let errorMessage = "There was an error submitting your application. Please try again.";
      
      if (error.message?.includes('timeout')) {
        errorMessage = "Submission timeout. Please check your internet connection and Firebase setup.";
      } else if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check Firestore security rules.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Firebase service unavailable. Please try again later.";
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Scroll to volunteer form
  const scrollToVolunteerForm = () => {
    const formSection = document.getElementById('volunteer-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ✅ Open QR modal
  const openQRModal = () => {
    setShowQRModal(true);
    completeTask('donation_intent');
  };

  // ✅ Share on Facebook
  const shareOnFacebook = () => {
    window.open('https://www.facebook.com/profile.php?id=61584312566690', '_blank');
    completeTask('share_social');
  };

  // ✅ Take advocacy action
  const takeAdvocacyAction = () => {
    toast({
      title: "Advocacy Resources",
      description: "Contact your local officials and support hunger relief policies!",
    });
    completeTask('create_plan');
  };

  const actionCards = [
    {
      icon: HandHeart,
      title: "Volunteer",
      description: "Join feeding programs in Cavite municipalities. Help pack meals, serve at community kitchens, or organize food drives in your barangay.",
      details: [
        "Weekly feeding programs in Bacoor, Imus, and Dasmariñas",
        "Monthly food distribution drives across 23 municipalities",
        "Community kitchen assistance (2-4 hours/week)",
        "Food sorting and packaging at local warehouses"
      ],
      action: "Sign Up to Volunteer",
      color: "primary",
      onClick: scrollToVolunteerForm
    },
    {
      icon: PhilippinePeso,
      title: "Donate",
      description: "Support local feeding programs serving 50,000+ Caviteños monthly. Every ₱50 provides a nutritious meal for a child in need.",
      details: [
        "₱50 = 1 meal for a malnourished child",
        "₱500 = Weekly groceries for a family of 4",
        "₱2,000 = Monthly food support for 1 household",
        "₱10,000 = Community feeding program for 200 people"
      ],
      action: "Learn About Donations",
      color: "secondary",
      onClick: openQRModal
    },
    {
      icon: Share2,
      title: "Spread Awareness",
      description: "Amplify the message. Share stories, statistics, and solutions about hunger in the Philippines to educate your community and social networks.",
      details: [
        "Share SDG 2 infographics on Facebook, Twitter, Instagram",
        "Post stories of local heroes fighting hunger in Cavite",
        "Tag @FoodLinkPH and use #ZeroHungerCavite",
        "Organize awareness campaigns in schools and workplaces"
      ],
      action: "Share on Social Media",
      color: "accent",
      onClick: shareOnFacebook
    },
    {
      icon: Megaphone,
      title: "Advocate",
      description: "Contact local officials and support policies that improve food security, nutrition programs, and agricultural support in Cavite Province.",
      details: [
        "Sign petitions for expanded school feeding programs",
        "Email provincial representatives about food security",
        "Attend town hall meetings on hunger issues",
        "Support local farmers and sustainable agriculture policies"
      ],
      action: "Take Action",
      color: "earth",
      onClick: takeAdvocacyAction
    }
  ];

  return (
    <div className="bg-background">
      
      {/* ================= QR CODE MODAL ================= */}
      {showQRModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-4">
              <div className="inline-flex p-3 bg-secondary/10 rounded-full mb-3">
                <PhilippinePeso className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-1">
                Support Our Mission
              </h3>
              <p className="text-xs text-muted-foreground">
                Every peso helps fight hunger in Cavite
              </p>
            </div>

            {/* Donation Drive Progress */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-3 mb-4 border border-primary/20">
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground mb-0.5">
                  🎯 Donation Drive Progress
                </p>
                <p className="text-3xl font-black text-primary mb-0.5">
                  ₱{data.totalDonations}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Generated through community engagement
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-border flex justify-center">
              <img 
                src={qrFoodlink} 
                alt="GCash QR Code" 
                className="w-64 h-64 object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Instructions */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">1</span>
                </div>
                <p className="text-xs text-muted-foreground">Open your GCash app</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">2</span>
                </div>
                <p className="text-xs text-muted-foreground">Scan the QR code above</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">3</span>
                </div>
                <p className="text-xs text-muted-foreground">Enter your donation amount</p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
              <p className="text-[10px] text-center text-muted-foreground">
                <strong className="text-accent">Thank you!</strong> Your donation directly supports feeding programs across Cavite Province.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={volunteersImg} 
            alt="Volunteers" 
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/90 to-transparent"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 ">
          <div className="max-w-3xl animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/30">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Be the Change</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
              Get <span className="text-primary">Involved</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Every action counts in the fight against hunger. Whether you have time, resources, 
              or just a voice—you can make a difference in Cavite communities.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ACTION CARDS SECTION ================= */}
      <section className="relative py-20 z-20">
        
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Ways to <span className="text-accent">Make an Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose how you want to contribute to the Zero Hunger goal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {actionCards.map((card, index) => {
              const styles = getColorStyle(card.color);
              
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`flex-shrink-0 p-4 ${styles.bg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <card.icon className={`h-8 w-8 ${styles.text}`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 ${styles.text}`}>
                          {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-8 bg-background/50 p-4 rounded-xl border border-border/50">
                      {card.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className={`h-5 w-5 ${styles.text} flex-shrink-0 mt-0.5`} />
                          <p className="text-sm text-foreground/80">{detail}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="lg"
                      onClick={card.onClick}
                      className={`w-full font-bold shadow-md hover:shadow-lg transition-all ${
                        card.color === 'primary' ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
                        card.color === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' :
                        card.color === 'accent' ? 'bg-accent text-accent-foreground hover:bg-accent/90' :
                        'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {card.action}
                      {card.color === 'accent' && <ExternalLink className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= VOLUNTEER FORM SECTION ================= */}
      <section id="volunteer-form-section" className="relative py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                Volunteer with <span className="text-primary">Us</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out this form and we'll connect you with opportunities.
              </p>
            </div>

            <Card className="bg-white/60 backdrop-blur-xl border-primary/20 p-8 md:p-12 shadow-2xl rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Dela Cruz"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      disabled={isSubmitting}
                      className="bg-white/50 border-primary/20 focus:border-primary h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      disabled={isSubmitting}
                      className="bg-white/50 border-primary/20 focus:border-primary h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+63 912 345 6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={isSubmitting}
                      className="bg-white/50 border-primary/20 focus:border-primary h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-semibold">Location *</Label>
                    <Input
                      id="location"
                      placeholder="City/Municipality"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                      disabled={isSubmitting}
                      className="bg-white/50 border-primary/20 focus:border-primary h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-base font-semibold">Area of Interest</Label>
                  <Input
                    id="interest"
                    placeholder="e.g., Feeding programs, Food drives"
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    disabled={isSubmitting}
                    className="bg-white/50 border-primary/20 focus:border-primary h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-semibold">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us why you want to volunteer..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    disabled={isSubmitting}
                    className="bg-white/50 border-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-6 w-6" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="py-24 bg-gradient-to-r from-secondary via-primary/80 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10 animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-4xl font-black mb-16 text-white drop-shadow-md">
            Together We Can Achieve More
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { value: "15,000+", label: "Volunteers Nationwide" },
              { value: "2.8M", label: "Meals Served Monthly" },
              { value: "450+", label: "Active Programs" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-6xl font-black text-white mb-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xl font-medium text-white/90 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;