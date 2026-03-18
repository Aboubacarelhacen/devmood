import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import AppBottomNav from '../components/AppBottomNav';
import { calculateXPProgress } from '../utils/xpCalculator';

const COLORS = {
  bg: '#f8f6f6',
  card: '#ffffff',
  gold: '#ec5b13', // Replaced gold with primary orange
  goldLight: '#f9d978',
  border: '#e2e8f0', // Lighter border
  success: '#10b981',
  accent: '#ec5b13',
  orange: '#ec5b13',
  purple: '#8b5cf6',
  green: '#10b981',
  yellow: '#f59e0b',
  text: '#0f172a',
  textMuted: '#64748b'
};

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.logoText}>&lt;DEVMOOD/&gt;</Text>
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarBorder}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB05-DClQDKmmdlCanlWZ3tew6y75f7yHarqmPh0lthttXwbM2fb0JuGMULUuKCg0ViFPWxHRl5IaIa_8keeTL0ipyGweWxuqUR1RF9-lN2yW7hHqQNGdky81z-UsaPjwSTK7LF6t-7YK9U-kk8cBpK4g5V4x5LkIIkEFHedVAeW7EHeq6tUgPtgYPmWb_t2-dPQoxwgx1ZJuTu87ToR7Kertbe4ixCc5Bql2gaKft022nz9PbO0ewy3VKl4ESgutmFxIMLRhsXxX6H',
          }}
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.statusDot} />
    </View>
  </View>
);

const LevelCard = ({ level, xp, nextThreshold, progressPercentage }) => {
  const dashArray = 226;
  const dashOffset = dashArray - (dashArray * (progressPercentage / 100));
  
  return (
  <View style={[styles.rpgBorder, styles.statCard]}>
    <View style={styles.ringContainer}>
      <Svg width="80" height="80" viewBox="0 0 80 80">
        <Circle cx="40" cy="40" r="36" stroke={COLORS.border} strokeWidth="6" fill="transparent" />
        <Circle
          cx="40"
          cy="40"
          r="36"
          stroke={COLORS.gold}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray="226"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </Svg>
      <View style={styles.ringValueContainer}>
        <Text style={styles.levelValue}>{level}</Text>
      </View>
    </View>
    <Text style={styles.statLabel}>LEVEL {level}</Text>
    <Text style={styles.statSubText}>{xp}/{nextThreshold} XP</Text>
  </View>
  );
};

const StreakCard = ({ streak }) => (
  <View style={[styles.rpgBorder, styles.statCard]}>
    <Text style={styles.fireEmoji}>🔥</Text>
    <Text style={styles.streakValue}>{streak}</Text>
    <Text style={styles.statLabel}>DAY STREAK</Text>
    <View style={styles.dotsContainer}>
      <View style={styles.dotGold} />
      <View style={styles.dotGold} />
      <View style={styles.dotGold} />
      <View style={styles.dotGrey} />
    </View>
  </View>
);

const getMoodDetails = (moodLabel) => {
  switch (moodLabel) {
    case 'Productive': return { emoji: '😀', tag1: '#clean_code', tag2: '#solid' };
    case 'Motivated': return { emoji: '🔥', tag1: '#push_limits', tag2: '#lets_go' };
    case 'Flow State': return { emoji: '😎', tag1: '#deep_work', tag2: '#zero_bugs' };
    case 'Debugging Hell': return { emoji: '🤯', tag1: '#try_catch', tag2: '#pain' };
    case 'Tired': return { emoji: '😴', tag1: '#need_coffee', tag2: '#reboot' };
    default: return { emoji: '🤔', tag1: '#waiting', tag2: '#idle' };
  }
};

