import React, { useState, useMemo } from 'react';
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
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useAppNavigation } from '../navigation/NavigationContext';

const CATEGORIES = ['All', 'Mobile', 'Web', 'Fullstack'] as const;
type Category = typeof CATEGORIES[number];

type ProjectsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Projects'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const ProjectsScreen: React.FC = () => {
  const navigation = useNavigation<ProjectsScreenNavigationProp>();
  const { navigate } = useAppNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.label}>PORTFOLIO</Text>
          <Text style={styles.title}>Selected Work</Text>
          <Text style={styles.subtitle}>
            Production apps, cross-platform mobile experiences, and fullstack architectures.
          </Text>
        </View>

        {/* Category Filter Pills */}
        <View style={styles.filterRow}>
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.resultsCount}>
          Showing {filteredProjects.length}{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
        </Text>

        {/* Projects List */}
        {filteredProjects.map((project: Project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.card}
            onPress={() => navigation.navigate('ProjectDetail', { projectId: project.id })}
            activeOpacity={0.8}
          >
            <View style={styles.cardTop}>
              <Text style={styles.number}>{project.number}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{project.category}</Text>
              </View>
            </View>

            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>

            {/* Key Metric Chips */}
            <View style={styles.statsRow}>
              {project.stats.map((stat, idx) => (
                <View key={idx} style={styles.statBox}>
                  <Text style={styles.statVal}>{stat.value}</Text>
                  <Text style={styles.statLbl}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Tech Stack */}
            <View style={styles.techContainer}>
              {project.tech.map((t, idx) => (
                <View key={idx} style={styles.techTag}>
                  <Text style={styles.techTagText}>{t}</Text>
                </View>
              ))}
            </View>

            <View style={styles.footerLink}>
              <Text style={styles.footerLinkText}>Explore full architecture</Text>
              <Text style={styles.footerLinkArrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  label: {
    color: THEME.colors.primaryLight,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    color: THEME.colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  subtitle: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: THEME.colors.cardElevated,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  filterChipActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primaryLight,
  },
  filterText: {
    color: THEME.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  filterTextActive: {
    color: THEME.colors.buttonTextOnPrimary,
  },
  resultsCount: {
    color: THEME.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  number: {
    color: THEME.colors.primaryLight,
    fontSize: 16,
    fontWeight: '900',
  },
  badge: {
    backgroundColor: THEME.colors.primaryGlow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  badgeText: {
    color: THEME.colors.primaryLight,
    fontSize: 11,
    fontWeight: '800',
  },
  projectTitle: {
    color: THEME.colors.text,
    fontSize: 21,
    fontWeight: '800',
  },
  projectSubtitle: {
    color: THEME.colors.secondaryLight,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  projectDesc: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.cardElevated,
    borderRadius: THEME.radius.md,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statVal: {
    color: THEME.colors.accentLight,
    fontSize: 15,
    fontWeight: '800',
  },
  statLbl: {
    color: THEME.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  techTag: {
    backgroundColor: THEME.colors.cardElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.radius.sm,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  techTagText: {
    color: THEME.colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  footerLinkText: {
    color: THEME.colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  footerLinkArrow: {
    color: THEME.colors.primaryLight,
    fontSize: 15,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  });
