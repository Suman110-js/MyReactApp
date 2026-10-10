import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { useAppNavigation } from '../navigation/NavigationContext';

interface HeaderProps {
  isAvailable: boolean;
  onToggleAvailability: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAvailable,
  onToggleAvailability,
}) => {
  const { currentScreen, goBack, canGoBack } = useAppNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {canGoBack && currentScreen === 'project-detail' ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.logoRow}>
            <Text style={styles.logo}>Suman</Text>
            <View style={styles.logoDot} />
          </View>
        )}
      </View>

      <View style={styles.rightActionsRow}>
        {/* Dark / Light Mode Toggle Button */}
        <TouchableOpacity
          style={styles.themeToggleBtn}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>

        {/* Availability Status Badge */}
        <TouchableOpacity
          style={styles.statusBadge}
          onPress={onToggleAvailability}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isAvailable ? theme.colors.emerald : theme.colors.danger },
            ]}
          />
          <Text style={styles.statusText}>
            {isAvailable ? 'Available' : 'Busy'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (THEME: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 16,
      backgroundColor: THEME.colors.bg,
      borderBottomWidth: 1,
      borderBottomColor: THEME.colors.border,
    },
    leftRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    logo: {
      fontSize: 22,
      fontWeight: '900',
      color: THEME.colors.text,
      letterSpacing: -0.5,
    },
    logoDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: THEME.colors.primary,
      marginLeft: 3,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: THEME.colors.cardElevated,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: THEME.radius.md,
      borderWidth: 1,
      borderColor: THEME.colors.borderLight,
    },
    backIcon: {
      color: THEME.colors.primaryLight,
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 6,
    },
    backText: {
      color: THEME.colors.text,
      fontSize: 13,
      fontWeight: '700',
    },
    rightActionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    themeToggleBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: THEME.colors.cardElevated,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: THEME.colors.borderLight,
    },
    themeIcon: {
      fontSize: 16,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: THEME.colors.cardElevated,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: THEME.radius.full,
      borderWidth: 1,
      borderColor: THEME.colors.borderLight,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '700',
      color: THEME.colors.textSecondary,
    },
  });
