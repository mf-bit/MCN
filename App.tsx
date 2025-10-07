import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ArtifactListingScreen from './src/screens/ArtifactListingScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import Museum3DScreen from './src/screens/Museum3DScreen';

export type RootStackParamList = {
  Home: undefined;
  ArtifactListing: { category: string };
  ArtifactDetail: { artifact: import('./src/types/Artifact').Artifact };
  Favorites: undefined;
  Museum3D: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArtifactListing" component={ArtifactListingScreen} />
        <Stack.Screen name="ArtifactDetail" component={require('./src/screens/ArtifactDetailScreen').default} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Museum3D" component={Museum3DScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
