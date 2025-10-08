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
  Modal,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Artifact } from '../types/Artifact';
import { artifacts as allArtifacts } from '../data/artifacts';
import { RootStackParamList } from '../../App';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { useI18n } from '../utils/i18n';
import { Carousel } from '../components/Carousel';
import { CarouselItemProps } from '../types/CarouselItemProps';
import { BottomNavigation } from '../components/BottomNavigation';

import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = width - 64;
const CARD_WIDTH = 347;
// const CARD_HEIGHT = height * 0.6;
const CARD_HEIGHT = 367;

// SVG Icon Components
const HomeIcon = ({ color = "#F7F7F7", size = 21 }) => (
  <Svg width={size} height={size} viewBox="0 0 21 20" fill="none">
    <Path d="M10.7453 12.8514V15.9253M8.00267 2.04341L2.83401 6.77794C1.83646 7.6917 1.35099 9.05539 1.54029 10.412L2.24753 15.4803C2.52928 17.4995 4.21839 18.9993 6.21068 18.9993H14.7796C16.7719 18.9993 18.461 17.4995 18.7427 15.4803L19.4597 10.3422C19.6436 9.02425 19.1908 7.69698 18.2454 6.78286L13.4209 2.11812C11.9082 0.655502 9.5533 0.623029 8.00267 2.04341Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

const LikeIcon = ({ color = "#F7F7F7", size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 18" fill="none">
    <Path d="M9.83325 3.19369L9.35569 3.66611C9.48065 3.79955 9.65306 3.87494 9.83325 3.87494C10.0134 3.87494 10.1859 3.79955 10.3108 3.66611L9.83325 3.19369ZM7.5586 14.8396C6.21918 13.7543 4.75457 12.6945 3.59267 11.3497C2.45349 10.0312 1.65883 8.49275 1.65883 6.4968H0.333252C0.333252 8.91794 1.31462 10.765 2.60152 12.2544C3.86569 13.7175 5.47719 14.888 6.73795 15.9096L7.5586 14.8396ZM1.65883 6.4968C1.65883 4.5431 2.73288 2.90475 4.19897 2.21593C5.62327 1.54676 7.53705 1.72398 9.35569 3.66611L10.3108 2.72127C8.15286 0.416838 5.64803 0.0370395 3.64788 0.976767C1.68951 1.89687 0.333252 4.03335 0.333252 6.4968H1.65883ZM6.73795 15.9096C7.19062 16.2764 7.67657 16.6675 8.16903 16.9633C8.66135 17.2589 9.22313 17.4993 9.83325 17.4993V16.1368C9.55965 16.1368 9.23771 16.0271 8.83783 15.7869C8.43812 15.5468 8.02346 15.2163 7.5586 14.8396L6.73795 15.9096ZM12.9286 15.9096C14.1893 14.888 15.8008 13.7175 17.065 12.2544C18.3519 10.765 19.3333 8.91794 19.3333 6.4968H18.0077C18.0077 8.49275 17.213 10.0312 16.0738 11.3497C14.9119 12.6945 13.4473 13.7543 12.108 14.8396L12.9286 15.9096ZM19.3333 6.4968C19.3333 4.03335 17.977 1.89687 16.0186 0.976767C14.0185 0.0370395 11.5136 0.416838 9.35569 2.72127L10.3108 3.66611C12.1294 1.72398 14.0432 1.54676 15.4675 2.21593C16.9336 2.90475 18.0077 4.5431 18.0077 6.4968H19.3333ZM12.108 14.8396C11.643 15.2163 11.2284 15.5468 10.8287 15.7869C10.4288 16.0271 10.1069 16.1368 9.83325 16.1368V17.4993C10.4434 17.4993 11.0052 17.2589 11.4975 16.9633C11.99 16.6675 12.4758 16.2764 12.9286 15.9096L12.108 14.8396Z" fill={color}/>
  </Svg>
);

const QRIcon = ({ color = "#F7F7F7", size = 19 }) => (
  <Svg width={size} height={size} viewBox="0 0 19 18" fill="none">
    <Path d="M0.960847 6.23794C1.47067 6.23794 1.74516 5.95351 1.74516 5.43361V3.1186C1.74516 2.09848 2.29418 1.57859 3.27459 1.57859H5.64709C6.15692 1.57859 6.44124 1.29407 6.44124 0.784009C6.44124 0.283742 6.15692 -0.000732422 5.64709 -0.000732422H3.24514C1.20597 -0.000732422 0.166748 1.00964 0.166748 3.03034V5.43361C0.166748 5.95351 0.451066 6.23794 0.960847 6.23794ZM17.3726 6.23794C17.8921 6.23794 18.1667 5.95351 18.1667 5.43361V3.03034C18.1667 1.00964 17.1471 -0.000732422 15.0883 -0.000732422H12.6961C12.1765 -0.000732422 11.8922 0.283742 11.8922 0.784009C11.8922 1.29407 12.1765 1.57859 12.6961 1.57859H15.0687C16.0294 1.57859 16.5883 2.09848 16.5883 3.1186V5.43361C16.5883 5.95351 16.8726 6.23794 17.3726 6.23794ZM8.74514 8.15079V4.72734C8.74514 4.49192 8.55888 4.29572 8.31375 4.29572H4.90202C4.65694 4.29572 4.47063 4.49192 4.47063 4.72734V8.15079C4.47063 8.38621 4.65694 8.57258 4.90202 8.57258H8.31375C8.55888 8.57258 8.74514 8.38621 8.74514 8.15079ZM10.4412 5.14914H13.0098V7.71916H10.4412V5.14914ZM12.2648 6.97367V5.90446H11.1961V6.97367H12.2648ZM7.14712 6.97367V5.90446H6.06866V6.97367H7.14712ZM5.32358 10.2794H7.89219V12.8494H5.32358V10.2794ZM13.7353 10.6129V9.54369H12.6667V10.6129H13.7353ZM10.7844 10.6129V9.54369H9.71572V10.6129H10.7844ZM7.14712 12.0941V11.0249H6.06866V12.0941H7.14712ZM12.2648 12.0941V11.0249H11.1863V12.0941H12.2648ZM12.6961 17.9993H15.0883C17.1471 17.9993 18.1667 16.9791 18.1667 14.9584V12.565C18.1667 12.0451 17.8824 11.7606 17.3726 11.7606C16.8628 11.7606 16.5883 12.0451 16.5883 12.565V14.8799C16.5883 15.9001 16.0294 16.42 15.0687 16.42H12.6961C12.1765 16.42 11.8922 16.7045 11.8922 17.2145C11.8922 17.7148 12.1765 17.9993 12.6961 17.9993ZM3.24514 17.9993H5.64709C6.15692 17.9993 6.44124 17.7148 6.44124 17.2145C6.44124 16.7045 6.15692 16.42 5.64709 16.42H3.27459C2.29418 16.42 1.74516 15.9001 1.74516 14.8799V12.565C1.74516 12.0451 1.46084 11.7606 0.960847 11.7606C0.441236 11.7606 0.166748 12.0451 0.166748 12.565V14.9584C0.166748 16.9889 1.20597 17.9993 3.24514 17.9993ZM10.7844 13.5753V12.5061H9.71572V13.5753H10.7844ZM13.7353 13.5753V12.5061H12.6667V13.5753H13.7353ZM13.8628 8.15079V4.72734C13.8628 4.49192 13.6765 4.29572 13.4314 4.29572H10.0196C9.77454 4.29572 9.58827 4.49192 9.58827 4.72734V8.15079C9.58827 8.38621 9.77454 8.57258 10.0196 8.57258H13.4314C13.6765 8.57258 13.8628 8.38621 13.8628 8.15079ZM5.32358 5.14914H7.89219V7.71916H5.32358V5.14914ZM8.74514 13.2712V9.84779C8.74514 9.61237 8.55888 9.426 8.31375 9.426H4.90202C4.65694 9.426 4.47063 9.61237 4.47063 9.84779V13.2712C4.47063 13.5067 4.65694 13.7028 4.90202 13.7028H8.31375C8.55888 13.7028 8.74514 13.5067 8.74514 13.2712Z" fill={color}/>
  </Svg>
);

const MuseumIcon = ({ color = "#F7F7F7", size = 19 }) => (
  <Svg width={size} height={size} viewBox="0 0 19 18" fill="none">
    <Path d="M9.51264 -0.000654666C9.45151 0.000298826 9.39145 0.0158158 9.33724 0.0446576L1.10202 4.44464C1.03863 4.47859 0.985561 4.52959 0.948567 4.59211C0.911572 4.65464 0.892063 4.7263 0.892154 4.79932V5.99932C0.892164 6.1054 0.933483 6.20714 1.00702 6.28215C1.08056 6.35716 1.1803 6.39931 1.28431 6.39932H1.67646V6.95947C1.67646 7.44423 2.0154 7.85732 2.46077 7.96806V15.204H1.32337L1.38847 15.2094C0.905331 15.1265 0.5 15.5492 0.5 16.0118V17.111C0.5 17.5831 0.866292 17.9993 1.32337 17.9993H17.6766C18.1337 17.9993 18.5 17.6142 18.5 17.1516V16.0524C18.5 15.5898 18.1337 15.204 17.6766 15.204H16.5783V7.96806C17.0237 7.85732 17.3626 7.44423 17.3626 6.95947V6.39932H17.7548C17.8588 6.39931 17.9585 6.35716 18.032 6.28215C18.1056 6.20714 18.1469 6.1054 18.1469 5.99932V4.79932C18.147 4.7263 18.1275 4.65464 18.0905 4.59211C18.0535 4.52959 18.0004 4.47859 17.937 4.44464L9.70182 0.0446576C9.64349 0.0136046 9.57843 -0.00197782 9.51264 -0.000654666ZM9.51953 0.851685L17.3626 5.04151V5.59932H17.0363C16.994 5.59218 16.9508 5.59218 16.9084 5.59932H13.1094C13.0874 5.59557 13.0651 5.59374 13.0428 5.59385C13.0238 5.59427 13.0048 5.5961 12.9861 5.59932H11.5462C11.5038 5.59218 11.4606 5.59218 11.4183 5.59932H7.61927C7.59725 5.59557 7.57496 5.59374 7.55264 5.59385C7.53364 5.59427 7.5147 5.5961 7.49596 5.59932H6.05602C6.01367 5.59218 5.97046 5.59218 5.92811 5.59932H2.12912C2.1071 5.59557 2.08481 5.59374 2.06249 5.59385C2.04349 5.59427 2.02455 5.5961 2.00581 5.59932H1.67646V5.04151L9.51953 0.851685ZM2.46077 6.39932H5.598V6.95947C5.598 7.11206 5.51246 7.19931 5.36286 7.19931H2.69591C2.54631 7.19931 2.46077 7.11206 2.46077 6.95947V6.39932ZM6.3823 6.39932H7.16661V6.95947C7.16661 7.44423 7.50555 7.85732 7.95092 7.96806V15.204H5.598V7.96806C6.04337 7.85732 6.3823 7.44423 6.3823 6.95947V6.39932ZM7.95092 6.39932H11.0881V6.95947C11.0881 7.11206 11.0026 7.19931 10.853 7.19931H8.18606C8.03646 7.19931 7.95092 7.11206 7.95092 6.95947V6.39932ZM11.8725 6.39932H12.6568V6.95947C12.6568 7.44423 12.9957 7.85732 13.4411 7.96806V15.204H11.0881V7.96806C11.5335 7.85732 11.8725 7.44423 11.8725 6.95947V6.39932ZM13.4411 6.39932H16.5783V6.95947C16.5783 7.11206 16.4928 7.19931 16.3432 7.19931H13.6762C13.5266 7.19931 13.4411 7.11206 13.4411 6.95947V6.39932ZM3.24507 7.99931H4.81369V15.1993H3.24507V7.99931ZM8.73522 7.99931H10.3038V15.1993H8.73522V7.99931ZM14.2254 7.99931H15.794V15.1993H14.2254V7.99931ZM1.27818 16.0008C1.29317 16.0028 1.30826 16.0038 1.32337 16.004H17.6766C17.6901 16.004 17.7157 16.0262 17.7157 16.0524V17.1516C17.7157 17.1778 17.6901 17.1993 17.6766 17.1993H1.32337C1.30986 17.1993 1.28431 17.2085 1.28431 17.111V16.0118C1.28431 16.0025 1.28091 16.0024 1.27818 16.0008Z" fill={color}/>
  </Svg>
);

const categories = [
  { id: 'all', name: 'All' },
  { id: 'paintings', name: 'Paintings' },
  { id: 'tapestries', name: 'Tapestries' },
  { id: 'sculptures', name: 'Sculptures' },
  { id: 'photos', name: 'Photos' },
];

// Carousel data for the new 3-card carousel
const carouselData = [
  {
    id: '1',
    title: 'African Heritage',
    description: 'Discover the rich cultural heritage and traditions of African civilizations through our curated collection.',
    backgroundColor: '#F7F7F7',
    icon: <Ionicons name="globe-outline" size={48} color="#1E1E1E" />,
  },
  {
    id: '2',
    title: 'Ancient Artifacts',
    description: 'Explore ancient sculptures, masks, and ceremonial objects that tell the story of Africa\'s artistic legacy.',
    backgroundColor: '#E8F5E8',
    icon: <Ionicons name="diamond-outline" size={48} color="#2E7D32" />,
  },
  {
    id: '3',
    title: 'Museum Tours',
    description: 'Take a virtual tour through our 3D museum space and experience artifacts in their historical context.',
    backgroundColor: '#FFF3E0',
    icon: <Ionicons name="walk-outline" size={48} color="#F57C00" />,
  },
  {
    id: '4',
    title: 'Interactive Learning',
    description: 'Engage with interactive exhibits and learn about the significance of each artifact in African history.',
    backgroundColor: '#E3F2FD',
    icon: <Ionicons name="school-outline" size={48} color="#1976D2" />,
  },
  {
    id: '5',
    title: 'Cultural Events',
    description: 'Join our cultural events and workshops to deepen your understanding of African traditions.',
    backgroundColor: '#F3E5F5',
    icon: <Ionicons name="calendar-outline" size={48} color="#7B1FA2" />,
  },
];

export default function HomeScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<Artifact[]>([]);
  const [activeNavItem, setActiveNavItem] = useState('home');

  // Animation values
  const colorAnim = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  const navSliderAnim = useRef(new Animated.Value(0)).current;

  const { t } = useI18n();

  // Removed old carousel logic - now using CarouselCards component

  // Color flashing animation for hero text
  useEffect(() => {
    const colorAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    colorAnimation.start();
  }, []);

  // Removed loadArtifacts function - no longer needed with new carousel

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length > 0) {
      const results = allArtifacts.filter(a =>
        a.name.toLowerCase().includes(text.toLowerCase()) ||
        a.origin.toLowerCase().includes(text.toLowerCase()) ||
        a.description.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const openSearch = () => {
    setSearchVisible(true);
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSearch = () => {
    Animated.timing(searchAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSearchVisible(false);
      setQuery('');
      setSearchResults([]);
    });
  };

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('ArtifactListing', { category: categoryId });
  };

  // Removed old carousel card press handlers - now handled by CarouselCards component

  const handleNavPress = (navItem: string) => {
    setActiveNavItem(navItem);
    
    // Rubber band animation
    Animated.sequence([
      Animated.timing(navSliderAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(navSliderAnim, {
        toValue: 0,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate based on nav item
    switch (navItem) {
      case 'home':
        // Already on home
        break;
      case 'favorites':
        navigation.navigate('Favorites');
        break;
      case 'scan':
        navigation.navigate('QRScan');
        break;
      case 'museum':
        navigation.navigate('Museum3D');
        break;
    }
  };

  // Removed currentArtifact - no longer needed with new carousel

  // Animated color for hero text
  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1E1E1E', '#c4914f'],
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Medoune</Text>
            <Text style={styles.subtitle}>Welcome to Museum of Black Civilisations</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.profileImage}>
              <Text style={styles.profileText}>M</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero Text with Color Animation */}
        <Animated.Text style={[styles.heroText, { color: animatedColor }]}>
          A Continuous Creation of Humanity
        </Animated.Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar} onPress={openSearch}>
            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <Path d="M18 18.25L20.5 20.75M19 10.25C19 15.2206 14.9706 19.25 10 19.25C5.02944 19.25 1 15.2206 1 10.25C1 5.27944 5.02944 1.25 10 1.25C14.9706 1.25 19 5.27944 19 10.25Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" />
            </Svg>
            <Text style={styles.searchPlaceholder}>Search artifacts...</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filters */}
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
              onPress={() => handleCategoryPress(cat.id)}
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

        {/* Animated Carousel */}
        {/* Carousel */}
        <View style={styles.carouselWrapper}>
          <Carousel
            data={allArtifacts.slice(0, 5).map((artifact: Artifact): CarouselItemProps => ({
              id: artifact.id,
              title: artifact.name,
              description: artifact.description,
              image: artifact.image_url
            }))}
            onCardPress={(id: string) => {
              const artifact = allArtifacts.find((a: any) => a.id === id);
              if (artifact) {
                navigation.navigate('ArtifactListing', {
                  category: artifact.category
                });
              }
            }}
            onSeeMore={() => {
              navigation.navigate('ArtifactListing', {
                category: 'all'
              });
            }}
          />
        </View>



        {/* Bottom Navigation */}
        <BottomNavigation navigation={navigation} activeTab={activeNavItem} />
      </ScrollView>

      {/* Search Overlay Modal */}
      <Modal
        visible={searchVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSearch}
      >
        <Animated.View
          style={[
            styles.searchOverlay,
            {
              opacity: searchAnim,
              transform: [{
                translateY: searchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                })
              }]
            }
          ]}
        >
          <View style={styles.searchModalContent}>
            <View style={styles.searchModalHeader}>
              <View style={styles.searchModalBar}>
                <Text style={styles.searchModalIcon}>🔍</Text>
                <TextInput
                  placeholder="Search artifacts..."
                  placeholderTextColor="#848587"
                  style={styles.searchModalInput}
                  value={query}
                  onChangeText={handleSearch}
                  autoFocus
                />
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeSearch}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {searchResults.length > 0 && (
              <ScrollView style={styles.searchResults}>
                {searchResults.map((artifact) => (
                  <TouchableOpacity
                    key={artifact.id}
                    style={styles.searchResultItem}
                    onPress={() => {
                      closeSearch();
                      navigation.navigate('ArtifactDetail', { artifact });
                    }}
                  >
                    <Image source={artifact.image_url} style={styles.searchResultImage} />
                    <View style={styles.searchResultContent}>
                      <Text style={styles.searchResultTitle}>{artifact.name}</Text>
                      <Text style={styles.searchResultOrigin}>{artifact.origin}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E1E1E',
    fontFamily: 'MadimiOne_400Regular',
  },
  subtitle: {
    fontSize: 14,
    color: '#848587',
    marginTop: 4,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F7F7F7',
  },
  heroText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
    lineHeight: 40,
    fontFamily: 'MadimiOne_400Regular',
  },
  searchContainer: {
    paddingHorizontal: 22,
    paddingVertical: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 999999999,
    paddingHorizontal: 20,
    paddingLeft: 35,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 70,
    fontSize: 17,
    fontFamily: 'Roboto',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#848587',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 18,
    color: '#848587',
    fontWeight: '500',
    marginLeft: 15,
    fontFamily: 'Roboto',
  },
  categoryScroll: {
    
  },
  categoryContent: {
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  
  categoryButton: {
    height: 33,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999999,
    backgroundColor: '#ffffff',
    marginRight: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#1E1E1E',
  },
  categoryText: {
    fontSize: 14,
    color: '#848587',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  carouselWrapper: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  // Removed old carousel styles - now using CarouselCards component styles
  bottomNav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    marginBottom: 20,
    borderRadius: 9999999999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    gap: 10,
    width: 340,
    marginHorizontal: 'auto',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999999999,
    width: 64,
    height: 64,
    paddingVertical: 8,
  },
  navButtonActive: {
    backgroundColor: '#F7F7F7',
  },

  // Search Modal Styles
  searchOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  searchModalContent: {
    backgroundColor: '#F7F7F7',
    marginHorizontal: 20,
    borderRadius: 20,
    maxHeight: height * 0.8,
  },
  searchModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchModalBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 12,
  },
  searchModalIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#848587',
  },
  searchModalInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    fontWeight: '500',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  searchResults: {
    maxHeight: height * 0.6,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchResultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  searchResultOrigin: {
    fontSize: 14,
    color: '#848587',
  },
});