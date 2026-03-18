import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppBottomNav from '../components/AppBottomNav';
import { useAppContext } from '../context/AppContext';
import { Alert } from 'react-native';

const COLORS = {
  bgLight: '#f8f6f6',
  primary: '#ec5b13',
  primaryLight: 'rgba(236, 91, 19, 0.1)',
  primaryGlow: 'rgba(236, 91, 19, 0.3)',
  secondary: '#f97316',
  white: '#ffffff',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate800: '#1e293b',
  slate900: '#0f172a',
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.slate500} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Profile</Text>
      <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons name="settings" size={24} color={COLORS.slate500} />
      </TouchableOpacity>
    </View>
  );
};

const StatCard = ({ icon, value, label, iconColor }) => (
  <View style={styles.statCard}>
    <MaterialIcons name={icon} size={24} color={iconColor} style={styles.statIcon} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function ProfileScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { xp, level, streak, resetProgress } = useAppContext();

  const confirmReset = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset your XP, Level, and Streak? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Reset", style: "destructive", onPress: resetProgress }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLight} />
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.avatarGlow}
            />
            <View style={styles.avatarWrapper}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrA6_2HlWWDCoNferK93Xw-YCWBZinYcA-J91Nf1eYcfTUScqZpEhX3ROCF95AE4t5hS5M8qfJpmybZ_IYc2ZvCKD6xUXqm6zcy3h_7XgwYlEaJDTy0NaNMX9YPlq2YXay05J2kyy-DbALapxzb75KOg3t_1GzKX8Ee_MUmJ9w26yNfb6Go1JTjGZCkIdoAB1U_ZzCQyrgkzIdRL2v2YlS5nRDe1iQhI_dmDqwREHBZrAfZGe7O_j2yzSZmPqjVHk_8VA_fAhEO2f6' }}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.boltBadge}>
              <MaterialIcons name="bolt" size={14} color={COLORS.white} />
            </View>
          </View>
          
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>Dev_Wizard</Text>
            <Text style={styles.heroTitle}>SENIOR CODE ALCHEMIST</Text>
            <View style={styles.proTag}>
              <Text style={styles.proTagText}>PRO MEMBER</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard icon="workspace-premium" value={level.toString()} label="LEVEL" iconColor={COLORS.primary} />
          <StatCard icon="military-tech" value={xp.toString()} label="XP POINTS" iconColor={COLORS.secondary} />
          <StatCard icon="local-fire-department" value={streak.toString()} label="STREAK" iconColor="#f97316" />
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          
          <TouchableOpacity activeOpacity={0.9} onPress={confirmReset}>
            <LinearGradient
              colors={['#ef4444', '#dc2626']} /* Red theme for destructive action */
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <View style={styles.actionRowBtn}>
                <MaterialIcons name="restore" size={24} color={COLORS.white} style={styles.actionIcon} />
                <Text style={styles.gradientButtonText}>Reset Progress</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.actionCard}>
            <View style={styles.actionRow}>
              <MaterialIcons name="dark-mode" size={24} color={COLORS.primary} style={styles.actionIcon} />
              <Text style={styles.actionText}>Toggle Theme</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.slate200, true: COLORS.primaryLight }}
              thumbColor={isDarkTheme ? COLORS.primary : COLORS.white}
              ios_backgroundColor={COLORS.slate200}
              onValueChange={() => setIsDarkTheme(!isDarkTheme)}
              value={isDarkTheme}
            />
          </View>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('About')}>
            <View style={styles.actionRow}>
              <MaterialIcons name="info" size={24} color={COLORS.secondary} style={styles.actionIcon} />
              <Text style={styles.actionText}>About DevMood</Text>
            </View>
            <MaterialIcons name="open-in-new" size={24} color={COLORS.slate400} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppBottomNav activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.bgLight,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(236, 91, 19, 0.1)',
  },
  headerButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    color: COLORS.slate900,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    padding: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  avatarGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 100,
    opacity: 0.3,
  },
  avatarWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: COLORS.bgLight,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  boltBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.bgLight,
  },
  heroInfo: {
    alignItems: 'center',
  },
  heroName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.slate900,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  proTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(236, 91, 19, 0.2)',
  },
  proTagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate200,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.slate900,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.slate500,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  actionsSection: {
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.slate500,
    letterSpacing: 2,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionRowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    marginRight: 12,
  },
  gradientButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.slate900,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: COLORS.slate200,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
