// src/screens/LibraryScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import SoundCard from '../components/domain/SoundCard';
import { usePlayerStore } from '../store/usePlayerStore';
import { MOCK_SOUNDS } from '../constants/mockSounds';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryScreen({ navigation }) {
  const { favorites, playSound } = usePlayerStore();

  // Фильтруем нашу базу звуков, оставляя только те, что в избранном
  const favoriteSounds = MOCK_SOUNDS.filter(sound => favorites.includes(sound.id));

  const handleSoundPress = (sound) => {
    playSound(sound);
    navigation.navigate('NowPlaying');
  };

  if (favoriteSounds.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Библиотека</Text>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="heart-dislike-outline" size={64} color={COLORS.TEXT_MUTED} />
          <Text style={styles.emptyTitle}>Пока пусто</Text>
          <Text style={styles.emptySubtitle}>Добавляйте звуки в избранное, нажимая на сердечко</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Избранное</Text>
        <Text style={styles.count}>{favoriteSounds.length} звуков</Text>
      </View>
      
      <FlatList
        data={favoriteSounds}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SoundCard 
            title={item.title} 
            subtitle={item.subtitle}
            iconName={item.iconName}
            onPress={() => handleSoundPress(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY },
  count: { fontSize: 14, color: COLORS.TEXT_SECONDARY, fontWeight: '500' },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 15, color: COLORS.TEXT_SECONDARY, textAlign: 'center', lineHeight: 22 },
});