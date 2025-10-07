import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';
import { StatsIcon, BackIcon } from '../components/icons';
import { artifacts as allArtifacts } from '../data/artifacts';

type MuseumStatsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export default function MuseumStatsScreen() {
  const navigation = useNavigation<MuseumStatsScreenNavigationProp>();
  
  // Calculate statistics
  const totalArtifacts = allArtifacts.length;
  const categories = [...new Set(allArtifacts.map(artifact => artifact.category))];
  const totalCategories = categories.length;
  
  const artifactsByCategory = categories.map(category => ({
    name: category,
    count: allArtifacts.filter(artifact => artifact.category === category).length,
    percentage: Math.round((allArtifacts.filter(artifact => artifact.category === category).length / totalArtifacts) * 100)
  }));

  const artifactsByPeriod = allArtifacts.reduce((acc, artifact) => {
    const period = artifact.period.split('-')[0].trim();
    acc[period] = (acc[period] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const StatCard = ({ title, value, subtitle, color = colors.primary[500] }: {
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const ProgressBar = ({ label, percentage, color = colors.primary[500] }: {
    label: string;
    percentage: number;
    color?: string;
  }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressPercentage}>{percentage}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Museum Statistics</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Stats */}
      <View style={styles.mainStatsSection}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.mainStatsGrid}>
          <StatCard
            title="Total Artifacts"
            value={totalArtifacts}
            subtitle="Historical pieces"
            color={colors.primary[500]}
          />
          <StatCard
            title="Categories"
            value={totalCategories}
            subtitle="Collections"
            color={colors.accent.terracotta}
          />
          <StatCard
            title="Civilizations"
            value={[...new Set(allArtifacts.map(a => a.origin))].length}
            subtitle="Represented"
            color={colors.accent.bronze}
          />
          <StatCard
            title="Time Span"
            value="3000+"
            subtitle="Years of history"
            color={colors.accent.ochre}
          />
        </View>
      </View>

      {/* Categories Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Artifacts by Category</Text>
        <View style={styles.chartContainer}>
          {artifactsByCategory.map((category, index) => (
            <ProgressBar
              key={category.name}
              label={category.name}
              percentage={category.percentage}
              color={[colors.primary[500], colors.accent.terracotta, colors.accent.bronze, colors.accent.ochre][index % 4]}
            />
          ))}
        </View>
      </View>

      {/* Historical Periods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historical Periods</Text>
        <View style={styles.periodsGrid}>
          {Object.entries(artifactsByPeriod)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([period, count]) => (
              <View key={period} style={styles.periodCard}>
                <Text style={styles.periodName}>{period}</Text>
                <Text style={styles.periodCount}>{count} artifacts</Text>
              </View>
            ))}
        </View>
      </View>

      {/* Top Civilizations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Civilizations</Text>
        <View style={styles.civilizationsList}>
          {Object.entries(
            allArtifacts.reduce((acc, artifact) => {
              acc[artifact.origin] = (acc[artifact.origin] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          )
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([civilization, count], index) => (
              <View key={civilization} style={styles.civilizationItem}>
                <View style={styles.civilizationRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.civilizationInfo}>
                  <Text style={styles.civilizationName}>{civilization}</Text>
                  <Text style={styles.civilizationCount}>{count} artifacts</Text>
                </View>
              </View>
            ))}
        </View>
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
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
  mainStatsSection: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  section: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  },
  mainStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - spacing[12]) / 2,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
    borderLeftWidth: 4,
    ...shadows.sm,
  },
  statTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing[1],
  },
  statValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[1],
  },
  statSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  chartContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  progressContainer: {
    marginBottom: spacing[4],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  progressLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  progressPercentage: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral.gray[200],
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  periodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  periodCard: {
    width: (width - spacing[12]) / 2,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
    alignItems: 'center',
    ...shadows.sm,
  },
  periodName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  periodCount: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  civilizationsList: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  civilizationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray[100],
  },
  civilizationRank: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full / 2,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  rankNumber: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
  },
  civilizationInfo: {
    flex: 1,
  },
  civilizationName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  civilizationCount: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  bottomSpacing: {
    height: spacing[20],
  },
});

