import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/HomeScreen';
import JourneyCalculatorScreen from './(tabs)/JourneyCostCalculateScreen';
import RouteFinderScreen from './(tabs)/CheapestRouteScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journey Calculator" component={JourneyCalculatorScreen} />
        <Tab.Screen name="Route Finder" component={RouteFinderScreen} />
      </Tab.Navigator>
  );
}
