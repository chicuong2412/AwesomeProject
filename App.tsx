/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation.tsx';



export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
}
