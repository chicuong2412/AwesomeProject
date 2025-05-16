/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen.tsx';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen.tsx';
import MainForgotPassScreen from './src/screens/ForgotPassScreen/MainScreen.tsx';
import EnterCodeScreen from './src/screens/ForgotPassScreen/EnterCodeScreen.tsx';
import SetPassScreen from './src/screens/ForgotPassScreen/SetPassScreen.tsx';
import EditProfileScreen from './src/screens/ProfileScreen/EditProfileScreen.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="MainStack" component={LoginScreen} />
        {/* StackNavigation */}
        {/* LoginScreen */}
        {/* MainForgotPassScreen */}
        {/* EnterCodeScreen */}
        {/* SetPassScreen */}
        {/* EditProfileScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
