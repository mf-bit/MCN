import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Text } from 'react-native-svg';

export default function PlaceholderImage() {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 300 300">
        <Rect width="300" height="300" fill="#CCCCCC" />
        <Text
          fill="#666666"
          fontSize="24"
          x="150"
          y="150"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          Placeholder
        </Text>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
  },
});