import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { ScreenName, useAppNavigation } from '../navigation/NavigationContext';

interface TabItem {
  key: ScreenName;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'projects', label: 'Projects', icon: '💼' },
  { key: 'experience', label: 'Skills', icon: '⚡' },
  { key: 'contact', label: 'Contact', icon: '💬' },
  { key: 'meow', label: 'Meow', icon: '🐱' },
];

export const BottomTabBar: React.FC = () => {
  const { currentScreen, navigate } = useAppNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // If viewing project detail, highlight the projects tab
  const activeTabKey = currentScreen === 'project-detail' ? 'projects' : currentScreen;

  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTabKey === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => navigate(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (THEME: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: THEME.colors.tabBarBg,
      borderTopWidth: 1,
      borderTopColor: THEME.colors.border,
      paddingTop: 8,
      paddingBottom: 16,
      paddingHorizontal: 12,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tab: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: THEME.radius.md,
      minWidth: 70,
    },
    tabActive: {
      backgroundColor: THEME.colors.primaryGlow,
    },
    icon: {
      fontSize: 18,
      marginBottom: 4,
      opacity: 0.6,
    },
    iconActive: {
      opacity: 1,
      transform: [{ scale: 1.1 }],
    },
    label: {
      fontSize: 11,
      fontWeight: '600',
      color: THEME.colors.textMuted,
    },
    labelActive: {
      color: THEME.colors.primaryLight,
      fontWeight: '800',
    },
    activeDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: THEME.colors.primary,
      marginTop: 4,
    },
  });
