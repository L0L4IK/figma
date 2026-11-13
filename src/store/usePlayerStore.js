// src/store/usePlayerStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      // --- Плеер ---
      currentSound: null,
      isPlaying: false,
      volume: 0.8,
      
      // --- Избранное ---
      favorites: [],

      // --- Таймер ---
      timerEnd: null,
      timerMinutes: 0,

      // --- Миксы ---
      mixSounds: [], // Текущий редактируемый микс

      // --- Экшены плеера ---
      playSound: (sound) => set({ currentSound: sound, isPlaying: true }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setVolume: (vol) => set({ volume: vol }),
      stopSound: () => set({ currentSound: null, isPlaying: false }),

      // --- Экшены избранного ---
      toggleFavorite: (sound) => set((state) => {
        const isFav = state.favorites.some(fav => fav.id === sound.id);
        if (isFav) {
          return { favorites: state.favorites.filter(fav => fav.id !== sound.id) };
        } else {
          return { favorites: [...state.favorites, sound] };
        }
      }),

      // --- Экшены таймера ---
      startTimer: (minutes) => {
        const end = Date.now() + minutes * 60 * 1000;
        set({ timerEnd: end, timerMinutes: minutes });
      },
      cancelTimer: () => set({ timerEnd: null, timerMinutes: 0 }),

      // --- Экшены миксов ---
      addToMix: (sound) => set((state) => {
        // Если звук уже есть в миксе, не добавляем его повторно
        if (state.mixSounds.find(s => s.id === sound.id)) return state;
        // По умолчанию ставим громкость 50%
        return { mixSounds: [...state.mixSounds, { ...sound, mixVolume: 0.5 }] };
      }),
      removeFromMix: (id) => set((state) => ({
        mixSounds: state.mixSounds.filter(s => s.id !== id)
      })),
      setMixVolume: (id, vol) => set((state) => ({
        mixSounds: state.mixSounds.map(s => s.id === id ? { ...s, mixVolume: vol } : s)
      })),
      clearMix: () => set({ mixSounds: [] }),
    }),
    {
      name: 'deeply-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites }), 
    }
  )
);