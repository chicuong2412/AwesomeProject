import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import DetailScreen from '../screens/DetailScreen/DetailScreen';

const Stack = createNativeStackNavigator<StackRootIn>();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}
