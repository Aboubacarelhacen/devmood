# DevMood Context Design

This document explains the global app state managed by React Context API and the planned gamification logic.

## State Variables

- `selectedMood`: The latest mood selected by the developer (example: `"😀 Productive"`).
- `xp`: Total experience points collected from mood check-ins and future actions.
- `level`: Player level derived from XP.
- `streak`: Number of consecutive days with at least one mood check-in.
- `achievements`: Array of unlocked achievement objects (or IDs) for milestones.

## Planned Gamification Flow

1. User selects a mood.
2. App logs the check-in with timestamp.
3. App grants XP based on mood and check-in rules.
4. App recalculates level from XP.
5. App updates streak if daily continuity is maintained.
6. App checks if any achievement conditions were met.

## XP and Level Model (Placeholder)

- Base XP per check-in: `+10 XP`
- Productive bonus (example): `+5 XP`
- Daily first check-in bonus (example): `+5 XP`

Suggested formula:

- `level = floor(xp / 100) + 1`
- `xpIntoCurrentLevel = xp % 100`
- `xpNeededForNextLevel = 100`

This means every 100 XP increases the level by 1.

## Streak Logic (Placeholder)

- Store date of last check-in.
- If check-in date is exactly 1 day after last date: `streak + 1`.
- If same day: keep streak unchanged.
- If gap is greater than 1 day: reset streak to `1`.

## Achievement Ideas (Placeholder)

- First Check-In: first mood logged.
- 3-Day Streak: streak reaches 3.
- Focus Builder: select `"😀 Productive"` 10 times.
- XP Novice: reach 100 XP.
- Consistency Master: 30-day streak.

## Notes for Future Expansion

- Persist state using AsyncStorage.
- Keep context focused on state orchestration.
- Move game rules to utility/services for testability.
- Add analytics events for engagement insights.
