import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const developers = [
    {
      name: "Maria Santos",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "maria@foodlinkph.org"
    },
    {
      name: "Juan dela Cruz",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "juan@foodlinkph.org"
    },
    {
      name: "Ana Rodriguez",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "ana@foodlinkph.org"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-muted/50 to-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Developers Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-black text-center mb-8 text-foreground">
            Meet the <span className="text-primary">Team</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {developers.map((dev, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/20 hover:shadow-2xl transition-all duration-500 p-6 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-500"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-foreground mb-1">{dev.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{dev.role}</p>
                  
                  <div className="flex justify-center gap-3">
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
                    >
                      <Github className="h-4 w-4 text-foreground" />
                    </a>
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="h-4 w-4 text-foreground" />
                    </a>
                    <a
                      href={`mailto:${dev.email}`}
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-foreground" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FoodLink PH. Fighting hunger in Cavite, one community at a time.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ for SDG 2: Zero Hunger
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;