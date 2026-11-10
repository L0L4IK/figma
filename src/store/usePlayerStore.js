// src/store/usePlayerStore.js
import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  // 1. Состояние плеера
  currentSound: null, 
  isPlaying: false,   
  volume: 0.8,        

  // 2. Избранное (массив ID звуков)
  favorites: [],

  // 3. Экшены (действия)
  playSound: (sound) => set({ currentSound: sound, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (vol) => set({ volume: vol }),
  stopSound: () => set({ currentSound: null, isPlaying: false }),

  // 4. Логика избранного
  toggleFavorite: (soundId) => set((state) => {
    const isFav = state.favorites.includes(soundId);
    if (isFav) {
      return { favorites: state.favorites.filter(id => id !== soundId) };
    } else {
      return { favorites: [...state.favorites, soundId] };
    }
  }),

  isFavorite: (soundId) => get().favorites.includes(soundId),

  // 5. Таймер (заготовка)
  timerEnd: null, 
  timerMinutes: 0, 
  startTimer: (minutes) => {
    const end = Date.now() + minutes * 60 * 1000;
    set({ timerEnd: end, timerMinutes: minutes });
  },
  cancelTimer: () => set({ timerEnd: null, timerMinutes: 0 }),
}));