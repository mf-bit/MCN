import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Artifact } from '../types/Artifact';
import { artifacts as allArtifacts } from '../data/artifacts';
import { RootStackParamList } from '../../App';

type ArtifactListingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ArtifactListing'
>;

type ArtifactListingScreenRouteProp = RouteProp<RootStackParamList, 'ArtifactListing'>;

interface Props {
  navigation: ArtifactListingScreenNavigationProp;
  route: ArtifactListingScreenRouteProp;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const categories = [
  { id: 'all', name: 'All' },
  { id: 'paintings', name: 'Paintings' },
  { id: 'tapestries', name: 'Tapestries' },
  { id: 'sculptures', name: 'Sculptures' },
  { id: 'photos', name: 'Photos' },
];

export default function ArtifactListingScreen({ navigation, route }: Props) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(route.params.category || 'all');

  useEffect(() => {
    loadArtifacts();
  }, [selectedCategory]);

  const loadArtifacts = () => {
    let filteredArtifacts = allArtifacts;

    if (selectedCategory !== 'all') {
      filteredArtifacts = allArtifacts.filter(
        artifact => artifact.category === selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
      );
    }

    setArtifacts(filteredArtifacts);
  };

  const renderArtifact = ({ item }: { item: Artifact }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ArtifactDetail', { artifact: item })}>
      <Image source={item.image_url} style={styles.gridImage} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gridGradient}
      >
        <TouchableOpacity style={styles.heartButton}>
          <Text style={styles.heartIcon}>❤️</Text>
        </TouchableOpacity>
        <View style={styles.gridContent}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Bouton de retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>← Retour</Text>
      </TouchableOpacity>
      {/* Contenu existant */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>mcn</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>share</Text>
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

      <View style={styles.picassoBar}>
        <Text style={styles.picassoText}>PICASSO À DAKAR</Text>
      </View>

      <FlatList
        data={artifacts}
        renderItem={renderArtifact}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.navIcon}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            // Menu d'options pour QR, upload, ou photo
            console.log('Options scan/upload/photo');
          }}
        >
          <Text style={styles.navIcon}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Museum3D')}
        >
          <Text style={styles.navIcon}>🏛️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    flex: 1,
    marginLeft: 16,
  },
  searchIcon: {
    fontSize: 20,
  },
  shareButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  shareText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  categoryScroll: {
    backgroundColor: '#fff',
    maxHeight: 50,
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  picassoBar: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    alignItems: 'center',
  },
  picassoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  gridContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 12,
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  heartIcon: {
    fontSize: 18,
  },
  gridContent: {
    justifyContent: 'flex-end',
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  navbar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonActive: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1000,
  },
  backIcon: {
    fontSize: 16,
    color: '#000',
  },
});
