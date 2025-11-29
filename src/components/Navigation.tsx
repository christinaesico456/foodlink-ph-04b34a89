import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Switched to standard Link + useLocation for reliability
import { Button } from "@/components/ui/button";
import { Menu, X, Wheat, ArrowRight, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";
import FoodLinkLogo from "@/assets/Foodlink_logo.png";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 1. Get current route to determine active state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Organizations", path: "/organizations" },
    { name: "Community", path: "/community" },
    { name: "Quiz", path: "/quiz" },
  ];

  // 2. Helper function to check if a path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm py-2"
          : "bg-transparent py-6" // Increased padding at top for cleaner look
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* --- LOGO --- */}
<Link to="/" className="flex items-center gap-3 group relative z-50">
  <img
    src={FoodLinkLogo}
    alt="FoodLinkPH Logo"
    className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-primary/20 transition-transform group-hover:scale-105"
  />

  <div className="flex flex-col">
    <span className="font-bold text-xl leading-none tracking-tight text-foreground">
      FoodLink<span className="text-primary">PH</span>
    </span>
  </div>
</Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* 3. Navigation Links Container */}
            <div className="flex items-center gap-4 mr-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-based font-bold transition-all duration-200",
                    // 4. Active State Logic
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-bold shadow-sm" // Active Style
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50" // Inactive Style
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-border/60 mr-4" />

            {/* CTA Button */}
            <Link to="/get-involved">
              <Button 
                className={cn(
                  "rounded-full px-6 font-semibold shadow-md transition-all hover:-translate-y-0.5",
                  isActive('/get-involved') 
                    ? "bg-primary ring-2 ring-primary ring-offset-2" 
                    : "bg-primary shadow-primary/20"
                )}
              >
                Get Involved <HeartHandshake className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* --- MOBILE FULL SCREEN MENU --- */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 md:hidden transition-all duration-300 ease-in-out flex flex-col pt-24 px-6",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center justify-between text-lg font-medium p-4 rounded-xl border transition-all",
                isActive(item.path)
                  ? "bg-primary/5 border-primary/20 text-primary" // Mobile Active State
                  : "bg-transparent border-transparent text-foreground hover:bg-muted"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <ArrowRight className="h-5 w-5 text-primary animate-in fade-in slide-in-from-left-2" />
              )}
            </Link>
          ))}
          
          <div className="pt-4">
            <Link to="/get-involved" onClick={() => setIsOpen(false)}>
              <Button size="lg" className="w-full text-lg h-12 rounded-xl shadow-lg shadow-primary/20">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;