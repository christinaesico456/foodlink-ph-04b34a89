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

// TASK CATEGORIES - More diverse and challenging tasks
export const TASK_POOL = {
  quick: [
    { id: "page_visit", title: "Explore a program page", points: 8, icon: "🏠", cooldown: 0, category: "Navigation" },
    { id: "learn_fact", title: "Read a hunger statistic", points: 10, icon: "📊", cooldown: 0, category: "Education" },
    { id: "view_org", title: "Check organization profile", points: 12, icon: "🏢", cooldown: 0, category: "Discovery" },
    { id: "check_news", title: "Read latest hunger news", points: 15, icon: "📰", cooldown: 300000, category: "Awareness" },
    { id: "view_gallery", title: "Browse impact gallery", points: 10, icon: "🖼️", cooldown: 600000, category: "Inspiration" },
    { id: "quick_quiz", title: "Take a 3-question quiz", points: 20, icon: "🎯", cooldown: 1800000, category: "Learning" },
  ],
  
  medium: [
    { id: "read_article", title: "Read full article (2+ min)", points: 30, icon: "📖", cooldown: 0, category: "Deep Learning" },
    { id: "watch_video", title: "Watch educational video", points: 35, icon: "🎥", cooldown: 0, category: "Media" },
    { id: "map_explore", title: "Explore interactive map (1+ min)", points: 25, icon: "🗺️", cooldown: 900000, category: "Exploration" },
    { id: "case_study", title: "Read a success story", points: 35, icon: "📝", cooldown: 1800000, category: "Inspiration" },
    { id: "download_resource", title: "Download educational material", points: 25, icon: "📚", cooldown: 3600000, category: "Resources" },
    { id: "compare_orgs", title: "Compare 3 organizations", points: 40, icon: "⚖️", cooldown: 3600000, category: "Analysis" },
    { id: "interactive_tool", title: "Use hunger calculator", points: 38, icon: "🧮", cooldown: 7200000, category: "Tools" },
  ],
  
  engagement: [
    { id: "leave_feedback", title: "Write detailed feedback (50+ words)", points: 50, icon: "💭", cooldown: 7200000, category: "Feedback" },
    { id: "share_social", title: "Share content on social media", points: 45, icon: "📢", cooldown: 14400000, category: "Advocacy" },
    { id: "email_share", title: "Email resources to 2+ people", points: 55, icon: "📧", cooldown: 86400000, category: "Outreach" },
    { id: "create_plan", title: "Create personal action plan", points: 60, icon: "📋", cooldown: 86400000, category: "Planning" },
    { id: "attend_webinar", title: "Register for virtual event", points: 50, icon: "🎓", cooldown: 604800000, category: "Events" },
  ],
  
  highImpact: [
    { id: "volunteer_form", title: "Complete volunteer application", points: 80, icon: "✋", cooldown: 172800000, category: "Volunteering" },
    { id: "donation_intent", title: "Submit donation interest form", points: 100, icon: "💝", cooldown: 259200000, category: "Support" },
    { id: "community_post", title: "Write blog/forum post (200+ words)", points: 90, icon: "✍️", cooldown: 259200000, category: "Content" },
    { id: "mentor_signup", title: "Sign up as program mentor", points: 120, icon: "🤝", cooldown: 604800000, category: "Leadership" },
    { id: "partnership_inquiry", title: "Submit partnership proposal", points: 150, icon: "🤝", cooldown: 1209600000, category: "Collaboration" },
  ],
  
  special: [
    { id: "daily_login", title: "Daily visit bonus", points: 20, icon: "🌅", cooldown: 86400000, category: "Consistency" },
    { id: "weekend_warrior", title: "Weekend engagement bonus", points: 40, icon: "🎊", cooldown: 604800000, category: "Special" },
    { id: "complete_series", title: "Complete 3-part article series", points: 75, icon: "📚", cooldown: 259200000, category: "Achievement" },
    { id: "survey_complete", title: "Complete monthly survey", points: 65, icon: "📋", cooldown: 2592000000, category: "Research" },
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