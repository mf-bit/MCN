import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(280, width * 0.8);

const LikeIcon = () => (
  <Svg width={20} height={18} viewBox="0 0 20 18" fill="none">
    <Path d="M9.83325 3.19369L9.35569 3.66611C9.48065 3.79955 9.65306 3.87494 9.83325 3.87494C10.0134 3.87494 10.1859 3.79955 10.3108 3.66611L9.83325 3.19369ZM7.5586 14.8396C6.21918 13.7543 4.75457 12.6945 3.59267 11.3497C2.45349 10.0312 1.65883 8.49275 1.65883 6.4968H0.333252C0.333252 8.91794 1.31462 10.765 2.60152 12.2544C3.86569 13.7175 5.47719 14.888 6.73795 15.9096L7.5586 14.8396ZM1.65883 6.4968C1.65883 4.5431 2.73288 2.90475 4.19897 2.21593C5.62327 1.54676 7.53705 1.72398 9.35569 3.66611L10.3108 2.72127C8.15286 0.416838 5.64803 0.0370395 3.64788 0.976767C1.68951 1.89687 0.333252 4.03335 0.333252 6.4968H1.65883ZM6.73795 15.9096C7.19062 16.2764 7.67657 16.6675 8.16903 16.9633C8.66135 17.2589 9.22313 17.4993 9.83325 17.4993V16.1368C9.55965 16.1368 9.23771 16.0271 8.83783 15.7869C8.43812 15.5468 8.02346 15.2163 7.5586 14.8396L6.73795 15.9096ZM12.9286 15.9096C14.1893 14.888 15.8008 13.7175 17.065 12.2544C18.3519 10.765 19.3333 8.91794 19.3333 6.4968H18.0077C18.0077 8.49275 17.213 10.0312 16.0738 11.3497C14.9119 12.6945 13.4473 13.7543 12.108 14.8396L12.9286 15.9096ZM19.3333 6.4968C19.3333 4.03335 17.977 1.89687 16.0186 0.976767C14.0185 0.0370395 11.5136 0.416838 9.35569 2.72127L10.3108 3.66611C12.1294 1.72398 14.0432 1.54676 15.4675 2.21593C16.9336 2.90475 18.0077 4.5431 18.0077 6.4968H19.3333ZM12.108 14.8396C11.643 15.2163 11.2284 15.5468 10.8287 15.7869C10.4288 16.0271 10.1069 16.1368 9.83325 16.1368V17.4993C10.4434 17.4993 11.0052 17.2589 11.4975 16.9633C11.99 16.6675 12.4758 16.2764 12.9286 15.9096L12.108 14.8396Z" fill="#F7F7F7"/>
  </Svg>
);

const RightArrowIcon = () => (
  <Svg width={8} height={16} viewBox="0 0 8 16" fill="none">
    <Path d="M1.29688 1L5.90133 5.95865C6.97016 7.10969 6.97016 8.89031 5.90133 10.0414L1.29688 15" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/>
  </Svg>
);

interface CarouselCardProps {
  imageSource: any;
  title: string;
  description: string;
  onPress: () => void;
  onSeeMore: () => void;
  style?: any;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  imageSource,
  title,
  description,
  onPress,
  onSeeMore,
  style
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground 
        source={imageSource}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        {/* Top Container */}
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.likeButton}>
            <LikeIcon />
          </TouchableOpacity>
        </View>

        {/* Bottom Container */}
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <TouchableOpacity style={styles.seeMoreButton} onPress={onSeeMore}>
            <LinearGradient
              colors={['rgba(22, 13, 10, 1)', 'rgba(22, 13, 10, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.7, y: 0 }}
              style={styles.seeMoreGradient}
            >
              <View style={styles.arrowContainer}>
                <RightArrowIcon />
              </View>
              <Text style={styles.seeMoreText}>See More</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 367,
    borderRadius: 28,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E', // Fond sombre pour les espaces vides
  },
  backgroundImage: {
    borderRadius: 28,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  likeButton: {
    width: 41,
    height: 41,
    borderRadius: 20.5,
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  title: {
    color: '#F7F7F7',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#F7F7F7',
    fontSize: 16,
    textAlign: 'center',
  },
  seeMoreButton: {
    width: Math.min(220, CARD_WIDTH * 0.7), // S'adapte à la largeur de la carte
    height: 60,
    overflow: 'hidden',
    borderRadius: 999999,
  },
  seeMoreGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    opacity: 0.65,
  },
  arrowContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    color: '#F7F7F7',
    fontSize: 14,
  },
});