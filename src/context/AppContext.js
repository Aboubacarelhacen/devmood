import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOODS, checkAchievements, determineStreak } from '../utils/gameRules';
import { calculateLevelFromXP } from '../utils/xpCalculator';

const AppContext = createContext(null);

const defaultState = {
  selectedMood: 'No mood selected yet',
  xp: 0,
  level: 1,
  streak: 0,
  achievements: [],
  lastLoggedDate: null,
  moodCounters: {},
  stats: { totalLogs: 0 }
};

export function AppProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const storedState = await AsyncStorage.getItem('@devmood_state');
        if (storedState) {
          setState({ ...defaultState, ...JSON.parse(storedState) });
        }
      } catch (error) {
        console.error('Failed to load state', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem('@devmood_state', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateMood = (moodKey) => {
    const moodDef = Object.values(MOODS).find((m) => m.key === moodKey);
    if (!moodDef) return;

    setState((prev) => {
      const { streakIncrement } = determineStreak(prev.lastLoggedDate);
      
      const newStreak = streakIncrement === 'reset' ? 1 : prev.streak + streakIncrement;
      const newXp = prev.xp + moodDef.xp;
      const newLevel = calculateLevelFromXP(newXp);
      
      const newMoodCounters = {
        ...prev.moodCounters,
        [moodDef.key]: (prev.moodCounters[moodDef.key] || 0) + 1
      };
      
      const newStats = {
        ...prev.stats,
        totalLogs: (prev.stats.totalLogs || 0) + 1
      };

      const newStateTemp = {
        ...prev,
        selectedMood: moodDef.label,
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        lastLoggedDate: new Date().toISOString(),
        moodCounters: newMoodCounters,
        stats: newStats
      };

      const newlyUnlocked = checkAchievements(newStateTemp);
      if (newlyUnlocked.length > 0) {
        newStateTemp.achievements = [...prev.achievements, ...newlyUnlocked];
      }

      return newStateTemp;
    });
  };

  const resetProgress = () => {
    setState(defaultState);
  };

  const value = useMemo(
    () => ({
      ...state,
      isLoaded,
      updateMood,
      resetProgress,
    }),
    [state, isLoaded]
  );

  if (!isLoaded) return null; // Or a splash screen / loading spinner

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}
