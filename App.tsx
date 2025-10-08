import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ArtifactListingScreen from './src/screens/ArtifactListingScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import Museum3DScreen from './src/screens/Museum3DScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { I18nProvider } from './src/utils/i18n';
import QRScanScreen from './src/screens/QRScanScreen';
import { FavoritesProvider } from './src/utils/favorites';
import HistoryTimelineScreen from './src/screens/HistoryTimelineScreen';
import GriotScreen from './src/screens/GriotScreen';
import Artwork3DScreen from './src/screens/Artwork3DScreen';
import ARNavigationScreen from './src/screens/ARNavigationScreen';
import ReserveVisitScreen from './src/screens/ReserveVisitScreen';


import { useFonts } from 'expo-font';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { MadimiOne_400Regular } from '@expo-google-fonts/madimi-one';


export type RootStackParamList = {
  Home: undefined;
  ArtifactListing: { category: string };
  ArtifactDetail: { artifact: import('./src/types/Artifact').Artifact };
  Favorites: undefined;
  Museum3D: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    MadimiOne_400Regular,
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }
  return (
    <I18nProvider>
      <FavoritesProvider>
        <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* @ts-ignore */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="ArtifactListing" component={ArtifactListingScreen} />
          <Stack.Screen name="ArtifactDetail" component={require('./src/screens/ArtifactDetailScreen').default} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Museum3D" component={Museum3DScreen} />
          {/* Non typed route, extend RootStackParamList if needed */}
          {/* @ts-ignore */}
          <Stack.Screen name="QRScan" component={QRScanScreen} />
          {/* @ts-ignore */}
          <Stack.Screen name="HistoryTimeline" component={HistoryTimelineScreen} />
          {/* @ts-ignore */}
          <Stack.Screen name="Griot" component={GriotScreen} />
          {/* @ts-ignore */}
          <Stack.Screen name="Artwork3D" component={Artwork3DScreen} />
          {/* @ts-ignore */}
          <Stack.Screen name="ARNavigation" component={ARNavigationScreen} />
          {/* @ts-ignore */}
          <Stack.Screen name="ReserveVisit" component={ReserveVisitScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </I18nProvider>
  );
}
