import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  ThemeProvider,
} from './src/context/ThemeContext';

import {
  NavigationProvider,
} from './src/navigation/NavigationContext';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ThemeProvider>
        <NavigationProvider>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </NavigationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});