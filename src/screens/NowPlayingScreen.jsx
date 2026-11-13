import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudioPlayer } from 'expo-audio';
import { COLORS } from '../constants/colors';
import { usePlayerStore } from '../store/usePlayerStore';

export default function NowPlayingScreen({ navigation }) {
  const { 
    currentSound, isPlaying, togglePlay, volume, setVolume, 
    favorites, toggleFavorite, timerEnd, startTimer, cancelTimer
  } = usePlayerStore();

  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  // Хук expo-audio
  const player = useAudioPlayer(currentSound?.audioUrl);

  const isLiked = currentSound ? favorites.some(fav => fav.id === currentSound.id) : false;

  useEffect(() => {
    if (!player || !currentSound) return;
    if (isPlaying) player.play();
    else player.pause();
  }, [isPlaying, player, currentSound]);

  useEffect(() => {
    if (player) player.volume = volume;
  }, [volume, player]);

  useEffect(() => {
    if (player) player.loop = true;
  }, [player]);

  useEffect(() => {
    if (player) {
      const timer = setTimeout(() => setIsLoadingAudio(false), 500);
      return () => clearTimeout(timer);
    }
  }, [player]);

  if (!currentSound) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={28} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.TEXT_PRIMARY, textAlign: 'center', marginTop: 50 }}>Звук не выбран</Text>
      </SafeAreaView>
    );
  }

  const formatTimer = () => {
    if (!timerEnd) return 'Таймер';
    const mins = Math.ceil((timerEnd - Date.now()) / 60000);
    return mins > 0 ? `Таймер · ${mins} мин` : 'Время вышло';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={28} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Сейчас играет</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.artworkContainer}>
        <View style={styles.artwork}>
          {isLoadingAudio ? <ActivityIndicator size="large" color={COLORS.PRIMARY} /> : 
           <Ionicons name={currentSound.iconName || 'musical-notes'} size={80} color={COLORS.PRIMARY} opacity={0.3} />}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{currentSound.title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{currentSound.subtitle}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(currentSound)} style={{ padding: 8 }}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity><Ionicons name="play-skip-back" size={32} color={COLORS.TEXT_PRIMARY} /></TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={togglePlay} disabled={isLoadingAudio}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={36} color={COLORS.BACKGROUND} style={{ marginLeft: isPlaying ? 0 : 4 }} />
        </TouchableOpacity>
        <TouchableOpacity><Ionicons name="play-skip-forward" size={32} color={COLORS.TEXT_PRIMARY} /></TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.volumeRow}>
          <Ionicons name="volume-low-outline" size={20} color={COLORS.TEXT_SECONDARY} />
          <Slider style={styles.volumeSlider} minimumValue={0} maximumValue={1} value={volume} onValueChange={setVolume} minimumTrackTintColor={COLORS.TEXT_SECONDARY} maximumTrackTintColor={COLORS.SURFACE_LIGHT} thumbTintColor={COLORS.TEXT_PRIMARY} />
          <Ionicons name="volume-high-outline" size={20} color={COLORS.TEXT_SECONDARY} />
        </View>
        <TouchableOpacity style={styles.timerButton} onPress={() => setIsTimerVisible(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="timer-outline" size={20} color={COLORS.PRIMARY} />
            <Text style={styles.timerText}>{formatTimer()}</Text>
          </View>
          {timerEnd && <TouchableOpacity onPress={cancelTimer}><Ionicons name="close-circle" size={20} color={COLORS.TEXT_MUTED} /></TouchableOpacity>}
        </TouchableOpacity>
      </View>

      <Modal visible={isTimerVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setIsTimerVisible(false)}><View style={styles.modalOverlay} /></TouchableWithoutFeedback>
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Таймер сна</Text>
          <View style={styles.timerGrid}>
            {[15, 30, 45, 60].map((min) => (
              <TouchableOpacity key={min} style={styles.timerChip} onPress={() => { startTimer(min); setIsTimerVisible(false); }}>
                <Text style={styles.timerChipText}>{min} мин</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsTimerVisible(false)}><Text style={styles.closeButtonText}>Закрыть</Text></TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ... Стили оставь те же, что были в предыдущем коде ...
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
  controlsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40, marginBottom: 30 },
  playButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center' },
  bottomContainer: { marginTop: 'auto', marginBottom: 20 },
  volumeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  volumeSlider: { flex: 1, marginHorizontal: 10, height: 40 },
  timerButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.SURFACE, padding: 16, borderRadius: 16 },
  timerText: { color: COLORS.TEXT_PRIMARY, fontSize: 15, fontWeight: '500', marginLeft: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  bottomSheet: { backgroundColor: COLORS.SURFACE, padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sheetHandle: { width: 40, height: 4, backgroundColor: COLORS.TEXT_MUTED, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginBottom: 20 },
  timerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  timerChip: { flex: 1, minWidth: '40%', backgroundColor: COLORS.BACKGROUND, padding: 16, borderRadius: 12, alignItems: 'center' },
  timerChipText: { color: COLORS.TEXT_PRIMARY, fontSize: 16, fontWeight: '600' },
  closeButton: { backgroundColor: COLORS.PRIMARY, padding: 16, borderRadius: 12, alignItems: 'center' },
  closeButtonText: { color: COLORS.BACKGROUND, fontSize: 16, fontWeight: 'bold' },
});