const POST_LEVEL_5_STEP = 300;

export function calculateLevelFromXP(xp) {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 800) return 4;
  
  // From 800 XP onward: level 5 + 1 level per 300 XP
  const extraXP = xp - 800;
  return 5 + Math.floor(extraXP / POST_LEVEL_5_STEP);
}

export function calculateXPProgress(xp) {
  const level = calculateLevelFromXP(xp);
  let baseXP = 0;
  let nextThreshold = 0;

  if (level === 1) { baseXP = 0; nextThreshold = 100; }
  else if (level === 2) { baseXP = 100; nextThreshold = 250; }
  else if (level === 3) { baseXP = 250; nextThreshold = 500; }
  else if (level === 4) { baseXP = 500; nextThreshold = 800; }
  else { 
    baseXP = 800 + ((level - 5) * POST_LEVEL_5_STEP);
    nextThreshold = baseXP + POST_LEVEL_5_STEP;
  }

  return {
    currentXPInLevel: xp - baseXP,
    xpNeededForNextLevel: nextThreshold - baseXP,
    nextThreshold,
    baseXP,
    progressPercentage: Math.max(0, Math.min(100, Math.floor(((xp - baseXP) / (nextThreshold - baseXP)) * 100)))
  };
}
