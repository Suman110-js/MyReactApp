import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceScreen: React.FC = () => {
  const { experiences, skillCategories } = PORTFOLIO_DATA;
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillPress = (name: string, level: number) => {
    setSelectedSkill(name);
    Alert.alert(
      name,
      `Proficiency: ${level}%\nExperience using in production with TypeScript, clean architecture, and best testing practices.`,
      [{ text: 'Awesome', style: 'default' }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>CAREER & SKILLS</Text>
          <Text style={styles.title}>Experience & Stack</Text>
          <Text style={styles.subtitle}>
            Track record of shipping reliable, performant software across mobile and web.
          </Text>
        </View>

        {/* Experience Timeline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>WORK HISTORY</Text>

          {experiences.map((exp, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* Timeline Line & Node */}
              <View style={styles.timelineSidebar}>
                <View style={styles.timelineNode} />
                {index < experiences.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Timeline Content */}
              <View style={styles.timelineContent}>
                <Text style={styles.periodText}>{exp.period}</Text>
                <Text style={styles.roleText}>{exp.role}</Text>
                <Text style={styles.companyText}>{exp.company}</Text>
                <Text style={styles.descText}>{exp.description}</Text>

                {/* Achievements */}
                <View style={styles.achievementsBox}>
                  {exp.achievements.map((item, idx) => (
                    <View key={idx} style={styles.achievementRow}>
                      <Text style={styles.achievementBullet}>•</Text>
                      <Text style={styles.achievementText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Skills & Competencies */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>TECHNICAL PROFICIENCY</Text>
          <Text style={styles.sectionHelper}>
            Tap any skill to inspect proficiency and details.
          </Text>

          {skillCategories.map((category, catIdx) => (
            <View key={catIdx} style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>{category.category}</Text>

              {category.items.map((skill, skillIdx) => {
                const isSelected = selectedSkill === skill.name;
                return (
                  <TouchableOpacity
                    key={skillIdx}
                    style={[
                      styles.skillRow,
                      isSelected && styles.skillRowSelected,
                    ]}
                    onPress={() => handleSkillPress(skill.name, skill.level)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.skillMeta}>
                      <Text style={styles.skillIcon}>{skill.icon}</Text>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <Text style={styles.skillPercent}>{skill.level}%</Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarBg}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${skill.level}%` },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
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
  header: {
    marginBottom: 18,
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
    lineHeight: 20,
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    color: THEME.colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  sectionHelper: {
    color: THEME.colors.textSecondary,
    fontSize: 13,
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineSidebar: {
    alignItems: 'center',
    marginRight: 10,
    width: 10,
  },
  timelineNode: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.colors.primary,
    borderWidth: 3,
    borderColor: THEME.colors.bg,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: THEME.colors.borderLight,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  periodText: {
    color: THEME.colors.primaryLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  roleText: {
    color: THEME.colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },
  companyText: {
    color: THEME.colors.secondaryLight,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  descText: {
    color: THEME.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  achievementsBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    gap: 6,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementBullet: {
    color: THEME.colors.emerald,
    marginRight: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  achievementText: {
    flex: 1,
    color: THEME.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  categoryCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 14,
  },
  categoryTitle: {
    color: THEME.colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  skillRow: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: THEME.radius.md,
    marginBottom: 6,
  },
  skillRowSelected: {
    backgroundColor: THEME.colors.cardElevated,
  },
  skillMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  skillName: {
    flex: 1,
    color: THEME.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  skillPercent: {
    color: THEME.colors.accentLight,
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: THEME.colors.cardElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
    borderRadius: 3,
  },
  });
