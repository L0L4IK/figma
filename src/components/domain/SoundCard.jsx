// src/components/domain/SoundCard.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function SoundCard({ title, subtitle, iconName = 'rainy', onPress, isActive }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Заглушка вместо картинки */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name={iconName} size={40} color={COLORS.PRIMARY} opacity={0.5} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
        
        {/* Кнопка Play внутри карточки */}
        <View style={styles.playButton}>
          <Ionicons 
            name={isActive ? "pause" : "play"} 
            size={20} 
            color={COLORS.BACKGROUND} 
            style={{ marginLeft: isActive ? 0 : 2 }} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#1E293B', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});