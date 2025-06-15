import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import StatsScreen from './screens/StatsScreen';
import NavigationScreen from './screens/NavigationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f8f9fa' }
        }}
      >
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;