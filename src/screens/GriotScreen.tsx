import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { GriotIcon, BackIcon } from '../components/icons';
import { Audio } from 'expo-av';

type GriotScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

// Griot characters data
const griotCharacters = [
  {
    id: 1,
    name: 'Mamadou',
    origin: 'Mali Empire',
    specialty: 'Historical Narratives',
    color: colors.primary[500],
    position: { x: 0.2, y: 0.3 },
  },
  {
    id: 2,
    name: 'Amina',
    origin: 'Benin Kingdom',
    specialty: 'Art Stories',
    color: colors.accent.terracotta,
    position: { x: 0.7, y: 0.2 },
  },
  {
    id: 3,
    name: 'Kwame',
    origin: 'Ashanti Empire',
    specialty: 'Cultural Traditions',
    color: colors.accent.bronze,
    position: { x: 0.3, y: 0.6 },
  },
  {
    id: 4,
    name: 'Fatou',
    origin: 'Songhai Empire',
    specialty: 'Trade Stories',
    color: colors.accent.ochre,
    position: { x: 0.8, y: 0.7 },
  },
  {
    id: 5,
    name: 'Sekou',
    origin: 'Aksumite Kingdom',
    specialty: 'Religious Tales',
    color: colors.accent.sienna,
    position: { x: 0.1, y: 0.8 },
  },
];

