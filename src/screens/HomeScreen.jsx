// src/screens/HomeScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import AppInput from '../components/ui/AppInput';
import SoundCard from '../components/domain/SoundCard';
import { MOCK_SOUNDS, CATEGORIES } from '../constants/mockSounds';
import { usePlayerStore } from '../store/usePlayerStore';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  
  const playSound = usePlayerStore((state) => state.playSound);

  const filteredSounds = MOCK_SOUNDS.filter(sound => {
    const matchSearch = sound.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'Все' || sound.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleSoundPress = (sound) => {
    playSound(sound);
    navigation.navigate('NowPlaying');
  };

  // Переход к деталям конкретного звука
  const handleDetailsPress = (sound) => {
    navigation.navigate('SoundDetail', { sound });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Шапка (кнопки назад тут быть не должно, это главный экран) */}
        <View style={styles.header}>
          <Text style={styles.logo}>Deeply</Text>
        </View>

        <Text style={styles.greetingTitle}>Ваше тихое место</Text>
        <Text style={styles.greetingSubtitle}>Оставьте день позади. Ночь — для вас.</Text>

        {/* Поиск */}
        <View style={styles.searchWrapper}>
          <AppInput 
            value={search}
            onChangeText={setSearch}
            placeholder="Найти нужный звук"
          />
        </View>

        {/* Категории */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat}
              style={[styles.chip, activeCategory === cat && styles.chipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Список карточек */}
        <View style={styles.list}>
          {filteredSounds.map((sound) => (
            <SoundCard 
              key={sound.id}
              title={sound.title} 
              subtitle={sound.subtitle}
              iconName={sound.iconName}
              onPress={() => handleSoundPress(sound)}
            />
          ))}
          {filteredSounds.length === 0 && (
            <Text style={styles.emptyText}>Ничего не найдено</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  header: { marginBottom: 24, marginTop: 10 },
  logo: { fontSize: 24, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, letterSpacing: 0.5 },
  greetingTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginBottom: 8 },
  greetingSubtitle: { fontSize: 15, color: COLORS.TEXT_SECONDARY, marginBottom: 24 },
  searchWrapper: { marginBottom: 20 },
  categoriesScroll: { marginBottom: 24 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, backgroundColor: COLORS.SURFACE, marginRight: 12 },
  chipActive: { backgroundColor: COLORS.PRIMARY },
  chipText: { color: COLORS.TEXT_SECONDARY, fontSize: 14, fontWeight: '500' },
  chipTextActive: { color: COLORS.BACKGROUND, fontWeight: 'bold' },
  list: { marginTop: 8 },
  emptyText: { color: COLORS.TEXT_MUTED, textAlign: 'center', marginTop: 20, fontSize: 16 },
});