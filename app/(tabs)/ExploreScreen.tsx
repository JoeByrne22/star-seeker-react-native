import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const ExploreScreen = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Explore</ThemedText>
      <ThemedText type="title">
        This is the Explore screen. Here you can find various features and information to explore within the app.
      </ThemedText>
    </ThemedView>
  );
};

export default ExploreScreen;