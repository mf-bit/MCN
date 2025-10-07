import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, borderRadius, shadows } from '../styles';
import { GriotIcon } from './icons';

export default function GriotAvatar({ onPress, color = colors.primary[500], size = 56 }: { onPress?: () => void; color?: string; size?: number; }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: -6, duration: 1600, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }], alignItems: 'center' }}>
      <View pointerEvents="none" style={[styles.pulse, { width: size + 16, height: size + 16, borderRadius: (size + 16) / 2 }]} />
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}> 
        <GriotIcon size={Math.round(size * 0.55)} color={colors.neutral.white} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  pulse: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.05)',
    top: -8,
    left: -8,
    zIndex: -1,
  },
});


