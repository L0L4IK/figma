// src/screens/MixEditorScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { COLORS } from '../constants/colors';
import { usePlayerStore } from '../store/usePlayerStore';
import { MOCK_SOUNDS } from '../constants/mockSounds';

export default function MixEditorScreen({ navigation }) {
  const { mixSounds, addToMix, removeFromMix, setMixVolume, clearMix } = usePlayerStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Фильтруем звуки, которых еще нет в миксе, для модалки добавления
  const availableSounds = MOCK_SOUNDS.filter(
    sound => !mixSounds.some(s => s.id === sound.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={28} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Микшер</Text>
        <TouchableOpacity onPress={clearMix} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color={COLORS.TEXT_MUTED} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {mixSounds.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="layers-outline" size={64} color={COLORS.TEXT_MUTED} />
            <Text style={styles.emptyTitle}>Микс пуст</Text>
            <Text style={styles.emptySubtitle}>Добавьте звуки, чтобы смешать их и создать свою атмосферу</Text>
          </View>
        ) : (
          mixSounds.map((sound) => (
            <View key={sound.id} style={styles.soundRow}>
              <View style={styles.soundHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={sound.iconName || 'musical-notes'} size={20} color={COLORS.PRIMARY} />
                  <Text style={styles.soundTitle}>{sound.title}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromMix(sound.id)}>
                  <Ionicons name="close-circle" size={24} color={COLORS.TEXT_MUTED} />
                </TouchableOpacity>
              </View>
              <View style={styles.sliderRow}>
                <Ionicons name="volume-low" size={16} color={COLORS.TEXT_SECONDARY} />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={sound.mixVolume}
                  onValueChange={(val) => setMixVolume(sound.id, val)}
                  minimumTrackTintColor={COLORS.PRIMARY}
                  maximumTrackTintColor={COLORS.SURFACE_LIGHT}
                  thumbTintColor={COLORS.PRIMARY}
                />
                <Ionicons name="volume-high" size={16} color={COLORS.TEXT_SECONDARY} />
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={20} color={COLORS.TEXT_PRIMARY} />
          <Text style={styles.addButtonText}>Добавить звук</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={styles.saveButtonText}>Сохранить микс</Text>
        </TouchableOpacity>
      </View>

      {/* Модалка добавления звука */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Добавить в микс</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {availableSounds.map((sound) => (
                <TouchableOpacity 
                  key={sound.id} 
                  style={styles.modalItem}
                  onPress={() => {
                    addToMix(sound);
                    setIsModalVisible(false);
                  }}
                >
                  <Ionicons name={sound.iconName} size={24} color={COLORS.TEXT_SECONDARY} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.modalItemTitle}>{sound.title}</Text>
                    <Text style={styles.modalItemSub}>{sound.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              {availableSounds.length === 0 && (
                <Text style={{ color: COLORS.TEXT_MUTED, textAlign: 'center', marginTop: 20 }}>Все звуки уже добавлены</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  iconButton: { padding: 8 },
  headerTitle: { color: COLORS.TEXT_SECONDARY, fontSize: 14, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1 },
  content: { padding: 20 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 15, color: COLORS.TEXT_SECONDARY, textAlign: 'center', paddingHorizontal: 20 },
  
  soundRow: { backgroundColor: COLORS.SURFACE, padding: 16, borderRadius: 16, marginBottom: 12 },
  soundHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  soundTitle: { fontSize: 16, fontWeight: '600', color: COLORS.TEXT_PRIMARY, marginLeft: 8 },
  sliderRow: { flexDirection: 'row', alignItems: 'center' },
  slider: { flex: 1, marginHorizontal: 10, height: 30 },
  
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: COLORS.SURFACE, backgroundColor: COLORS.BACKGROUND },
  addButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.SURFACE, padding: 16, borderRadius: 12, marginBottom: 12 },
  addButtonText: { color: COLORS.TEXT_PRIMARY, fontSize: 16, fontWeight: '600', marginLeft: 8 },
  saveButton: { backgroundColor: COLORS.PRIMARY, padding: 16, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: COLORS.BACKGROUND, fontSize: 16, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: COLORS.SURFACE, padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sheetHandle: { width: 40, height: 4, backgroundColor: COLORS.TEXT_MUTED, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginBottom: 16 },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.BACKGROUND },
  modalItemTitle: { fontSize: 16, color: COLORS.TEXT_PRIMARY, fontWeight: '500' },
  modalItemSub: { fontSize: 13, color: COLORS.TEXT_SECONDARY, marginTop: 2 },
  closeButton: { backgroundColor: COLORS.BACKGROUND, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  closeButtonText: { color: COLORS.TEXT_PRIMARY, fontSize: 16, fontWeight: 'bold' },
});