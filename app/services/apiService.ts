import axios from 'axios';

const API_URL = 'https://hstc-api.testing.keyholding.com/';
const API_KEY = '94962B9A-966C-43FC-8E1A-145DEAA5970C';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const fetchGatesData= async () => {
  try {
    const response = await apiClient.get('/gates');
    return response.data;
  } catch (error) {
    console.error('Error fetching gate information:', error);
    throw error;
  }
};

export const fetchGateDetails = async (gateCode: string) => {
    try {
      const response = await apiClient.get(`/gates/${gateCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gate details:', error);
      throw error;
    }
  };

export const fetchJourneyDetails = async () => {
  try {
    const response = await apiClient.get('/journey-details');
    return response.data;
  } catch (error) {
    console.error('Error fetching journey details:', error);
    throw error;
  }
};

export const calculateJourneyCost = async (distance: string, passengers: number, days: number) => {
    try {
      const response = await apiClient.get(`/transport/${distance}?passengers=${passengers}&parking=${days}`);
      return response.data;
    } catch (error) {
      console.error('Error calculating journey cost:', error);
      throw error;
    }
  };

  export const findCheapestRoute = async (sourceGateCode: string, targetGateCode: string) => {
    try {
      const response = await apiClient.get(`/gates/${sourceGateCode}/to/${targetGateCode}`);
      return response.data;
    } catch (error) {
      console.error('Error finding cheapest route:', error);
      throw error;
    }
  };
  

export default {
    fetchGatesData,
    fetchJourneyDetails,
    calculateJourneyCost,
    findCheapestRoute
  };