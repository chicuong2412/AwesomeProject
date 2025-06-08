/* eslint-disable react-native/no-inline-styles */
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
import {
  ActivityIndicator,
  Animated,
  AppState,
  AppStateStatus,
  Easing,
  View,
} from 'react-native';
import {useAuth} from '../Auth/AuthProvider';
import {fetchScreenTimeToServer} from '../services/DataService';
import GettingStartedScreen from '../screens/GettingStartedScreen';

const Stack = createNativeStackNavigator<StackRootIn>();

export default function MainNavigation() {
  const {loading, accessToken} = useAuth();

  const appState = useRef(AppState.currentState);
  const sessionStart = useRef<number | null>(null);

  const spinAnim = useRef(new Animated.Value(0)).current;

  const handleFetchScreenTime = (value: number) => {
    fetchScreenTimeToServer(value);
  };

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

  useEffect(() => {
    if (accessToken != null) {
      // If the user is authenticated, we can start tracking app state changes
      sessionStart.current = Date.now();
    } else {
      // If the user is not authenticated, reset the session start time
      var sessionEnd = Date.now();
      if (sessionStart.current !== null) {
        const sessionDuration = (sessionEnd - sessionStart.current) / 1000;

        //Send data to server
        handleFetchScreenTime(sessionDuration);
      }
      sessionStart.current = null;
    }
  }, [accessToken]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (accessToken == null) {
        // If the user is not authenticated, we don't track app state changes
        if (appState.current === nextAppState) {
          // If the app state hasn't changed, we can skip further processing
          return;
        }
        // If the user is not authenticated, reset the session start time
        sessionStart.current = Date.now();
        appState.current = nextAppState;
        return;
      }
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground
        sessionStart.current = Date.now();
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        // App is going to the background
        if (sessionStart.current) {
          const sessionEnd = Date.now();
          const sessionDuration = (sessionEnd - sessionStart.current) / 1000;

          //Send data to server
          handleFetchScreenTime(sessionDuration);
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [accessToken]);

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
          <ActivityIndicator size="small" color="#0000ff" />
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
        <Stack.Screen name="GettingStarted" component={GettingStartedScreen} />
      </Stack.Navigator>
    </>
  );
}