const CurrentStateCard = ({ moodLabel }) => {
  const details = getMoodDetails(moodLabel);
  return (
  <View style={[styles.rpgBorder, styles.stateCard]}>
    <View style={styles.stateRow}>
      <Text style={styles.sunglassesEmoji}>{details.emoji}</Text>
      <View style={styles.stateContent}>
        <Text style={styles.stateSubText}>CURRENT_STATE =</Text>
        <Text style={styles.stateTitle}>{moodLabel !== 'No mood selected yet' ? moodLabel : 'Pending...'}</Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={[styles.tagText, { color: COLORS.accent }]}>{details.tag1}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={[styles.tagText, { color: COLORS.success }]}>{details.tag2}</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.stateCardCorner} />
  </View>
  );
};

const VibeCard = ({ title, status, bgColor, imgUri, onPress }) => (
  <TouchableOpacity activeOpacity={0.9} style={[styles.vibeCard, { backgroundColor: bgColor }]} onPress={onPress}>
    <View style={styles.vibeContent}>
      <Text style={styles.vibeTitle}>{title}</Text>
      <Text style={styles.vibeStatus}>STATUS: {status}</Text>
    </View>
    <View style={styles.vibeIconWrapper}>
      <Image source={{ uri: imgUri }} style={styles.vibeImage} />
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const { xp, level, streak, selectedMood, updateMood } = useAppContext();
  const progressDetails = calculateXPProgress(xp);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <View style={styles.scanline} pointerEvents="none" />
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={styles.halfWidth}>
            <LevelCard 
              level={level} 
              xp={xp} 
              nextThreshold={progressDetails.nextThreshold} 
              progressPercentage={progressDetails.progressPercentage} 
            />
          </View>
          <View style={styles.halfWidth}>
            <StreakCard streak={streak} />
          </View>
        </View>

        <CurrentStateCard moodLabel={selectedMood} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHOOSE YOUR VIBE</Text>
          <Text style={styles.sectionQuest}>QUEST: START_VIBING</Text>
        </View>

        <View style={styles.vibeList}>
          <VibeCard
            title="Flow State"
            status="DEEP_WORK"
            bgColor="#0ea5e9" // A nice blue for Flow State
            // Default placeholder image or a known flow one? We can just reuse green's for now or standard placeholder.
            // Using a generic placeholder illustration since we don't have a new url
            imgUri="https://lh3.googleusercontent.com/aida-public/AB6AXuBN1KpNbRRv5d8UQeG-8V0aDc-2HG0ORkxPd5yoqHl2ydqOTzTtGNz9zOlxweT2MyyLm_R9sTM9eEJ5yw0a-W1NGGlXB6HRU5iDcNUle4lXxAfvI_DaXHsYyB_LEOm_O54vYOo4Km_H9CwOc-Gku7FQUwlwPiz6AZJZGLoV1VVKJFsbP5D2fOyPvP5dQi9MTBS9PJ503u5VNrQ0bMG_3_Cbkmp23-CJnub_KApVpe5JpsiMDDuA6xQVaJISIL0kLNTmQ9Ueak9w7lL0"
            onPress={() => updateMood('flow_state')}
          />
          <VibeCard
            title="Productive"
            status="CLEAN_CODE"
            bgColor={COLORS.green}
            imgUri="https://lh3.googleusercontent.com/aida-public/AB6AXuBN1KpNbRRv5d8UQeG-8V0aDc-2HG0ORkxPd5yoqHl2ydqOTzTtGNz9zOlxweT2MyyLm_R9sTM9eEJ5yw0a-W1NGGlXB6HRU5iDcNUle4lXxAfvI_DaXHsYyB_LEOm_O54vYOo4Km_H9CwOc-Gku7FQUwlwPiz6AZJZGLoV1VVKJFsbP5D2fOyPvP5dQi9MTBS9PJ503u5VNrQ0bMG_3_Cbkmp23-CJnub_KApVpe5JpsiMDDuA6xQVaJISIL0kLNTmQ9Ueak9w7lL0"
            onPress={() => updateMood('productive')}
          />
          <VibeCard
            title="Motivated"
            status="PUSH_LIMITS"
            bgColor={COLORS.orange}
            imgUri="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBbH7IbjMCqJd9UTk3gR8U1bpM4hqdVR1O-Z6urELqXeXf2GvHERYZa44D4oJcbXsDeSf-KlYaSnVRVFbsU4vW-bktjkwxa6jAPTUmQQcP0bhv2MK13rHyB9O1aq5WekUNgOrrJdvEKiBFe02D9qKc8YTDlL1ybxxcAYdBfqpstJxWlyWh15v3wAsgzhqU44cFGEo4ZzQF51ivgcrbPCdb9LUQFtHXNcYFACntWcHX9eZ_wsSK4xPSwvdSOg49D67b02d4TpHg4ou"
            onPress={() => updateMood('motivated')}
          />
          <VibeCard
            title="Debugging Hell"
            status="TRY_CATCH_PAIN"
            bgColor={COLORS.purple}
            imgUri="https://lh3.googleusercontent.com/aida-public/AB6AXuDlw_GODLoNTsAzmj3IcnIOl8VA5J1xT-YA9iTWaJ6CYgj9MlrUtRgeUpmHuF8mJiyb-mFelsthQxvq8ngeQvhx3V4XSXWlN6xKVn6Gi3d-RwarWl62QxAprk4qQZ_4PER7FEEn-ZqrwtmMoGd4XLmnJ9UgRzEdChVV8-9FfxFec4y9EjLWacTUj0yNq3PFoiB0e3jREJlFxaFU2IQztN3WVxtrmwgrsfx0anAUz2QZKzxdj68tH5JHrSfSBqMkkrnaILJGQ-Xq-TWB"
            onPress={() => updateMood('debugging_hell')}
          />
          <VibeCard
            title="Tired"
            status="REBOOT_NEEDED"
            bgColor={COLORS.yellow}
            imgUri="https://lh3.googleusercontent.com/aida-public/AB6AXuCZxOIZEB3C3uMkgFL7qWkOr5L2ytHEfKBEyh-MDH6se8Yk7pKUwL0m94PJnZ55PRMpETaINIvhKX-vnzcfA8EvE5kt2gpsoytiZjztXNE43Tbd8SXVMahxx8yLbFpOxavJFxLl7aUU7r3oirIEq1rUTOqXK7W9bOj3jNRlBg4PmV_Foly9IuDoFOVN05yfmqno8EyOsmRTI_yAPH4oJxyPy3FAqJMzm1V_nco5dtJHkEqB1dZa3O1NM62_2wOH2i2dwaFn14OvFNnz"
            onPress={() => updateMood('tired')}
          />
        </View>
      </ScrollView>

      <AppBottomNav activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scanline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.02)',
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: 'rgba(248, 246, 246, 0.95)',
    zIndex: 10,
  },
  logoText: {
    color: '#0f172a',
    fontSize: 24,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarBorder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.gold,
    padding: 2,
    backgroundColor: COLORS.card,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.bg,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  rpgBorder: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  statCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  ringValueContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelValue: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statSubText: {
    color: COLORS.gold,
    fontSize: 12,
    marginTop: 4,
  },
  fireEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  streakValue: {
    color: '#f97316',
    fontSize: 28,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    columnGap: 4,
  },
  dotGold: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },
  dotGrey: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  stateCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sunglassesEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  stateContent: {
    flex: 1,
  },
  stateSubText: {
    color: COLORS.gold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.8,
  },
  stateTitle: {
    color: '#0f172a',
    fontSize: 32,
    marginBottom: 12,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
  },
  stateCardCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderBottomRightRadius: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  sectionQuest: {
    color: 'rgba(212, 175, 55, 0.5)',
    fontSize: 10,
  },
  vibeList: {
    gap: 16,
  },
  vibeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  vibeContent: {
    flex: 1,
  },
  vibeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  vibeStatus: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  vibeIconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#0f172a',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '3deg' }],
  },
  vibeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appStoreNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingTop: 10,
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});
