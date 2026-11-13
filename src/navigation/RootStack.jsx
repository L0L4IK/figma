// src/navigation/RootStack.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import SoundDetailScreen from '../screens/SoundDetailScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import MixEditorScreen from '../screens/MixEditorScreen';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.SURFACE },
        headerTintColor: COLORS.TEXT_PRIMARY,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="SoundDetail" component={SoundDetailScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="NowPlaying" component={NowPlayingScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="MixEditor" component={MixEditorScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}