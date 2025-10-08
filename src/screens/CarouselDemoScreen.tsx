import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { CarouselCards, CardData } from '../components/CarouselCards';
import { Ionicons } from '@expo/vector-icons';

// Sample card data
const sampleCards: CardData[] = [
  {
    id: '1',
    title: 'African Heritage',
    description: 'Discover the rich cultural heritage and traditions of African civilizations through our curated collection of artifacts.',
    backgroundColor: '#F7F7F7',
    icon: <Ionicons name="globe-outline" size={48} color="#1E1E1E" />,
  },
  {
    id: '2',
    title: 'Ancient Artifacts',
    description: 'Explore ancient sculptures, masks, and ceremonial objects that tell the story of Africa\'s artistic legacy.',
    backgroundColor: '#E8F5E8',
    icon: <Ionicons name="diamond-outline" size={48} color="#2E7D32" />,
  },
  {
    id: '3',
    title: 'Museum Tours',
    description: 'Take a virtual tour through our 3D museum space and experience the artifacts in their historical context.',
    backgroundColor: '#FFF3E0',
    icon: <Ionicons name="walk-outline" size={48} color="#F57C00" />,
  },
  {
    id: '4',
    title: 'Interactive Learning',
    description: 'Engage with interactive exhibits and learn about the significance of each artifact in African history.',
    backgroundColor: '#E3F2FD',
    icon: <Ionicons name="school-outline" size={48} color="#1976D2" />,
  },
  {
    id: '5',
    title: 'Cultural Events',
    description: 'Join our cultural events and workshops to deepen your understanding of African traditions and customs.',
    backgroundColor: '#F3E5F5',
    icon: <Ionicons name="calendar-outline" size={48} color="#7B1FA2" />,
  },
  {
    id: '6',
    title: 'Digital Archive',
    description: 'Access our comprehensive digital archive of historical documents, photos, and multimedia content.',
    backgroundColor: '#E8EAF6',
    icon: <Ionicons name="library-outline" size={48} color="#3F51B5" />,
  },
];

export const CarouselDemoScreen: React.FC = () => {
  const handleCardPress = (card: CardData) => {
    Alert.alert(
      'Card Pressed',
      `You pressed: ${card.title}\n\n${card.description}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Carousel Demo</Text>
      <Text style={styles.subtitle}>
        Experience the smooth 3-card carousel animation
      </Text>

      <View style={styles.carouselWrapper}>
        <CarouselCards
          data={sampleCards}
          autoPlayInterval={3500}
          onCardPress={handleCardPress}
          pauseOnTouch={true}
          showPagination={true}
        />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Features</Text>
        <Text style={styles.infoText}>
          • 3 cards visible at once (left, center, right)
        </Text>
        <Text style={styles.infoText}>
          • Smooth sliding animation every 3.5 seconds
        </Text>
        <Text style={styles.infoText}>
          • Pause on touch for 2 seconds
        </Text>
        <Text style={styles.infoText}>
          • Pagination dots showing current position
        </Text>
        <Text style={styles.infoText}>
          • Infinite loop with 6 sample cards
        </Text>
        <Text style={styles.infoText}>
          • Responsive design for all screen sizes
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'MadimiOne_400Regular',
  },
  subtitle: {
    fontSize: 16,
    color: '#848587',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Roboto',
  },
  carouselWrapper: {
    marginBottom: 40,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 12,
    fontFamily: 'MadimiOne_400Regular',
  },
  infoText: {
    fontSize: 14,
    color: '#848587',
    marginBottom: 8,
    fontFamily: 'Roboto',
  },
});
