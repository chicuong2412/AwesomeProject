/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackRootIn} from '../../interfaces/interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ResetPassword } from '../../services/AuthServices';
import { useFetch } from '../../hooks/useFetch';

type SetPassScreenStack = NativeStackNavigationProp<
  StackRootIn,
  'SetPassScreen'
>;

export default function SetPassScreen({
  route,
}: {
  route: RouteProp<StackRootIn, 'SetPassScreen'>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {resetPassToken} = route.params;
  const [helperText, setHelperText] = useState<string | null>(null);
  const navigation = useNavigation<SetPassScreenStack>();
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const {data, errors, refetch} = useFetch(() => {
    return ResetPassword(
      resetPassToken!, newPassword!);
  }, false);

  useEffect(() => {
    if (resetPassToken == null || resetPassToken === undefined) {
      setHelperText('Something went wrong, please try again.');
      setTimeout(() => {
        navigation.navigate('MainForgotPassScreen');
      }, 2000);
      return;
    }
  }, [resetPassToken, navigation]);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setHelperText('Passwords do not match.');
      return;
    }
    if (!newPassword || !confirmPassword) {
      setHelperText('Please fill in both fields.');
      return;
    }
    if (newPassword.length < 6) {
      setHelperText('Password must be at least 6 characters long.');
      return;
    }
    refetch();
  };

  useEffect(() => {
    if (errors) {
      switch (errors.response?.status) {
        case 400:
          setHelperText('Invalid request, please try again.');
          break;
        case 401:
          setHelperText('Unauthorized, please log in again.');
          navigation.navigate('MainStack');
          break;
        case 500:
          setHelperText('Server error, please try again later.');
          break;
        default:
          setHelperText('Something went wrong, please try again.');
          break;
      }
      return;
    }
    if (data !== null) {
      navigation.navigate('Login');
    }
  }, [data, errors, navigation]);

  return (
    <View className="bg-primary flex-1 pt-[10%]">
      <Image
        source={images.bg}
        resizeMode="cover"
        style={{
          width: '100%',
        }}
        className="absolute z-0"
      />
      <Image
        source={icons.logo}
        className="mx-auto mt-12 mb-2 w-[80] h-[80]"
        resizeMode="contain"
      />
      <View className="px-10">
        <Text
          className="text-white  text-center my-10"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Set Password
        </Text>

        <Text
          className="text-white text-left mb-3"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Enter your password
        </Text>
        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-5 px-4">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showPassword}
            className="flex-1 text-white py-5"
            onChangeText={text => setNewPassword(text)}
            value={newPassword || ''}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          className="text-white text-left mb-3"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Confirm your password
        </Text>
        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-6 px-4">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showConfirmPassword}
            className="flex-1 text-white py-5"
            value={confirmPassword || ''}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="rounded-full bg-[#A084E8] " onPress={handleUpdatePassword}>
          <Text className="text-white text-center font-bold text-lg py-4">
            Update
          </Text>
        </TouchableOpacity>
        {helperText ? (
          <Text className="text-red-600 text-lg text-left mt-5">
            {helperText}
          </Text>
        ) : (
          ''
        )}
      </View>
    </View>
  );
}
