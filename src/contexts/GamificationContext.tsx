import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Users, BookOpen, Heart, Target, Flame } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  impact: string;
}

interface ImpactMetrics {
  actionsCompleted: number;
  peopleReached: number;
  contentShared: number;
  mealEquivalent: number;
}

interface GamificationContextType {
  missions: Mission[];
  impactMetrics: ImpactMetrics;
  streak: number;
  completeMission: (missionId: string) => void;
  addImpact: (type: keyof ImpactMetrics, amount: number, message?: string) => void;
  showImpactNotification: (message: string, icon: React.ReactNode) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [missions, setMissions] = useState<Mission[]>([
    { 
      id: 'explore_site', 
      title: 'Explore FoodLink PH', 
      description: 'Visit all pages to learn about Zero Hunger',
      completed: false,
      impact: '+50 people reached'
    },
    { 
      id: 'learn_facts', 
      title: 'Learn the Facts', 
      description: 'Read about hunger statistics in Cavite',
      completed: false,
      impact: '+25 people reached'
    },
    { 
      id: 'find_organizations', 
      title: 'Discover Organizations', 
      description: 'Explore local groups fighting hunger',
      completed: false,
      impact: '+30 people reached'
    },
    { 
      id: 'volunteer_interest', 
      title: 'Express Interest', 
      description: 'Fill out the volunteer form',
      completed: false,
      impact: '+100 people reached'
    },
    { 
      id: 'share_mission', 
      title: 'Spread Awareness', 
      description: 'Share FoodLink PH with others',
      completed: false,
      impact: '+200 people reached'
    },
  ]);

  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics>({
    actionsCompleted: 0,
    peopleReached: 0,
    contentShared: 0,
    mealEquivalent: 0,
  });

  const [streak, setStreak] = useState(0);
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  // Load from localStorage
  useEffect(() => {
    const savedMissions = localStorage.getItem('impact_missions');
    const savedMetrics = localStorage.getItem('impact_metrics');
    const savedStreak = localStorage.getItem('impact_streak');
    const savedLastVisit = localStorage.getItem('impact_last_visit');
    const savedVisitedPages = localStorage.getItem('visited_pages');

    if (savedMissions) setMissions(JSON.parse(savedMissions));
    if (savedMetrics) setImpactMetrics(JSON.parse(savedMetrics));
    if (savedVisitedPages) setVisitedPages(new Set(JSON.parse(savedVisitedPages)));
    
    // Check streak
    const today = new Date().toDateString();
    if (savedLastVisit) {
      const lastVisit = new Date(savedLastVisit);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastVisit.toDateString() === yesterday.toDateString()) {
        const currentStreak = savedStreak ? parseInt(savedStreak) + 1 : 1;
        setStreak(currentStreak);
        localStorage.setItem('impact_streak', currentStreak.toString());
      } else if (lastVisit.toDateString() !== today) {
        setStreak(1);
        localStorage.setItem('impact_streak', '1');
      } else {
        setStreak(savedStreak ? parseInt(savedStreak) : 0);
      }
    } else {
      setStreak(1);
      localStorage.setItem('impact_streak', '1');
    }
    
    localStorage.setItem('impact_last_visit', today);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('impact_missions', JSON.stringify(missions));
    localStorage.setItem('impact_metrics', JSON.stringify(impactMetrics));
    localStorage.setItem('visited_pages', JSON.stringify(Array.from(visitedPages)));
  }, [missions, impactMetrics, visitedPages]);

  const showImpactNotification = (message: string, icon: React.ReactNode) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="font-bold">Impact Made!</div>
          <div className="text-sm text-muted-foreground">{message}</div>
        </div>
      </div>,
      {
        duration: 4000,
      }
    );
  };

  const completeMission = (missionId: string) => {
    setMissions(prev => {
      const updated = prev.map(mission => {
        if (mission.id === missionId && !mission.completed) {
          // Show completion notification
          setTimeout(() => {
            toast.success(
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <div className="font-bold">Mission Completed!</div>
                  <div className="text-sm">{mission.title}</div>
                  <div className="text-xs text-muted-foreground">{mission.impact}</div>
                </div>
              </div>,
              {
                duration: 5000,
              }
            );
          }, 300);
          
          // Extract number from impact string
          const impactMatch = mission.impact.match(/\+(\d+)/);
          if (impactMatch) {
            const impactValue = parseInt(impactMatch[1]);
            setImpactMetrics(prev => ({
              ...prev,
              actionsCompleted: prev.actionsCompleted + 1,
              peopleReached: prev.peopleReached + impactValue,
              mealEquivalent: prev.mealEquivalent + Math.floor(impactValue / 10),
            }));
          }
          
          return { ...mission, completed: true };
        }
        return mission;
      });
      return updated;
    });
  };

  const addImpact = (type: keyof ImpactMetrics, amount: number, message?: string) => {
    setImpactMetrics(prev => ({
      ...prev,
      [type]: prev[type] + amount,
    }));

    const impactMessages: Record<keyof ImpactMetrics, { text: string; icon: React.ReactNode }> = {
      actionsCompleted: { text: message || `+${amount} action completed!`, icon: <Target className="h-5 w-5" /> },
      peopleReached: { text: message || `+${amount} people reached!`, icon: <Users className="h-5 w-5" /> },
      contentShared: { text: message || `Content shared!`, icon: <Heart className="h-5 w-5" /> },
      mealEquivalent: { text: message || `+${amount} meal equivalent!`, icon: <Heart className="h-5 w-5" /> },
    };

    if (amount > 0 && message) {
      setTimeout(() => showImpactNotification(message, impactMessages[type].icon), 300);
    }
  };

  // Track page visits for mission completion
  useEffect(() => {
    const handlePageVisit = (e: Event) => {
      const customEvent = e as CustomEvent;
      const pageName = customEvent.detail.page;
      
      setVisitedPages(prev => {
        const updated = new Set(prev);
        updated.add(pageName);
        
        // Check if all main pages have been visited
        if (updated.size >= 5 && !missions.find(m => m.id === 'explore_site')?.completed) {
          completeMission('explore_site');
        }
        
        return updated;
      });
    };

    window.addEventListener('page-visit', handlePageVisit);

    return () => {
      window.removeEventListener('page-visit', handlePageVisit);
    };
  }, [missions]);

  return (
    <GamificationContext.Provider value={{ 
      missions,
      impactMetrics,
      streak,
      completeMission,
      addImpact,
      showImpactNotification
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
