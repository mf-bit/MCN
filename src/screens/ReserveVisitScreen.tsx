import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, borderRadius, typography, shadows } from '../styles';
import { BackIcon } from '../components/icons';

export default function ReserveVisitScreen({ navigation }: any) {
  const [form, setForm] = useState({ name: '', date: '', time: '', people: '1' });
  const save = async () => {
    const listRaw = await AsyncStorage.getItem('mcn_reservations');
    const list = listRaw ? JSON.parse(listRaw) : [];
    list.push({ ...form, createdAt: Date.now() });
    await AsyncStorage.setItem('mcn_reservations', JSON.stringify(list));
    Alert.alert('Réservation', 'Votre demande a été enregistrée.');
    navigation.goBack();
  };
  const onChange = (k: string, v: string) => setForm({ ...form, [k]: v });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Réserver une visite</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.card}>
        {(['name','date','time','people'] as const).map((k) => (
          <TextInput key={k} placeholder={k} value={(form as any)[k]} onChangeText={(t) => onChange(k, t)} style={styles.input} />
        ))}
        <TouchableOpacity style={styles.btn} onPress={save}><Text style={styles.btnText}>Envoyer</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing[4], paddingTop: spacing[16], paddingBottom: spacing[4] },
  backButton: { width: 40, height: 40, borderRadius: borderRadius.full / 2, backgroundColor: colors.neutral.gray[100], justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.text.primary },
  card: { margin: spacing[4], backgroundColor: colors.neutral.white, borderRadius: borderRadius.lg, padding: spacing[4], ...shadows.sm },
  input: { backgroundColor: colors.neutral.gray[100], borderRadius: borderRadius.md, padding: spacing[3], marginBottom: spacing[3] },
  btn: { backgroundColor: colors.primary[500], borderRadius: borderRadius['3xl'], paddingVertical: spacing[3], alignItems: 'center' },
  btnText: { color: colors.neutral.white, fontWeight: typography.fontWeight.semibold },
});


