import { useGamification } from '@/contexts/GamificationContext';
import { Target, Users, Heart, Flame, TrendingUp, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const GamificationBar = () => {
  const { missions, impactMetrics, streak } = useGamification();
  const [isExpanded, setIsExpanded] = useState(false);
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;
  const progressPercentage = (completedMissions / totalMissions) * 100;

  return (
    <div className="fixed top-20 right-4 z-50 w-80 animate-fade-in">
      <Card className="bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 opacity-50"></div>
        
        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Your Impact</h3>
            </div>
            
            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-accent/20 rounded-full border border-accent/30">
                <Flame className="h-4 w-4 text-accent" fill="currentColor" />
                <span className="text-xs font-bold text-foreground">{streak} day{streak > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-3 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">People Reached</span>
              </div>
              <div className="text-2xl font-black text-foreground">{impactMetrics.peopleReached}</div>
            </div>

            <div className="bg-accent/10 backdrop-blur-sm rounded-lg p-3 border border-accent/20">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">Actions</span>
              </div>
              <div className="text-2xl font-black text-foreground">{impactMetrics.actionsCompleted}</div>
            </div>

            <div className="bg-secondary/10 backdrop-blur-sm rounded-lg p-3 border border-secondary/20 col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="text-xs text-muted-foreground">Meal Equivalent Impact</span>
              </div>
              <div className="text-2xl font-black text-foreground">{impactMetrics.mealEquivalent} meals</div>
            </div>
          </div>

          {/* Mission Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground">Mission Progress</span>
              <span className="text-xs text-muted-foreground">{completedMissions}/{totalMissions}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Missions List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-foreground">Missions</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Hide' : 'Show All'}
              </Button>
            </div>
            
            <div className={`space-y-2 ${isExpanded ? 'max-h-96' : 'max-h-32'} overflow-y-auto transition-all duration-300`}>
              {missions.map(mission => (
                <div
                  key={mission.id}
                  className={`p-3 rounded-lg border transition-all ${
                    mission.completed 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/30 border-border/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle 
                      className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                        mission.completed ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      fill={mission.completed ? 'currentColor' : 'none'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold ${
                        mission.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {mission.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {mission.description}
                      </div>
                      {mission.completed && (
                        <div className="text-xs text-primary font-bold mt-1">
                          {mission.impact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground italic">
              {completedMissions === 0 && "Start your impact journey!"}
              {completedMissions > 0 && completedMissions < 2 && "Great start! Keep going!"}
              {completedMissions >= 2 && completedMissions < 4 && "You're making a difference!"}
              {completedMissions >= 4 && completedMissions < totalMissions && "Almost there, champion!"}
              {completedMissions === totalMissions && "All missions complete! 🌟"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;
