import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useAppNavigation } from '../navigation/NavigationContext';

type ProjectDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProjectDetail'>;
type ProjectDetailRouteProp = RouteProp<RootStackParamList, 'ProjectDetail'>;

export const ProjectDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProjectDetailScreenNavigationProp>();
  const route = useRoute<ProjectDetailRouteProp>();
  const { params: legacyParams, goBack: legacyGoBack, navigate: legacyNavigate } = useAppNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const projectId = route.params?.projectId || legacyParams?.projectId || PORTFOLIO_DATA.projects[0].id;

  const project =
    PORTFOLIO_DATA.projects.find(p => p.id === projectId) ||
    PORTFOLIO_DATA.projects[0];

  const handleLaunchDemo = () => {
    Alert.alert(
      'Live Preview',
      `Launching interactive demo for "${project.title}". In production, this would open ${project.demoUrl}`,
      [{ text: 'Great!', style: 'default' }],
    );
  };

  const handleInquire = () => {
    legacyNavigate('contact', { prefillMessage: `Hi Suman, I'm interested in discussing your "${project.title}" project.` });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      legacyGoBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Breadcrumb Navigation */}
        <TouchableOpacity
          style={styles.backRow}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Back to all projects</Text>
        </TouchableOpacity>

        {/* Hero Header */}
        <View style={styles.heroBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.projectNumber}>{project.number}</Text>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>{project.category}</Text>
            </View>
          </View>

          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.subtitle}>{project.subtitle}</Text>
        </View>

        {/* Metrics Row */}
        <View style={styles.metricsRow}>
          {project.stats.map((stat, i) => (
            <View key={i} style={styles.metricItem}>
              <Text style={styles.metricVal}>{stat.value}</Text>
              <Text style={styles.metricLbl}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* In-depth Overview Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>ARCHITECTURAL OVERVIEW</Text>
          <Text style={styles.bodyText}>{project.longDescription}</Text>
        </View>

        {/* Technical Highlights */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>KEY ENGINEERING HIGHLIGHTS</Text>
          {project.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightRow}>
              <View style={styles.bulletDot}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Technologies Used */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>TECHNOLOGIES & TOOLS</Text>
          <View style={styles.techPillGrid}>
            {project.tech.map((t, index) => (
              <View key={index} style={styles.techPill}>
                <Text style={styles.techPillText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={handleLaunchDemo}
            activeOpacity={0.8}
          >
            <Text style={styles.demoButtonText}>⚡ Live Preview Simulation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleInquire}
            activeOpacity={0.8}
          >
            <Text style={styles.contactButtonText}>💬 Inquire About This Project</Text>
          </TouchableOpacity>
        </View>
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
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backArrow: {
    color: THEME.colors.primaryLight,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  backText: {
    color: THEME.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  heroBox: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: THEME.colors.primaryLight,
  },
  categoryChip: {
    backgroundColor: THEME.colors.primaryGlow,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  categoryText: {
    color: THEME.colors.primaryLight,
    fontSize: 11,
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: THEME.colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.secondaryLight,
    marginTop: 8,
    lineHeight: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.cardElevated,
    borderRadius: THEME.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    color: THEME.colors.accentLight,
    fontSize: 18,
    fontWeight: '900',
  },
  metricLbl: {
    color: THEME.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 16,
  },
  sectionHeading: {
    color: THEME.colors.primaryLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  bodyText: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    lineHeight: 24,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: THEME.colors.emeraldGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    borderWidth: 1,
    borderColor: THEME.colors.emerald,
  },
  checkmark: {
    color: THEME.colors.emerald,
    fontSize: 11,
    fontWeight: '900',
  },
  highlightText: {
    flex: 1,
    color: THEME.colors.text,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  techPillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techPill: {
    backgroundColor: THEME.colors.cardElevated,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  techPillText: {
    color: THEME.colors.secondaryLight,
    fontSize: 12,
    fontWeight: '700',
  },
  actionSection: {
    gap: 12,
    marginTop: 8,
  },
  demoButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 16,
    borderRadius: THEME.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoButtonText: {
    color: THEME.colors.buttonTextOnPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  contactButton: {
    backgroundColor: THEME.colors.cardElevated,
    paddingVertical: 15,
    borderRadius: THEME.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  contactButtonText: {
    color: THEME.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  });
