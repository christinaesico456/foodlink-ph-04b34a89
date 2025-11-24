import { useGamification } from '@/contexts/GamificationContext';
import { Trophy, Zap, ChevronUp, Target, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const GamificationBar = () => {
  const { journeyData, getLevelInfo } = useGamification();
  const [isMinimized, setIsMinimized] = useState(false);
  const levelInfo = getLevelInfo();

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
          
          {/* Main badge */}
          <div className="relative bg-gradient-to-br from-primary/90 to-accent/90 backdrop-blur-xl rounded-full p-4 border-2 border-primary/30 shadow-2xl group-hover:scale-110 transition-transform">
            <div className="flex flex-col items-center gap-1">
              <Trophy className="h-6 w-6 text-white" fill="white" />
              <div className="text-xs font-black text-white">Lv.{journeyData.level}</div>
            </div>
          </div>
          
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-20"></div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 animate-fade-in">
      <Card className="glass-card overflow-hidden border-2 border-primary/30 shadow-2xl">
        {/* Header with level badge */}
        <div className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-primary to-accent rounded-full p-2 border-2 border-primary/50">
                  <Trophy className="h-5 w-5 text-white" fill="white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-primary">LEVEL {journeyData.level}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{journeyData.actionsCompleted} actions</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{levelInfo.title}</h3>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10"
              onClick={() => setIsMinimized(true)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground">Progress to {levelInfo.nextTitle}</span>
              <span className="font-bold text-primary">{levelInfo.xpNeeded} XP needed</span>
            </div>
            <div className="relative">
              <Progress value={levelInfo.progress} className="h-3" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-white drop-shadow-lg">{Math.round(levelInfo.progress)}%</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground">Total XP</span>
              </div>
              <div className="text-xl font-black text-foreground">{journeyData.totalXP}</div>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-3 border border-accent/20">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-muted-foreground">Actions</span>
              </div>
              <div className="text-xl font-black text-foreground">{journeyData.actionsCompleted}</div>
            </div>
          </div>

          {/* Recent Actions */}
          {journeyData.recentActions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="text-xs font-bold text-muted-foreground">Recent Activity</span>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar">
                {journeyData.recentActions.map((action, index) => (
                  <div
                    key={`${action.id}-${action.timestamp}`}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/30 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-xs font-medium text-foreground flex-1 truncate">{action.title}</span>
                    <span className="text-xs font-bold text-primary">+{action.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motivational message */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-center text-muted-foreground italic">
              {journeyData.level <= 2 && "Keep exploring to level up! 🌟"}
              {journeyData.level === 3 && "You're becoming an advocate! 💪"}
              {journeyData.level === 4 && "Amazing progress, change maker! 🎯"}
              {journeyData.level >= 5 && journeyData.level < 7 && "You're leading the way! 🚀"}
              {journeyData.level === 7 && "Max level reached! You're a champion! 🏆"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;
