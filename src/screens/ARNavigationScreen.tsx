import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles';
import { BackIcon } from '../components/icons';

export default function ARNavigationScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>AR Navigation (MVP)</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.body}>
        <View style={styles.arrow} />
        <Text style={styles.hint}>Placez votre téléphone et suivez la flèche jusqu’à l’œuvre.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing[4], paddingTop: spacing[16], paddingBottom: spacing[4] },
  backButton: { width: 40, height: 40, borderRadius: borderRadius.full / 2, backgroundColor: colors.neutral.gray[100], justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.text.primary },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  arrow: { width: 0, height: 0, borderLeftWidth: 30, borderRightWidth: 30, borderBottomWidth: 60, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: colors.primary[500], marginBottom: spacing[4] },
  hint: { color: colors.text.secondary, paddingHorizontal: spacing[6], textAlign: 'center' },
});


