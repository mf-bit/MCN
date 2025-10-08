import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { artifacts } from '../data/artifacts';
import { useFavorites } from '../utils/favorites';
import { colors, spacing, borderRadius, typography } from '../styles';
import { RootStackParamList } from '../../App';
import { BottomNavigation } from '../components/BottomNavigation';
import { Artifact } from '../types/Artifact';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;

interface Props {
  navigation: FavoritesScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

export default function FavoritesScreen({ navigation }: Props) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const data = artifacts.filter(a => favoriteIds.has(a.id));

  const renderArtifact = ({ item }: { item: Artifact }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ArtifactDetail', { artifact: item })}>
      <Image source={item.image_url} style={styles.gridImage} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gridGradient}
      >
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
        >
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mes Favoris</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Grid des favoris */}
      <FlatList
        data={data}
        renderItem={renderArtifact}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />

      <BottomNavigation navigation={navigation} activeTab="favorites" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backIcon: {
    fontSize: 16,
    color: '#1E1E1E',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    fontFamily: 'MadimiOne_400Regular',
  },
  placeholder: {
    width: 60, // Pour équilibrer le header
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Espace pour le menu footer
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'space-between',
    padding: 12,
  },
  heartButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 16,
  },
  gridContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gridTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
});


