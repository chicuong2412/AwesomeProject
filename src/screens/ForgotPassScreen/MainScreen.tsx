/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import {useFetch} from '../../hooks/useFetch';
import {FetchForgotPassword} from '../../services/AuthServices';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type MainForgotNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'MainForgotPassScreen'
>;

export default function MainForgotPassScreen() {
  const [email, setEmail] = useState<string>();
  const navigation = useNavigation<MainForgotNavigationProp>();
  const [helperText, setHelperText] = useState('');

  const {data, errors, refetch} = useFetch<string>(() => {
    if (email === undefined) {
      throw new Error('Please fill in the email');
    }
    return FetchForgotPassword(email);
  });

  const handlePressedForgot = async () => {
    refetch();
  };

  useEffect(() => {
    async function GetPasscodeSuccess() {
      navigation.navigate('EnterCodeScreen', {
        resetPassToken: data,
      });
    }
    if (errors !== null) {
      switch (errors.response?.status) {
        case 404:
          setHelperText('This email does not exist!!!');
          break;
        case 429:
          setHelperText('Too many request to this email, please wait!!!');
          break;
        default:
          setHelperText('Something is wrong');
          navigation.navigate('MainStack');
          break;
      }
      return;
    }
    if (data !== null) {
      GetPasscodeSuccess();
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
          className="text-white text-center my-10"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Forgot Password
        </Text>

        <Text
          className="text-white text-left mb-3"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Enter your email address to reset password
        </Text>

        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-8 px-4">
          <Image
            source={icons.mail}
            className="mx-auto w-[18] h-[18]"
            resizeMode="contain"
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A3A3A3"
            className="flex-1 text-white py-5"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          className="rounded-full bg-[#A084E8]"
          onPress={() => {
            handlePressedForgot();
          }}>
          <Text className="text-white text-center font-bold text-lg py-4">
            Send
          </Text>
        </TouchableOpacity>
        {errors ? (
          <Text className="text-red-600 text-lg text-left mt-5">
            {helperText}
          </Text>
        ) : (
          ''
        )}
      </View>
      <View className="absolute bottom-[40] self-center">
        <TouchableOpacity
          className="py-3 mr-2 d-flex flex-row items-center"
          onPress={() => navigation.navigate('Login')}>
            <MaterialIcons
            name="arrow-left"
            size={24}
            color="white"
          />
          <Text className="text-white font-semibold text-center text-xl">
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
