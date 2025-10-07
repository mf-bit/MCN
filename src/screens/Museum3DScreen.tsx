import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Museum3DScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Musée en 3D</Text>
      {/* Ajoute ici le contenu 3D */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
