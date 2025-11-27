import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Level Definitions - Each level = ₱100 donation when completed
export const LEVELS = [
  {
    level: 1,
    title: "Hunger Awareness Beginner",
    pointsRequired: 100
  },
  {
    level: 2,
    title: "Community Explorer",
    pointsRequired: 250
  },
  {
    level: 3,
    title: "Impact Contributor",
    pointsRequired: 500
  },
  {
    level: 4,
    title: "Hunger Advocate",
    pointsRequired: 850
  },
  {
    level: 5,
    title: "Zero Hunger Champion",
    pointsRequired: 1500
  }
];

// CONTINUOUS REPEATABLE TASKS - Users can do these anytime to earn points
export const CONTINUOUS_TASKS = [
  { id: "page_visit", title: "Visit a new page", points: 5, icon: "🏠", cooldown: 0 },
  { id: "learn_fact", title: "Learn a hunger fact", points: 10, icon: "📖", cooldown: 0 },
  { id: "view_org", title: "View an organization", points: 15, icon: "🏢", cooldown: 0 },
  { id: "map_explore", title: "Explore the map", points: 20, icon: "🗺️", cooldown: 300000 }, // 5 min cooldown
  { id: "share_content", title: "Share content", points: 30, icon: "📢", cooldown: 3600000 }, // 1 hour cooldown
  { id: "read_article", title: "Read an article", points: 25, icon: "📰", cooldown: 0 },
  { id: "watch_video", title: "Watch educational video", points: 35, icon: "🎥", cooldown: 0 },
  { id: "form_interest", title: "Submit volunteer form", points: 50, icon: "✋", cooldown: 86400000 }, // 24 hour cooldown
  { id: "download_resource", title: "Download a resource", points: 20, icon: "📚", cooldown: 0 },
  { id: "leave_feedback", title: "Leave feedback/comment", points: 40, icon: "💭", cooldown: 3600000 }, // 1 hour cooldown
];

interface Task {
  id: string;
  title: string;
  points: number;
  icon: string;
  cooldown: number;
}

interface Level {
  level: number;
  title: string;
  pointsRequired: number;
}

interface TaskCompletion {
  taskId: string;
  lastCompleted: number; // timestamp
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
}

interface GamificationContextType {
  data: GamificationData;
  impactData: GamificationData; // Backward compatibility
  currentLevelData: Level;
  progressPercent: number;
  completeTask: (taskId: string, points: number) => void;
  recordAction: (actionId: string, title: string, impact: number, icon: string) => void; // Backward compatibility
  celebrateLevel: () => void;
  celebrateImpact: () => void; // Backward compatibility
  getTaskStatus: (taskId: string) => { canComplete: boolean; cooldownRemaining: number };
  todaysActions: any[]; // Backward compatibility
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GamificationData>({
    currentLevel: 1,
    totalPoints: 0,
    taskCompletions: [],
    totalDonations: 0,
    lastVisitDate: new Date().toDateString(),
    dayStreak: 1,
    actionsToday: 0,
    livesImpacted: 0,
    totalImpact: 0,
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gamification_data');
    const lastVisit = localStorage.getItem('last_visit_date');

    if (saved) {
      const loadedData = JSON.parse(saved);
      const today = new Date().toDateString();
      
      loadedData.totalImpact = loadedData.totalPoints || loadedData.totalImpact || 0;
      
      // Check streak
      if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === yesterday.toDateString()) {
          loadedData.dayStreak = (loadedData.dayStreak || 0) + 1;
        } else if (lastDate.toDateString() !== today) {
          loadedData.dayStreak = 1;
          loadedData.actionsToday = 0;
        }
      }
      
      setData(loadedData);
    }

