// src/screens/SoundDetailScreen.jsx (начало файла)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { COLORS } from '../constants/colors';
import AppButton from '../components/ui/AppButton';
import { usePlayerStore } from '../store/usePlayerStore'; // <-- ДОБАВИЛИ

export default function SoundDetailScreen({ navigation, route }) {
  const [volume, setVolume] = useState(0.8);
  
  // Достаем функции для работы с избранным
  const { favorites, toggleFavorite, currentSound } = usePlayerStore();
  
  // Если звук передан через route.params, берем его, иначе берем текущий из плеера (или дефолтный)
  const sound = route.params?.sound || currentSound || { id: '1', title: 'Ночной дождь', subtitle: 'Дождь · Легкий ветер', iconName: 'rainy-outline' };
  
  // Проверяем, в избранном ли этот звук
  const isLiked = favorites.includes(sound.id);

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка с кнопкой назад */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Детали звука</Text>
        <TouchableOpacity onPress={() => toggleFavorite(sound.id)} style={styles.iconButton}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={26} 
            color={isLiked ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Большая обложка */}
        <View style={styles.artworkContainer}>
          <View style={styles.artwork}>
            <Ionicons name="rainy" size={100} color={COLORS.PRIMARY} opacity={0.3} />
          </View>
        </View>

        {/* Информация */}
        <View style={styles.info}>
          <Text style={styles.title}>{sound.title}</Text>
          <Text style={styles.subtitle}>{sound.subtitle}</Text>
        </View>

        {/* Настройка громкости */}
        <View style={styles.volumeSection}>
          <Text style={styles.sectionTitle}>Громкость звука</Text>
          <View style={styles.volumeRow}>
            <Ionicons name="volume-low" size={24} color={COLORS.TEXT_SECONDARY} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={setVolume}
              minimumTrackTintColor={COLORS.PRIMARY}
              maximumTrackTintColor={COLORS.SURFACE_LIGHT}
              thumbTintColor={COLORS.PRIMARY}
            />
            <Ionicons name="volume-high" size={24} color={COLORS.TEXT_SECONDARY} />
          </View>
        </View>
      </View>

      {/* Кнопки внизу */}
      <View style={styles.bottomButtons}>
        <AppButton 
          title="Добавить в микс" 
          variant="outline" 
          onPress={() => {}} 
          style={styles.outlineButton}
        />
        <AppButton 
          title="Слушать сейчас" 
          variant="primary" 
          onPress={() => navigation.navigate('NowPlaying')} 
          style={styles.primaryButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  artworkContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  artwork: {
    width: 240,
    height: 240,
    borderRadius: 24,
    backgroundColor: COLORS.SURFACE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.SURFACE_LIGHT,
  },
  info: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.TEXT_SECONDARY,
  },
  volumeSection: {
    backgroundColor: COLORS.SURFACE,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 10,
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
  },
  bottomButtons: {
    padding: 24,
    gap: 12,
  },
  outlineButton: {
    marginBottom: 0,
  },
  primaryButton: {},
});