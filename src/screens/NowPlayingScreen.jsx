// src/screens/NowPlayingScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // <-- ИСПРАВЛЕНО
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { COLORS } from '../constants/colors';
import { usePlayerStore } from '../store/usePlayerStore';

export default function NowPlayingScreen({ navigation }) {
  const { 
    currentSound, 
    isPlaying, 
    togglePlay, 
    volume, 
    setVolume, 
    favorites, 
    toggleFavorite 
  } = usePlayerStore();

  const isLiked = currentSound ? favorites.includes(currentSound.id) : false;

  if (!currentSound) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="chevron-down" size={28} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: COLORS.TEXT_PRIMARY, textAlign: 'center', marginTop: 50 }}>
          Звук не выбран
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={28} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Сейчас играет</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Обложка */}
      <View style={styles.artworkContainer}>
        <View style={styles.artwork}>
          <Ionicons name={currentSound.iconName} size={80} color={COLORS.PRIMARY} opacity={0.3} />
        </View>
      </View>

      {/* Инфо и Лайк */}
      <View style={styles.infoContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{currentSound.title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{currentSound.subtitle}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(currentSound.id)} style={{ padding: 8 }}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={28} 
            color={isLiked ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY} 
          />
        </TouchableOpacity>
      </View>

      {/* Прогресс */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={0.3}
          minimumTrackTintColor={COLORS.PRIMARY}
          maximumTrackTintColor={COLORS.SURFACE_LIGHT}
          thumbTintColor={COLORS.PRIMARY}
        />
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>00:34</Text>
          <Text style={styles.timeText}>Бесконечно</Text>
        </View>
      </View>

      {/* Кнопки управления */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={32} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={36} 
            color={COLORS.BACKGROUND} 
            style={{ marginLeft: isPlaying ? 0 : 4 }} 
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={32} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Громкость */}
      <View style={styles.bottomContainer}>
        <View style={styles.volumeRow}>
          <Ionicons name="volume-low-outline" size={20} color={COLORS.TEXT_SECONDARY} />
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor={COLORS.TEXT_SECONDARY}
            maximumTrackTintColor={COLORS.SURFACE_LIGHT}
            thumbTintColor={COLORS.TEXT_PRIMARY}
          />
          <Ionicons name="volume-high-outline" size={20} color={COLORS.TEXT_SECONDARY} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND, paddingHorizontal: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  iconButton: { padding: 8 },
  headerTitle: { color: COLORS.TEXT_SECONDARY, fontSize: 14, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1 },
  artworkContainer: { alignItems: 'center', marginVertical: 30 },
  artwork: { width: 260, height: 260, borderRadius: 24, backgroundColor: COLORS.SURFACE, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.SURFACE_LIGHT },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginBottom: 6 },
  subtitle: { fontSize: 14, color: COLORS.TEXT_SECONDARY },
  progressContainer: { marginBottom: 20 },
  slider: { width: '100%', height: 40 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: -10 },
  timeText: { fontSize: 12, color: COLORS.TEXT_MUTED },
  controlsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40, marginBottom: 40 },
  playButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center' },
  bottomContainer: { marginTop: 'auto', marginBottom: 20 },
  volumeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  volumeSlider: { flex: 1, marginHorizontal: 10, height: 40 },
});