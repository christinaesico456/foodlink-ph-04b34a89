import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Trophy, Heart, Users, BookOpen, Award, Zap, Target, Star } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  points: number;
  icon: React.ReactNode;
}

interface GamificationContextType {
  points: number;
  level: number;
  badges: Badge[];
  streak: number;
  achievements: Achievement[];
  addPoints: (amount: number, reason: string) => void;
  checkBadgeUnlock: () => void;
  showAchievement: (title: string, points: number, icon: React.ReactNode) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([
    { id: 'first_steps', name: '🌱 First Steps', description: 'Start your journey', icon: '🌱', unlocked: false, requirement: 10, rarity: 'common' },
    { id: 'explorer', name: '🗺️ Explorer', description: 'Visit all pages', icon: '🗺️', unlocked: false, requirement: 50, rarity: 'common' },
    { id: 'advocate', name: '📢 Advocate', description: 'Engage with content', icon: '📢', unlocked: false, requirement: 100, rarity: 'rare' },
    { id: 'champion', name: '🏆 Champion', description: 'Master level reached', icon: '🏆', unlocked: false, requirement: 250, rarity: 'epic' },
    { id: 'hero', name: '⭐ Zero Hunger Hero', description: 'Ultimate achievement', icon: '⭐', unlocked: false, requirement: 500, rarity: 'legendary' },
    { id: 'weekly_warrior', name: '🔥 Weekly Warrior', description: '7-day streak', icon: '🔥', unlocked: false, requirement: 7, rarity: 'rare' },
    { id: 'volunteer', name: '🤝 Volunteer Spirit', description: 'Check volunteering options', icon: '🤝', unlocked: false, requirement: 30, rarity: 'common' },
    { id: 'informed', name: '📚 Well Informed', description: 'Read all updates', icon: '📚', unlocked: false, requirement: 75, rarity: 'rare' },
  ]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedPoints = localStorage.getItem('gamification_points');
    const savedLevel = localStorage.getItem('gamification_level');
    const savedBadges = localStorage.getItem('gamification_badges');
    const savedStreak = localStorage.getItem('gamification_streak');
    const savedLastVisit = localStorage.getItem('gamification_last_visit');

    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
    
    // Check streak
    const today = new Date().toDateString();
    if (savedLastVisit) {
      const lastVisit = new Date(savedLastVisit);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastVisit.toDateString() === yesterday.toDateString()) {
        // Continue streak
        const currentStreak = savedStreak ? parseInt(savedStreak) + 1 : 1;
        setStreak(currentStreak);
        localStorage.setItem('gamification_streak', currentStreak.toString());
      } else if (lastVisit.toDateString() !== today) {
        // Reset streak
        setStreak(1);
        localStorage.setItem('gamification_streak', '1');
      } else {
        setStreak(savedStreak ? parseInt(savedStreak) : 0);
      }
    } else {
      setStreak(1);
      localStorage.setItem('gamification_streak', '1');
    }
    
    localStorage.setItem('gamification_last_visit', today);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gamification_points', points.toString());
    localStorage.setItem('gamification_level', level.toString());
    localStorage.setItem('gamification_badges', JSON.stringify(badges));
  }, [points, level, badges]);

  // Calculate level
  useEffect(() => {
    const newLevel = Math.floor(points / 50) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      showLevelUpCelebration(newLevel);
    }
  }, [points]);

  const showLevelUpCelebration = (newLevel: number) => {
    toast.success(`🎉 Level Up! You're now Level ${newLevel}!`, {
      description: `Keep going! Next level at ${newLevel * 50} points.`,
      duration: 5000,
    });
  };

  const showAchievement = (title: string, points: number, icon: React.ReactNode) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="font-bold">{title}</div>
          <div className="text-sm text-muted-foreground">+{points} points earned!</div>
        </div>
      </div>,
      {
        duration: 4000,
      }
    );
  };

  const addPoints = (amount: number, reason: string) => {
    setPoints(prev => prev + amount);
    
    // Show different achievement types based on reason
    const achievementMap: Record<string, { title: string; icon: React.ReactNode }> = {
      'visited_home': { title: 'Welcome Home!', icon: <Star className="h-5 w-5" /> },
      'visited_about': { title: 'Learning More!', icon: <BookOpen className="h-5 w-5" /> },
      'visited_organizations': { title: 'Exploring Partners!', icon: <Users className="h-5 w-5" /> },
      'visited_get_involved': { title: 'Taking Action!', icon: <Heart className="h-5 w-5" /> },
      'visited_updates': { title: 'Staying Informed!', icon: <Zap className="h-5 w-5" /> },
      'default': { title: 'Great Job!', icon: <Trophy className="h-5 w-5" /> }
    };

    const achievement = achievementMap[reason] || achievementMap['default'];
    
    // Only show achievement for meaningful actions (5+ points)
    if (amount >= 5) {
      setTimeout(() => showAchievement(achievement.title, amount, achievement.icon), 300);
    }
    
    checkBadgeUnlock();
  };

  const checkBadgeUnlock = () => {
    setBadges(prev => {
      const updated = prev.map(badge => {
        if (!badge.unlocked) {
          const requirement = badge.id === 'weekly_warrior' ? streak : points;
          if (requirement >= badge.requirement) {
            // Show unlock toast
            const rarityColors = {
              common: '🟢',
              rare: '🔵', 
              epic: '🟣',
              legendary: '🟡'
            };
            
            toast.success(
              <div className="flex items-center gap-3">
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <div className="font-bold">{rarityColors[badge.rarity]} Badge Unlocked!</div>
                  <div className="text-sm">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
              </div>,
              {
                duration: 6000,
              }
            );
            
            return { ...badge, unlocked: true };
          }
        }
        return badge;
      });
      return updated;
    });
  };

  return (
    <GamificationContext.Provider value={{ 
      points, 
      level, 
      badges, 
      streak,
      achievements,
      addPoints, 
      checkBadgeUnlock,
      showAchievement
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
