import React, {useEffect, useRef} from 'react';
import IntroScreen from '../screens/IntroScreen';
import StackNavigation from './StackNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackRootIn} from '../interfaces/interfaces';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import MainForgotPassScreen from '../screens/ForgotPassScreen/MainScreen';
import SetPassScreen from '../screens/ForgotPassScreen/SetPassScreen';
import EnterCodeScreen from '../screens/ForgotPassScreen/EnterCodeScreen';
import {Animated, Easing, View} from 'react-native';
import {useAuth} from '../Auth/AuthProvider';

const Stack = createNativeStackNavigator<StackRootIn>();

export default function MainNavigation() {
  const {loading} = useAuth();

  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      {loading ? (
        <View
          className="absolute h-full w-full justify-center items-center"
          style={{
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <Animated.View
            className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-transparent"
            style={{transform: [{rotate: spin}]}}
          />
        </View>
      ) : (
        <></>
      )}
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="MainStack" component={StackNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="MainForgotPassScreen"
          component={MainForgotPassScreen}
        />
        <Stack.Screen name="EnterCodeScreen" component={EnterCodeScreen} />
        <Stack.Screen name="SetPassScreen" component={SetPassScreen} />
      </Stack.Navigator>
    </>
  );
}
