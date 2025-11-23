import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Action {
  id: string;
  title: string;
  impact: number;
  icon: string;
  timestamp: number;
}

interface JourneyData {
  level: number;
  currentXP: number;
  totalXP: number;
  actionsCompleted: number;
  lastVisitDate: string;
  recentActions: Action[];
}

interface GamificationContextType {
  journeyData: JourneyData;
  recordAction: (actionId: string, title: string, impact: number, icon: string) => void;
  celebrateLevel: () => void;
  getLevelInfo: () => { title: string; nextTitle: string; progress: number; xpNeeded: number };
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const LEVELS = [
  { level: 1, title: "Curious Observer", xpRequired: 0 },
  { level: 2, title: "Engaged Learner", xpRequired: 50 },
  { level: 3, title: "Active Supporter", xpRequired: 150 },
  { level: 4, title: "Community Advocate", xpRequired: 300 },
  { level: 5, title: "Change Maker", xpRequired: 500 },
  { level: 6, title: "Impact Leader", xpRequired: 750 },
  { level: 7, title: "Hope Champion", xpRequired: 1000 },
];

const MAX_RECENT_ACTIONS = 5;

const getLevelFromXP = (xp: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) return i + 1;
  }
  return 1;
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [journeyData, setJourneyData] = useState<JourneyData>({
    level: 1,
    currentXP: 0,
    totalXP: 0,
    actionsCompleted: 0,
    lastVisitDate: new Date().toDateString(),
    recentActions: [],
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('journey_data');
    if (saved) {
      setJourneyData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('journey_data', JSON.stringify(journeyData));
  }, [journeyData]);

  const celebrateLevel = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#daa325', '#38761d', '#e38637'],
      startVelocity: 45,
      ticks: 100,
    });
  };

  const getLevelInfo = () => {
    const currentLevel = LEVELS.find(l => l.level === journeyData.level) || LEVELS[0];
    const nextLevel = LEVELS.find(l => l.level === journeyData.level + 1);
    
    const currentLevelXP = currentLevel.xpRequired;
    const nextLevelXP = nextLevel ? nextLevel.xpRequired : currentLevel.xpRequired;
    const xpInCurrentLevel = journeyData.totalXP - currentLevelXP;
    const xpNeededForNext = nextLevelXP - currentLevelXP;
    const progress = nextLevel ? (xpInCurrentLevel / xpNeededForNext) * 100 : 100;

    return {
      title: currentLevel.title,
      nextTitle: nextLevel ? nextLevel.title : "Max Level!",
      progress: Math.min(progress, 100),
      xpNeeded: nextLevel ? nextLevelXP - journeyData.totalXP : 0,
    };
  };

  const recordAction = (actionId: string, title: string, impact: number, icon: string) => {
    // Check if action already recorded recently
    const alreadyRecorded = journeyData.recentActions.some(a => a.id === actionId);
    if (alreadyRecorded) return;

    const newAction: Action = {
      id: actionId,
      title,
      impact,
      icon,
      timestamp: Date.now(),
    };

    const newTotalXP = journeyData.totalXP + impact;
    const newLevel = getLevelFromXP(newTotalXP);
    const leveledUp = newLevel > journeyData.level;

    setJourneyData(prev => ({
      ...prev,
      currentXP: prev.currentXP + impact,
      totalXP: newTotalXP,
      level: newLevel,
      actionsCompleted: prev.actionsCompleted + 1,
      recentActions: [newAction, ...prev.recentActions].slice(0, MAX_RECENT_ACTIONS),
    }));

    // Celebration for level up
    if (leveledUp) {
      setTimeout(() => {
        celebrateLevel();
        const levelInfo = LEVELS.find(l => l.level === newLevel);
        toast.success(
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎉</div>
            <div>
              <div className="font-bold">Level Up!</div>
              <div className="text-sm text-muted-foreground">You're now a {levelInfo?.title}!</div>
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
            <div className="text-xs text-muted-foreground">+{impact} XP</div>
          </div>
        </div>,
        { duration: 2500 }
      );
    }
  };

  return (
    <GamificationContext.Provider value={{ 
      journeyData,
      recordAction,
      celebrateLevel,
      getLevelInfo,
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
