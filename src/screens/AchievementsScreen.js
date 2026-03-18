import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppBottomNav from '../components/AppBottomNav';
import { useAppContext } from '../context/AppContext';
import { ACHIEVEMENTS } from '../utils/gameRules';

const { width } = Dimensions.get('window');

const COLORS = {
  bgDark: '#f8f6f6',
  cardDark: '#ffffff',
  primary: '#ec5b13',
  secondary: '#f97316',
  neonCyan: '#ec5b13',
  textMuted: '#94a3b8',
  emerald: '#10b981',
  blue: '#3b82f6',
  orange: '#f97316',
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.neonCyan} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>ACHIEVEMENTS</Text>
      <MaterialIcons name="military-tech" size={32} color={COLORS.neonCyan} style={styles.headerIcon} />
    </View>
  );
};

const ProgressCard = ({ level, unlockedCount, totalCount }) => (
  <View style={styles.progressCardContainer}>
    <View style={styles.blurGlowPrimary} />
    <View style={styles.blurGlowCyan} />
    
    <View style={styles.progressCardContent}>
      <View style={styles.progressHeaderRow}>
        <View>
          <Text style={styles.progressLevelText}>LEVEL {level} DEVELOPER</Text>
          <Text style={styles.progressTitle}>Code Architect</Text>
        </View>
        <Text style={styles.progressValue}>
          {unlockedCount}<Text style={styles.progressTotal}>/{totalCount}</Text>
        </Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary, COLORS.neonCyan]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarGlow, { width: `${(unlockedCount / totalCount) * 100 || 0}%` }]}
        />
      </View>
      
      <Text style={styles.progressFooter}>
        Earn <Text style={{ color: COLORS.neonCyan }}>{totalCount - unlockedCount} more badges</Text> to reach the next rank
      </Text>
    </View>
  </View>
);

const BadgeCard = ({ emoji, title, subtitle, colors, unlocked = true }) => {
  if (!unlocked) {
    return (
      <View style={[styles.badgeCard, styles.badgeCardLocked]}>
        <View style={[styles.badgeIconContainer, { backgroundColor: '#f1f5f9' }]}>
          <Text style={[styles.emojiText, { opacity: 0.3 }]}>{emoji}</Text>
        </View>
        <Text style={styles.badgeTitle}>{title}</Text>
        <Text style={styles.badgeSubtitle} numberOfLines={2}>{subtitle}</Text>
        <View style={styles.badgeProgressBgLocked}>
          <View style={[styles.badgeProgressBar, { backgroundColor: '#e2e8f0', width: '85%' }]} />
        </View>
        <View style={styles.lockedTag}>
          <MaterialIcons name="lock" size={10} color={COLORS.textMuted} />
          <Text style={styles.lockedTagText}>LOCKED</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.badgeCard}>
      <LinearGradient
        colors={[colors[0] + '33', colors[1] + '33']}
        style={styles.badgeIconContainer}
      >
        <Text style={styles.emojiText}>{emoji}</Text>
      </LinearGradient>
      <Text style={styles.badgeTitle}>{title}</Text>
      <Text style={styles.badgeSubtitle} numberOfLines={2}>{subtitle}</Text>
      
      <View style={styles.badgeProgressBg}>
        <View style={[styles.badgeProgressBar, { backgroundColor: colors[0], shadowColor: colors[0], width: '100%' }]} />
      </View>
      
      <View style={[styles.unlockedTag, { backgroundColor: colors[0] + '1A', borderColor: colors[0] + '33' }]}>
        <Text style={[styles.unlockedTagText, { color: colors[0] }]}>UNLOCKED</Text>
      </View>
    </View>
  );
};

export default function AchievementsScreen() {
  const { achievements, level } = useAppContext();
  
  const allAchievements = Object.values(ACHIEVEMENTS);
  const totalCount = allAchievements.length;
  
  const unlockedList = allAchievements.filter(a => achievements.includes(a.id));
  const lockedList = allAchievements.filter(a => !achievements.includes(a.id));

  // Determine colors sequentially for unlocked badges to keep it looking cool
  const badgeColors = [
    [COLORS.primary, COLORS.secondary],
    [COLORS.emerald, '#0f766e'],
    [COLORS.blue, '#4338ca'],
    [COLORS.orange, '#b91c1c'],
    ['#8b5cf6', '#6d28d9']
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgDark} />
      
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressCard level={level} unlockedCount={unlockedList.length} totalCount={totalCount} />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>UNLOCKED</Text>
          <View style={styles.badgeCounter}>
            <Text style={styles.badgeCounterText}>{unlockedList.length} EARNED</Text>
          </View>
        </View>
        
        <View style={styles.grid}>
          {unlockedList.length === 0 && (
            <Text style={{ color: COLORS.textMuted, marginVertical: 10 }}>No achievements unlocked yet.</Text>
          )}
          {unlockedList.map((a, idx) => (
            <BadgeCard
              key={a.id}
              emoji={a.emoji}
              title={a.title}
              subtitle={a.description}
              colors={badgeColors[idx % badgeColors.length]}
              unlocked={true}
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LOCKED</Text>
          <View style={styles.lockedCounter}>
            <Text style={styles.lockedCounterText}>{lockedList.length} LOCKED</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {lockedList.map(a => (
            <BadgeCard
              key={a.id}
              emoji={a.emoji}
              title={a.title}
              subtitle={a.description}
              unlocked={false}
            />
          ))}
        </View>
        
        {/* Extra padding for bottom nav */}
        <View style={{ height: 40 }} />
      </ScrollView>

      <AppBottomNav activeTab="stats" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(248, 246, 246, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a', 
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerIcon: {
    textShadowColor: 'rgba(236, 91, 19, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  progressCardContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 24,
    marginBottom: 32,
    overflow: 'hidden',
  },
  blurGlowPrimary: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(236, 91, 19, 0.1)',
  },
  blurGlowCyan: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(236, 91, 19, 0.1)',
  },
  progressCardContent: {
    position: 'relative',
    zIndex: 1,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  progressLevelText: {
    color: COLORS.neonCyan,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 4,
  },
  progressTitle: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressValue: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressTotal: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: 'normal',
  },
  progressBarContainer: {
    height: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressBarGlow: {
    height: '100%',
    borderRadius: 8,
  },
  progressFooter: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  badgeCounter: {
    backgroundColor: 'rgba(236, 91, 19, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(236, 91, 19, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeCounterText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  lockedCounter: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lockedCounterText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  badgeCard: {
    width: (width - 48) / 2, // 2 cols with gap
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 16,
  },
  badgeCardLocked: {
    backgroundColor: '#f1f5f9',
    borderStyle: 'dashed',
    opacity: 0.6,
  },
  badgeIconContainer: {
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emojiText: {
    fontSize: 48,
  },
  badgeTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  badgeSubtitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 12,
    height: 32,
  },
  badgeProgressBg: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  badgeProgressBgLocked: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  badgeProgressBar: {
    height: '100%',
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  unlockedTag: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  unlockedTagText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  lockedTag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  lockedTagText: {
    color: COLORS.textMuted,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 246, 246, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 12,
    paddingBottom: 24, // Safe area
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconActive: {
    textShadowColor: 'rgba(236, 91, 19, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  navDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 10,
    height: 10,
    backgroundColor: COLORS.neonCyan,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.bgDark,
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  navTextActive: {
    color: '#0f172a',
  }
});
