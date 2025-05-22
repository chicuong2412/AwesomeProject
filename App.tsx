/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/Auth/AuthProvider.tsx';
import MainNavigation from './src/navigation/MainNavigation.tsx';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
