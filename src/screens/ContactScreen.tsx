import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useAppNavigation } from '../navigation/NavigationContext';

const INQUIRY_TYPES = [
  'Full-time Role',
  'Contract / Freelance',
  'Consulting',
  'Say Hello 👋',
];

export const ContactScreen: React.FC = () => {
  const { params } = useAppNavigation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { developer } = PORTFOLIO_DATA;
  console.log('[ContactScreen:L29]', PORTFOLIO_DATA.developer);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Contract / Freelance');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("[ContactScreen:L35]", developer.email);

  useEffect(() => {
    if (params?.prefillMessage) {
      setMessage(params.prefillMessage);
    }
  }, [params]);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Missing Message', 'Please enter your message or project requirements.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Message Sent! 🎉',
        `Thanks for reaching out, ${name}! Your inquiry regarding "${inquiryType}" has been received. I will reply to ${email} within 24 hours.`,
        [
          {
            text: 'Great!',
            onPress: () => {
              setName('');
              setEmail('');
              setMessage('');
            },
          },
        ],
      );
    }, 800);
  };

  const handleOpenEmail = () => {
    Linking.openURL(`mailto:${developer.email}?subject=Project%20Inquiry`).catch(() => {
      Alert.alert('Email', `You can email me directly at: ${developer.email}`);
    });
  };

  const handleOpenLink = (url: string, nameStr: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert(nameStr, `Opening link: ${url}`);
    });
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
        <Text style={styles.label}>GET IN TOUCH</Text>
        <Text style={styles.title}>Let's Connect</Text>
        <Text style={styles.subtitle}>
          Have an exciting project, open position, or just want to chat about React Native? Drop a message!
        </Text>
      </View>

      {/* Quick Direct Email Banner */}
      <TouchableOpacity
        style={styles.directEmailCard}
        onPress={handleOpenEmail}
        activeOpacity={0.8}
      >
        <View style={styles.emailIconBox}>
          <Text style={styles.emailIcon}>✉️</Text>
        </View>
        <View style={styles.emailTextCol}>
          <Text style={styles.emailCardLabel}>DIRECT EMAIL</Text>
          <Text style={styles.emailAddress}>{developer.email}</Text>
        </View>
        <Text style={styles.emailArrow}>→</Text>
      </TouchableOpacity>

      {/* Contact Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Send a Message</Text>

        {/* Inquiry Type Chips */}
        <Text style={styles.inputLabel}>WHAT'S THIS ABOUT?</Text>
        <View style={styles.chipRow}>
          {INQUIRY_TYPES.map((type, idx) => {
            const isSelected = inquiryType === type;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.typeChip, isSelected && styles.typeChipSelected]}
                onPress={() => setInquiryType(type)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    isSelected && styles.typeChipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Name Input */}
        <Text style={styles.inputLabel}>YOUR NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Alex Morgan"
          placeholderTextColor={theme.colors.textMuted}
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <Text style={styles.inputLabel}>YOUR EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. alex@company.com"
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Message Input */}
        <Text style={styles.inputLabel}>MESSAGE / PROJECT DETAILS</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your project, timeline, or question..."
          placeholderTextColor={theme.colors.textMuted}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Sending...' : 'Send Message 🚀'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social & Location Links */}
      <View style={styles.socialRow}>
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => handleOpenLink(developer.github, 'GitHub')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>🐙</Text>
          <Text style={styles.socialText}>GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => handleOpenLink(developer.linkedin, 'LinkedIn')}
          activeOpacity={0.7}
        >
          <Text style={styles.socialIcon}>💼</Text>
          <Text style={styles.socialText}>LinkedIn</Text>
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
  header: {
    marginBottom: 20,
  },
  label: {
    color: THEME.colors.primaryLight,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  title: {
    color: THEME.colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  subtitle: {
    color: THEME.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  directEmailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.primaryGlow,
    padding: 12,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    marginBottom: 20,
  },
  emailIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: THEME.colors.cardElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emailIcon: {
    fontSize: 18,
  },
  emailTextCol: {
    flex: 1,
  },
  emailCardLabel: {
    color: THEME.colors.primaryLight,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  emailAddress: {
    color: THEME.colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  emailArrow: {
    color: THEME.colors.primaryLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 20,
  },
  formTitle: {
    color: THEME.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  inputLabel: {
    color: THEME.colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  typeChip: {
    backgroundColor: THEME.colors.cardElevated,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
  },
  typeChipSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primaryLight,
  },
  typeChipText: {
    color: THEME.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  typeChipTextSelected: {
    color: THEME.colors.buttonTextOnPrimary,
    fontWeight: '700',
  },
  input: {
    backgroundColor: THEME.colors.cardElevated,
    borderRadius: THEME.radius.sm,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: THEME.colors.text,
    fontSize: 14,
  },
  textArea: {
    height: 80,
  },
  submitButton: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: THEME.colors.buttonTextOnPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.lg,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  socialIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  socialText: {
    color: THEME.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
});
