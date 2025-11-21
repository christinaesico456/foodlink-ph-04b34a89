import { useGamification } from '@/contexts/GamificationContext';
import { Trophy, Star } from 'lucide-react';
import { Card } from './ui/card';

const GamificationBar = () => {
  const { points, level, badges } = useGamification();
  const unlockedBadges = badges.filter(b => b.unlocked);
  const progress = (points % 50) * 2;

  return (
    <div className="fixed top-20 right-4 z-50 w-72 animate-fade-in">
      <Card className="bg-card/40 backdrop-blur-xl border-primary/20 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="text-sm font-bold text-foreground">Level {level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">{points} pts</span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{50 - (points % 50)} pts to next level</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`text-2xl transition-all ${
                badge.unlocked ? 'scale-100 opacity-100' : 'scale-75 opacity-30 grayscale'
              }`}
              title={badge.unlocked ? badge.name : `Locked: ${badge.description}`}
            >
              {badge.icon}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;
