import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppBottomNav from '../components/AppBottomNav';

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
  red500: '#ef4444',
  blue500: '#3b82f6',
  amber500: '#f59e0b',
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
      <Text style={styles.headerTitle}>Quest Log</Text>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => Alert.alert('Filters', 'Filter options coming soon.', [{ text: 'OK' }])}
      >
        <MaterialIcons name="filter-list" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const QuestItem = ({ icon, title, xp, time, date, description, color }) => (
  <View style={styles.questItem}>
    <View style={styles.timelineLeft}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20', borderColor: color + '80' }]}>
        <MaterialIcons name={icon} size={20} color={color} />
      </View>
      <View style={styles.timelineLine} />
    </View>
    
    <View style={styles.questContent}>
      <View style={styles.questHeader}>
        <View>
          <Text style={styles.questTitle}>{title}</Text>
          <View style={styles.questMeta}>
            <Text style={styles.questXp}>+{xp} XP</Text>
            <Text style={styles.dot}>•</Text>
            <View style={styles.timeWrapper}>
              <MaterialIcons name="schedule" size={12} color={COLORS.slate500} />
              <Text style={styles.questTime}>{time}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.questDate}>{date}</Text>
      </View>
      
      <View style={styles.questDescriptionCard}>
        <Text style={styles.questDescription}>"{description}"</Text>
      </View>
    </View>
  </View>
);

export default function QuestLogScreen() {
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  const handleClaimReward = () => {
    Alert.alert(
      "Milestone Rewarded",
      "You claimed 500 XP to your account!",
      [{ text: "Awesome", onPress: () => setIsRewardClaimed(true) }]
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
        {/* Stats Overview */}
        <View style={styles.statsOverview}>
          <View style={styles.statsCard}>
            <View>
              <Text style={styles.statsLabel}>Total Experience</Text>
              <Text style={styles.statsValue}>12,450 XP</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.statsLabel, { color: COLORS.slate500 }]}>Quests Done</Text>
              <Text style={styles.statsValue}>42</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionTitleRow}>
          <MaterialIcons name="history" size={16} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Recent Activities</Text>
        </View>
        
        {/* Timeline List */}
        <View style={styles.timelineContainer}>
          <QuestItem 
            icon="sentiment-very-satisfied"
            title="Feature Deployment"
            xp="150"
            time="2h 15m"
            date="Today"
            description="Refactored the authentication middleware and integrated the new OAuth flow for production."
            color={COLORS.primary}
          />
          <QuestItem 
            icon="pest-control"
            title="Bug Squashing"
            xp="80"
            time="45m"
            date="Yesterday"
            description="Fixed critical memory leak in the data processing worker. High focus session."
            color={COLORS.red500}
          />
          <QuestItem 
            icon="rate-review"
            title="Code Review"
            xp="50"
            time="30m"
            date="Oct 24"
            description="Reviewed PR #452. Provided feedback on component optimization."
            color={COLORS.blue500}
          />
          <QuestItem 
            icon="description"
            title="Docs Update"
            xp="30"
            time="20m"
            date="Oct 23"
            description="Updated API documentation for the new endpoint structures."
            color={COLORS.amber500}
          />
        </View>
        
        {/* Featured Achievement Card */}
        {!isRewardClaimed && (
        <View style={styles.featuredCardWrapper}>
          <View style={styles.featuredCard}>
            <View style={styles.featuredIconBg}>
              <MaterialIcons name="military-tech" size={64} color={COLORS.primaryLight} />
            </View>
            
            <Text style={styles.featuredTag}>MILESTONE REACHED</Text>
            <Text style={styles.featuredTitle}>Focus Mastery (+500 XP)</Text>
            <Text style={styles.featuredDesc}>You maintained a "High Focus" mood for 5 consecutive days!</Text>
            
            <View style={styles.featuredFooter}>
              <View style={styles.featuredAvatars}>
                <View style={[styles.avatarCircle, { backgroundColor: COLORS.primary, zIndex: 2 }]}>
                  <MaterialIcons name="bolt" size={14} color={COLORS.white} />
                </View>
                <View style={[styles.avatarCircle, { backgroundColor: COLORS.blue500, marginLeft: -8, zIndex: 1 }]}>
                  <MaterialIcons name="auto-awesome" size={14} color={COLORS.white} />
                </View>
              </View>
              
              <TouchableOpacity style={styles.claimButton} onPress={handleClaimReward}>
                <Text style={styles.claimButtonText}>Claim Rewards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )}
        
      </ScrollView>
      <AppBottomNav activeTab="quests" />
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
    paddingBottom: 100,
  },
  statsOverview: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 16,
    padding: 16,
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.slate900,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.slate900,
  },
  timelineContainer: {
    paddingHorizontal: 16,
  },
  questItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 40,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.slate200,
    minHeight: 40,
  },
  questContent: {
    flex: 1,
    paddingBottom: 32,
    paddingTop: 4,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.slate900,
  },
  questMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  questXp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  dot: {
    fontSize: 12,
    color: COLORS.slate400,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questTime: {
    fontSize: 14,
    color: COLORS.slate500,
  },
  questDate: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.slate400,
  },
  questDescriptionCard: {
    marginTop: 12,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  questDescription: {
    fontSize: 14,
    color: COLORS.slate600,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  featuredCardWrapper: {
    padding: 16,
    marginBottom: 40,
  },
  featuredCard: {
    position: 'relative',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    padding: 16,
    overflow: 'hidden',
  },
  featuredIconBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 12,
    opacity: 0.5,
  },
  featuredTag: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.slate900,
    marginBottom: 4,
  },
  featuredDesc: {
    fontSize: 14,
    color: COLORS.slate600,
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  claimButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
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
