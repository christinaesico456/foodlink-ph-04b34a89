// src/contexts/GamificationContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Level Definitions - Progressive difficulty with meaningful milestones
export const LEVELS = [
  { level: 1, title: "Awareness Seeker", pointsRequired: 200, donation: 10 },
  { level: 2, title: "Community Learner", pointsRequired: 500, donation: 15 },
  { level: 3, title: "Active Contributor", pointsRequired: 1000, donation: 20 },
  { level: 4, title: "Impact Advocate", pointsRequired: 1800, donation: 30 },
  { level: 5, title: "Change Leader", pointsRequired: 3000, donation: 40 },
  { level: 6, title: "Hunger Warrior", pointsRequired: 4500, donation: 45 },
  { level: 7, title: "Zero Hunger Champion", pointsRequired: 6500, donation: 50 }
];

// TASK CATEGORIES - Connected to actual website content
export const TASK_POOL = {
  quick: [
    { id: "page_visit", title: "Visit the Home page", points: 8, icon: "🏠", cooldown: 0, category: "Navigation", link: "/" },
    { id: "learn_fact", title: "Read hunger statistics on Home", points: 10, icon: "📊", cooldown: 0, category: "Education", link: "/" },
    { id: "view_org", title: "View an organization profile", points: 12, icon: "🏢", cooldown: 0, category: "Discovery", link: "/organizations" },
    { id: "about_visit", title: "Learn about FoodLink PH", points: 10, icon: "ℹ️", cooldown: 0, category: "Navigation", link: "/about" },
    { id: "quick_quiz", title: "Take the SDG 2 Quiz", points: 20, icon: "🎯", cooldown: 1800000, category: "Learning", link: "/quiz" },
  ],
  
  medium: [
    { id: "read_article", title: "Read About page problem section", points: 30, icon: "📖", cooldown: 0, category: "Deep Learning", link: "/about" },
    { id: "map_explore", title: "Explore the Cavite hunger map", points: 25, icon: "🗺️", cooldown: 900000, category: "Exploration", link: "/get-involved" },
    { id: "case_study", title: "Read a community story", points: 35, icon: "📝", cooldown: 1800000, category: "Inspiration", link: "/community" },
    { id: "get_involved_visit", title: "Explore ways to help", points: 20, icon: "💪", cooldown: 0, category: "Action", link: "/get-involved" },
    { id: "compare_orgs", title: "Compare 3 organizations", points: 40, icon: "⚖️", cooldown: 3600000, category: "Analysis", link: "/organizations" },
  ],
  
  engagement: [
    { id: "share_social", title: "Share FoodLink on social media", points: 45, icon: "📢", cooldown: 14400000, category: "Advocacy" },
    { id: "volunteer_interest", title: "Read volunteer opportunities", points: 30, icon: "🙋", cooldown: 0, category: "Volunteering", link: "/get-involved" },
    { id: "donate_section", title: "Visit donation section", points: 25, icon: "💝", cooldown: 0, category: "Support", link: "/get-involved" },
  ],
  
  highImpact: [
    { id: "volunteer_form", title: "Fill out volunteer form", points: 80, icon: "✋", cooldown: 172800000, category: "Volunteering", link: "/get-involved" },
    { id: "complete_quiz", title: "Score 80%+ on full quiz", points: 100, icon: "🏆", cooldown: 86400000, category: "Achievement", link: "/quiz" },
    { id: "community_read_all", title: "Read 3 community stories", points: 75, icon: "📚", cooldown: 259200000, category: "Inspiration", link: "/community" },
  ],
  
  special: [
    { id: "daily_login", title: "Daily visit bonus", points: 20, icon: "🌅", cooldown: 86400000, category: "Consistency" },
    { id: "complete_series", title: "Visit all main pages", points: 75, icon: "🎖️", cooldown: 259200000, category: "Achievement" },
  ]
};

interface Task {
  id: string;
  title: string;
  points: number;
  icon: string;
  cooldown: number;
  category: string;
}

interface TaskCompletion {
  taskId: string;
  lastCompleted: number;
  count: number;
}

interface GamificationData {
  currentLevel: number;
  totalPoints: number;
  taskCompletions: TaskCompletion[];
  totalDonations: number;
  lastVisitDate: string;
  dayStreak: number;
  actionsToday: number;
  livesImpacted: number;
  totalImpact: number;
  userId: string;
  dailyTaskRotation: string[];
  rotationDate: string;
}

interface GamificationContextType {
  data: GamificationData;
  currentLevelData: typeof LEVELS[0];
  progressPercent: number;
  completeTask: (taskId: string) => void;
  getTaskStatus: (taskId: string) => { canComplete: boolean; cooldownRemaining: number };
  availableTasks: Task[];
  refreshDailyTasks: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// Select random tasks from pool for daily rotation
const generateDailyTasks = (userId: string, date: string): string[] => {
  const seed = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 
               new Date(date).getDate();
  
  let currentSeed = seed;
  
  const shuffleArray = (array: Task[]) => {
    return [...array].sort(() => {
      const x = Math.sin(currentSeed++) * 10000;
      return (x - Math.floor(x)) - 0.5;
    });
  };
  
  const shuffledQuick = shuffleArray(TASK_POOL.quick).slice(0, 3);
  const shuffledMedium = shuffleArray(TASK_POOL.medium).slice(0, 4);
  const shuffledEngagement = shuffleArray(TASK_POOL.engagement).slice(0, 3);
  const shuffledHighImpact = shuffleArray(TASK_POOL.highImpact).slice(0, 2);
  const shuffledSpecial = shuffleArray(TASK_POOL.special).slice(0, 1);
  
  return [
    ...shuffledQuick.map(t => t.id),
    ...shuffledMedium.map(t => t.id),
    ...shuffledEngagement.map(t => t.id),
    ...shuffledHighImpact.map(t => t.id),
    ...shuffledSpecial.map(t => t.id),
  ];
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [data, setData] = useState<GamificationData>(() => {
    const today = new Date().toDateString();
    
    return {
      currentLevel: 1,
      totalPoints: 0,
      taskCompletions: [],
      totalDonations: 0,
      lastVisitDate: today,
      dayStreak: 1,
      actionsToday: 0,
      livesImpacted: 0,
      totalImpact: 0,
      userId: '',
      dailyTaskRotation: [],
      rotationDate: today,
    };
  });

  // Load user data when authenticated
  useEffect(() => {
    if (user) {
      const storageKey = `gamification_data_${user.uid}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        const loadedData = JSON.parse(saved);
        const today = new Date().toDateString();
        
        if (loadedData.rotationDate !== today) {
          loadedData.dailyTaskRotation = generateDailyTasks(user.uid, today);
          loadedData.rotationDate = today;
          loadedData.actionsToday = 0;
        }
        
        if (loadedData.lastVisitDate) {
          const lastDate = new Date(loadedData.lastVisitDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastDate.toDateString() === yesterday.toDateString()) {
            loadedData.dayStreak = (loadedData.dayStreak || 0) + 1;
          } else if (lastDate.toDateString() !== today) {
            loadedData.dayStreak = 1;
          }
        }
        
        loadedData.lastVisitDate = today;
        loadedData.userId = user.uid;
        setData(loadedData);
      } else {
        // Initialize new user data
        const today = new Date().toDateString();
        setData({
          currentLevel: 1,
          totalPoints: 0,
          taskCompletions: [],
          totalDonations: 0,
          lastVisitDate: today,
          dayStreak: 1,
          actionsToday: 0,
          livesImpacted: 0,
          totalImpact: 0,
          userId: user.uid,
          dailyTaskRotation: generateDailyTasks(user.uid, today),
          rotationDate: today,
        });
      }
    }
  }, [user]);

  // Save data when it changes
  useEffect(() => {
    if (user && data.userId) {
      const storageKey = `gamification_data_${user.uid}`;
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, user]);

  const getCurrentLevelData = () => {
    return LEVELS[data.currentLevel - 1] || LEVELS[0];
  };

  const getProgressPercent = (): number => {
    const currentLevelData = getCurrentLevelData();
    const previousLevelPoints = data.currentLevel > 1 ? LEVELS[data.currentLevel - 2].pointsRequired : 0;
    const pointsInCurrentLevel = data.totalPoints - previousLevelPoints;
    const pointsNeededForLevel = currentLevelData.pointsRequired - previousLevelPoints;
    return Math.min(100, (pointsInCurrentLevel / pointsNeededForLevel) * 100);
  };

  const getAvailableTasks = (): Task[] => {
    const allTasks = Object.values(TASK_POOL).flat();
    return data.dailyTaskRotation
      .map(taskId => allTasks.find(t => t.id === taskId))
      .filter((t): t is Task => t !== undefined);
  };

  const getTaskStatus = (taskId: string) => {
    const allTasks = Object.values(TASK_POOL).flat();
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return { canComplete: true, cooldownRemaining: 0 };

    const completion = data.taskCompletions.find(c => c.taskId === taskId);
    if (!completion) return { canComplete: true, cooldownRemaining: 0 };

    const now = Date.now();
    const timeSinceLastCompletion = now - completion.lastCompleted;
    
    if (timeSinceLastCompletion < task.cooldown) {
      return {
        canComplete: false,
        cooldownRemaining: task.cooldown - timeSinceLastCompletion
      };
    }

    return { canComplete: true, cooldownRemaining: 0 };
  };

  const completeTask = (taskId: string) => {
    if (!user) return;
    
    const allTasks = Object.values(TASK_POOL).flat();
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;

    const taskStatus = getTaskStatus(taskId);
    if (!taskStatus.canComplete) return;

    const existingCompletion = data.taskCompletions.find(c => c.taskId === taskId);
    const newCompletions = existingCompletion
      ? data.taskCompletions.map(c => 
          c.taskId === taskId 
            ? { ...c, lastCompleted: Date.now(), count: c.count + 1 }
            : c
        )
      : [...data.taskCompletions, { taskId, lastCompleted: Date.now(), count: 1 }];

    const newTotalPoints = data.totalPoints + task.points;
    let newLevel = data.currentLevel;
    let newDonations = data.totalDonations;

    // Track level ups and save donations to database
    const levelsGained: number[] = [];
    while (newLevel < LEVELS.length && newTotalPoints >= LEVELS[newLevel - 1].pointsRequired) {
      levelsGained.push(newLevel);
      newDonations += LEVELS[newLevel - 1].donation;
      newLevel++;
    }

    // Save each level-up donation to the database
    if (levelsGained.length > 0 && user) {
      levelsGained.forEach(async (levelReached) => {
        const donationAmount = LEVELS[levelReached - 1].donation;
        await supabase.from('gamification_donations').insert({
          user_id: user.uid,
          amount: donationAmount,
          level_reached: levelReached
        });
      });
    }

    setData(prev => ({
      ...prev,
      totalPoints: newTotalPoints,
      totalImpact: newTotalPoints,
      taskCompletions: newCompletions,
      currentLevel: newLevel,
      totalDonations: newDonations,
      actionsToday: prev.actionsToday + 1,
      livesImpacted: prev.livesImpacted + Math.floor(task.points / 15),
    }));
  };

  const refreshDailyTasks = () => {
    if (!user) return;
    
    const today = new Date().toDateString();
    setData(prev => ({
      ...prev,
      dailyTaskRotation: generateDailyTasks(user.uid, today),
      rotationDate: today,
    }));
  };

  return (
    <GamificationContext.Provider value={{ 
      data,
      currentLevelData: getCurrentLevelData(),
      progressPercent: getProgressPercent(),
      completeTask,
      getTaskStatus,
      availableTasks: getAvailableTasks(),
      refreshDailyTasks,
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