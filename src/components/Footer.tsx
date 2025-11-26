import { Link } from "react-router-dom";
import CriseldaImg from "@/assets/Criselda.jpg";
import KurtImg from "@/assets/Kurt.jpg";
import ChristinaImg from "@/assets/Christina.jpg";


const Footer = () => {
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

  return (
    <footer className="bg-background pt-10 pb-8 border-t border-primary/10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-black text-foreground">FoodLink PH</span>
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
              {['About Us', 'Our Mission', 'Organizations', 'Success Stories'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help Links */}
          <div>
            <h4 className="font-bold text-muted-foreground uppercase tracking-wider text-lg mb-6">
              Help & Support
            </h4>
            <ul className="space-y-4">
              {['Contact Us', 'Donate Food', 'Volunteer Guide', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
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
  );
};

export default Footer;