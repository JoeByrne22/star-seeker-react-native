import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type: 'title' | 'subtitle' | 'defaultSemiBold' | 'default' | 'inputPlaceholder';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ type, style, children, ...props }) => {
  const textStyle = [styles.default, styles[type], style];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputPlaceholder: {
    color: 'lightgray',
    fontSize: 14,
  }
});