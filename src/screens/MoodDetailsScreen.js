import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppBottomNav from '../components/AppBottomNav';
import { useAppContext } from '../context/AppContext';

const COLORS = {
  bgDark: '#f8f6f6', // Changed to light background
  primary: '#ec5b13',
  primaryLight: 'rgba(236, 91, 19, 0.1)',
  primaryBorder: 'rgba(236, 91, 19, 0.3)',
  slate800: '#ffffff', // Lightened card backgrounds
  slate700: '#e2e8f0', // Lightened borders
  slate600: '#cbd5e1',
  slate500: '#64748b',
  slate400: '#64748b',
  slate300: '#0f172a',
  slate200: '#0f172a', // Darkened text
  slate100: '#0f172a', // Header and primary texts
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.slate100} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Mood Details</Text>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => Alert.alert('Options', 'Draft saved. No further options available right now.', [{ text: 'OK' }])}
      >
        <MaterialIcons name="more-vert" size={24} color={COLORS.slate100} />
      </TouchableOpacity>
    </View>
  );
};

const getMoodDetails = (moodLabel) => {
  switch (moodLabel) {
    case 'Productive': return { emoji: '😀', subtitle: "Getting things done efficiently." };
    case 'Motivated': return { emoji: '🔥', subtitle: "Ready to conquer the codebase." };
    case 'Flow State': return { emoji: '😎', subtitle: "You're in the zone. Let's capture it." };
    case 'Debugging Hell': return { emoji: '🤯', subtitle: "Stay strong, you'll find the bug." };
    case 'Tired': return { emoji: '😴', subtitle: "Time to rest or grab a coffee." };
    default: return { emoji: '🤔', subtitle: "Log your current status." };
  }
};

export default function MoodDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { xp, addXP, addDailyEntry } = useAppContext() || {};

  const [activeTags, setActiveTags] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [questText, setQuestText] = useState('');

  // default if no param is available
  const moodParam = route?.params?.mood || 'Flow State';
  const details = getMoodDetails(moodParam);

  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleCommitMood = () => {
    if (timerRunning) {
      setTimerRunning(false);
    }
    Alert.alert(
      "Mood Committed!", 
      `You recorded a ${moodParam} session.\nXP + 10!`,
      [{ text: "Awesome", onPress: () => navigation.navigate("Home") }]
    );
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds(sec => sec + 1);
      }, 1000);
    } else if (!timerRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgDark} />
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header />
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.heroSection}>
            <View style={[styles.emojiContainer, styles.cardGlow]}>
              <Text style={styles.emojiText}>{details.emoji}</Text>
            </View>
            <Text style={styles.heroTitle}>{moodParam}</Text>
            <Text style={styles.heroSubtitle}>{details.subtitle}</Text>
          </View>

          {/* Quest Input */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>LOG YOUR CURRENT QUEST</Text>
            <View style={[styles.inputContainer, styles.cardGlow]}>
              <TextInput
                style={styles.textInput}
                placeholder="What are you coding right now? (e.g., Refactoring the auth module)"
                placeholderTextColor={COLORS.slate500}
                value={questText}
                onChangeText={setQuestText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Session Timer Component */}
          <View style={styles.sectionContainer}>
            <View style={[styles.timerCard, styles.cardGlow]}>
              <Text style={styles.timerSubtitle}>SESSION TIMER</Text>
              <Text style={styles.timerText}>{formatTime(seconds)}</Text>
              
              <View style={styles.timerButtonsRow}>
                <TouchableOpacity 
                  style={styles.pauseButton}
                  onPress={() => setTimerRunning(!timerRunning)}
                >
                  <MaterialIcons 
                    name={timerRunning ? "pause" : "play-arrow"} 
                    size={20} 
                    color={COLORS.slate300} 
                  />
                  <Text style={[styles.timerButtonText, { color: COLORS.slate300 }]}>
                    {timerRunning ? "Pause" : "Play"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.stopButton}
                  onPress={() => {
                    setTimerRunning(false);
                    setSeconds(0);
                  }}
                >
                  <MaterialIcons name="stop" size={20} color="#fff" />
                  <Text style={[styles.timerButtonText, { color: '#fff' }]}>Stop</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Mood Modifiers */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>MOOD MODIFIERS</Text>
            <View style={styles.tagsContainer}>
              {['#deepwork', '#coffee', '#zen', '#lofi', '#bugfixing', '#refactor'].map(tag => {
                const isActive = activeTags.includes(tag);
                return (
                  <TouchableOpacity 
                    key={tag}
                    style={isActive ? styles.tagActive : styles.tagDefault}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text style={isActive ? styles.tagActiveText : styles.tagDefaultText}>{tag}</Text>
                    {isActive && <MaterialIcons name="close" size={12} color={COLORS.primary} style={{ marginLeft: 4 }} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleCommitMood}>
              <LinearGradient
                colors={['#ec5b13', '#f97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.commitButton}
              >
                <MaterialIcons name="check-circle" size={24} color="#fff" />
                <Text style={styles.commitButtonText}>Commit Mood</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.actionFooterText}>
              YOUR MOOD WILL BE LOGGED TO YOUR PERSONAL DEV-JOURNAL
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <AppBottomNav activeTab="mood" />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.slate100,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  cardGlow: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  heroSection: {
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  emojiContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emojiText: {
    fontSize: 60,
  },
  heroTitle: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    color: COLORS.slate400,
    fontSize: 16,
    marginTop: 4,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: COLORS.slate200,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.slate700,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  textInput: {
    color: COLORS.slate100,
    fontSize: 16,
    minHeight: 128,
    padding: 16,
  },
  timerCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.slate700,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  timerSubtitle: {
    color: COLORS.slate400,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timerText: {
    fontSize: 48,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: 4,
    marginVertical: 8,
  },
  timerButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginTop: 8,
  },
  pauseButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.slate700,
    paddingVertical: 12,
    borderRadius: 12,
  },
  stopButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  timerButtonText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagDefault: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.slate800,
    borderWidth: 1,
    borderColor: COLORS.slate700,
  },
  tagDefaultText: {
    color: COLORS.slate300,
    fontSize: 14,
    fontWeight: '500',
  },
  tagActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(236, 91, 19, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(236, 91, 19, 0.4)',
  },
  tagActiveText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  tagAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.slate800,
    borderWidth: 1,
    borderColor: COLORS.slate600,
    borderStyle: 'dashed',
    gap: 4,
  },
  tagAddText: {
    color: COLORS.slate500,
    fontSize: 14,
    fontWeight: '500',
  },
  actionContainer: {
    marginTop: 'auto',
    padding: 24,
    paddingBottom: 40,
  },
  commitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  commitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionFooterText: {
    textAlign: 'center',
    color: COLORS.slate500,
    fontSize: 12,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  }
});
