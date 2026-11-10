import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Настройки</Text>
      <Text style={styles.subtitle}>Таймер и темы</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.TEXT_MUTED,
  },
});