import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { HomeScreen } from '../screens/HomeScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ExperienceScreen } from '../screens/ExperienceScreen';
import { ContactScreen } from '../screens/ContactScreen';
import Meow from '../screens/Meow';

export type BottomTabParamList = {
  Home: undefined;
  Projects: undefined;
  Experience: undefined;
  Contact: undefined;
  Meow: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarBg,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 62 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: theme.colors.primaryLight,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused }) => {
          let icon = '🏠';
          if (route.name === 'Home') icon = '🏠';
          else if (route.name === 'Projects') icon = '💼';
          else if (route.name === 'Experience') icon = '⚡';
          else if (route.name === 'Contact') icon = '💬';
          else if (route.name === 'Meow') icon = '🐱';

          return (
            <Text style={{ fontSize: focused ? 20 : 18, opacity: focused ? 1 : 0.65 }}>
              {icon}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{ tabBarLabel: 'Skills' }}
      />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Meow" component={Meow} />
    </Tab.Navigator>
  );
}
