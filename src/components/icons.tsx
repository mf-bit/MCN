import React from 'react';
import { View } from 'react-native';

// Professional icon components using simple shapes and lines
export const SearchIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    borderWidth: 2,
    borderColor: color,
    borderRadius: size / 2,
    position: 'relative',
  }}>
    <View style={{
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 8,
      height: 2,
      backgroundColor: color,
      transform: [{ rotate: '45deg' }],
    }} />
  </View>
);

export const AudioIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: 12,
      height: 16,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 2,
      position: 'absolute',
      left: 4,
      top: 4,
    }} />
    <View style={{
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderLeftColor: color,
      borderTopWidth: 6,
      borderTopColor: 'transparent',
      borderBottomWidth: 6,
      borderBottomColor: 'transparent',
      position: 'absolute',
      right: 2,
      top: 6,
    }} />
    <View style={{
      width: 4,
      height: 4,
      backgroundColor: color,
      borderRadius: 2,
      position: 'absolute',
      right: 6,
      top: 10,
    }} />
  </View>
);

export const HeartIcon = ({ size = 24, color = '#666', filled = false }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: 12,
      height: 10,
      borderWidth: filled ? 0 : 2,
      borderColor: color,
      backgroundColor: filled ? color : 'transparent',
      borderRadius: 6,
      position: 'absolute',
      left: 6,
      top: 8,
      transform: [{ rotate: '45deg' }],
    }} />
    <View style={{
      width: 12,
      height: 10,
      borderWidth: filled ? 0 : 2,
      borderColor: color,
      backgroundColor: filled ? color : 'transparent',
      borderRadius: 6,
      position: 'absolute',
      right: 6,
      top: 8,
      transform: [{ rotate: '-45deg' }],
    }} />
  </View>
);

export const TimelineIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: 2,
      height: size,
      backgroundColor: color,
      position: 'absolute',
      left: size / 2 - 1,
    }} />
    {[0, 0.33, 0.66, 1].map((position, index) => (
      <View key={index} style={{
        width: 8,
        height: 8,
        backgroundColor: color,
        borderRadius: 4,
        position: 'absolute',
        left: size / 2 - 4,
        top: position * (size - 8),
      }} />
    ))}
  </View>
);

export const SettingsIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: size * 0.7,
      height: size * 0.7,
      borderWidth: 2,
      borderColor: color,
      borderRadius: size * 0.35,
      position: 'absolute',
      left: size * 0.15,
      top: size * 0.15,
    }} />
    <View style={{
      width: 6,
      height: 6,
      backgroundColor: color,
      borderRadius: 3,
      position: 'absolute',
      left: size / 2 - 3,
      top: size / 2 - 3,
    }} />
    <View style={{
      width: 8,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      left: size / 2 - 4,
      top: 2,
    }} />
  </View>
);

export const StatsIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    {[0.8, 0.6, 0.4, 0.9].map((height, index) => (
      <View key={index} style={{
        width: 4,
        height: size * height,
        backgroundColor: color,
        position: 'absolute',
        left: index * 6 + 2,
        bottom: 2,
      }} />
    ))}
  </View>
);

export const GriotIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: size * 0.6,
      height: size * 0.6,
      borderWidth: 2,
      borderColor: color,
      borderRadius: size * 0.3,
      position: 'absolute',
      left: size * 0.2,
      top: size * 0.1,
    }} />
    <View style={{
      width: size * 0.8,
      height: size * 0.3,
      borderWidth: 2,
      borderColor: color,
      borderTopWidth: 0,
      borderRadius: size * 0.15,
      position: 'absolute',
      left: size * 0.1,
      bottom: 2,
    }} />
  </View>
);

export const ARIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: size * 0.8,
      height: size * 0.6,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 4,
      position: 'absolute',
      left: size * 0.1,
      top: size * 0.2,
    }} />
    <View style={{
      width: 2,
      height: size * 0.4,
      backgroundColor: color,
      position: 'absolute',
      left: size / 2 - 1,
      top: size * 0.3,
    }} />
    <View style={{
      width: 6,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      left: size / 2 - 3,
      top: size * 0.15,
    }} />
  </View>
);

export const BackIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: size * 0.6,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      left: size * 0.1,
      top: size / 2 - 1,
      transform: [{ rotate: '-45deg' }],
    }} />
    <View style={{
      width: size * 0.6,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      left: size * 0.1,
      top: size / 2 - 1,
      transform: [{ rotate: '45deg' }],
    }} />
  </View>
);

export const ShareIcon = ({ size = 24, color = '#666' }) => (
  <View style={{
    width: size,
    height: size,
    position: 'relative',
  }}>
    <View style={{
      width: size * 0.5,
      height: size * 0.5,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 4,
      position: 'absolute',
      left: 2,
      top: 2,
    }} />
    <View style={{
      width: size * 0.5,
      height: size * 0.5,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 4,
      position: 'absolute',
      right: 2,
      bottom: 2,
    }} />
    <View style={{
      width: 4,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      left: size * 0.4,
      top: size * 0.3,
      transform: [{ rotate: '45deg' }],
    }} />
    <View style={{
      width: 4,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      right: size * 0.4,
      bottom: size * 0.3,
      transform: [{ rotate: '45deg' }],
    }} />
  </View>
);
