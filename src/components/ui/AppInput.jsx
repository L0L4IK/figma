// src/components/ui/AppInput.jsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function AppInput({ 
  value, 
  onChangeText, 
  placeholder, 
  iconName = 'search-outline',
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[
      styles.container, 
      isFocused && styles.containerFocused
    ]}>
      {iconName && (
        <Ionicons name={iconName} size={20} color={COLORS.TEXT_MUTED} style={styles.icon} />
      )}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_MUTED}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  containerFocused: {
    borderColor: COLORS.PRIMARY,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
  },
});