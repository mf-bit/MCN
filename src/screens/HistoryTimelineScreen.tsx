import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Artifact } from '../types/Artifact';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { TimelineIcon, BackIcon } from '../components/icons';

type HistoryTimelineScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HistoryTimelineScreenRouteProp = RouteProp<RootStackParamList, 'HistoryTimeline'>;

const { width } = Dimensions.get('window');

// Mock timeline data
const timelineEvents = [
  {
    id: 1,
    year: '500 BC',
    title: 'Nok Culture Flourishes',
    description: 'The Nok culture in present-day Nigeria creates some of the earliest known African terracotta sculptures.',
    artifacts: ['Nok Terracotta Head'],
    image: require('../../assets/artifacts/nok-head.png'),
  },
  {
    id: 2,
    year: '100 AD',
    title: 'Kingdom of Aksum Rises',
    description: 'The Aksumite Kingdom emerges as a major trading power in the Horn of Africa, creating monumental steles.',
    artifacts: ['Aksumite Obelisk'],
    image: require('../../assets/artifacts/aksumite-obelisk.png'),
  },
  {
    id: 3,
    year: '1200 AD',
    title: 'Mali Empire Golden Age',
    description: 'Under Mansa Musa, the Mali Empire becomes one of the wealthiest and most powerful empires in the world.',
    artifacts: ['Timbuktu Manuscripts'],
    image: require('../../assets/artifacts/timbuktu-manuscript.png'),
  },
  {
    id: 4,
    year: '1400 AD',
    title: 'Benin Kingdom Artistry',
    description: 'The Benin Kingdom reaches its artistic peak, creating exquisite bronze and ivory sculptures.',
    artifacts: ['Benin Bronze Mask', 'Queen Idia Pendant'],
    image: require('../../assets/artifacts/benin-mask.png'),
  },
  {
    id: 5,
    year: '1500 AD',
    title: 'Great Zimbabwe Flourishes',
    description: 'The Great Zimbabwe civilization builds impressive stone structures and trades across the Indian Ocean.',
    artifacts: ['Zimbabwe Bird', 'Stone Architecture'],
    image: require('../../assets/artifacts/sphinx.png'),
  },
];

interface Props {
  navigation: HistoryTimelineScreenNavigationProp;
  route: HistoryTimelineScreenRouteProp;
}

export default function HistoryTimelineScreen({ navigation, route }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // If an artifact name is passed in params, preselect the most relevant event
  const artifactName = (route.params as any)?.artifactName as string | undefined;
  React.useEffect(() => {
    if (!artifactName) return;
    const idx = timelineEvents.findIndex(ev => ev.artifacts.some((a: string) => a.toLowerCase().includes(artifactName.toLowerCase())));
    if (idx >= 0) setSelectedEvent(timelineEvents[idx].id);
  }, [artifactName]);

  const TimelineEvent = ({ event, isLast }: { event: any; isLast: boolean }) => (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <View style={styles.timelineDot}>
          <View style={styles.timelineDotInner} />
        </View>
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <TouchableOpacity
          style={styles.timelineCard}
          onPress={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
        >
          <View style={styles.timelineHeader}>
            <View style={styles.timelineYear}>
              <Text style={styles.yearText}>{event.year}</Text>
            </View>
            <View style={styles.timelineInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>
            </View>
            <Image source={event.image} style={styles.timelineImage} />
          </View>
          
          {selectedEvent === event.id && (
            <View style={styles.expandedContent}>
              <Text style={styles.expandedDescription}>{event.description}</Text>
              <View style={styles.artifactsList}>
                <Text style={styles.artifactsTitle}>Related Artifacts:</Text>
                {event.artifacts.map((artifact: string, index: number) => (
                  <Text key={index} style={styles.artifactItem}>• {artifact}</Text>
                ))}
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historical Timeline</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Timeline */}
      <ScrollView style={styles.timelineContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.timelineHeader}>
          <Text style={styles.timelineTitle}>African Civilizations Through Time</Text>
          <Text style={styles.timelineSubtitle}>
            Explore the rich history of African civilizations and their artistic achievements
          </Text>
        </View>

        <View style={styles.timeline}>
          {timelineEvents.map((event, index) => (
            <TimelineEvent 
              key={event.id} 
              event={event} 
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
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
  placeholder: {
    width: 40,
  },
  timelineContainer: {
    flex: 1,
  },
  timelineHeader: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[6],
    alignItems: 'center',
  },
  timelineTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  timelineSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  timeline: {
    paddingHorizontal: spacing[4],
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing[6],
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: spacing[4],
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral.white,
    borderWidth: 3,
    borderColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[500],
  },
  timelineLine: {
    width: 2,
    height: 80,
    backgroundColor: colors.neutral.gray[300],
    marginTop: spacing[2],
  },
  timelineContent: {
    flex: 1,
  },
  timelineCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineYear: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    marginRight: spacing[3],
  },
  yearText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral.white,
  },
  timelineInfo: {
    flex: 1,
    marginRight: spacing[3],
  },
  eventTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  eventDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  timelineImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
  },
  expandedContent: {
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
  },
  expandedDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing[4],
  },
  artifactsList: {
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
    padding: spacing[3],
  },
  artifactsTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  artifactItem: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  bottomSpacing: {
    height: spacing[20],
  },
});

