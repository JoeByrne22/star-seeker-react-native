import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ParallaxScrollViewProps {
  headerBackgroundColor: { light: string };
  headerImage: React.ReactNode;
  children: React.ReactNode;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({ headerBackgroundColor, headerImage, children }) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      scrollEventThrottle={16}
      bounces={false}
    >
      <View style={[styles.header, { backgroundColor: headerBackgroundColor.light }]}>
        {headerImage}
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: 16,
  },
});

export default ParallaxScrollView;