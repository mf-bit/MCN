import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8; // 80% of screen width
const CARD_HEIGHT = CARD_WIDTH * 0.6; // 60% aspect ratio

export interface CardData {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  icon?: React.ReactElement;
}

interface CardProps {
  data: CardData;
  onPress?: () => void;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ data, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: data.backgroundColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {data.icon && (
          <View style={styles.iconContainer}>
            {data.icon}
          </View>
        )}
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'MadimiOne_400Regular',
  },
  description: {
    fontSize: 16,
    color: '#848587',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Roboto',
  },
});
