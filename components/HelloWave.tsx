import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HelloWave = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.waveText}>👋</Text>
      <Text style={styles.greetingText}>Hello there!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  waveText: {
    fontSize: 32,
  },
  greetingText: {
    fontSize: 24,
    marginLeft: 8,
  },
});