export const DARK_THEME = {
  isDark: true,
  colors: {
    bg: '#090D16',
    card: '#111726',
    cardElevated: '#172033',
    border: '#1E293B',
    borderLight: '#2A374F',
    
    primary: '#6366F1',
    primaryLight: '#818CF8',
    primaryGlow: 'rgba(99, 102, 241, 0.15)',
    
    secondary: '#A855F7',
    secondaryLight: '#C084FC',
    
    accent: '#06B6D4',
    accentLight: '#67E8F9',
    
    emerald: '#10B981',
    emeraldLight: '#34D399',
    emeraldGlow: 'rgba(16, 185, 129, 0.15)',
    
    danger: '#EF4444',
    
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    buttonTextOnPrimary: '#FFFFFF',
    
    tabBarBg: '#0D1322',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    full: 9999,
  },
};

export const LIGHT_THEME = {
  isDark: false,
  colors: {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    cardElevated: '#F1F5F9',
    border: '#E2E8F0',
    borderLight: '#CBD5E1',
    
    primary: '#4F46E5',
    primaryLight: '#6366F1',
    primaryGlow: 'rgba(79, 70, 229, 0.1)',
    
    secondary: '#9333EA',
    secondaryLight: '#A855F7',
    
    accent: '#0284C7',
    accentLight: '#0EA5E9',
    
    emerald: '#10B981',
    emeraldLight: '#059669',
    emeraldGlow: 'rgba(16, 185, 129, 0.1)',
    
    danger: '#EF4444',
    
    text: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    buttonTextOnPrimary: '#aaff0bff',
    
    tabBarBg: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    full: 9999,
  },
};

export type ThemeType = typeof DARK_THEME;
export const THEME = DARK_THEME;
