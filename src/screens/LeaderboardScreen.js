import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppBottomNav from '../components/AppBottomNav';
import { useAppContext } from '../context/AppContext';

const COLORS = {
  bgLight: '#f8f6f6',
  primary: '#ec5b13',
  primaryLight: 'rgba(236, 91, 19, 0.1)',
  primaryGlow: 'rgba(236, 91, 19, 0.3)',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate900: '#0f172a',
  white: '#ffffff',
  gold1: '#f59e0b', // Rank 1
  gold2: '#94a3b8', // Rank 2
  gold3: '#b45309', // Rank 3
};

const MOCK_NPC_DEVELOPERS = [
  { 
    id: 'npc1', 
    name: "CodeNinja_X", 
    level: 58, 
    xp: 28920, 
    avatarUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp2dRyR_mPw2juOwC9hBv5KQ7H5sDy3tBcbkRolaOlOOYKMRU4WqCxWwCSh5nNX8SvlruUxCI9IOx613n0QXwi_cqVM-RImHarXh-yw9V7CGzVc1G3kjsW-wT4fvm97BnGoI4RmqMOGLcdwe4JrsNJLV15RACbDQV4nmGCIiF8E8upeGePIcLcC6luWV6ChiY0h7kIjFx8OdGp0ac-3M8S371b_doxgpcUMzgNJhX9Ev5HTNGztSBdwbQOf95jzz-r-I7yxL3l6eB0" 
  },
  { 
    id: 'npc2', 
    name: "PixelPerfect", 
    level: 52, 
    xp: 24150, 
    avatarUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEy1AemtsHEMGC_5EEwdlku4Enqs739qcVVx0gPg2nJoYaa3OzpM9GXkcHmjuIrKXm8-WxG7jJh-NFXbBSDAGKp7TRUCX90ZrQwYTR0DJOdkqpEeUa0FkXlstPb0ZGj3w5TsLfGYyg2PfDZMjKhYs-bKHaVO51LAxXbrX7i9j6yIP8a75mp04qMPJoUwKUNJdUGYkNlWr3kQGWnvj5cPQRoVm3Zw_Om66cLDuXq2FBjKI8avIdUp3GWiwuK3wRMSKQ9C9llLqoSmAK" 
  },
  { 
    id: 'npc3', 
    name: "ByteMaster", 
    level: 49, 
    xp: 19800, 
    avatarUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHmarLScLkQ49a-GH1Xt1wgx0fXSJwqWph_5RGfFCM9WwEQvInBoTbN8RtNK7tnRYDQXjUmfaStYEUPLCucv0surWMGqJAORx5mS8WfCyBImQTfl8CVpn_GYwMQY54JSkTVJEjDIk5PLLSD-XvJZ3R8VuoYa77P3S4Wo3N8iaU5mR6un3-teWHd0WvLXegsthzaRiP4TdKGrSRFUs3jMm9zs6Hjc3rLBXYMS0H90iQcKL_wsTdWNf_F7qd089a5TvwDg252gccGxi7" 
  },
  { 
    id: 'npc4', 
    name: "SyntaxError", 
    level: 40, 
    xp: 14200, 
    avatarUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAot3SydT2JOBCDcY8ltjMsdpdDx0fNtW1A2W_ZNtl0VTNUcsobKz4qlDPh41OtXNtGgyNJ7Yby8MqeY1QmxPeqDy-KHPf9DVoaozhiCMSXChmLQoSujgJJcwYWVsfMTt2aEVWRr54YJfajMrEwnLP8OAFlFg6K9f9xf88Bq1_jPsR1XJFDNwje2WuXRVxAfHliukVnIM04WV0nUq4e-eDH2BCxyVnI5LckAg1wte7V89xnFWKTRzqiFnTjwGp5YJ-L7Dltpho3LaH0" 
  },
  { 
    id: 'npc5', 
    name: "CoffeeToCode", 
    level: 38, 
    xp: 12900, 
    avatarUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_S6wt2dfhAR8LAwZTiIJJ4YYgK1fD4iwV0b_L1j5_2kPM1cxgpE1fJof_Lc--l7Yt5PBoAdvljnZSSdVJ2B_58iV4XBlNdWEZIJkLSuqFpcS4MLXZxVC4rxQVweDM4tQibHRfrc0ActilPP7FQM5guVp0CxTFtWPGlh1BkWT0ubj00qhzDiKDHb-Pv2PZZR8ERCjsXCcGJ5ILWCqG_EBDG9AnLd16WKH2bsGav5I-AsmnrDtJpR2ohqM02q-AhfiwLm4I1VMyi4NR" 
  }
];

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>The Guild Leaderboard</Text>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => Alert.alert('Events', 'Current season ends in 14 days.', [{ text: 'OK' }])}
      >
        <MaterialIcons name="emoji-events" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const FilterToggle = ({ activeFilter, setActiveFilter }) => (
  <View style={styles.filterContainer}>
    <View style={styles.filterTrack}>
      <TouchableOpacity 
        style={[styles.filterButton, activeFilter === 'Weekly' && styles.filterButtonActive]}
        onPress={() => setActiveFilter('Weekly')}
      >
        <Text style={[styles.filterText, activeFilter === 'Weekly' && styles.filterTextActive]}>Weekly</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.filterButton, activeFilter === 'All-Time' && styles.filterButtonActive]}
        onPress={() => setActiveFilter('All-Time')}
      >
        <Text style={[styles.filterText, activeFilter === 'All-Time' && styles.filterTextActive]}>All-Time</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const UserHeroCard = ({ user }) => {
  if (!user) return null;
  return (
    <View style={styles.heroCardContainer}>
      <View style={styles.heroCardBadge}>
        <Text style={styles.heroCardBadgeText}>YOU</Text>
      </View>
      <View style={styles.heroAvatarWrapper}>
        <Image 
          source={{ uri: user.avatarUri }} 
          style={styles.heroAvatarImage} 
        />
        <View style={styles.heroAvatarRank}>
          <Text style={styles.heroAvatarRankText}>{user.rank}</Text>
        </View>
      </View>
      
      <View style={styles.heroInfo}>
        <Text style={styles.heroName}>{user.name}</Text>
        <View style={styles.heroTags}>
          <View style={styles.levelTag}>
            <Text style={styles.levelTagText}>Lvl {user.level}</Text>
          </View>
          <Text style={styles.glowText}>Current Dev</Text>
        </View>
      </View>
      
      <View style={styles.heroScore}>
        <Text style={styles.heroScorePoints}>{user.xp.toLocaleString()}</Text>
        <Text style={styles.heroScoreLabel}>XP POINTS</Text>
      </View>
    </View>
  );
};

