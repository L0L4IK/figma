// src/api/soundService.js
import { SOUNDS, getSoundUrl } from 'sounds-for-focus';

// Преобразуем данные из библиотеки в формат нашего приложения
export const fetchSoundsFromAPI = async () => {
  // Имитация задержки сети для красивой загрузки (Skeleton Screens)
  return new Promise((resolve) => {
    setTimeout(() => {
      const formattedSounds = SOUNDS.map((sound, index) => ({
        id: sound.id,
        title: sound.name,
        subtitle: sound.category,
        iconName: getIconByCategory(sound.category), // Подбираем иконку
        category: sound.category,
        audioUrl: getSoundUrl(sound), // Реальная ссылка на MP3 с CDN
      }));
      resolve(formattedSounds);
    }, 800); 
  });
};

// Вспомогательная функция для иконок
const getIconByCategory = (category) => {
  switch (category) {
    case 'rain': return 'rainy-outline';
    case 'nature': return 'leaf-outline';
    case 'animals': return 'paw-outline';
    case 'urban': return 'business-outline';
    case 'noise': return 'radio-outline';
    default: return 'musical-notes-outline';
  }
};