    localStorage.setItem('last_visit_date', new Date().toDateString());
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gamification_data', JSON.stringify(data));
  }, [data]);

  const getCurrentLevelData = (): Level => {
    return LEVELS[data.currentLevel - 1] || LEVELS[0];
  };

  const getProgressPercent = (): number => {
    const currentLevelData = getCurrentLevelData();
    const previousLevelPoints = data.currentLevel > 1 ? LEVELS[data.currentLevel - 2].pointsRequired : 0;
    const pointsInCurrentLevel = data.totalPoints - previousLevelPoints;
    const pointsNeededForLevel = currentLevelData.pointsRequired - previousLevelPoints;
    return Math.min(100, (pointsInCurrentLevel / pointsNeededForLevel) * 100);
  };

  const celebrateLevel = () => {
    const colors = ['#daa325', '#38761d', '#e38637'];
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const count = 100;
        const defaults = { origin: { y: 0.7 } };
        
        function fire(particleRatio: number, opts: any) {
          const confetti = (window as any).confetti;
          if (confetti) {
            confetti({
              ...defaults,
              ...opts,
              particleCount: Math.floor(count * particleRatio),
              colors: colors,
            });
          }
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      }, i * 200);
    }
  };

  const getTaskStatus = (taskId: string) => {
    const task = CONTINUOUS_TASKS.find(t => t.id === taskId);
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

  const completeTask = (taskId: string, points: number) => {
    const taskStatus = getTaskStatus(taskId);
    
    if (!taskStatus.canComplete) {
      const minutesRemaining = Math.ceil(taskStatus.cooldownRemaining / 60000);
      const hoursRemaining = Math.ceil(taskStatus.cooldownRemaining / 3600000);
      
      const message = taskStatus.cooldownRemaining > 3600000
        ? `Please wait ${hoursRemaining} hour(s) before doing this task again.`
        : `Please wait ${minutesRemaining} minute(s) before doing this task again.`;
        
      toast.error(message, { duration: 3000 });
      return;
    }

    // Update task completions
    const existingCompletion = data.taskCompletions.find(c => c.taskId === taskId);
    const newCompletions = existingCompletion
      ? data.taskCompletions.map(c => 
          c.taskId === taskId 
            ? { ...c, lastCompleted: Date.now(), count: c.count + 1 }
            : c
        )
      : [...data.taskCompletions, { taskId, lastCompleted: Date.now(), count: 1 }];

    const newTotalPoints = data.totalPoints + points;
    
    let newLevel = data.currentLevel;
    let newDonations = data.totalDonations;
    let leveledUp = false;

    // Check if level up
    while (newLevel < LEVELS.length && newTotalPoints >= LEVELS[newLevel - 1].pointsRequired) {
      newLevel++;
      newDonations += 100;
      leveledUp = true;
    }

    setData(prev => ({
      ...prev,
      totalPoints: newTotalPoints,
      totalImpact: newTotalPoints,
      taskCompletions: newCompletions,
      currentLevel: newLevel,
      totalDonations: newDonations,
      actionsToday: prev.actionsToday + 1,
      livesImpacted: prev.livesImpacted + Math.floor(points / 10),
    }));

    if (leveledUp) {
      setTimeout(() => {
        celebrateLevel();
        toast.success(
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎉</div>
            <div>
              <div className="font-bold">Level {newLevel} Reached!</div>
              <div className="text-sm text-muted-foreground">₱{newDonations - data.totalDonations} donated to fight hunger!</div>
            </div>
          </div>,
          { duration: 5000 }
        );
      }, 500);
    } else {
      const taskInfo = CONTINUOUS_TASKS.find(t => t.id === taskId);
      toast.success(
        <div className="flex items-center gap-3">
          <div className="text-3xl">{taskInfo?.icon || "✅"}</div>
          <div>
            <div className="font-bold">Task Completed!</div>
            <div className="text-sm text-muted-foreground">+{points} points • {newTotalPoints}/{getCurrentLevelData().pointsRequired}</div>
          </div>
        </div>,
        { duration: 3000 }
      );
    }
  };

  // Backward compatibility function
  const recordAction = (actionId: string, title: string, impact: number, icon: string) => {
    completeTask(actionId, impact);
  };

  return (
    <GamificationContext.Provider value={{ 
      data,
      impactData: data, // Backward compatibility
      currentLevelData: getCurrentLevelData(),
      progressPercent: getProgressPercent(),
      completeTask,
      recordAction, // Backward compatibility
      celebrateLevel,
      celebrateImpact: celebrateLevel, // Backward compatibility
      getTaskStatus,
      todaysActions: [], // Backward compatibility
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