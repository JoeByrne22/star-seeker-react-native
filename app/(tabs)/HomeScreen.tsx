import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home Screen</ThemedText>
      <ThemedText type="title">
        This is the home screen of the Star Seeker app. Here you can find various features and information.
      </ThemedText>
      {/* Additional content and functionality can be added here */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default HomeScreen;