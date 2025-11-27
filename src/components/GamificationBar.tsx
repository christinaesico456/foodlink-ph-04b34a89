import { useGamification } from '@/contexts/GamificationContext';
import { CONTINUOUS_TASKS } from '@/contexts/GamificationContext';
import { Flame, Users, Sparkles, ChevronDown, ChevronUp, Minimize2, Trophy, Gift, RotateCw } from 'lucide-react';
import { Card } from './ui/card';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const GamificationBar = () => {
  const { data, currentLevelData, progressPercent, completeTask, getTaskStatus } = useGamification();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [, forceUpdate] = useState({});

  // Update cooldown timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCooldown = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-br from-primary to-accent hover:scale-110 transition-transform group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-xs font-bold text-white">{data.currentLevel}</span>
          </div>
          {data.actionsToday > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-background">
              {data.actionsToday}
            </div>
          )}
        </Button>
      </div>
    );
  }

  const pointsNeeded = currentLevelData.pointsRequired - data.totalPoints;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 animate-fade-in">
      <Card className="glass-card overflow-hidden border-2 shadow-2xl">
        {/* Gradient accent line */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
        
        <div className="p-4">
          {/* Header with Minimize */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-base font-bold text-foreground">Impact Journey</h3>
                <p className="text-xs text-muted-foreground">Level = ₱100 donated</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-primary/10"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Centered Level Circle */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 mb-2">
              {/* Progress ring */}
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  className="text-muted/20"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - progressPercent / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#daa325" />
                    <stop offset="50%" stopColor="#38761d" />
                    <stop offset="100%" stopColor="#e38637" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Level number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground mb-0.5">Level</div>
                  <div className="text-3xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    {data.currentLevel}
                  </div>
                </div>
              </div>
            </div>

            {/* Level Title */}
            <h4 className="text-base font-bold text-center text-foreground mb-0.5">
              {currentLevelData.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {data.totalPoints} / {currentLevelData.pointsRequired} points
            </p>
            {data.currentLevel < 5 && (
              <p className="text-xs text-primary font-semibold mt-0.5">
                {pointsNeeded} points to next level
              </p>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-2.5 border border-primary/20">
              <Gift className="h-4 w-4 text-primary mb-1" />
              <div className="text-lg font-black text-foreground">₱{data.totalDonations}</div>
              <div className="text-xs text-muted-foreground font-medium">Donated</div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 p-2.5 border border-accent/20">
              <Flame className="h-4 w-4 text-accent mb-1" fill="currentColor" />
              <div className="text-lg font-black text-foreground">{data.dayStreak}</div>
              <div className="text-xs text-muted-foreground font-medium">Streak</div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 p-2.5 border border-secondary/20">
              <Users className="h-4 w-4 text-secondary mb-1" />
              <div className="text-lg font-black text-foreground">{data.actionsToday}</div>
              <div className="text-xs text-muted-foreground font-medium">Today</div>
            </div>
          </div>

          {/* Continuous Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <RotateCw className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-bold text-foreground">Available Tasks</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </Button>
            </div>

            <div className={`space-y-1.5 transition-all duration-300 ${isExpanded ? 'max-h-80 overflow-y-auto' : 'max-h-40 overflow-hidden'}`}>
              {CONTINUOUS_TASKS.map((task, index) => {
                const status = getTaskStatus(task.id);
                const completion = data.taskCompletions.find(c => c.taskId === task.id);
                
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                      status.canComplete
                        ? 'bg-muted/30 border-border/50 hover:border-primary/50'
                        : 'bg-muted/50 border-border/50 opacity-60'
                    }`}
                  >
                    <div className="text-xl">{task.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-foreground truncate flex items-center gap-1.5">
                        {task.title}
                        {completion && completion.count > 0 && (
                          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">
                            {completion.count}x
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {status.canComplete ? (
                          `+${task.points} points`
                        ) : (
                          <span className="text-orange-600 font-medium">⏱ {formatCooldown(status.cooldownRemaining)}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => completeTask(task.id, task.points)}
                      disabled={!status.canComplete}
                      className="text-xs h-6 px-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status.canComplete ? 'Do it' : 'Wait'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Footer */}
          <div className="pt-3 border-t border-border/50 mt-3">
            <p className="text-xs text-center text-muted-foreground italic">
              {progressPercent < 25 && "🌱 Begin your journey to end hunger"}
              {progressPercent >= 25 && progressPercent < 50 && "🌿 You're making real progress!"}
              {progressPercent >= 50 && progressPercent < 75 && "🌾 Halfway there! Keep going!"}
              {progressPercent >= 75 && progressPercent < 100 && "🌟 Almost at the next level!"}
              {progressPercent === 100 && data.currentLevel === 5 && "🏆 Maximum level! You're a champion!"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamificationBar;