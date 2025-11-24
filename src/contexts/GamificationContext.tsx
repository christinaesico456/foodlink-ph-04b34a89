import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Action {
  id: string;
  title: string;
  points: number;
  icon: string;
  timestamp: number;
  category: 'explore' | 'learn' | 'engage' | 'impact';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number;
}

interface JourneyData {
  totalPoints: number;
  streak: number;
  lastVisit: string;
  recentActions: Action[];
  achievements: Achievement[];
  categoryCounts: {
    explore: number;
    learn: number;
    engage: number;
    impact: number;
  };
}

interface GamificationContextType {
  journeyData: JourneyData;
  recordAction: (actionId: string, title: string, points: number, icon: string, category: Action['category']) => void;
  getCircleProgress: () => { percent: number; title: string; nextMilestone: number };
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const CIRCLE_MILESTONES = [
  { points: 0, title: "Observer", color: "#94a3b8" },
  { points: 100, title: "Learner", color: "#60a5fa" },
  { points: 300, title: "Supporter", color: "#34d399" },
  { points: 600, title: "Advocate", color: "#fbbf24" },
  { points: 1000, title: "Champion", color: "#f472b6" },
  { points: 1500, title: "Leader", color: "#a78bfa" },
  { points: 2500, title: "Hero", color: "#fb923c" },
];

const ACHIEVEMENTS = [
  { id: 'first_step', title: 'First Steps', description: 'Started your journey', icon: '👟', trigger: 1 },
  { id: 'explorer', title: 'Explorer', description: 'Visited 5 pages', icon: '🗺️', trigger: 5 },
  { id: 'learner', title: 'Eager Learner', description: 'Read 3 articles', icon: '📚', trigger: 3 },
  { id: 'engaged', title: 'Engaged Member', description: 'Took 10 actions', icon: '⚡', trigger: 10 },
  { id: 'streak_3', title: '3-Day Streak', description: 'Visited 3 days in a row', icon: '🔥', trigger: 3 },
  { id: 'streak_7', title: 'Week Warrior', description: 'Visited 7 days in a row', icon: '🌟', trigger: 7 },
  { id: 'impact_maker', title: 'Impact Maker', description: 'Reached 500 points', icon: '💫', trigger: 500 },
];

const MAX_RECENT_ACTIONS = 10;

const getCurrentCircle = (points: number) => {
  for (let i = CIRCLE_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= CIRCLE_MILESTONES[i].points) {
      return i;
    }
  }
  return 0;
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [journeyData, setJourneyData] = useState<JourneyData>({
    totalPoints: 0,
    streak: 0,
    lastVisit: new Date().toDateString(),
    recentActions: [],
    achievements: [],
    categoryCounts: {
      explore: 0,
      learn: 0,
      engage: 0,
      impact: 0,
    },
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('impact_journey_data');
    if (saved) {
      const data = JSON.parse(saved);
      
      // Check streak
      const lastVisit = new Date(data.lastVisit);
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        data.streak += 1;
      } else if (diffDays > 1) {
        data.streak = 1;
      }
      
      data.lastVisit = today.toDateString();
      setJourneyData(data);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('impact_journey_data', JSON.stringify(journeyData));
  }, [journeyData]);

  const celebrateCircle = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'],
      startVelocity: 50,
      gravity: 1.2,
      ticks: 150,
    });
  };

  const getCircleProgress = () => {
    const currentIndex = getCurrentCircle(journeyData.totalPoints);
    const currentMilestone = CIRCLE_MILESTONES[currentIndex];
    const nextMilestone = CIRCLE_MILESTONES[currentIndex + 1];
    
    if (!nextMilestone) {
      return {
        percent: 100,
        title: currentMilestone.title,
        nextMilestone: currentMilestone.points,
      };
    }
    
    const pointsInCurrentCircle = journeyData.totalPoints - currentMilestone.points;
    const pointsNeededForNext = nextMilestone.points - currentMilestone.points;
    const percent = Math.min((pointsInCurrentCircle / pointsNeededForNext) * 100, 100);
    
    return {
      percent,
      title: currentMilestone.title,
      nextMilestone: nextMilestone.points,
    };
  };

  const checkAchievements = (newData: JourneyData) => {
    const newAchievements: Achievement[] = [];
    
    ACHIEVEMENTS.forEach(achievement => {
      const alreadyUnlocked = newData.achievements.some(a => a.id === achievement.id);
      if (alreadyUnlocked) return;
      
      let shouldUnlock = false;
      
      if (achievement.id === 'first_step' && newData.recentActions.length >= 1) {
        shouldUnlock = true;
      } else if (achievement.id === 'explorer' && newData.categoryCounts.explore >= achievement.trigger) {
        shouldUnlock = true;
      } else if (achievement.id === 'learner' && newData.categoryCounts.learn >= achievement.trigger) {
        shouldUnlock = true;
      } else if (achievement.id === 'engaged' && newData.recentActions.length >= achievement.trigger) {
        shouldUnlock = true;
      } else if (achievement.id === 'streak_3' && newData.streak >= 3) {
        shouldUnlock = true;
      } else if (achievement.id === 'streak_7' && newData.streak >= 7) {
        shouldUnlock = true;
      } else if (achievement.id === 'impact_maker' && newData.totalPoints >= 500) {
        shouldUnlock = true;
      }
      
      if (shouldUnlock) {
        newAchievements.push({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          unlockedAt: Date.now(),
        });
      }
    });
    
    return newAchievements;
  };

  const recordAction = (actionId: string, title: string, points: number, icon: string, category: Action['category']) => {
    // Check if action already recorded recently (within last 30 seconds)
    const recentlySame = journeyData.recentActions.find(
      a => a.id === actionId && Date.now() - a.timestamp < 30000
    );
    if (recentlySame) return;

    const newAction: Action = {
      id: actionId,
      title,
      points,
      icon,
      category,
      timestamp: Date.now(),
    };

    const oldCircle = getCurrentCircle(journeyData.totalPoints);
    const newTotalPoints = journeyData.totalPoints + points;
    const newCircle = getCurrentCircle(newTotalPoints);
    const circleUp = newCircle > oldCircle;

    const newData = {
      ...journeyData,
      totalPoints: newTotalPoints,
      recentActions: [newAction, ...journeyData.recentActions].slice(0, MAX_RECENT_ACTIONS),
      categoryCounts: {
        ...journeyData.categoryCounts,
        [category]: journeyData.categoryCounts[category] + 1,
      },
    };

    // Check for new achievements
    const newAchievements = checkAchievements(newData);
    if (newAchievements.length > 0) {
      newData.achievements = [...newData.achievements, ...newAchievements];
      
      // Show achievement toast
      setTimeout(() => {
        newAchievements.forEach(achievement => {
          toast.success(
            <div className="flex items-center gap-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div>
                <div className="font-bold">Achievement Unlocked!</div>
                <div className="text-sm text-muted-foreground">{achievement.title}</div>
              </div>
            </div>,
            { duration: 4000 }
          );
        });
      }, 500);
    }

    setJourneyData(newData);

    // Celebration for circle up
    if (circleUp) {
      setTimeout(() => {
        celebrateCircle();
        const circleInfo = CIRCLE_MILESTONES[newCircle];
        toast.success(
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎉</div>
            <div>
              <div className="font-bold">Circle Leveled Up!</div>
              <div className="text-sm text-muted-foreground">You're now a {circleInfo.title}!</div>
            </div>
          </div>,
          { duration: 4000 }
        );
      }, 300);
    } else {
      // Regular action toast
      toast.success(
        <div className="flex items-center gap-2">
          <div className="text-2xl">{icon}</div>
          <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-muted-foreground">+{points} points</div>
          </div>
        </div>,
        { duration: 2000 }
      );
    }
  };

  return (
    <GamificationContext.Provider value={{ 
      journeyData,
      recordAction,
      getCircleProgress,
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within GamificationProvider');
  return context;
};
