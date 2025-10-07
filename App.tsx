import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ArtifactListingScreen from './src/screens/ArtifactListingScreen';
import ArtifactDetailScreen from './src/screens/ArtifactDetailScreen';
import LikedArtifactsScreen from './src/screens/LikedArtifactsScreen';
import MuseumStatsScreen from './src/screens/MuseumStatsScreen';
import GriotScreen from './src/screens/GriotScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HistoryTimelineScreen from './src/screens/HistoryTimelineScreen';
import { HeartIcon, StatsIcon, GriotIcon, SettingsIcon } from './src/components/icons';

export type RootStackParamList = {
  Home: undefined;
  ArtifactListing: { category: string };
  ArtifactDetail: { artifact: import('./src/types/Artifact').Artifact };
  HistoryTimeline: { artifact?: import('./src/types/Artifact').Artifact };
  LikedArtifacts: undefined;
  MuseumStats: undefined;
  Griot: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarActiveTintColor: '#c4914f',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size/2 }} />
          ),
        }}
      />
      <Tab.Screen 
        name="LikedArtifacts" 
        component={LikedArtifactsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <HeartIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen 
        name="MuseumStats" 
        component={MuseumStatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <StatsIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Griot" 
        component={GriotScreen}
        options={{
          tabBarIcon: ({ color, size }) => <GriotIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <SettingsIcon size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="ArtifactListing" component={ArtifactListingScreen} />
        <Stack.Screen name="ArtifactDetail" component={ArtifactDetailScreen} />
        <Stack.Screen name="HistoryTimeline" component={HistoryTimelineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
