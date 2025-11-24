import { useGamification } from '@/contexts/GamificationContext';
import { Sparkles, TrendingUp, Award, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const GamificationBar = () => {
  const { journeyData, getCircleProgress } = useGamification();
  const [isMinimized, setIsMinimized] = useState(false);
  const circleInfo = getCircleProgress();

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Animated pulse rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-xl"></div>
          
          {/* Main badge */}
          <div className="relative bg-gradient-to-br from-primary via-accent to-secondary backdrop-blur-xl rounded-full p-5 border-2 border-white/20 shadow-2xl group-hover:scale-110 transition-all duration-300">
            <div className="flex flex-col items-center gap-1">
              <Sparkles className="h-7 w-7 text-white" fill="white" />
              <div className="text-xs font-black text-white tracking-wider">{journeyData.totalPoints}</div>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] animate-fade-in">
      <Card className="glass-card overflow-hidden border-2 border-primary/20 shadow-2xl">
        {/* Header with animated gradient */}
        <div className="relative p-5 border-b border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-xl opacity-50 rounded-full"></div>
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-white/30 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-foreground tracking-wide">{circleInfo.title}</span>
                  {journeyData.streak > 0 && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-accent" />
                        <span className="text-xs font-bold text-accent">{journeyData.streak} days</span>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{journeyData.totalPoints} impact points</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10 rounded-full"
              onClick={() => setIsMinimized(true)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Circle Progress */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground">Next Circle</span>
              <span className="font-bold text-primary">{circleInfo.nextMilestone - journeyData.totalPoints} points needed</span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${circleInfo.percent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[slide-in-right_2s_ease-in-out_infinite]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mix-blend-difference">
                  {Math.round(circleInfo.percent)}%
                </span>
              </div>
            </div>
          </div>

          {/* Category Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-3 border border-primary/10 text-center">
              <div className="text-xl mb-1">🗺️</div>
              <div className="text-xs font-bold text-foreground">{journeyData.categoryCounts.explore}</div>
              <div className="text-[10px] text-muted-foreground">Explore</div>
            </div>
            
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-3 border border-accent/10 text-center">
              <div className="text-xl mb-1">📚</div>
              <div className="text-xs font-bold text-foreground">{journeyData.categoryCounts.learn}</div>
              <div className="text-[10px] text-muted-foreground">Learn</div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-3 border border-secondary/10 text-center">
              <div className="text-xl mb-1">⚡</div>
              <div className="text-xs font-bold text-foreground">{journeyData.categoryCounts.engage}</div>
              <div className="text-[10px] text-muted-foreground">Engage</div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-xl p-3 border border-primary/10 text-center">
              <div className="text-xl mb-1">💫</div>
              <div className="text-xs font-bold text-foreground">{journeyData.categoryCounts.impact}</div>
              <div className="text-[10px] text-muted-foreground">Impact</div>
            </div>
          </div>

          {/* Recent Achievements */}
          {journeyData.achievements.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-muted-foreground">Recent Achievements</span>
              </div>
              <div className="space-y-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                {journeyData.achievements.slice(-3).reverse().map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-foreground block truncate">{achievement.title}</span>
                      <span className="text-[10px] text-muted-foreground block truncate">{achievement.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {journeyData.recentActions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="text-xs font-bold text-muted-foreground">Recent Activity</span>
              </div>
              <div className="space-y-1.5 max-h-28 overflow-y-auto custom-scrollbar">
                {journeyData.recentActions.slice(0, 5).map((action, index) => (
                  <div
                    key={`${action.id}-${action.timestamp}`}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border/40 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-base">{action.icon}</span>
                    <span className="text-xs font-medium text-foreground flex-1 truncate">{action.title}</span>
                    <span className="text-xs font-black text-primary">+{action.points}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motivational message */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-center font-medium text-muted-foreground">
              {journeyData.totalPoints < 100 && "Every action creates ripples of change 🌊"}
              {journeyData.totalPoints >= 100 && journeyData.totalPoints < 300 && "You're making a real difference! 💪"}
              {journeyData.totalPoints >= 300 && journeyData.totalPoints < 600 && "Your impact is growing stronger! 🚀"}
              {journeyData.totalPoints >= 600 && journeyData.totalPoints < 1000 && "You're an inspiration to others! ⭐"}
              {journeyData.totalPoints >= 1000 && "You're a true champion of change! 🏆"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;
