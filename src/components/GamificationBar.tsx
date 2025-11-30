// src/components/GamificationBar.tsx
import { useGamification, LEVELS } from '@/contexts/GamificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

const GamificationBar = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { data, currentLevelData, progressPercent, completeTask, getTaskStatus, availableTasks, refreshDailyTasks } = useGamification();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [, forceUpdate] = useState({});
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => forceUpdate({}), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCooldown = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMinimized(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Not authenticated - Show login prompt
  if (!user) {
    if (isMinimized) {
      return (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsMinimized(false)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl hover:scale-110 transition-transform group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/20 blur-xl animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-center text-white text-2xl">
              🍽️
            </div>
          </button>
        </div>
      );
    }

    return (
      <div className="fixed bottom-4 right-4 z-50 w-96">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-xl">
                  🍽️
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">FoodLink PH</h3>
                  <p className="text-xs text-gray-500">Sign in to start</p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <span className="text-gray-400">−</span>
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200 mb-4">
                <h4 className="text-sm font-bold text-gray-900 mb-2">🌟 What You'll Get:</h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Complete tasks and earn points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Level up and unlock donations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Track your impact on hunger relief</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>Build streaks and compete</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {signingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-semibold text-gray-700">Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-semibold text-gray-700">Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to help fight hunger while tracking your impact
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user - Show gamification interface
  const categories = ["all", ...new Set(availableTasks.map(t => t.category))];
  const filteredTasks = selectedCategory === "all" 
    ? availableTasks 
    : availableTasks.filter(t => t.category === selectedCategory);

  const pointsToNext = currentLevelData.pointsRequired - data.totalPoints;
  const isMaxLevel = data.currentLevel >= LEVELS.length;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl hover:scale-110 transition-transform group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/20 blur-xl animate-pulse"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-white">
            <span className="text-2xl font-black">{data.currentLevel}</span>
            <span className="text-xs font-bold">Level</span>
          </div>
          {data.actionsToday > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
              {data.actionsToday}
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[85vh] overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>
        
        <div className="p-5">
          {/* Header with User Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-amber-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-black text-lg">
                  {data.currentLevel}
                </div>
              )}
              <div>
                <h3 className="text-sm font-black text-gray-900 truncate max-w-[150px]">
                  {user.displayName || 'Impact Warrior'}
                </h3>
                <p className="text-xs text-gray-500">Level {data.currentLevel}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSignOut}
                className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
                title="Sign out"
              >
                <span className="text-red-500">⎋</span>
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <span className="text-gray-400">−</span>
              </button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700">{currentLevelData.title}</span>
              <span className="text-xs font-semibold text-gray-500">
                {data.totalPoints} / {currentLevelData.pointsRequired}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {!isMaxLevel && (
              <p className="text-xs text-amber-600 font-semibold mt-1.5">
                🎯 {pointsToNext} points until ₱{currentLevelData.donation} donation unlocked
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-3 border border-amber-200">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-lg font-black text-gray-900">₱{data.totalDonations}</div>
              <div className="text-xs text-gray-600 font-medium">Donated</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 border border-orange-200">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-lg font-black text-gray-900">{data.dayStreak}</div>
              <div className="text-xs text-gray-600 font-medium">Streak</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-3 border border-yellow-200">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-lg font-black text-gray-900">{data.actionsToday}</div>
              <div className="text-xs text-gray-600 font-medium">Today</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
              <div className="text-2xl mb-1">👥</div>
              <div className="text-lg font-black text-gray-900">{data.livesImpacted}</div>
              <div className="text-xs text-gray-600 font-medium">Impact</div>
            </div>
          </div>

          {/* Task Filters */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-black text-gray-900">Today's Tasks</h4>
            <button
              onClick={refreshDailyTasks}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
              title="Get new task rotation"
            >
              🔄 Refresh
            </button>
          </div>

          <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === "all" ? "All Tasks" : cat}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className={`space-y-2 transition-all duration-300 ${
            isExpanded ? 'max-h-96 overflow-y-auto' : 'max-h-64 overflow-y-auto'
          }`}>
            {filteredTasks.map(task => {
              const status = getTaskStatus(task.id);
              const completion = data.taskCompletions.find(c => c.taskId === task.id);
              
              return (
                <div
                  key={task.id}
                  className={`group rounded-xl border-2 p-3 transition-all ${
                    status.canComplete
                      ? 'bg-white border-gray-200 hover:border-amber-400 hover:shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{task.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h5 className="text-sm font-bold text-gray-900 leading-tight">
                          {task.title}
                        </h5>
                        {completion && completion.count > 0 && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex-shrink-0">
                            {completion.count}×
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-semibold">
                          +{task.points} pts
                        </span>
                        <span className="text-gray-500">{task.category}</span>
                      </div>
                      {!status.canComplete && (
                        <div className="mt-1.5 text-xs text-orange-600 font-semibold">
                          ⏱ Available in {formatCooldown(status.cooldownRemaining)}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => completeTask(task.id)}
                      disabled={!status.canComplete}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                        status.canComplete
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {status.canComplete ? 'Complete' : 'Locked'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Message */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500 italic">
              {progressPercent < 20 && "🌱 Every action brings us closer to zero hunger"}
              {progressPercent >= 20 && progressPercent < 40 && "🌿 You're building real momentum!"}
              {progressPercent >= 40 && progressPercent < 60 && "🌾 Incredible progress! Keep it up!"}
              {progressPercent >= 60 && progressPercent < 80 && "⭐ You're almost there! Don't stop now!"}
              {progressPercent >= 80 && progressPercent < 100 && "🚀 Final push to the next level!"}
              {progressPercent === 100 && isMaxLevel && "🏆 Maximum level achieved! You're a true champion!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationBar;