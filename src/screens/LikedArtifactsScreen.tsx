import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../App';
import { Artifact } from '../types/Artifact';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { HeartIcon, BackIcon } from '../components/icons';

type LikedArtifactsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - spacing[12]) / 2;

// Mock data for liked artifacts
const likedArtifacts: Artifact[] = [
  {
    id: 1,
    name: 'Pendant mask of Ìyóbà Idià',
    origin: 'Empire du Bénin',
    period: '1400-1897',
    category: 'Sculptures',
    description: 'This pendant mask was created to honor the Oba (king) of Benin\'s mother, Queen Idia.',
    image_url: require('../../assets/artifacts/benin-mask.png'),
  },
  {
    id: 2,
    name: 'Aksumite Obelisk',
    origin: 'Kingdom of Aksum',
    period: '4th century AD',
    category: 'Sculptures',
    description: 'A monumental stele from the ancient Aksumite civilization.',
    image_url: require('../../assets/artifacts/aksumite-obelisk.png'),
  },
  {
    id: 3,
    name: 'Nok Terracotta Head',
    origin: 'Nok Culture',
    period: '500 BC - 200 AD',
    category: 'Sculptures',
    description: 'One of the earliest known examples of African terracotta sculpture.',
    image_url: require('../../assets/artifacts/nok-head.png'),
  },
  {
    id: 4,
    name: 'Timbuktu Manuscript',
    origin: 'Mali Empire',
    period: '13th-16th century',
    category: 'Manuscripts',
    description: 'Ancient Islamic manuscripts from the great trading city of Timbuktu.',
    image_url: require('../../assets/artifacts/timbuktu-manuscript.png'),
  },
];

export default function LikedArtifactsScreen() {
  const navigation = useNavigation<LikedArtifactsScreenNavigationProp>();
  const [artifacts, setArtifacts] = useState<Artifact[]>(likedArtifacts);

  const removeFromLiked = (artifactId: number) => {
    setArtifacts(prev => prev.filter(artifact => artifact.id !== artifactId));
  };

  const renderArtifact = ({ item }: { item: Artifact }) => (
    <TouchableOpacity 
      style={styles.artifactCard}
      onPress={() => navigation.navigate('ArtifactDetail', { artifact: item })}
    >
      <Image source={item.image_url} style={styles.artifactImage} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.cardGradient}
      >
        <TouchableOpacity 
          style={styles.likeButton}
          onPress={() => removeFromLiked(item.id)}
        >
          <HeartIcon size={20} color="#fff" filled={true} />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <Text style={styles.artifactOrigin}>{item.origin}</Text>
          <Text style={styles.artifactName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.artifactPeriod}>{item.period}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <HeartIcon size={64} color={colors.neutral.gray[300]} />
      <Text style={styles.emptyTitle}>No Liked Artifacts</Text>
      <Text style={styles.emptySubtitle}>
        Start exploring and like artifacts to see them here
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.exploreButtonText}>Explore Artifacts</Text>
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
        <Text style={styles.headerTitle}>Liked Artifacts</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stats */}
      {artifacts.length > 0 && (
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{artifacts.length}</Text>
            <Text style={styles.statLabel}>Liked Artifacts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {[...new Set(artifacts.map(a => a.origin))].length}
            </Text>
            <Text style={styles.statLabel}>Civilizations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {[...new Set(artifacts.map(a => a.category))].length}
            </Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>
      )}

      {/* Artifacts List */}
      {artifacts.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={artifacts}
          renderItem={renderArtifact}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
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
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
    gap: spacing[2],
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
    marginBottom: spacing[1],
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[20],
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  artifactCard: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.neutral.white,
    ...shadows.sm,
  },
  artifactImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: spacing[3],
  },
  likeButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: borderRadius.full / 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    justifyContent: 'flex-end',
  },
  artifactOrigin: {
    fontSize: typography.fontSize.xs,
    color: '#fff',
    marginBottom: spacing[1],
    opacity: 0.9,
  },
  artifactName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: '#fff',
    marginBottom: spacing[1],
  },
  artifactPeriod: {
    fontSize: typography.fontSize.xs,
    color: '#ddd',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[8],
  },
  emptyTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing[6],
  },
  exploreButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: borderRadius['3xl'],
  },
  exploreButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral.white,
  },
});
