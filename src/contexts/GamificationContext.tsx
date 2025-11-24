import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface Action {
  id: string;
  title: string;
  description: string;
  impact: number;
  icon: string;
}

interface ImpactData {
  totalImpact: number;
  actionsToday: number;
  livesImpacted: number;
  dayStreak: number;
  lastVisitDate: string;
}

interface GamificationContextType {
  impactData: ImpactData;
  todaysActions: Action[];
  recordAction: (actionId: string, title: string, impact: number, icon: string) => void;
  celebrateImpact: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const ACTIONS_CATALOG = {
  page_visit: { base: 5, message: "Exploring hunger solutions" },
  learn_fact: { base: 10, message: "Knowledge is power" },
  view_org: { base: 15, message: "Connecting with changemakers" },
  map_explore: { base: 20, message: "Discovering impact zones" },
  form_interest: { base: 50, message: "Taking real action!" },
  share_content: { base: 30, message: "Amplifying the cause" },
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [impactData, setImpactData] = useState<ImpactData>({
    totalImpact: 0,
    actionsToday: 0,
    livesImpacted: 0,
    dayStreak: 0,
    lastVisitDate: new Date().toDateString(),
  });

  const [todaysActions, setTodaysActions] = useState<Action[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('impact_data');
    const savedActions = localStorage.getItem('todays_actions');
    const lastVisit = localStorage.getItem('last_visit_date');

    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      
      // Check streak
      if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === yesterday.toDateString()) {
          // Continuing streak
          data.dayStreak = (data.dayStreak || 0) + 1;
        } else if (lastDate.toDateString() !== today) {
          // Reset streak
          data.dayStreak = 1;
          data.actionsToday = 0;
        }
      }
      
      setImpactData(data);
    }

    if (savedActions) {
      const actions = JSON.parse(savedActions);
      const today = new Date().toDateString();
      if (lastVisit === today) {
        setTodaysActions(actions);
      } else {
        setTodaysActions([]);
      }
    }

    localStorage.setItem('last_visit_date', new Date().toDateString());
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('impact_data', JSON.stringify(impactData));
    localStorage.setItem('todays_actions', JSON.stringify(todaysActions));
  }, [impactData, todaysActions]);

  const celebrateImpact = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#daa325', '#38761d', '#e38637'],
    });
  };

  const recordAction = (actionId: string, title: string, impact: number, icon: string) => {
    // Check if action already recorded today
    const alreadyRecorded = todaysActions.some(a => a.id === actionId);
    if (alreadyRecorded) return;

    const newAction: Action = {
      id: actionId,
      title,
      description: ACTIONS_CATALOG[actionId as keyof typeof ACTIONS_CATALOG]?.message || "Making a difference",
      impact,
      icon,
    };

    setTodaysActions(prev => [...prev, newAction]);

    setImpactData(prev => ({
      ...prev,
      totalImpact: prev.totalImpact + impact,
      actionsToday: prev.actionsToday + 1,
      livesImpacted: prev.livesImpacted + Math.floor(impact / 10),
    }));

    // Show celebration for significant actions
    if (impact >= 20) {
      setTimeout(celebrateImpact, 300);
    }

    // Show toast notification
    toast.success(
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>
        <div>
          <div className="font-bold">{title}</div>
          <div className="text-sm text-muted-foreground">+{impact} impact points</div>
        </div>
      </div>,
      { duration: 3000 }
    );
  };

  return (
    <GamificationContext.Provider value={{ 
      impactData,
      todaysActions,
      recordAction,
      celebrateImpact
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
