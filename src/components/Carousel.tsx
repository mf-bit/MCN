import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { CarouselCard } from './CarouselCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(280, width * 0.8); // Largeur plus petite pour mobile
const CARD_SPACING = 20; // Espacement fixe plus petit
const SCALE_FACTOR = 0.85;

interface CarouselProps {
  data: Array<{
    id: string;
    title: string;
    description: string;
    image: any;
  }>;
  onCardPress: (id: string) => void;
  onSeeMore: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({ data, onCardPress, onSeeMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animation = new Animated.Value(0);

  const rotateCards = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      rotateCards();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getCardData = (index: number) => {
    const normalizedIndex = ((index % data.length) + data.length) % data.length;
    return data[normalizedIndex];
  };

  const getCardStyle = (position: 'left' | 'center' | 'right') => {
    const baseTransform = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -CARD_WIDTH - CARD_SPACING],
    });

    let translateX = 0;
    let scale = 1;
    let zIndex = 1;

    switch (position) {
      case 'left':
        translateX = -CARD_WIDTH - CARD_SPACING;
        scale = SCALE_FACTOR;
        break;
      case 'center':
        translateX = 0;
        scale = 1;
        zIndex = 2;
        break;
      case 'right':
        translateX = CARD_WIDTH + CARD_SPACING;
        scale = SCALE_FACTOR;
        break;
    }

    return {
      transform: [
        { translateX: Animated.add(baseTransform, new Animated.Value(translateX)) },
        { scale },
      ],
      zIndex,
    };
  };

  const renderCard = (position: 'left' | 'center' | 'right') => {
    const offset = position === 'left' ? -1 : position === 'right' ? 1 : 0;
    const cardData = getCardData(currentIndex + offset);

    return (
      <Animated.View style={[styles.cardContainer, getCardStyle(position)]}>
        <CarouselCard
          imageSource={cardData.image}
          title={cardData.title}
          description={cardData.description}
          onPress={() => onCardPress(cardData.id)}
          onSeeMore={onSeeMore}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCard('left')}
      {renderCard('center')}
      {renderCard('right')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 367,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});