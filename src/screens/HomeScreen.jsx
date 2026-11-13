// src/screens/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, 
  ActivityIndicator, RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import AppInput from '../components/ui/AppInput';
import SoundCard from '../components/domain/SoundCard';
import { usePlayerStore } from '../store/usePlayerStore';
import { fetchSoundsFromAPI } from '../api/soundService';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [sounds, setSounds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const playSound = usePlayerStore((state) => state.playSound);

  const loadSounds = async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSoundsFromAPI();
      setSounds(data);
    } catch (err) {
      setError('Не удалось загрузить звуки. Проверьте интернет.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSounds();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadSounds(false);
  };

  const dynamicCategories = ['Все', ...new Set(sounds.map(s => s.category))];

  const filteredSounds = sounds.filter(sound => {
    const matchSearch = sound.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'Все' || sound.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Загружаем звуки...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="cloud-offline-outline" size={64} color={COLORS.TEXT_MUTED} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadSounds()}>
          <Text style={styles.retryText}>Повторить</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={COLORS.PRIMARY} />}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>Deeply</Text>
        </View>

        <Text style={styles.greetingTitle}>Ваше тихое место</Text>
        <Text style={styles.greetingSubtitle}>Оставьте день позади. Ночь — для вас.</Text>

        {/* БАННЕР МИКШЕРА */}
        <TouchableOpacity 
          style={styles.mixBanner} 
          onPress={() => navigation.navigate('MixEditor')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="layers" size={24} color={COLORS.PRIMARY} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.mixBannerTitle}>Создать свой микс</Text>
              <Text style={styles.mixBannerSub}>Смешайте до 4 звуков</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <AppInput 
            value={search}
            onChangeText={setSearch}
            placeholder="Найти нужный звук"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {dynamicCategories.map((cat) => (
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

        <View style={styles.list}>
          {filteredSounds.map((sound) => (
            <SoundCard 
              key={sound.id}
              title={sound.title} 
              subtitle={sound.subtitle}
              iconName={sound.iconName}
              onPress={() => {
                playSound(sound);
                navigation.navigate('NowPlaying');
              }}
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
  centerContainer: { flex: 1, backgroundColor: COLORS.BACKGROUND, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { color: COLORS.TEXT_SECONDARY, marginTop: 16, fontSize: 16 },
  errorText: { color: COLORS.TEXT_SECONDARY, marginTop: 16, fontSize: 16, textAlign: 'center', marginBottom: 24 },
  retryButton: { backgroundColor: COLORS.SURFACE, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: COLORS.BORDER },
  retryText: { color: COLORS.TEXT_PRIMARY, fontWeight: '600', fontSize: 16 },
  
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  header: { marginBottom: 24, marginTop: 10 },
  logo: { fontSize: 24, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, letterSpacing: 0.5 },
  greetingTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginBottom: 8 },
  greetingSubtitle: { fontSize: 15, color: COLORS.TEXT_SECONDARY, marginBottom: 24 },

  mixBanner: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'rgba(167, 139, 250, 0.1)', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)'
  },
  mixBannerTitle: { fontSize: 16, fontWeight: '600', color: COLORS.PRIMARY },
  mixBannerSub: { fontSize: 13, color: COLORS.TEXT_SECONDARY, marginTop: 2 },

  searchWrapper: { marginBottom: 20 },
  categoriesScroll: { marginBottom: 24 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, backgroundColor: COLORS.SURFACE, marginRight: 12 },
  chipActive: { backgroundColor: COLORS.PRIMARY },
  chipText: { color: COLORS.TEXT_SECONDARY, fontSize: 14, fontWeight: '500' },
  chipTextActive: { color: COLORS.BACKGROUND, fontWeight: 'bold' },
  list: { marginTop: 8 },
  emptyText: { color: COLORS.TEXT_MUTED, textAlign: 'center', marginTop: 20, fontSize: 16 },
});