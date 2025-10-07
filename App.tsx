import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ArtifactListingScreen from './src/screens/ArtifactListingScreen';

export type RootStackParamList = {
  Home: undefined;
  ArtifactListing: { category: string };
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
