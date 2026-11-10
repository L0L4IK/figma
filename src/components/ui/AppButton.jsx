// src/components/ui/AppButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function AppButton({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary', 'outline', 'danger'
  loading = false,
  disabled = false,
  style 
}) {
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.primary,
        isOutline && styles.outline,
        isDanger && styles.danger,
        disabled && { opacity: 0.5 },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? COLORS.PRIMARY : COLORS.BACKGROUND} />
      ) : (
        <Text style={[
          styles.text,
          isOutline && styles.textOutline,
          isDanger && styles.textDanger
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  primary: {
    backgroundColor: COLORS.PRIMARY,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  danger: {
    backgroundColor: 'rgba(248, 113, 113, 0.1)', // Полупрозрачный красный
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BACKGROUND, // Темный текст для светлой фиолетовой кнопки
  },
  textOutline: {
    color: COLORS.PRIMARY,
  },
  textDanger: {
    color: COLORS.DANGER,
  }
});