const LeaderboardRow = ({ rank, name, level, score, isCurrent, avatarUri, rankColor }) => {
  const isTop3 = rank <= 3;
  return (
    <View style={[styles.leaderboardRow, isCurrent && styles.leaderboardRowCurrent]}>
      <View style={styles.rankContainer}>
        <Text style={[
          styles.rankText, 
          isTop3 && { color: rankColor, fontStyle: 'italic', fontSize: 20 },
          isCurrent && { color: COLORS.primary }
        ]}>
          {rank}
        </Text>
      </View>
      
      <Image 
        source={{ uri: avatarUri }}
        style={[styles.rowAvatar, isCurrent && { borderColor: COLORS.primary, borderWidth: 2 }]}
      />
      
      <View style={styles.rowInfo}>
        <Text style={styles.rowName}>{name}</Text>
        <Text style={[styles.rowLevel, isCurrent && { color: COLORS.primary, fontWeight: '600' }]}>
          Level {level}
        </Text>
      </View>
      
      <View style={styles.rowScoreContainer}>
        <Text style={styles.rowScore}>{score}</Text>
        <Text style={styles.rowScoreUnit}>XP</Text>
      </View>
    </View>
  );
};

export default function LeaderboardScreen() {
  const [activeFilter, setActiveFilter] = useState('Weekly');
  const { xp, level } = useAppContext();
  
  const leaderboardData = useMemo(() => {
    const currentUser = {
      id: 'current_user',
      name: "You (Dev)",
      level: level,
      xp: xp,
      isCurrent: true,
      avatarUri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTJk200aHQXyyghEimT60g9U3Xtmr-EeXmnSQWhbObKTlDOn0P5CM5AQli4TqevQqhwsPPupExfr74rXC5fq5jNC7BHu8bZ2B9hhIIKCdPIMnNnnsulwFYu2FsyiF0fRUqc5cO14b6YVjLLLYAyw-tVKE2aBFb78AHF2Rqah8BdOvCvIAmHY-yjl3PLNSyBKn1t3p_Z2caQaX-WfU-hXoB-6PCk-NmfGD6IoyfQnF7ng7Jl9Alb3jL9dTgWHQ2NjWLDarOQPA0c-Yr"
    };

    // Combine mock data + current user, and sort by descending XP
    const combined = [...MOCK_NPC_DEVELOPERS, currentUser].sort((a, b) => b.xp - a.xp);
    
    // Assign ranks
    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }, [xp, level]);
  
  const currentUserEntry = leaderboardData.find(d => d.isCurrent);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLight} />
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FilterToggle activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        <UserHeroCard user={currentUserEntry} />
        
        <Text style={styles.sectionTitle}>Top Mood Architects</Text>
        
        <View style={styles.listContainer}>
          {leaderboardData.map((d) => (
            <LeaderboardRow
              key={d.id}
              rank={d.rank}
              name={d.name}
              level={d.level}
              score={d.xp.toLocaleString()}
              rankColor={d.rank === 1 ? COLORS.gold1 : d.rank === 2 ? COLORS.gold2 : d.rank === 3 ? COLORS.gold3 : undefined}
              avatarUri={d.avatarUri}
              isCurrent={d.isCurrent}
            />
          ))}
        </View>
        
        {/* Fill empty space at bottom so scroll doesn't hide behind absolute nav */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      <AppBottomNav activeTab="leaderboard" />
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
    paddingVertical: 16,
    backgroundColor: COLORS.bgLight,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(236, 91, 19, 0.1)',
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.slate900,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  filterTrack: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  heroCardContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow to replicate "glow-effect" class in HTML
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(236, 91, 19, 0.5)',
  },
  heroCardBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 16,
  },
  heroCardBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroAvatarWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  heroAvatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  heroAvatarRank: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroAvatarRankText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  heroName: {
    color: COLORS.slate900,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelTagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  glowText: {
    color: COLORS.slate400,
    fontSize: 12,
  },
  heroScore: {
    alignItems: 'flex-end',
  },
  heroScorePoints: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  heroScoreLabel: {
    color: COLORS.slate400,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  sectionTitle: {
    color: COLORS.slate900,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 4,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.slate100,
    gap: 16,
  },
  leaderboardRowCurrent: {
    backgroundColor: COLORS.primaryLight,
    borderColor: 'rgba(236, 91, 19, 0.2)',
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.slate400,
  },
  rowAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    color: COLORS.slate900,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowLevel: {
    color: COLORS.slate400,
    fontSize: 12,
  },
  rowScoreContainer: {
    alignItems: 'flex-end',
  },
  rowScore: {
    color: COLORS.slate900,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowScoreUnit: {
    color: COLORS.slate400,
    fontSize: 10,
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
    borderTopColor: COLORS.slate100,
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
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.slate500,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  navTextActive: {
    color: COLORS.primary,
  }
});
