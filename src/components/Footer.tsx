import { Link } from "react-router-dom";
import { useState } from "react";
import { X, Mail, Phone, Gamepad2, Zap } from "lucide-react";
import CriseldaImg from "@/assets/Criselda.jpg";
import KurtImg from "@/assets/Kurt.jpg";
import ChristinaImg from "@/assets/Christina.jpg";
import FoodlinkLogo from "@/assets/Foodlink_logo.png";

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGamificationModal, setShowGamificationModal] = useState(false);

  const developers = [
    {
      name: "Kurt Acosta",
      image: KurtImg,
    },
    {
      name: "Christina Esico",
      image: ChristinaImg 
    },
    {
      name: "Criselda Perdito",
      image: CriseldaImg,
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToGamification = () => {
    setShowGamificationModal(false);
    
    // Find the gamification bar container
    const gamificationBar = document.querySelector('[class*="fixed"][class*="bottom-4"][class*="right-4"]');
    
    if (gamificationBar) {
      // Check if it's minimized (look for the circle button)
      const expandButton = gamificationBar.querySelector('button');
      
      // Add attention-grabbing animation
      gamificationBar.classList.add('animate-pulse');
      
      // If minimized, click to expand
      if (expandButton && !expandButton.textContent?.includes('−')) {
        setTimeout(() => {
          (expandButton as HTMLElement).click();
          
          // Remove pulse animation after expanding
          setTimeout(() => {
            gamificationBar.classList.remove('animate-pulse');
          }, 1000);
        }, 100);
      } else {
        // If already expanded, just pulse for attention
        setTimeout(() => {
          gamificationBar.classList.remove('animate-pulse');
        }, 2000);
      }
    }
  };

  return (
    <>
      {/* Contact Modal */}
      {showContactModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-foreground mb-2">
                Contact Us
              </h3>
              <p className="text-sm text-muted-foreground">
                Get in touch with the FoodLink PH team
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Email</p>
                  <a 
                    href="mailto:foodlinkph@gmail.com" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    foodlinkph@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Phone</p>
                  <a 
                    href="tel:+639457650347" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    +63 945 765 0347
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gamification Modal */}
      {showGamificationModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowGamificationModal(false)}
        >
          <div 
            className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in border-2 border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGamificationModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mb-4 shadow-lg">
                <Gamepad2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-2">
                Ready to Make an Impact?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete tasks, earn points, and unlock donations to fight hunger in your community!
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Earn points for every action</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎯</span>
                </div>
                <p className="text-sm font-medium text-foreground">Level up and unlock donations</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🔥</span>
                </div>
                <p className="text-sm font-medium text-foreground">Build streaks and compete</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">❤️</span>
                </div>
                <p className="text-sm font-medium text-foreground">Track your hunger relief impact</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleContinueToGamification}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Gamepad2 className="h-5 w-5" />
              Continue to Gamification
            </button>

            {/* Footer Note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Sign in with Google to start earning points
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-background pt-10 pb-8 border-t border-primary/10">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img 
                  src={FoodlinkLogo}
                  alt="FoodLink PH Logo"
                  className="w-10 h-10 rounded-md object-cover shadow-sm"
                />
                <span className="text-2xl font-black text-foreground">
                  FoodLink <span className="text-primary">PH</span>
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
                Connecting communities to fight hunger. We ensure every Filipino has access 
                to nutritious food through technology and cooperation.
              </p>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h4 className="font-bold text-muted-foreground uppercase tracking-wider text-lg mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/about"
                    onClick={scrollToTop}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/organizations"
                    onClick={scrollToTop}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    Organizations
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/community"
                    onClick={scrollToTop}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    Stories
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/get-involved"
                    onClick={scrollToTop}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    Mission
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Help Links */}
            <div>
              <h4 className="font-bold text-muted-foreground uppercase tracking-wider text-lg mb-6">
                Help & Support
              </h4>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium text-left"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <Link 
                    to="/get-involved"
                    onClick={scrollToTop}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    Donate Food
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowGamificationModal(true)}
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium text-left"
                  >
                    Gamification
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Team Members */}
            <div>
              <h4 className="font-bold text-muted-foreground uppercase tracking-wider text-lg mb-6">
                Built by the Team
              </h4>
              <p className="text-sm text-muted-foreground mb-8">
                Crafted with passion by our dedicated developers.
              </p>
              <div className="flex items-center gap-3">
                {developers.map((dev, index) => (
                  <div key={index} className="group relative">
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-10">
                      {dev.name} 
                    </div>
                    
                    {/* Avatar */}
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-16 h-16 rounded-full border-2 border-background object-cover ring-2 ring-transparent group-hover:ring-primary transition-all cursor-pointer hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="pt-2 border-t border-border/50 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-based text-muted-foreground">
              © {new Date().getFullYear()} FoodLink PH. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;