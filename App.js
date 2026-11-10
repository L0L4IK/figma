// App.js
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// МЕНЯЕМ ИМПОРТ ЗДЕСЬ:
import RootStack from './src/navigation/RootStack';
import { COLORS } from './src/constants/colors';

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: COLORS.BACKGROUND,
    card: COLORS.SURFACE,
    text: COLORS.TEXT_PRIMARY,
    border: COLORS.BORDER,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        {/* И ЗДЕСЬ: */}
        <RootStack /> 
      </NavigationContainer>
    </SafeAreaProvider>
  );
}