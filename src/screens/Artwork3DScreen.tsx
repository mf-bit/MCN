import React, { useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles';
import { BackIcon } from '../components/icons';

const { width, height } = Dimensions.get('window');

export default function Artwork3DScreen({ navigation }: any) {
  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        rotateY.setValue(g.dx / 2);
        rotateX.setValue(-g.dy / 2);
      },
      onPanResponderRelease: () => {
        Animated.spring(rotateX, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
        Animated.spring(rotateY, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>3D View (MVP)</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.stage}>
        <Animated.View
          style={{
            width: 200,
            height: 200,
            backgroundColor: colors.primary[500],
            borderRadius: 16,
            transform: [
              { perspective: 600 },
              { rotateX: rotateX.interpolate({ inputRange: [-180, 180], outputRange: ['-180deg', '180deg'] }) },
              { rotateY: rotateY.interpolate({ inputRange: [-180, 180], outputRange: ['-180deg', '180deg'] }) },
              { scale },
            ],
          }}
          {...panResponder.panHandlers}
        />
        <Text style={styles.hint}>Drag to rotate • Pinch to zoom (MVP)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing[4], paddingTop: spacing[16], paddingBottom: spacing[4],
  },
  backButton: {
    width: 40, height: 40, borderRadius: borderRadius.full / 2,
    backgroundColor: colors.neutral.gray[100], justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.text.primary },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hint: { marginTop: spacing[3], color: colors.text.secondary },
});


