import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { BottomNavigation } from '../components/BottomNavigation';

type Museum3DScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Museum3D'>;

interface Props {
  navigation: Museum3DScreenNavigationProp;
}

export default function Museum3DScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Musée en 3D</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Explorez le musée en réalité virtuelle</Text>
        {/* Ajoute ici le contenu 3D */}
      </View>

      <BottomNavigation navigation={navigation} activeTab="museum" />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#848587',
    textAlign: 'center',
    marginTop: 20,
  },
});
