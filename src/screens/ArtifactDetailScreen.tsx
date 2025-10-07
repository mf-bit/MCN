import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Artifact } from '../types/Artifact';
import GriotChat from '../components/GriotChat';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';

// Props pour la navigation
interface Props {
  route: RouteProp<RootStackParamList, 'ArtifactDetail'>;
}

const { width } = Dimensions.get('window');

export default function ArtifactDetailScreen({ route }: Props) {
  const { artifact } = route.params as { artifact: Artifact };
  const [selectedLang, setSelectedLang] = useState<'wolof' | 'fr' | 'en'>('fr');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareIcon}>↗</Text>
        </TouchableOpacity>
      </View>

      {/* Main Title - Centered like in Figma */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{artifact.name}</Text>
      </View>

      {/* Empire Info - Centered with crown icon */}
      <View style={styles.empireSection}>
        <View style={styles.empireRow}>
          <View style={styles.crownIcon}>
            <Text style={styles.crownText}>👑</Text>
          </View>
          <Text style={styles.empireName}>{artifact.origin}</Text>
          <Text style={styles.period}>{artifact.period}</Text>
        </View>
      </View>

      {/* Artifact Image - Full width */}
      <View style={styles.imageContainer}>
        <Image source={artifact.image_url} style={styles.artifactImage} resizeMode="cover" />
      </View>

      {/* Description - Centered */}
      <View style={styles.descriptionSection}>
        <Text style={styles.description}>{artifact.description}</Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapSection}>
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>Carte du {artifact.origin}</Text>
          </View>
        </View>
        <Text style={styles.mapCaption}>L'étendue du {artifact.origin} vers {artifact.period}</Text>
      </View>

      {/* Historical Background Section */}
      <View style={styles.historicalSection}>
        <Text style={styles.sectionTitle}>Historical Background</Text>
        <Text style={styles.historicalText}>
          Cette œuvre provient de l'ancien {artifact.origin}, un royaume riche en traditions artistiques et culturelles. 
          Elle témoigne de la maîtrise technique et de la signification spirituelle de l'art de cette période.
        </Text>
      </View>

      {/* Interactive Options */}
      <View style={styles.optionsSection}>
        <Text style={styles.sectionTitle}>Explorer</Text>
        <View style={styles.optionsGrid}>
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <Text style={styles.optionIcon}>🎭</Text>
            </View>
            <Text style={styles.optionTitle}>Griot</Text>
            <Text style={styles.optionSubtitle}>Écouter l'histoire</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <Text style={styles.optionIcon}>🔊</Text>
            </View>
            <Text style={styles.optionTitle}>Audio</Text>
            <Text style={styles.optionSubtitle}>Commentaire audio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <Text style={styles.optionIcon}>📍</Text>
            </View>
            <Text style={styles.optionTitle}>Localisation</Text>
            <Text style={styles.optionSubtitle}>Voir au musée</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <Text style={styles.optionIcon}>🎵</Text>
            </View>
            <Text style={styles.optionTitle}>Musique</Text>
            <Text style={styles.optionSubtitle}>Ambiance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Selector */}
      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}>Langue</Text>
        <View style={styles.languageButtons}>
          <TouchableOpacity 
            onPress={() => setSelectedLang('wolof')} 
            style={[styles.langButton, selectedLang === 'wolof' && styles.langButtonActive]}
          >
            <Text style={[styles.langButtonText, selectedLang === 'wolof' && styles.langButtonTextActive]}>Wolof</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedLang('fr')} 
            style={[styles.langButton, selectedLang === 'fr' && styles.langButtonActive]}
          >
            <Text style={[styles.langButtonText, selectedLang === 'fr' && styles.langButtonTextActive]}>Français</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedLang('en')} 
            style={[styles.langButton, selectedLang === 'en' && styles.langButtonActive]}
          >
            <Text style={[styles.langButtonText, selectedLang === 'en' && styles.langButtonTextActive]}>English</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Griot Chat */}
      <View style={styles.chatSection}>
        <GriotChat />
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  
  // Header
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
  backIcon: {
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.neutral.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  
  // Title Section - Centered like in Figma
  titleSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.tight * typography.fontSize['3xl'],
  },
  
  // Empire Section - Centered with crown
  empireSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
    alignItems: 'center',
  },
  empireRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  crownIcon: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.accent.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crownText: {
    fontSize: typography.fontSize.sm,
  },
  empireName: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  period: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  
  // Image Section
  imageContainer: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  artifactImage: {
    width: width - spacing[8],
    height: 300,
    backgroundColor: colors.neutral.gray[100],
  },
  
  // Description Section - Centered like in Figma
  descriptionSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
    alignItems: 'center',
  },
  description: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    color: colors.text.primary,
    textAlign: 'center',
    maxWidth: width * 0.8, // Limit width for better readability
  },
  
  // Map Section
  mapSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  mapContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing[3],
    ...shadows.sm,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: colors.neutral.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: typography.fontSize['3xl'],
    marginBottom: spacing[2],
  },
  mapText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  mapCaption: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  // Historical Section - Centered like in Figma
  historicalSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  historicalText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    color: colors.text.primary,
    textAlign: 'justify',
    maxWidth: width * 0.9, // Limit width for better readability
  },
  
  // Options Section
  optionsSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: (width - spacing[12]) / 2,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
    alignItems: 'center',
    ...shadows.sm,
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  optionIcon: {
    fontSize: typography.fontSize['2xl'],
  },
  optionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  optionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  // Language Section
  languageSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
  },
  langButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius['3xl'],
    backgroundColor: colors.neutral.gray[100],
  },
  langButtonActive: {
    backgroundColor: colors.primary[500],
  },
  langButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  langButtonTextActive: {
    color: colors.neutral.white,
  },
  
  // Chat Section
  chatSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  
  // Bottom spacing
  bottomSpacing: {
    height: spacing[20],
  },
});
