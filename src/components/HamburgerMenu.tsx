import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../styles';

export default function HamburgerMenu({ onNavigate }: { onNavigate: (route: string) => void }) {
  const [open, setOpen] = useState(false);
  const Item = ({ label, route }: { label: string; route: string }) => (
    <TouchableOpacity style={styles.item} onPress={() => { setOpen(false); onNavigate(route); }}>
      <Text style={styles.itemText}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <Text style={styles.title}>Menu</Text>
            <Item label="Settings" route="Settings" />
            <Item label="Theme" route="Settings" />
            <Item label="Language" route="Settings" />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: { width: 40, height: 40, borderRadius: borderRadius.full / 2, backgroundColor: colors.neutral.gray[100], justifyContent: 'center', alignItems: 'center' },
  line: { width: 18, height: 2, backgroundColor: colors.text.primary, marginVertical: 2, borderRadius: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-start', paddingTop: 80 },
  menu: { marginHorizontal: spacing[4], backgroundColor: colors.neutral.white, borderRadius: borderRadius.lg, padding: spacing[4], ...shadows.md },
  title: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold, marginBottom: spacing[2], color: colors.text.primary },
  item: { paddingVertical: spacing[3] },
  itemText: { color: colors.text.primary, fontWeight: typography.fontWeight.medium },
});


