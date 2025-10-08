import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Card } from './Card';
import { CardData } from './Card';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 0.6;
const SPACING = 20;

interface StaticCardsProps {
  data: CardData[];
  onCardPress?: (card: CardData) => void;
}

export const StaticCards: React.FC<StaticCardsProps> = ({
  data,
  onCardPress,
}) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((card, index) => (
          <View 
            key={index} 
            style={styles.cardContainer}
          >
            <Card
              data={card}
              onPress={() => onCardPress?.(card)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT + SPACING * 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: SPACING / 2,
  },
});