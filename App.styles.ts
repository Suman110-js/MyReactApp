import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Header
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151B2B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 7,
  },

  statusText: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
  },

  // Hero
  hero: {
    paddingTop: 35,
    paddingBottom: 45,
  },

  greeting: {
    color: '#818CF8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 46,
    fontWeight: '900',
    lineHeight: 52,
  },

  title: {
    color: '#C4B5FD',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
  },

  description: {
    color: '#9CA3AF',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 20,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 12,
  },

  primaryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // About Card
  card: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 40,
  },

  cardLabel: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 12,
    lineHeight: 30,
  },

  cardDescription: {
    color: '#9CA3AF',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
  },

  // Sections
  section: {
    marginBottom: 40,
  },

  sectionLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 18,
  },

  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  skill: {
    backgroundColor: '#151B2B',
    borderWidth: 1,
    borderColor: '#252D40',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  skillText: {
    color: '#D1D5DB',
    fontSize: 13,
    fontWeight: '600',
  },

  // Projects
  projectCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  projectNumber: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '800',
  },

  projectTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 8,
  },

  projectDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },

  projectTech: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 15,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },

  footerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  footerEmail: {
    color: '#818CF8',
    fontSize: 14,
    marginTop: 8,
  },

  selectedSkillBox: {
  backgroundColor: '#1E1B4B',
  borderWidth: 1,
  borderColor: '#4F46E5',
  padding: 14,
  borderRadius: 12,
  marginBottom: 25,
},

selectedSkillText: {
  color: '#C4B5FD',
  fontSize: 13,
  fontWeight: '600',
},

tapText: {
  color: '#818CF8',
  fontSize: 12,
  fontWeight: '700',
  marginTop: 16,
},
});