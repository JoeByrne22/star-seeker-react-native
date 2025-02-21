import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { fetchGatesData, findCheapestRoute } from '../services/apiService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from '../../styles';

const CheapestRouteScreen = () => {
  const [gateInfo, setGateInfo] = useState<Gate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceGate, setSourceGate] = useState<string | null>(null);
  const [targetGate, setTargetGate] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isSourceModalVisible, setIsSourceModalVisible] = useState(false);
  const [isTargetModalVisible, setIsTargetModalVisible] = useState(false);

  interface RouteInfo {
    route: string;
    cost: number;
  }

  interface Gate {
    code: string;
    name: string;
  }

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

  const handleFindRoute = async () => {
    if (sourceGate && targetGate) {
      setLoading(true);
      try {
        const data = await findCheapestRoute(sourceGate, targetGate);
        setRouteInfo(data);
      } catch (error) {
        console.error('Error finding cheapest route:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderGateItem = ({ item }: { item: Gate }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (isSourceModalVisible) {
          setSourceGate(item.code);
          setIsSourceModalVisible(false);
        } else if (isTargetModalVisible) {
          setTargetGate(item.code);
          setIsTargetModalVisible(false);
        }
      }}
    >
      <ThemedText type="default">{item.name}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Find Cheapest Route</ThemedText>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsSourceModalVisible(true)}
      >
        <ThemedText type="inputPlaceholder">{sourceGate ? gateInfo.find(gate => gate.code === sourceGate)?.name : 'Select Source Gate'}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsTargetModalVisible(true)}
      >
        <ThemedText type="inputPlaceholder">{targetGate ? gateInfo.find(gate => gate.code === targetGate)?.name : 'Select Target Gate'}</ThemedText>
      </TouchableOpacity>
      <Button title="Find Route" onPress={handleFindRoute} />
      {routeInfo && (
        <View style={styles.resultContainer}>
          <ThemedText type='subtitle'>Cheapest Route: {routeInfo.route}</ThemedText>
        </View>
      )}
      <Modal
        visible={isSourceModalVisible || isTargetModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={gateInfo}
            renderItem={renderGateItem}
            keyExtractor={(item) => item.code}
          />
          <Button title="Close" onPress={() => {
            setIsSourceModalVisible(false);
            setIsTargetModalVisible(false);
          }} />
        </View>
      </Modal>
    </ThemedView>
  );
};


export default CheapestRouteScreen;