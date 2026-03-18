import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  bgLight: '#f8f6f6',
  primary: '#ec5b13',
  white: '#ffffff',
  slate200: '#e2e8f0',
  slate500: '#64748b',
  slate900: '#0f172a',
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
      <Text style={styles.headerTitle}>About</Text>
      <View style={styles.headerButton} />
    </View>
  );
};

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgLight} />
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>&lt;DEVMOOD/&gt;</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.aboutText}>
            DevMood is your personal developer journal and mood tracker built to boost 
            your coding sessions through gamification. Log your flow states, survive 
            debugging hell, and level up your developer journey.
          </Text>
        </View>

        <View style={styles.linksGroup}>
          <TouchableOpacity style={styles.linkRow}>
            <MaterialIcons name="privacy-tip" size={24} color={COLORS.primary} style={styles.linkIcon} />
            <Text style={styles.linkText}>Privacy Policy</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.slate500} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <MaterialIcons name="description" size={24} color={COLORS.primary} style={styles.linkIcon} />
            <Text style={styles.linkText}>Terms of Service</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.slate500} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.linkRow, styles.lastRow]}>
            <MaterialIcons name="code" size={24} color={COLORS.primary} style={styles.linkIcon} />
            <Text style={styles.linkText}>Open Source Licenses</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.slate500} />
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
  scrollContent: { padding: 24 },
  logoContainer: { alignItems: 'center', marginVertical: 32 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: COLORS.slate900, marginBottom: 8 },
  versionText: { fontSize: 14, color: COLORS.slate500, fontWeight: '600' },
  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20, marginBottom: 32, borderWidth: 1, borderColor: COLORS.slate200 },
  aboutText: { fontSize: 16, color: COLORS.slate900, lineHeight: 24, textAlign: 'center' },
  linksGroup: { backgroundColor: COLORS.white, borderRadius: 16, borderWidth: 1, borderColor: COLORS.slate200, overflow: 'hidden' },
  linkRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.slate200 },
  lastRow: { borderBottomWidth: 0 },
  linkIcon: { marginRight: 16 },
  linkText: { flex: 1, fontSize: 16, color: COLORS.slate900, fontWeight: '500' },
});
