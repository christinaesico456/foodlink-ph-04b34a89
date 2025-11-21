import React, { createContext, useContext, useState, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: number;
}

interface GamificationContextType {
  points: number;
  level: number;
  badges: Badge[];
  addPoints: (amount: number, action: string) => void;
  checkBadgeUnlock: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const BADGES: Badge[] = [
  { id: 'explorer', name: 'Explorer', description: 'Visited all pages', icon: '🗺️', unlocked: false, requirement: 5 },
  { id: 'learner', name: 'Learner', description: 'Earned 50 points', icon: '📚', unlocked: false, requirement: 50 },
  { id: 'advocate', name: 'Advocate', description: 'Earned 100 points', icon: '💪', unlocked: false, requirement: 100 },
  { id: 'champion', name: 'Champion', description: 'Earned 200 points', icon: '🏆', unlocked: false, requirement: 200 },
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<Badge[]>(BADGES);

  useEffect(() => {
    const savedPoints = localStorage.getItem('foodlink_points');
    const savedBadges = localStorage.getItem('foodlink_badges');
    
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  useEffect(() => {
    localStorage.setItem('foodlink_points', points.toString());
    setLevel(Math.floor(points / 50) + 1);
  }, [points]);

  useEffect(() => {
    localStorage.setItem('foodlink_badges', JSON.stringify(badges));
  }, [badges]);

  const addPoints = (amount: number, action: string) => {
    setPoints(prev => prev + amount);
    checkBadgeUnlock();
  };

  const checkBadgeUnlock = () => {
    setBadges(prev => 
      prev.map(badge => ({
        ...badge,
        unlocked: badge.unlocked || points >= badge.requirement
      }))
    );
  };

  return (
    <GamificationContext.Provider value={{ points, level, badges, addPoints, checkBadgeUnlock }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within GamificationProvider');
  return context;
};
