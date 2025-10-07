import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Artifact } from '../types/Artifact';
import { artifacts as allArtifacts } from '../data/artifacts';
import { RootStackParamList } from '../../App';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import GriotAvatar from '../components/GriotAvatar';
import HamburgerMenu from '../components/HamburgerMenu';
import { useI18n } from '../utils/i18n';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const categories = [
  { id: 'all', name: 'All' },
  { id: 'paintings', name: 'Paintings' },
  { id: 'tapestries', name: 'Tapestries' },
  { id: 'sculptures', name: 'Sculptures' },
  { id: 'photos', name: 'Photos' },
];

export default function HomeScreen({ navigation }: Props) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [query, setQuery] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { t } = useI18n();

  useEffect(() => {
    loadArtifacts();
  }, [selectedCategory]);

  useEffect(() => {
    if (artifacts.length === 0) return;

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex((prevIndex) => (prevIndex + 1) % artifacts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [artifacts.length]);

  const loadArtifacts = () => {
    let filteredArtifacts = allArtifacts;

    if (selectedCategory !== 'all') {
      filteredArtifacts = allArtifacts.filter(
        artifact => artifact.category === selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
      );
    }

    if (query.trim().length > 0) {
      const q = query.trim().toLowerCase();
      filteredArtifacts = filteredArtifacts.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.origin.toLowerCase().includes(q)
      );
    }

    setArtifacts(filteredArtifacts);
    setCurrentIndex(0);
  };

  const currentArtifact = artifacts[currentIndex];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Medoune</Text>
            <Text style={styles.subtitle}>Welcome to Museum of Black Civilisations</Text>
          </View>
          <HamburgerMenu onNavigate={(route) => navigation.navigate(route as never)} />
        </View>

        <Text style={styles.title}>A Continuous Creation of{'\n'}Humanity</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder={t('searchPlaceholder')}
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={query}
              onChangeText={(text) => { setQuery(text); }}
              onEndEditing={loadArtifacts}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryButton,
                selectedCategory === cat.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {currentArtifact && (
          <Animated.View style={[styles.carouselContainer, { opacity: fadeAnim }]}>
            <View style={styles.card}>
              <Image
                source={currentArtifact.image_url}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <TouchableOpacity style={styles.heartButton}>
                    <Text style={styles.heartIcon}>❤️</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardOrigin}>{currentArtifact.origin}</Text>
                  <Text style={styles.cardTitle}>{currentArtifact.name}</Text>
                  <Text style={styles.cardPeriod}>{currentArtifact.period}</Text>
                  <TouchableOpacity
                    style={styles.seeMoreButton}
                    onPress={() =>
                      navigation.navigate('ArtifactListing', {
                        category: selectedCategory,
                      })
                    }
                  >
                    <Text style={styles.seeMoreText}>See more</Text>
                    <Text style={styles.arrowIcon}>→</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.dotsContainer}>
              {artifacts.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          </Animated.View>
        )}

        {/* Floating Griot avatars linking to griot page */}
        <View style={styles.griotRow}>
          {[colors.primary[500], colors.accent.terracotta, colors.accent.bronze].map((c, i) => (
            <GriotAvatar key={i} color={c} size={56} onPress={() => navigation.navigate('Griot' as never)} />
          ))}
        </View>

        {/* Quick actions: 3D Museum, Reserve Visit */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 32 }}>
          <TouchableOpacity style={{ backgroundColor: '#000', borderRadius: 24, paddingVertical: 12, paddingHorizontal: 18 }} onPress={() => navigation.navigate('Museum3D' as never)}>
            <Text style={{ color: '#fff' }}>Museum 3D</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: colors.primary[500], borderRadius: 24, paddingVertical: 12, paddingHorizontal: 18 }} onPress={() => navigation.navigate('ReserveVisit' as never)}>
            <Text style={{ color: '#fff' }}>Reserve visit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[16],
    paddingBottom: spacing[5],
  },
  greeting: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing[1],
    fontWeight: typography.fontWeight.medium,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  profileText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.white,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    color: colors.text.primary,
    marginVertical: spacing[5],
    paddingHorizontal: spacing[4],
    lineHeight: typography.lineHeight.tight * typography.fontSize['3xl'],
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius['3xl'],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    marginRight: spacing[3],
    ...shadows.sm,
  },
  searchIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing[2],
    color: colors.text.tertiary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius['3xl'],
    backgroundColor: colors.secondary[800],
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  filterIcon: {
    fontSize: typography.fontSize.xl,
    color: colors.neutral.white,
  },
  categoryScroll: {
    marginBottom: spacing[5],
  },
  categoryContent: {
    paddingHorizontal: spacing[4],
  },
  categoryButton: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2],
    borderRadius: borderRadius['3xl'],
    backgroundColor: colors.neutral.white,
    marginRight: spacing[2],
    ...shadows.sm,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary[500],
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  categoryTextActive: {
    color: colors.neutral.white,
    fontWeight: typography.fontWeight.semibold,
  },
  carouselContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 420,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 24,
  },
  heartButton: {
    position: 'absolute',
    top: -300,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 20,
  },
  cardOrigin: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
    opacity: 0.9,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardPeriod: {
    fontSize: 12,
    color: '#ddd',
    marginBottom: 16,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: 16,
    color: '#000',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  griotRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing[6],
    marginTop: spacing[6],
    marginBottom: spacing[10],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#000',
    width: 24,
  },
});
