import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { BackIcon } from '../components/icons';
import { useI18n } from '../utils/i18n';
import { CameraView, useCameraPermissions } from 'expo-camera';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function QRScanScreen({ navigation }: { navigation: Nav }) {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'found' | 'denied'>('idle');
  const [permission, requestPermission] = useCameraPermissions();
  const hasPermission = permission?.granted;
  useEffect(() => {
    if (permission == null) requestPermission();
    else if (!permission.granted) setStatus('denied');
    else setStatus('scanning');
  }, [permission]);

  const simulateScan = () => {
    setStatus('scanning');
    setTimeout(() => setStatus('found'), 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.scanner}>
        {hasPermission ? (
          <View style={styles.frame}>
            <CameraView
              onBarcodeScanned={({ data }) => {
                setStatus('found');
              }}
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        ) : (
          <View style={styles.frame} />
        )}
        <Text style={styles.hint}>{hasPermission ? 'Scannez un code' : 'Autorisation caméra requise'}</Text>
      </View>

      {!hasPermission && (
        <TouchableOpacity style={styles.scanBtn} onPress={simulateScan}>
          <Text style={styles.scanBtnText}>{status === 'scanning' ? 'Scanning…' : 'Simuler un scan'}</Text>
        </TouchableOpacity>
      )}

      {status === 'found' && (
        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => navigation.navigate('ArtifactListing', { category: 'all' })}
        >
          <Text style={styles.openBtnText}>Ouvrir l’œuvre trouvée</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[16],
    paddingBottom: spacing[4],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.neutral.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  scanner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: {
    width: 260,
    height: 260,
    borderRadius: borderRadius.lg,
    borderWidth: 4,
    borderColor: colors.primary[500],
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  hint: { marginTop: spacing[4], color: colors.text.secondary },
  scanBtn: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[2],
    backgroundColor: colors.primary[500],
    paddingVertical: spacing[3],
    borderRadius: borderRadius['3xl'],
    alignItems: 'center',
  },
  scanBtnText: { color: colors.neutral.white, fontWeight: typography.fontWeight.semibold },
  openBtn: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[8],
    backgroundColor: colors.neutral.white,
    paddingVertical: spacing[3],
    borderRadius: borderRadius['3xl'],
    alignItems: 'center',
    ...shadows.sm,
  },
  openBtnText: { color: colors.text.primary, fontWeight: typography.fontWeight.semibold },
});


