import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { fetchGatesData, findCheapestRoute } from '../services/apiService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Find Cheapest Route</ThemedText>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsSourceModalVisible(true)}
      >
        <Text>{sourceGate ? gateInfo.find(gate => gate.code === sourceGate)?.name : 'Select Source Gate'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsTargetModalVisible(true)}
      >
        <Text>{targetGate ? gateInfo.find(gate => gate.code === targetGate)?.name : 'Select Target Gate'}</Text>
      </TouchableOpacity>
      <Button title="Find Route" onPress={handleFindRoute} />
      {routeInfo && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Cheapest Route: {routeInfo.route}</Text>
          <Text style={styles.resultText}>Cost: {routeInfo.cost}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default CheapestRouteScreen;