export default function GriotScreen() {
  const navigation = useNavigation<GriotScreenNavigationProp>();
  const [selectedGriot, setSelectedGriot] = useState<any>(null);
  const [animatedGriots, setAnimatedGriots] = useState(griotCharacters);
  const [speakingGriotId, setSpeakingGriotId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Animation values for floating effect
  const floatingAnimations = useRef(
    griotCharacters.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Start floating animations
    griotCharacters.forEach((_, index) => {
      const animateFloat = () => {
        Animated.sequence([
          Animated.timing(floatingAnimations[index], {
            toValue: 1,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(floatingAnimations[index], {
            toValue: 0,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ]).start(() => animateFloat());
      };
      animateFloat();
    });
  }, []);

  useEffect(() => {
    return () => { if (soundRef.current) { soundRef.current.unloadAsync(); } };
  }, []);

  const togglePlayForGriot = async (griot: any) => {
    try {
      if (!soundRef.current || speakingGriotId !== griot.id) {
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4d/Short_swahili_drums_sample.ogg/Short_swahili_drums_sample.ogg.mp3' },
          { shouldPlay: true },
          (status) => {
            if ('isLoaded' in status && status.isLoaded) {
              setIsPlaying(!!status.isPlaying);
              setPosition(status.positionMillis ?? 0);
              setDuration(status.durationMillis ?? 0);
            }
          }
        );
        soundRef.current = sound;
        setSpeakingGriotId(griot.id);
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
      console.warn('Griot audio error', e);
    }
  };

  const FloatingGriot = ({ griot, index }: { griot: any; index: number }) => {
    const translateY = floatingAnimations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10],
    });

    const scale = floatingAnimations[index].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1],
    });

    return (
      <Animated.View
        style={[
          styles.floatingGriot,
          {
            left: griot.position.x * (width - 80),
            top: griot.position.y * (height - 200),
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.griotAvatar,
            { backgroundColor: griot.color },
            speakingGriotId === griot.id && styles.griotSpeaking,
          ]}
          onPress={() => setSelectedGriot(griot)}
        >
          <GriotIcon size={32} color={colors.neutral.white} />
        </TouchableOpacity>
        <View style={styles.griotNameTag}>
          <Text style={styles.griotName}>{griot.name}</Text>
        </View>
      </Animated.View>
    );
  };

  const GriotCard = ({ griot }: { griot: any }) => (
    <View style={[styles.griotCard, { borderLeftColor: griot.color }]}> 
      <View style={styles.griotCardHeader}>
        <View style={[styles.griotCardAvatar, { backgroundColor: griot.color }]}>
          <GriotIcon size={24} color={colors.neutral.white} />
        </View>
        <View style={styles.griotCardInfo}>
          <Text style={styles.griotCardName}>{griot.name}</Text>
          <Text style={styles.griotCardOrigin}>{griot.origin}</Text>
        </View>
      </View>
      <Text style={styles.griotCardSpecialty}>Specialty: {griot.specialty}</Text>
      <TouchableOpacity
        style={[styles.listenButton, { backgroundColor: griot.color }]}
        onPress={() => togglePlayForGriot(griot)}
      >
        <Text style={styles.listenButtonText}>
          {speakingGriotId === griot.id && isPlaying ? 'Pause' : 'Listen to History'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rencontre avec les griots</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      {/* Floating Griots selection (hidden after selection) */}
      {!selectedGriot && animatedGriots.map((griot, index) => (
        <FloatingGriot key={griot.id} griot={griot} index={index} />
      ))}

      {/* Content: either pick a griot or see his stories */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedGriot && (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Choisis un griot pour écouter ses histoires</Text>
            <Text style={styles.welcomeDescription}>Appuie sur un avatar flottant</Text>
          </View>
        )}

        {selectedGriot && (
          <View style={styles.selectedGriotSection}>
            <View style={[styles.griotCard, { borderLeftColor: selectedGriot.color }]}> 
              <View style={styles.griotCardHeader}>
                <View style={[styles.griotCardAvatar, { backgroundColor: selectedGriot.color }]}> 
                  <GriotIcon size={24} color={colors.neutral.white} />
                </View>
                <View style={styles.griotCardInfo}>
                  <Text style={styles.griotCardName}>{selectedGriot.name}</Text>
                  <Text style={styles.griotCardOrigin}>{selectedGriot.origin}</Text>
                </View>
              </View>
              <Text style={styles.griotCardSpecialty}>Histoires du griot</Text>

              {/* Stories list for the selected griot */}
              <View style={styles.featuresList}>
                {[1,2,3].map((n) => (
                  <View key={n} style={styles.featureItem}>
                    <View style={styles.featureIcon}><Text style={styles.featureIconText}>🎧</Text></View>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>Histoire {n}</Text>
                      <Text style={styles.featureDescription}>3:0{n} • {selectedGriot.specialty}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.listenButton, { backgroundColor: selectedGriot.color }]}
                      onPress={() => togglePlayForGriot(selectedGriot)}
                    >
                      <Text style={styles.listenButtonText}>{speakingGriotId === selectedGriot.id && isPlaying ? 'Pause' : 'Écouter'}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedGriot(null)}
              >
                <Text style={styles.closeButtonText}>Changer de griot</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Mini Player */}
      {!!speakingGriotId && (
        <View style={styles.playerBar}>
          <View style={[styles.playerBadge, { backgroundColor: (griotCharacters.find(g => g.id === speakingGriotId)?.color) || colors.primary[500] }]}>
            <Text style={styles.playerBadgeText}>Now playing</Text>
          </View>
          <View style={styles.playerProgress}>
            <View style={[styles.playerFill, { width: `${duration ? Math.min(100, Math.round((position / duration) * 100)) : 0}%` }]} />
          </View>
          <TouchableOpacity style={styles.playerBtn} onPress={() => {
            const current = griotCharacters.find(g => g.id === speakingGriotId);
            if (current) togglePlayForGriot(current);
          }}>
            <Text style={styles.playerBtnText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    zIndex: 10,
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
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  patternCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary[200],
    top: 100,
    right: -50,
  },
  patternCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent.terracotta,
    bottom: 200,
    left: -30,
  },
  patternCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent.bronze,
    top: 300,
    left: 50,
  },
  floatingGriot: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
  },
  griotAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  griotSpeaking: {
    shadowColor: colors.primary[500],
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  griotNameTag: {
    marginTop: spacing[2],
    backgroundColor: colors.neutral.white,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  griotName: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  welcomeSection: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[6],
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  welcomeDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    maxWidth: width * 0.8,
  },
  selectedGriotSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  allGriotsSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  featuresSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  griotCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
    borderLeftWidth: 4,
    ...shadows.sm,
  },
  griotCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  griotCardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  griotCardInfo: {
    flex: 1,
  },
  griotCardName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  griotCardOrigin: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  griotCardSpecialty: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing[4],
  },
  listenButton: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  listenButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.white,
  },
  closeButton: {
    alignSelf: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.neutral.gray[200],
    borderRadius: borderRadius.md,
    marginTop: spacing[3],
  },
  closeButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  griotsGrid: {
    gap: spacing[4],
  },
  featuresList: {
    gap: spacing[4],
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  featureIconText: {
    fontSize: typography.fontSize.xl,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  featureDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  bottomSpacing: {
    height: spacing[20],
  },
  playerBar: {
    position: 'absolute',
    left: spacing[4],
    right: spacing[4],
    bottom: spacing[4],
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius['3xl'],
    padding: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  playerBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius['3xl'],
    marginRight: spacing[3],
  },
  playerBadgeText: {
    color: colors.neutral.white,
    fontWeight: typography.fontWeight.semibold,
  },
  playerProgress: {
    flex: 1,
    height: 6,
    backgroundColor: colors.neutral.gray[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  playerFill: {
    height: '100%',
    backgroundColor: colors.primary[500],
  },
  playerBtn: {
    marginLeft: spacing[3],
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.md,
  },
  playerBtnText: {
    color: colors.neutral.white,
    fontWeight: typography.fontWeight.semibold,
  },
});

