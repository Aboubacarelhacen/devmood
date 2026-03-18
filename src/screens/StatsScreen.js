import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import AppBottomNav from '../components/AppBottomNav';
import { useAppContext } from '../context/AppContext';
import { calculateXPProgress } from '../utils/xpCalculator';

const { width } = Dimensions.get('window');

const COLORS = {
  bgLight: '#f8f6f6',
  primary: '#ec5b13',
  primaryLight: 'rgba(236, 91, 19, 0.1)',
  primaryBorder: 'rgba(236, 91, 19, 0.2)',
  white: '#ffffff',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
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
        <MaterialIcons name="arrow-back" size={24} color={COLORS.slate900} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Stats & Progress</Text>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.navigate('Achievements')}
      >
        <MaterialIcons name="military-tech" size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const LevelStatusCard = ({ level, progressPercentage }) => (
  <View style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
    <View style={styles.levelLeft}>
      <Text style={styles.levelLabel}>Level Up Status</Text>
      <Text style={styles.levelTitle}>Code Wizard</Text>
      <Text style={styles.levelSubtitle}>Keep up the great work!</Text>
    </View>
    <View style={styles.levelRight}>
      <Svg width="96" height="96" viewBox="0 0 36 36">
        <Circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke={COLORS.slate200}
          strokeWidth="2.5"
        />
        <Circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke={COLORS.primary}
          strokeWidth="2.5"
          strokeDasharray={`${progressPercentage} 100`}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      </Svg>
      <View style={styles.levelValueWrapper}>
        <Text style={styles.levelLvlText}>Lvl {level}</Text>
        <Text style={styles.levelPctText}>{progressPercentage}%</Text>
      </View>
    </View>
  </View>
);

const MoodFlowCard = () => (
  <View style={styles.card}>
    <View style={styles.moodHeader}>
      <Text style={styles.cardTitle}>Mood Flow</Text>
      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerText}>This Week</Text>
        <MaterialIcons name="keyboard-arrow-down" size={16} color={COLORS.slate500} />
      </View>
    </View>
    
    <View style={styles.chartContainer}>
      <Svg width="100%" height="120" viewBox="0 0 100 40" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ec5b13" />
            <Stop offset="50%" stopColor="#f97316" />
            <Stop offset="100%" stopColor="#ec5b13" />
          </LinearGradient>
        </Defs>
        <Line x1="0" y1="10" x2="100" y2="10" stroke={COLORS.slate200} strokeWidth="0.5" strokeDasharray="2 2" />
        <Line x1="0" y1="20" x2="100" y2="20" stroke={COLORS.slate200} strokeWidth="0.5" strokeDasharray="2 2" />
        <Line x1="0" y1="30" x2="100" y2="30" stroke={COLORS.slate200} strokeWidth="0.5" strokeDasharray="2 2" />
        
        <Path 
          d="M0,25 C15,25 20,5 35,10 C50,15 65,35 80,20 C90,10 100,5 100,5" 
          fill="none" 
          stroke="url(#gradient)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <Circle cx="35" cy="10" r="1.5" fill={COLORS.white} stroke={COLORS.primary} strokeWidth="1" />
        <Circle cx="80" cy="20" r="1.5" fill={COLORS.white} stroke={COLORS.primary} strokeWidth="1" />
        <Circle cx="100" cy="5" r="1.5" fill={COLORS.white} stroke={COLORS.primary} strokeWidth="1" />
      </Svg>
      <View style={styles.chartXLabels}>
        <Text style={styles.chartLabel}>Mon</Text>
        <Text style={styles.chartLabel}>Wed</Text>
        <Text style={styles.chartLabel}>Fri</Text>
        <Text style={styles.chartLabel}>Sun</Text>
      </View>
    </View>
  </View>
);

