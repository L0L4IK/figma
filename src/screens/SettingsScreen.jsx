// src/screens/SettingsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Настройки</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Основное</Text>
        
        <TouchableOpacity 
          style={styles.row} 
          onPress={() => Alert.alert('Тёмная тема', 'Эта функция появится в следующем обновлении.')}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(167, 139, 250, 0.15)' }]}>
              <Ionicons name="moon" size={20} color={COLORS.PRIMARY} />
            </View>
            <Text style={styles.rowText}>Тёмная тема</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.TEXT_MUTED} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.row} 
          onPress={() => Alert.alert('Таймер по умолчанию', 'Сейчас установлен таймер на 30 минут.')}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <Ionicons name="timer" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.rowText}>Таймер по умолчанию</Text>
          </View>
          <Text style={styles.rowValue}>30 мин</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Поддержка</Text>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => Alert.alert('Помощь и FAQ', 'Здесь будет открываться страница с частыми вопросами.')}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
              <Ionicons name="help-circle" size={20} color="#22C55E" />
            </View>
            <Text style={styles.rowText}>Помощь и FAQ</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.TEXT_MUTED} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => Alert.alert('О приложении', 'Deeply — приложение для сна и медитации. Версия 1.0.0.')}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(148, 163, 184, 0.15)' }]}>
              <Ionicons name="information-circle" size={20} color={COLORS.TEXT_SECONDARY} />
            </View>
            <Text style={styles.rowText}>О приложении</Text>
          </View>
          <Text style={styles.rowValue}>v1.0.0</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY },
  content: { paddingHorizontal: 20, paddingTop: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.TEXT_MUTED, textTransform: 'uppercase', marginBottom: 12, marginTop: 16, marginLeft: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.SURFACE, padding: 16, borderRadius: 16, marginBottom: 12 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rowText: { fontSize: 16, color: COLORS.TEXT_PRIMARY, fontWeight: '500' },
  rowValue: { fontSize: 15, color: COLORS.TEXT_SECONDARY },
});