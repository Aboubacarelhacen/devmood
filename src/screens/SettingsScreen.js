import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const COLORS = {
  bgLight: '#f8f6f6',
  primary: '#ec5b13',
  primaryLight: 'rgba(236, 91, 19, 0.1)',
  white: '#ffffff',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate800: '#1e293b',
  slate900: '#0f172a',
  red500: '#ef4444',
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.slate900} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Settings</Text>
      <View style={styles.headerButton} />
    </View>
  );
};

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLight} />
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              trackColor={{ false: COLORS.slate200, true: COLORS.primaryLight }}
              thumbColor={notifications ? COLORS.primary : COLORS.white}
              onValueChange={setNotifications}
              value={notifications}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Daily Reflection Reminders</Text>
            <Switch
              trackColor={{ false: COLORS.slate200, true: COLORS.primaryLight }}
              thumbColor={dailyReminders ? COLORS.primary : COLORS.white}
              onValueChange={setDailyReminders}
              value={dailyReminders}
            />
          </View>
          <View style={[styles.settingRow, styles.lastRow]}>
            <Text style={styles.settingText}>Sound Effects & Haptics</Text>
            <Switch
              trackColor={{ false: COLORS.slate200, true: COLORS.primaryLight }}
              thumbColor={soundEffects ? COLORS.primary : COLORS.white}
              onValueChange={setSoundEffects}
              value={soundEffects}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingActionRow}>
            <Text style={styles.settingText}>Manage Subscription</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.slate400} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingActionRow}>
            <Text style={styles.settingText}>Export Data</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.slate400} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingActionRow, styles.lastRow]}>
            <Text style={[styles.settingText, { color: COLORS.red500 }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bgLight },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
    borderBottomColor: COLORS.slate200,
  },
  headerButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.slate900 },
  scrollContent: { padding: 16 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: COLORS.slate500, letterSpacing: 1, marginBottom: 8, paddingHorizontal: 4, marginTop: 16 },
  settingsGroup: { backgroundColor: COLORS.white, borderRadius: 16, borderWidth: 1, borderColor: COLORS.slate200, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.slate200 },
  settingActionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.slate200 },
  lastRow: { borderBottomWidth: 0 },
  settingText: { fontSize: 16, color: COLORS.slate900, fontWeight: '500' },
});
