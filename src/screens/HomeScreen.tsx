import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useAppNavigation } from '../navigation/NavigationContext';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { navigate } = useAppNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { developer, projects } = PORTFOLIO_DATA;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
      {/* Hero Section */}
      <View style={styles.heroCard}>
        <View style={styles.badgeRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{developer.greeting}</Text>
          </View>
        </View>

        <Text style={styles.name}>{developer.name}</Text>
        <Text style={styles.title}>{developer.title}</Text>
        <Text style={styles.bio}>{developer.bio}</Text>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Projects')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryBtnText}>Explore Projects →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate('Contact')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryBtnText}>Let's Talk</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Metrics Ribbon */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{developer.yearsExp}</Text>
          <Text style={styles.metricLabel}>Years Exp</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{developer.projectsCount}</Text>
          <Text style={styles.metricLabel}>Completed</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{developer.satisfactionRate}</Text>
          <Text style={styles.metricLabel}>Satisfaction</Text>
        </View>
      </View>

      {/* About Preview Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>MY PHILOSOPHY</Text>
        </View>
        <Text style={styles.cardTitle}>
          High-performance code with pixel-perfect design.
        </Text>
        <Text style={styles.cardDesc}>
          I specialize in building apps that not only look stunning but deliver 60 FPS performance, offline reliability, and rock-solid architecture.
        </Text>
        
        <TouchableOpacity
          style={styles.textLinkRow}
          onPress={() => navigation.navigate('Experience')}
          activeOpacity={0.7}
        >
          <Text style={styles.textLink}>View full experience & skills</Text>
          <Text style={styles.textLinkArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Projects Highlights */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>FEATURED PROJECTS</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Projects')}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>See all ({projects.length})</Text>
        </TouchableOpacity>
      </View>

      {projects.slice(0, 2).map(project => (
        <TouchableOpacity
          key={project.id}
          style={styles.projectCard}
          onPress={() => navigate('project-detail', { projectId: project.id })}
          activeOpacity={0.8}
        >
          <View style={styles.projectHeaderRow}>
            <Text style={styles.projectNumber}>{project.number}</Text>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>{project.category}</Text>
            </View>
          </View>

          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDesc}>{project.subtitle}</Text>

          <View style={styles.techPillRow}>
            {project.tech.slice(0, 3).map((item, index) => (
              <View key={index} style={styles.techPill}>
                <Text style={styles.techPillText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.viewDetailRow}>
            <Text style={styles.viewDetailText}>View full project breakdown</Text>
            <Text style={styles.viewDetailArrow}>→</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Quick Contact CTA */}
      <TouchableOpacity
        style={styles.contactBanner}
        onPress={() => navigation.navigate('Contact')}
        activeOpacity={0.85}
      >
        <Text style={styles.bannerEmoji}>🚀</Text>
        <View style={styles.bannerTextCol}>
          <Text style={styles.bannerTitle}>Have a project in mind?</Text>
          <Text style={styles.bannerSubtitle}>Let's build something extraordinary together.</Text>
        </View>
        <Text style={styles.bannerArrow}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);
};

const createStyles = (THEME: ThemeType) =>
  StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: THEME.colors.bg,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  tag: {
    backgroundColor: THEME.colors.primaryGlow,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  tagText: {
    color: THEME.colors.primaryLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: THEME.colors.text,
    letterSpacing: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: THEME.colors.secondaryLight,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    color: THEME.colors.textSecondary,
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 22,
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 10,
    borderRadius: THEME.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: THEME.colors.buttonTextOnPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    backgroundColor: THEME.colors.cardElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: THEME.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.cardElevated,
    borderRadius: THEME.radius.lg,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metricBox: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '900',
    color: THEME.colors.primaryLight,
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: THEME.colors.border,
  },
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 26,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardLabel: {
    color: THEME.colors.accentLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardTitle: {
    color: THEME.colors.text,
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 26,
  },
  cardDesc: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  textLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  textLink: {
    color: THEME.colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  textLinkArrow: {
    color: THEME.colors.primaryLight,
    fontSize: 14,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 2,
  },
  sectionTitle: {
    color: THEME.colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  seeAllText: {
    color: THEME.colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  projectCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 16,
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: THEME.colors.primaryLight,
  },
  categoryChip: {
    backgroundColor: THEME.colors.cardElevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  categoryChipText: {
    color: THEME.colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  projectTitle: {
    color: THEME.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
  },
  projectDesc: {
    color: THEME.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  techPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  techPill: {
    backgroundColor: THEME.colors.cardElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.radius.sm,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  techPillText: {
    color: THEME.colors.secondaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
  viewDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  viewDetailText: {
    color: THEME.colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  viewDetailArrow: {
    color: THEME.colors.primaryLight,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  contactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.primaryGlow,
    padding: 12,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    marginTop: 10,
  },
  bannerEmoji: {
    fontSize: 26,
    marginRight: 14,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    color: THEME.colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: THEME.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  bannerArrow: {
    color: THEME.colors.primaryLight,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  });
