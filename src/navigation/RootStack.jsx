// src/navigation/RootStack.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Импортируем табы и экраны, которые будут открываться поверх них
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
        headerShown: false, // Отключаем стандартные шапки
        headerStyle: { backgroundColor: COLORS.SURFACE },
        headerTintColor: COLORS.TEXT_PRIMARY,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* 1. Главный экран (Табы) */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      {/* 2. Экраны, которые открываются поверх */}
      <Stack.Screen 
        name="SoundDetail" 
        component={SoundDetailScreen} 
        options={{ animation: 'slide_from_right' }} 
      />
      
      {/* Плеер делаем модальным окном (выезжает снизу) */}
      <Stack.Screen 
        name="NowPlaying" 
        component={NowPlayingScreen} 
        options={{ 
          presentation: 'modal', 
          animation: 'slide_from_bottom' 
        }} 
      />
      
      <Stack.Screen 
        name="MixEditor" 
        component={MixEditorScreen} 
        options={{ animation: 'slide_from_bottom' }} 
      />
    </Stack.Navigator>
  );
}