import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

export default function MixEditorScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Редактор микса</Text>
      <Text style={styles.subtitle}>Здесь будут ползунки громкости</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Сохранить и закрыть</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.BACKGROUND, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY, marginBottom: 8 },
  subtitle: { fontSize: 15, color: COLORS.TEXT_MUTED, marginBottom: 24 },
  button: { backgroundColor: COLORS.PRIMARY, padding: 12, borderRadius: 8 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});