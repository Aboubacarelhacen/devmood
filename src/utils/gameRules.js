export const MOODS = {
  PRODUCTIVE: { key: 'productive', label: 'Productive', xp: 20 },
  MOTIVATED: { key: 'motivated', label: 'Motivated', xp: 15 },
  FLOW_STATE: { key: 'flow_state', label: 'Flow State', xp: 25 },
  DEBUGGING_HELL: { key: 'debugging_hell', label: 'Debugging Hell', xp: 10 },
  TIRED: { key: 'tired', label: 'Tired', xp: 5 },
};

export const ACHIEVEMENTS = {
  FIRST_LOG: { id: 'first_log', title: 'First Log', description: 'Log your first coding mood', emoji: '🎉' },
  STREAK_3: { id: 'streak_3', title: '3 Day Streak', description: 'Log your mood 3 days in a row', emoji: '🔥' },
  STREAK_7: { id: 'streak_7', title: '7 Day Streak', description: 'Log your mood 7 days in a row', emoji: '🚀' },
  FLOW_MASTER: { id: 'flow_master', title: 'Flow Master', description: 'Select "Flow State" 5 times', emoji: '😎' },
  DEBUG_SURVIVOR: { id: 'debug_survivor', title: 'Debug Survivor', description: 'Select "Debugging Hell" 5 times', emoji: '🤯' },
};

export function checkAchievements(state) {
  const newAchievements = [];
  const { streak, stats, moodCounters, achievements } = state;

  const earned = (id) => achievements.includes(id) || newAchievements.includes(id);

  if (stats.totalLogs > 0 && !earned(ACHIEVEMENTS.FIRST_LOG.id)) {
    newAchievements.push(ACHIEVEMENTS.FIRST_LOG.id);
  }

  if (streak >= 3 && !earned(ACHIEVEMENTS.STREAK_3.id)) {
    newAchievements.push(ACHIEVEMENTS.STREAK_3.id);
  }

  if (streak >= 7 && !earned(ACHIEVEMENTS.STREAK_7.id)) {
    newAchievements.push(ACHIEVEMENTS.STREAK_7.id);
  }

  if ((moodCounters[MOODS.FLOW_STATE.key] || 0) >= 5 && !earned(ACHIEVEMENTS.FLOW_MASTER.id)) {
    newAchievements.push(ACHIEVEMENTS.FLOW_MASTER.id);
  }

  if ((moodCounters[MOODS.DEBUGGING_HELL.key] || 0) >= 5 && !earned(ACHIEVEMENTS.DEBUG_SURVIVOR.id)) {
    newAchievements.push(ACHIEVEMENTS.DEBUG_SURVIVOR.id);
  }

  return newAchievements;
}

export function determineStreak(lastDateIso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!lastDateIso) return { streakIncrement: 1, isNewDay: true };

  const lastDate = new Date(lastDateIso);
  lastDate.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today - lastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // User requested: Every log gets streak and XP, even same day
    return { streakIncrement: 1, isNewDay: false };
  } else if (diffDays === 1) {
    // Consecutive day
    return { streakIncrement: 1, isNewDay: true };
  } else {
    // Missed a day
    return { streakIncrement: 'reset', isNewDay: true };
  }
}
