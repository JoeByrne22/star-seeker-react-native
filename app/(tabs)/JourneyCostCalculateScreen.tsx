import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { calculateJourneyCost } from '../services/apiService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Transport {
  name: string;
}

interface JourneyCost {
  journeyCost: string;
  recommendedTransport: Transport;
}

const ExploreScreen = () => {
  const [distance, setDistance] = useState('');
  const [passengers, setPassengers] = useState('');
  const [parking, setParking] = useState('');
  const [loading, setLoading] = useState(false);
  const [journeyCost, setJourneyCost] = useState<JourneyCost | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const cost = await calculateJourneyCost(String(distance), Number(passengers), Number(parking));
      console.log('journeyCost', journeyCost);
      setJourneyCost(cost);
    } catch (error) {
      console.error('Error calculating journey cost:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Calculate Journey Cost</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Distance (in AUs)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Passengers"
        keyboardType="numeric"
        value={passengers}
        onChangeText={setPassengers}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Days of Parking"
        keyboardType="numeric"
        value={parking}
        onChangeText={setParking}
      />
      <Button title="Calculate" onPress={handleCalculate} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {journeyCost && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Cheapest Vehicle: {journeyCost.recommendedTransport.name}</Text>
          <Text style={styles.resultText}>Cost: {journeyCost.journeyCost}</Text>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExploreScreen;