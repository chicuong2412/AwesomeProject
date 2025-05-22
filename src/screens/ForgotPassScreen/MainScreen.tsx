import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import {useFetch} from '../../hooks/useFetch';
import {FetchForgotPassword} from '../../services/AuthServices';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MainForgotNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'MainForgotPassScreen'
>;

export default function MainForgotPassScreen() {
  const [email, setEmail] = useState<string>();
  const navigation = useNavigation<MainForgotNavigationProp>();

  const {data, errors, loading, refetch, reset} = useFetch<string>(() => {
    if (email === undefined) {
      throw new Error('Please fill in the email');
    }
    return FetchForgotPassword(email);
  });

  const handlePressedForgot = () => {
    refetch();
  };

  useEffect(() => {
    async function LoginSuccessful() {
      await AsyncStorage.setItem('resetPassToken', data!);
    }
    if (data !== null && errors === null) {
      LoginSuccessful();
    }
  }, [data, errors]);

  return (
    <View className="bg-primary flex-1 pt-[10%]">
      <Image
        source={images.bg}
        resizeMode="cover"
        // eslint-disable-next-line react-native/no-inline-styles
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
          />{' '}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A3A3A3"
            className="flex-1 text-white py-5"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
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
      </View>
    </View>
  );
}
