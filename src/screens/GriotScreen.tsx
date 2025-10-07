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
          style={[styles.griotAvatar, { backgroundColor: griot.color }]}
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
      <TouchableOpacity style={[styles.listenButton, { backgroundColor: griot.color }]}>
        <Text style={styles.listenButtonText}>Listen to Stories</Text>
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
        <Text style={styles.headerTitle}>Meet the Griots</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      {/* Floating Griots */}
      {animatedGriots.map((griot, index) => (
        <FloatingGriot key={griot.id} griot={griot} index={index} />
      ))}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to the Griot Circle</Text>
          <Text style={styles.welcomeDescription}>
            Tap on the floating griots to hear their stories, or explore our collection of traditional storytellers.
          </Text>
        </View>

        {/* Selected Griot */}
        {selectedGriot && (
          <View style={styles.selectedGriotSection}>
            <Text style={styles.sectionTitle}>Selected Griot</Text>
            <GriotCard griot={selectedGriot} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedGriot(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* All Griots */}
        <View style={styles.allGriotsSection}>
          <Text style={styles.sectionTitle}>All Griots</Text>
          <View style={styles.griotsGrid}>
            {griotCharacters.map((griot) => (
              <GriotCard key={griot.id} griot={griot} />
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Griot Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📚</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Historical Narratives</Text>
                <Text style={styles.featureDescription}>
                  Listen to authentic stories from African civilizations
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🎭</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Art Interpretations</Text>
                <Text style={styles.featureDescription}>
                  Learn the cultural significance of artifacts
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🌍</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Cultural Context</Text>
                <Text style={styles.featureDescription}>
                  Understand traditions and customs of different empires
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
});
