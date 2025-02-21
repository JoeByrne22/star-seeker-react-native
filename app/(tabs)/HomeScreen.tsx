import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchGatesData } from '../services/apiService';
import { ThemedText } from '@/components/ThemedText';
import styles from '../../styles';

const HomeScreen = () => {
  const [gateInfo, setGateInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGateIndex, setSelectedGateIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGatesData();
        setGateInfo(data);
      } catch (error) {
        console.error('Error fetching gate information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item, index }: { item: { id: number; name: string; code: string}, index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedGateIndex(selectedGateIndex === index ? null : index);
        console.log('selectedGateIndex', selectedGateIndex);
      }}
    >
      <ThemedText type="subtitle">{item.name}</ThemedText>
      {selectedGateIndex === index && (
        <View>
          <ThemedText type="default">{item.code}</ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="title">Gate Information</ThemedText>
      <FlatList
        data={gateInfo}
        renderItem={renderItem}
      />
    </View>
  );
};


export default HomeScreen;