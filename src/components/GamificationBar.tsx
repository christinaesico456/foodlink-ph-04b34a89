import { useGamification } from '@/contexts/GamificationContext';
import { Trophy, Star, Flame, Award } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { Button } from './ui/button';

const GamificationBar = () => {
  const { points, level, badges, streak } = useGamification();
  const [isExpanded, setIsExpanded] = useState(false);
  const unlockedBadges = badges.filter(b => b.unlocked);
  const progress = (points % 50) * 2;
  const pointsToNextLevel = 50 - (points % 50);

  const rarityColors = {
    common: 'bg-secondary/20 border-secondary',
    rare: 'bg-blue-500/20 border-blue-500',
    epic: 'bg-purple-500/20 border-purple-500',
    legendary: 'bg-primary/20 border-primary',
  };

  return (
    <div className="fixed top-20 right-4 z-50 w-80 animate-fade-in">
      <Card className="bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 opacity-50"></div>
        
        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Star className="h-6 w-6 text-primary animate-pulse-glow" fill="currentColor" />
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {level}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Level {level}</div>
                <div className="text-xs text-muted-foreground">{pointsToNextLevel} pts to next</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Streak */}
              {streak > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-accent/20 rounded-full border border-accent/30">
                  <Flame className="h-4 w-4 text-accent" fill="currentColor" />
                  <span className="text-xs font-bold text-foreground">{streak}</span>
                </div>
              )}
              
              {/* Points */}
              <div className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">{points}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-3 bg-muted/50 rounded-full overflow-hidden relative border border-primary/20">
              <div 
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-foreground">Badges ({unlockedBadges.length}/{badges.length})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Hide' : 'Show All'}
              </Button>
            </div>
            
            <div className={`grid grid-cols-4 gap-2 ${isExpanded ? 'max-h-96' : 'max-h-20'} overflow-y-auto transition-all duration-300`}>
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`relative aspect-square rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer hover:scale-110 ${
                    badge.unlocked 
                      ? `${rarityColors[badge.rarity]} scale-100 opacity-100` 
                      : 'bg-muted/30 border-border scale-90 opacity-40 grayscale'
                  }`}
                  title={badge.unlocked ? `${badge.name}\n${badge.description}` : `🔒 ${badge.name}\nRequires: ${badge.requirement} ${badge.id === 'weekly_warrior' ? 'day streak' : 'points'}`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  {badge.unlocked && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fun Motivational Message */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground italic">
              {points < 50 && "Keep exploring to unlock more!"}
              {points >= 50 && points < 100 && "You're doing great!"}
              {points >= 100 && points < 250 && "Amazing progress!"}
              {points >= 250 && points < 500 && "You're a champion!"}
              {points >= 500 && "Zero Hunger Hero! 🌟"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;
