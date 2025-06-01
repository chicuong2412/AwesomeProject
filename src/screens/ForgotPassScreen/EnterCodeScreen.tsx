/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../../interfaces/interfaces';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {ConfirmPasscodeFetch} from '../../services/AuthServices';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type EnterResetCodeScreen = NativeStackNavigationProp<
  StackRootIn,
  'EnterCodeScreen'
>;

export default function EnterCodeScreen({
  route,
}: {
  route: RouteProp<StackRootIn, 'EnterCodeScreen'>;
}) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
  ];

  const [helperText, setHelperText] = useState('');
  const resetPassToken = route.params.resetPassToken;

  const {refetch, data, errors} = useFetch<string>(() => {
    return ConfirmPasscodeFetch(code.join(''), resetPassToken!);
  });

  const navigation = useNavigation<EnterResetCodeScreen>();

  useEffect(() => {
    AsyncStorage.getItem('resetPassToken', token => {
      if (token === null) {
        navigation.navigate('MainForgotPassScreen');
      }
    });
  }, [navigation]);

  const handleSubmit = async () => {
    const codeJoin = code.join('');
    console.log(codeJoin);
    if (codeJoin.length < 4) {
      setHelperText('Please enter a valid 4-digit code.');
      return;
    }

    if (resetPassToken) {
      await refetch();
    } else {
      setHelperText('Something is wrong.');
      setTimeout(() => {
        navigation.navigate('MainStack');
      }, 2000);
    }
  };

  useEffect(() => {
    if (errors !== null) {
      switch (errors.response?.status) {
        case 400:
          setHelperText('Invalid code, please try again.');
          break;
        case 404:
          setHelperText('This code does not exist or has expired.');
          break;
        case 429:
          setHelperText('Too many requests, please wait a moment.');
          break;
        default:
          setHelperText('Something went wrong, please try again later.');
          navigation.navigate('MainStack');
          break;
      }
      return;
    }
    if (data !== null) {
      navigation.navigate('SetPassScreen', {
        resetPassToken: data,
      });
    }
  }, [errors, navigation, data]);

  const handleChange = (text: string, idx: number) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);
    if (text && idx < 3) {
      inputs[idx + 1].current?.focus();
    }
  };
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
          className="text-white mb-2 mt-10"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Enter Your
        </Text>
        <Text
          className="text-white mb-6"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Verification Code
        </Text>

        <View className="flex-row justify-between mb-8">
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={inputs[idx]}
              value={digit}
              onChangeText={text => handleChange(text, idx)}
              keyboardType="number-pad"
              maxLength={1}
              className="w-20 h-20 border-white rounded-3xl text-white text-3xl text-center mx-1"
              style={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'white',
              }}
              returnKeyType="next"
              onSubmitEditing={() =>
                idx < 3 && inputs[idx + 1].current?.focus()
              }
            />
          ))}
        </View>

        <Text
          className="text-white text-left mb-2"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          We send the four digits verification to your email.
        </Text>
        <Text
          className="text-white text-left mb-6"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          You can check your inbox.
        </Text>

        <Text
          className="text-white text-left mb-6"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Did not receive code?{' '}
          <Text className="text-[#A084E8] underline">Resend Now</Text>
        </Text>

        <TouchableOpacity
          className="rounded-full bg-[#A084E8] "
          onPress={handleSubmit}>
          <Text className="text-white text-center font-bold text-lg py-4">
            Verify
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
          <MaterialIcons name="arrow-left" size={24} color="white" />
          <Text className="text-white font-semibold text-center text-xl">
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