const StreakCard = ({ streak }) => {
  // Mock days based on current day
  const days = [
    { label: 'M', active: streak >= 5 },
    { label: 'T', active: streak >= 4 },
    { label: 'W', active: streak >= 3 },
    { label: 'T', active: streak >= 2 },
    { label: 'F', active: streak >= 1, current: true },
    { label: 'S', active: false },
    { label: 'S', active: false },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.streakHeader}>
        <View>
          <View style={styles.streakTitleRow}>
            <Text style={styles.cardTitle}>Current Streak</Text>
            <MaterialIcons name="local-fire-department" size={20} color={COLORS.primary} style={{ marginLeft: 6}} />
          </View>
          <Text style={styles.streakSubText}>You're on a {streak}-day coding streak!</Text>
        </View>
        <View style={styles.streakCountRow}>
          <Text style={styles.streakCountNum}>{streak}</Text>
          <Text style={styles.streakCountText}>Days</Text>
        </View>
      </View>

      <View style={styles.streakDaysRow}>
        {days.map((day, idx) => (
          <View key={idx} style={styles.streakDayCol}>
            <View style={[
              styles.streakIconCircle,
              day.active ? styles.streakActiveBg : styles.streakInactiveBg,
              day.current && styles.streakCurrentBg
            ]}>
              <MaterialIcons 
                name="local-fire-department" 
                size={22} 
                color={day.active ? COLORS.primary : COLORS.slate400} 
              />
            </View>
            <Text style={[
              styles.streakDayLabel,
              day.current && { color: COLORS.primary, fontWeight: 'bold' }
            ]}>{day.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const AchievementsCTA = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => navigation.navigate('Achievements')}
      style={[styles.card, { padding: 0, overflow: 'hidden', borderWidth: 0, marginTop: 8 }]}
    >
      <View style={{ backgroundColor: COLORS.primaryLight, padding: 24, alignItems: 'center' }}>
        <MaterialIcons name="military-tech" size={48} color={COLORS.primary} style={{ marginBottom: 12 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.slate900, marginBottom: 4 }}>
          Trophy Room
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.slate500, textAlign: 'center' }}>
          View your unlocked badges and next milestones!
        </Text>
        <View style={{ 
          marginTop: 16, 
          backgroundColor: COLORS.primary, 
          paddingHorizontal: 24, 
          paddingVertical: 12, 
          borderRadius: 24,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8
        }}>
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 14 }}>
            Explore Achievements
          </Text>
          <MaterialIcons name="arrow-forward" size={16} color={COLORS.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function StatsScreen() {
  const { xp, level, streak } = useAppContext();
  const progressDetails = calculateXPProgress(xp);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLight} />
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LevelStatusCard level={level} progressPercentage={progressDetails.progressPercentage} />
        <MoodFlowCard />
        <StreakCard streak={streak} />
        <AchievementsCTA />
      </ScrollView>
      <AppBottomNav activeTab="stats" />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(248, 246, 246, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate200,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    padding: 20,
    shadowColor: COLORS.slate900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  
  // Level Card
  levelLeft: { flex: 1, justifyContent: 'center' },
  levelRight: { position: 'relative', width: 96, height: 96, alignItems: 'center', justifyContent: 'center' },
  levelLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  levelTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.slate900, marginBottom: 4 },
  levelSubtitle: { fontSize: 14, color: COLORS.slate500 },
  levelValueWrapper: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  levelLvlText: { fontSize: 18, fontWeight: 'bold', color: COLORS.slate900, lineHeight: 22 },
  levelPctText: { fontSize: 10, color: COLORS.primary, marginTop: -2, fontWeight: '500' },
  
  // Mood Card
  moodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.slate900 },
  pickerWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.slate100, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pickerText: { fontSize: 12, color: COLORS.slate600, marginRight: 4 },
  chartContainer: { width: '100%', height: 150 },
  chartXLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 4 },
  chartLabel: { fontSize: 10, color: COLORS.slate400, fontWeight: '500' },

  // Streak Card
  streakHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  streakTitleRow: { flexDirection: 'row', alignItems: 'center' },
  streakSubText: { fontSize: 12, color: COLORS.slate500, marginTop: 4 },
  streakCountRow: { flexDirection: 'row', alignItems: 'baseline' },
  streakCountNum: { fontSize: 28, fontWeight: '900', color: COLORS.slate900 },
  streakCountText: { fontSize: 14, fontWeight: '500', color: COLORS.slate500, marginLeft: 4 },
  streakDaysRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  streakDayCol: { alignItems: 'center', gap: 8 },
  streakIconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  streakActiveBg: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primaryBorder },
  streakInactiveBg: { backgroundColor: COLORS.slate100, borderColor: COLORS.slate200 },
  streakCurrentBg: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  streakDayLabel: { fontSize: 10, color: COLORS.slate500, fontWeight: '500' },
  
  // Nav
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
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  navItemActive: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  navText: { fontSize: 10, fontWeight: '500', color: COLORS.slate400, textTransform: 'uppercase', letterSpacing: 1 },
  navTextActive: { color: COLORS.primary, fontWeight: 'bold' },
});
