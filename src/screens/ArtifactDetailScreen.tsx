import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Artifact } from '../types/Artifact';
import GriotChat from '../components/GriotChat';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { BackIcon, ShareIcon, GriotIcon, AudioIcon, ARIcon, HeartIcon } from '../components/icons';
import { Audio, Video } from 'expo-av';
import { useFavorites } from '../utils/favorites';

// Props pour la navigation
interface Props {
  route: RouteProp<RootStackParamList, 'ArtifactDetail'>;
}

const { width } = Dimensions.get('window');

export default function ArtifactDetailScreen({ route }: Props) {
  const { artifact } = route.params as { artifact: Artifact };
  const [selectedLang, setSelectedLang] = useState<'wolof' | 'fr' | 'en'>('fr');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => { if (soundRef.current) { soundRef.current.unloadAsync(); } };
  }, []);

  const togglePlay = async () => {
    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          // Placeholder local asset: reuse any small png path would fail; so skip until real audio provided
          // For demo, load a remote short mp3 sample
          { uri: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4d/Short_swahili_drums_sample.ogg/Short_swahili_drums_sample.ogg.mp3' },
          { shouldPlay: true },
          (status) => {
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying ?? false);
              const ratio = status.durationMillis ? (status.positionMillis ?? 0) / status.durationMillis : 0;
              setProgress(ratio);
            }
          }
        );
        soundRef.current = sound;
        setIsPlaying(true);
        return;
      }

      const status = await soundRef.current.getStatusAsync();
      if ('isLoaded' in status && status.isLoaded) {
        if (status.isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (e) {
      console.warn('Audio error', e);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <ShareIcon size={20} color={colors.text.primary} />
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

      {/* Artifact Image - Full width + like */}
      <View style={styles.imageContainer}>
        <Image source={artifact.image_url} style={styles.artifactImage} resizeMode="cover" />
        <TouchableOpacity style={styles.likeBtn} onPress={() => toggleFavorite(artifact.id)}>
          <HeartIcon size={22} color={colors.neutral.white} filled={isFavorite(artifact.id)} />
        </TouchableOpacity>
      </View>

      {/* Media Tabs */}
      <View style={styles.mediaTabs}>
        <Text style={styles.mediaTabActive}>Vidéo</Text>
        <Text style={styles.mediaTab}>Texte</Text>
        <Text style={styles.mediaTab}>Images</Text>
      </View>

      {/* Video Player */}
      {/* <View style={styles.videoSection}>
        <Video
          source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
        />
      </View> */}

      {/* Description - Centered */}
      <View style={styles.descriptionSection}>
        <Text style={styles.description}>{artifact.description}</Text>
      </View>

      {/* Audio Player */}
      <View style={styles.audioSection}>
        <Text style={styles.sectionTitle}>Description audio</Text>
        <View style={styles.audioCard}>
          <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
            <AudioIcon size={20} color={colors.neutral.white} />
            <Text style={styles.playBtnText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
        </View>
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
        <Text style={styles.sectionTitle}>Contexte historique</Text>
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
              <GriotIcon size={24} color={colors.primary[600]} />
            </View>
            <Text style={styles.optionTitle}>Griot</Text>
            <Text style={styles.optionSubtitle}>Écouter l'histoire</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <AudioIcon size={24} color={colors.primary[600]} />
            </View>
            <Text style={styles.optionTitle}>Audio</Text>
            <Text style={styles.optionSubtitle}>Commentaire audio</Text>
          </TouchableOpacity>
          
          {/* <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('HistoryTimeline' as never, { artifactName: artifact.name } as never)}>
            <View style={styles.optionIconContainer}>
              <ARIcon size={24} color={colors.primary[600]} />
            </View>
            <Text style={styles.optionTitle}>Timeline</Text>
            <Text style={styles.optionSubtitle}>Voir le contexte</Text>
          </TouchableOpacity> */}
          
          
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Artwork3D' as never)}>
            <View style={styles.optionIconContainer}>
              <AudioIcon size={24} color={colors.primary[600]} />
            </View>
            <Text style={styles.optionTitle}>Voir en 3D</Text>
            <Text style={styles.optionSubtitle}>Rotation, zoom</Text>
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
  likeBtn: {
    position: 'absolute',
    right: spacing[3],
    top: spacing[3],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Description Section - Centered like in Figma
  descriptionSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
    alignItems: 'center',
  },
  mediaTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[4],
    marginBottom: spacing[3],
  },
  mediaTabActive: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  mediaTab: {
    color: colors.text.secondary,
  },
  videoSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  video: {
    width: width - spacing[8],
    height: 220,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.black,
  },
  description: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    color: colors.text.primary,
    textAlign: 'center',
    maxWidth: width * 0.8, // Limit width for better readability
  },

  // Audio
  audioSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  audioCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    marginBottom: spacing[3],
  },
  playBtnText: {
    color: colors.neutral.white,
    marginLeft: spacing[2],
    fontWeight: typography.fontWeight.semibold,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral.gray[200],
    borderRadius: borderRadius.full / 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[500],
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
