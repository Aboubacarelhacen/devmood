# DevMood 🚀

**A Gamified Developer Mood Tracking App**

## 📌 Project Summary

**DevMood** is a gamified developer mood tracking application. Users can log their daily coding mood and earn XP, level up, maintain streaks, and unlock achievements. Created as a mobile product project, DevMood is designed to feel fun, modern, and engaging, encouraging developers to stay mindful of their daily coding experiences.

---

## ✨ Main Features

- **Mood Tracking**: Log your daily coding mood (e.g., Happy, Stressed, Focused, Frustrated).
- **XP System**: Earn experience points for consistency and daily check-ins.
- **Level Progression**: Gain levels as your XP accumulates, providing long-term goals.
- **Streak System**: Build and maintain a streak for logging moods on consecutive days.
- **Achievements**: Unlock milestones and special achievements for various activities within the app.

---

## 📱 Screens & App Sections

- **Home**: Dashboard displaying your current mood, streak, and quick-action logging buttons.
- **Achievements**: A showcase of all unlocked and locked milestones.
- **Stats**: Visual breakdowns and insights into your mood history over time.
- **Profile**: User settings, level progress, and global stats overview.

---

## 🛠 Technologies Used

- **React Native**: Core framework for building the cross-platform mobile UI.
- **Expo**: Development platform and toolchain for rapid React Native iteration.
- **Context API**: Native state management for handling user data, XP, and moods globally.
- **AsyncStorage**: Persistent local storage to save user data, streaks, and settings offline.

---

## 🚀 Installation & Run Instructions

To get a local version of DevMood running on your machine:

1. **Clone the repository**
   ```bash
   git clone git@github.com:Aboubacarelhacen/devmood.git
   cd devmood
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Expo development server**
   ```bash
   npx expo start
   ```
   *Scan the generated QR code using the **Expo Go** app on your iOS or Android device.*

---

## 📦 APK Download

Download the latest installable Android build here:
- **[Download DevMood APK](https://expo.dev/artifacts/eas/rj9A9DZg7w9x5TXkDWBpwy.apk)**
- **Build details:** https://expo.dev/accounts/abou1111/projects/devmood/builds/ccfd25ba-e948-4ea3-b1c6-2943a10f1960

---

## 🎥 Demo Video

Here is a brief demonstration of the DevMood application in action:
- **[Watch the DevMood Demo on YouTube](https://www.youtube.com/shorts/ye5_nKbaVc0)**

---

## 🎯 Project Purpose

The purpose of this project was to transform a basic React Native prototype into a comprehensive, polished mobile product. By introducing gamification mechanics (XP, levels, achievements) and focusing on UI/UX through user testing, DevMood demonstrates a complete mobile app lifecycle—from concept and prototype to an engaging final product suitable for real-world use.

---

## 🔮 Future Improvements

While DevMood is a fully functional product, the following features are planned for future iterations:
- **Push Notifications**: Daily reminders to log your coding mood so you never lose your streak.
- **Deeper Analytics**: More granular graphs, weekly summaries, and mood-to-productivity correlations.
- **Cloud Sync & Backend**: Migrating from local `AsyncStorage` to a dedicated cloud backend (e.g., Firebase or Supabase) to sync data across multiple devices.
