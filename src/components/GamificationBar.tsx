import { useGamification } from '@/contexts/GamificationContext';
import { Flame, TrendingUp, Users, Sparkles, ChevronDown, ChevronUp, Minimize2, Maximize2 } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { Button } from './ui/button';

const GamificationBar = () => {
  const { impactData, todaysActions } = useGamification();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl bg-primary hover:bg-primary/90 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"></div>
          <Sparkles className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform relative z-10" />
          {impactData.actionsToday > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-background">
              {impactData.actionsToday}
            </div>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 animate-fade-in">
      <Card className="glass-card overflow-hidden border-2 shadow-2xl">
        {/* Gradient accent line */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Your Ripple Effect</h3>
                <p className="text-xs text-muted-foreground">Every action creates waves of change</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Impact Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Total Impact */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 border border-primary/20">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-2xl"></div>
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-black text-foreground">{impactData.totalImpact}</div>
              <div className="text-xs text-muted-foreground font-medium">Total Impact</div>
            </div>

            {/* Lives Impacted */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 p-4 border border-secondary/20">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
              <Users className="h-5 w-5 text-secondary mb-2" />
              <div className="text-2xl font-black text-foreground">{impactData.livesImpacted}</div>
              <div className="text-xs text-muted-foreground font-medium">Lives Reached</div>
            </div>

            {/* Day Streak */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 p-4 border border-accent/20">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full blur-2xl"></div>
              <Flame className="h-5 w-5 text-accent mb-2" fill="currentColor" />
              <div className="text-2xl font-black text-foreground">{impactData.dayStreak}</div>
              <div className="text-xs text-muted-foreground font-medium">Day Streak</div>
            </div>
          </div>

          {/* Today's Actions */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-bold text-foreground">Today's Actions</span>
                <span className="text-xs text-muted-foreground">({impactData.actionsToday})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {/* Actions List */}
            <div className={`space-y-2 transition-all duration-300 ${isExpanded ? 'max-h-64 overflow-y-auto' : 'max-h-24 overflow-hidden'}`}>
              {todaysActions.length > 0 ? (
                todaysActions.map((action, index) => (
                  <div
                    key={action.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-2xl">{action.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-foreground truncate">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                    <div className="text-xs font-bold text-primary">+{action.impact}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  Start exploring to create your impact!
                </div>
              )}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground italic">
              {impactData.actionsToday === 0 && "Your journey to zero hunger starts now ✨"}
              {impactData.actionsToday === 1 && "Great start! Keep the momentum going 🌟"}
              {impactData.actionsToday >= 2 && impactData.actionsToday < 4 && "You're making waves of change! 🌊"}
              {impactData.actionsToday >= 4 && "Incredible impact today! You're a champion 🏆"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;
