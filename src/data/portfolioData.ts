export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Mobile' | 'Web' | 'Fullstack';
  description: string;
  longDescription: string;
  tech: string[];
  highlights: string[];
  stats: { label: string; value: string }[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: { name: string; level: number; icon: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export const PORTFOLIO_DATA = {
  developer: {
    name: 'Suman  Sahoo',
    handle: '@sumansahoo',
    greeting: "HELLO, I'M",
    title: 'React Native & React Developer',
    headline: 'Crafting high-performance mobile & web experiences.',
    bio: 'I build modern, responsive, and user-centric mobile and web applications with React Native, React, TypeScript, and clean software architecture.',
    email: 'sumansahoo110@gmail.com',
    github: 'https://github.com/sumansahoo110',
    linkedin: 'https://linkedin.com',
    location: 'India',
    yearsExp: '3+',
    projectsCount: '20+',
    satisfactionRate: '100%',
  },

  projects: [
    {
      id: 'event-platform',
      number: '01',
      title: 'Event & Invitation Platform',
      subtitle: 'Digital invitation studio with live RSVP tracking & QR check-in',
      category: 'Web',
      description:
        'A full-featured digital invitation studio allowing organizers to create custom events, track guest responses, and scan tickets in real-time.',
      longDescription:
        'Engineered an end-to-end event management suite with rich interactive canvas editors for custom invitation templates. Supports real-time attendee check-in via custom QR code scanning, guest analytics, and automated reminders.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Node.js'],
      highlights: [
        'Instant sub-second QR code badge scanner',
        'Custom interactive drag-and-drop invitation designer',
        'Real-time RSVP analytics dashboard with exportable reports',
      ],
      stats: [
        { label: 'Users', value: '12K+' },
        { label: 'Events Hosted', value: '450+' },
        { label: 'Satisfaction', value: '99.4%' },
      ],
      demoUrl: 'https://example.com/events',
      githubUrl: 'https://github.com/example/events-platform',
    },
    {
      id: 'pulsefit-mobile',
      number: '02',
      title: 'PulseFit - Workout Tracker',
      subtitle: 'Offline-first React Native fitness tracker with animated metrics',
      category: 'Mobile',
      description:
        'Cross-platform mobile application designed for athletes to log sets, track caloric burns, and monitor personal records with fluid 60fps animations.',
      longDescription:
        'Built with a local-first SQLite architecture to ensure total offline capability. Features custom rest-interval timers, haptic audio cues, animated weekly progress heatmaps, and customizable routine templates.',
      tech: ['React Native', 'TypeScript', 'SQLite', 'Reanimated', 'Context API'],
      highlights: [
        '100% offline-first architecture with background sync',
        'Fluid 60 FPS rest timer & animated workout rings',
        'Custom customizable dark/neon cyberpunk UI theme',
      ],
      stats: [
        { label: 'Active Users', value: '8.5K' },
        { label: 'Workouts Logged', value: '150K+' },
        { label: 'App Rating', value: '4.9 ★' },
      ],
      demoUrl: 'https://example.com/pulsefit',
      githubUrl: 'https://github.com/example/pulsefit-rn',
    },
    {
      id: 'fintrack-app',
      number: '03',
      title: 'FinTrack - Smart Wallet',
      subtitle: 'Personal finance & budget intelligence mobile dashboard',
      category: 'Fullstack',
      description:
        'Cross-platform personal finance companion offering automatic categorization, subscription tracking, and budget anomaly warnings.',
      longDescription:
        'Integrated with privacy-respecting local storage and cloud sync. Provides interactive expense breakdown charts, recurring billing detectors, and exportable monthly tax summaries in PDF format.',
      tech: ['React Native', 'Node.js', 'Express', 'PostgreSQL', 'ChartKit'],
      highlights: [
        'Categorized spending insights with interactive charts',
        'Monthly budget threshold push alerts',
        'Multi-currency and crypto wallet tracking',
      ],
      stats: [
        { label: 'Transactions', value: '300K+' },
        { label: 'Saved per User', value: '$420/yr' },
        { label: 'Security', value: 'AES-256' },
      ],
      demoUrl: 'https://example.com/fintrack',
      githubUrl: 'https://github.com/example/fintrack',
    },
    {
      id: 'devflow-hub',
      number: '04',
      title: 'DevFlow - Developer Hub',
      subtitle: 'Collaborative code sharing & technical micro-blogging community',
      category: 'Web',
      description:
        'High-performance web platform for developers to share technical tutorials, code snippets with syntax highlighting, and engage in technical discussions.',
      longDescription:
        'Constructed using modern React patterns with server-side rendering for optimal SEO and rapid load times. Features Markdown live rendering, code diff highlighting, and GitHub OAuth sign-in.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
      highlights: [
        'Lightning fast Markdown editor with live syntax highlighting',
        'Threaded technical discussions with code snippets',
        'Instant search with tagging and filter queries',
      ],
      stats: [
        { label: 'Articles', value: '2.4K' },
        { label: 'Monthly Visits', value: '65K+' },
        { label: 'Stars', value: '1.2K ★' },
      ],
      demoUrl: 'https://example.com/devflow',
      githubUrl: 'https://github.com/example/devflow',
    },
  ] as Project[],

  skillCategories: [
    {
      category: 'Mobile & Frontend',
      items: [
        { name: 'React Native', level: 95, icon: '📱' },
        { name: 'React.js', level: 92, icon: '⚛️' },
        { name: 'TypeScript', level: 90, icon: '🔷' },
        { name: 'JavaScript (ES6+)', level: 95, icon: '💛' },
        { name: 'Tailwind / NativeWind', level: 88, icon: '🎨' },
        { name: 'State Management (Redux/Zustand)', level: 86, icon: '🔄' },
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        { name: 'Node.js & Express', level: 84, icon: '🟢' },
        { name: 'REST APIs & GraphQL', level: 88, icon: '⚡' },
        { name: 'PostgreSQL & SQLite', level: 80, icon: '🗄️' },
        { name: 'Firebase / Supabase', level: 85, icon: '🔥' },
      ],
    },
    {
      category: 'Workflow & Tooling',
      items: [
        { name: 'Git & GitHub', level: 94, icon: '🐙' },
        { name: 'Metro & Fast Refresh', level: 90, icon: '⚡' },
        { name: 'Figma & UI Prototyping', level: 85, icon: '📐' },
        { name: 'Jest & Unit Testing', level: 82, icon: '🧪' },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      period: '2024 - PRESENT',
      role: 'Senior React Native & Frontend Developer',
      company: 'Tech Innovators Studio',
      description:
        'Leading mobile feature development across iOS & Android apps. Architecting state management systems, optimising render cycles, and implementing responsive layouts.',
      achievements: [
        'Reduced app bundle size by 32% and cut initial startup time in half.',
        'Mentored 4 junior engineers on React Native best practices and TypeScript.',
        'Engineered an offline-first data caching layer with SQLite.',
      ],
    },
    {
      period: '2023 - 2024',
      role: 'React & Frontend Engineer',
      company: 'Digital Solutions Co.',
      description:
        'Built enterprise client web dashboards, customer portals, and internal productivity tools using modern React, Tailwind CSS, and REST integrations.',
      achievements: [
        'Delivered 6 production-grade web applications on schedule.',
        'Implemented standardized component libraries adhering to WCAG accessibility guidelines.',
        'Authored robust end-to-end and unit test suites.',
      ],
    },
    {
      period: '2022 - 2023',
      role: 'Junior Mobile Developer Intern',
      company: 'AppForge Labs',
      description:
        'Collaborated on cross-platform prototypes, bug squashing, API integrations, and UI redesigns.',
      achievements: [
        'Converted 15+ legacy screens into modular TypeScript functional components.',
        'Authored comprehensive developer setup documentation.',
      ],
    },
  ] as ExperienceItem[],
};
