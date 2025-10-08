import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { artifacts } from '../data/artifacts';
import { useFavorites } from '../utils/favorites';
import { colors, spacing, borderRadius, typography } from '../styles';

export default function FavoritesScreen() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const data = artifacts.filter(a => favoriteIds.has(a.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image_url} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.origin}>{item.origin}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => toggleFavorite(item.id)}>
              <Text style={styles.removeText}>Retirer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  title: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, margin: spacing[4] },
  list: { paddingHorizontal: spacing[4], paddingBottom: spacing[8] },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: borderRadius.lg, marginBottom: spacing[3], overflow: 'hidden' },
  image: { width: 80, height: 80 },
  info: { flex: 1, padding: spacing[3] },
  name: { fontWeight: typography.fontWeight.semibold },
  origin: { color: colors.text.secondary, marginTop: 2 },
  removeBtn: { paddingHorizontal: spacing[3], justifyContent: 'center' },
  removeText: { color: '#c00' },
});


