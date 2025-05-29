import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import DetailScreen from '../screens/DetailScreen/DetailScreen';
import VideoScreen from '../screens/VideoScreen/VideoScreen';
import {StackRootIn} from '../interfaces/interfaces';
import {useAuth} from '../Auth/AuthProvider';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator<StackRootIn>();

type MainStackNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'MainStack'
>;

export default function StackNavigation() {
  const {accessToken} = useAuth();

  const navigation = useNavigation<MainStackNavigationProp>();

  useEffect(() => {
    if (accessToken == null) {
      navigation.navigate('Login');
    }
  }, [accessToken, navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
