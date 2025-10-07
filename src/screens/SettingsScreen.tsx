import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { SettingsIcon, BackIcon } from '../components/icons';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const [settings, setSettings] = useState({
    notifications: true,
    audioDescriptions: true,
    darkMode: false,
    autoPlay: false,
    language: 'fr',
    fontSize: 'medium',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    type = 'toggle', 
    value, 
    onValueChange,
    onPress,
    icon 
  }: {
    title: string;
    subtitle?: string;
    type?: 'toggle' | 'button' | 'select';
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
    icon?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={type === 'toggle'}
    >
      <View style={styles.settingContent}>
        {icon && <View style={styles.settingIcon}>{icon}</View>}
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.neutral.gray[300], true: colors.primary[200] }}
          thumbColor={value ? colors.primary[500] : colors.neutral.gray[100]}
        />
      )}
      {type === 'button' && (
        <Text style={styles.settingArrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  const LanguageOption = ({ code, name }: { code: string; name: string }) => (
    <TouchableOpacity
      style={[
        styles.languageOption,
        settings.language === code && styles.languageOptionActive
      ]}
      onPress={() => handleSettingChange('language', code)}
    >
      <Text style={[
        styles.languageText,
        settings.language === code && styles.languageTextActive
      ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const FontSizeOption = ({ size, label }: { size: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.fontSizeOption,
        settings.fontSize === size && styles.fontSizeOptionActive
      ]}
      onPress={() => handleSettingChange('fontSize', size)}
    >
      <Text style={[
        styles.fontSizeText,
        settings.fontSize === size && styles.fontSizeTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>M</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Medoune</Text>
            <Text style={styles.profileEmail}>medoune@museum.com</Text>
          </View>
        </View>
      </View>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            title="Notifications"
            subtitle="Get updates about new artifacts"
            type="toggle"
            value={settings.notifications}
            onValueChange={(value) => handleSettingChange('notifications', value)}
          />
          <SettingItem
            title="Audio Descriptions"
            subtitle="Enable voice descriptions for artifacts"
            type="toggle"
            value={settings.audioDescriptions}
            onValueChange={(value) => handleSettingChange('audioDescriptions', value)}
          />
          <SettingItem
            title="Dark Mode"
            subtitle="Switch to dark theme"
            type="toggle"
            value={settings.darkMode}
            onValueChange={(value) => handleSettingChange('darkMode', value)}
          />
          <SettingItem
            title="Auto Play"
            subtitle="Automatically play audio guides"
            type="toggle"
            value={settings.autoPlay}
            onValueChange={(value) => handleSettingChange('autoPlay', value)}
          />
        </View>
      </View>

      {/* Language Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.languageGrid}>
            <LanguageOption code="fr" name="Français" />
            <LanguageOption code="en" name="English" />
            <LanguageOption code="wolof" name="Wolof" />
          </View>
        </View>
      </View>

      {/* Font Size */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Size</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.fontSizeGrid}>
            <FontSizeOption size="small" label="Small" />
            <FontSizeOption size="medium" label="Medium" />
            <FontSizeOption size="large" label="Large" />
          </View>
        </View>
      </View>

      {/* Data & Storage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Storage</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            title="Clear Cache"
            subtitle="Free up storage space"
            type="button"
            onPress={() => Alert.alert('Cache Cleared', 'Storage space has been freed up.')}
          />
          <SettingItem
            title="Download Offline Content"
            subtitle="Download artifacts for offline viewing"
            type="button"
            onPress={() => Alert.alert('Download', 'Starting offline content download...')}
          />
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            title="App Version"
            subtitle="1.0.0"
            type="button"
          />
          <SettingItem
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            type="button"
            onPress={() => Alert.alert('Terms', 'Terms of Service would open here.')}
          />
          <SettingItem
            title="Privacy Policy"
            subtitle="How we protect your data"
            type="button"
            onPress={() => Alert.alert('Privacy', 'Privacy Policy would open here.')}
          />
        </View>
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[16],
    paddingBottom: spacing[4],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.neutral.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  section: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  profileInitial: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  settingsGroup: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray[100],
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 24,
    height: 24,
    marginRight: spacing[3],
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  settingSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  settingArrow: {
    fontSize: typography.fontSize.xl,
    color: colors.text.tertiary,
    fontWeight: typography.fontWeight.bold,
  },
  languageGrid: {
    flexDirection: 'row',
    padding: spacing[2],
    gap: spacing[2],
  },
  languageOption: {
    flex: 1,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.gray[100],
    alignItems: 'center',
  },
  languageOptionActive: {
    backgroundColor: colors.primary[500],
  },
  languageText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  languageTextActive: {
    color: colors.neutral.white,
  },
  fontSizeGrid: {
    flexDirection: 'row',
    padding: spacing[2],
    gap: spacing[2],
  },
  fontSizeOption: {
    flex: 1,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.gray[100],
    alignItems: 'center',
  },
  fontSizeOptionActive: {
    backgroundColor: colors.primary[500],
  },
  fontSizeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  fontSizeTextActive: {
    color: colors.neutral.white,
  },
  bottomSpacing: {
    height: spacing[20],
  },
});

