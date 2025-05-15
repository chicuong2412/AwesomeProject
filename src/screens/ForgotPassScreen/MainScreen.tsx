import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';

export default function MainForgotPassScreen() {
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
      <View className='px-10'>
        <Text className="text-white text-2xl font-bold text-center my-10">
          Forgot Password
        </Text>

        <Text className="text-white opacity-60 text-left mb-3">
          Enter your email address to reset password
        </Text>

        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-8 px-4">
          <Text className="text-[#A3A3A3] mr-2">✉️</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A3A3A3"
            className="flex-1 text-white py-5"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity className='rounded-full bg-[#A084E8] '>
            <Text className="text-white text-center font-bold text-lg py-4">
              Send
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
