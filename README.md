# DevMood

DevMood is a React Native + Expo starter project for a gamified developer mood tracker.

## Tech Stack

- Expo (React Native)
- React Navigation (native stack)
- React Context API for global state

## Project Structure

```text
DevMood/
├── App.js
├── package.json
├── assets/
│   └── placeholder.png
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── MoodDisplay.js
│   │   ├── MoodSelector.js
│   │   ├── MoodButton.js
│   │   ├── XPLevelCard.js
│   │   ├── StreakCard.js
│   │   └── AchievementList.js
│   ├── screens/
│   │   └── HomeScreen.js
│   ├── context/
│   │   ├── AppContext.js
│   │   └── context.md
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── utils/
│       └── xpCalculator.js
└── README.md
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start Expo:

```bash
npx expo start
```

If your phone cannot connect on the local network, start with tunnel mode:

```bash
npm run start:tunnel
```

3. Open in Expo Go:

- Scan the QR code with Expo Go on your phone.

## Expo Go Notes (Important)

- This project has been aligned to a modern Expo SDK that works with current Expo Go.
- On physical devices, your laptop and phone should be on the same Wi-Fi network when using LAN mode.
- If LAN fails due to router/network restrictions, use tunnel mode (`npm run start:tunnel`).

## If Expo Go Shows "Request Timed Out"

Use these steps in order:

1. Start from the project folder:

```bash
cd /Users/aboubacarelhacen/challenge4/DevMood
```

2. Start LAN mode with cache clear:

```bash
npm run start:lan
```

3. Scan the new QR code and verify it shows an `exp://<your-local-ip>:8081` URL.

4. If timeout continues, close Expo Go on your phone and reopen it, then scan again.

5. If your network blocks LAN discovery, try tunnel mode:

```bash
npm run start:tunnel:clear
```

6. If tunnel fails to start, install tunnel helper once:

```bash
npm i -g @expo/ngrok
```

## Current Screen

`HomeScreen` includes placeholders for:

- Header
- Current mood
- Mood selector button (`😀 Productive`)
- XP/Level card (`Level 1`, `XP 0/100`)
- Streak card (`0 days`)
- Achievement list (empty)

## Expansion Notes

- Gamification rules are documented in `src/context/context.md`.
- Context state is centralized in `src/context/AppContext.js`.
- Navigation is scaffolded for future screens in `src/navigation/AppNavigator.js`.
