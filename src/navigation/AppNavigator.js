import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import MoodDetailsScreen from '../screens/MoodDetailsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuestLogScreen from '../screens/QuestLogScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="MoodDetails" component={MoodDetailsScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="QuestLog" component={QuestLogScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="Stats" component={StatsScreen} options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
