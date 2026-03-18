import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primary: '#ec5b13',
  inactive: '#8E8E93', // iOS standard inactive gray
  border: '#E5E5EA',
};

export default function AppBottomNav({ activeTab = 'home' }) {
  const navigation = useNavigation();

  // "Apple Store" style layout with project colors and screens
  const tabs = [
    { key: 'home', label: 'Home', icon: 'home', route: 'Home' },
    { key: 'mood', label: 'Mood', icon: 'mood', route: 'MoodDetails' },
    { key: 'stats', label: 'Stats', icon: 'insights', route: 'Stats' },
    { key: 'leaderboard', label: 'Rank', icon: 'leaderboard', route: 'Leaderboard' },
    { key: 'quests', label: 'Quests', icon: 'auto-awesome', route: 'QuestLog' },
    { key: 'profile', label: 'Profile', icon: 'person', route: 'Profile' },
  ];

  return (
    <View style={styles.navContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.navItem}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={isActive ? COLORS.primary : COLORS.inactive}
            />
            <Text style={[styles.navText, isActive && styles.navTextActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)', // Glassmorphism-like opaque white
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12, // iOS safe area spacing
    // iOS shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 2,
  },
  navText: {
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.inactive,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
