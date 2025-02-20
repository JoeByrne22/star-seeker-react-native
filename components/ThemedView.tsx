import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ThemedViewProps {
  children: React.ReactNode;
  style?: object;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Default background color, can be changed based on theme
  },
});