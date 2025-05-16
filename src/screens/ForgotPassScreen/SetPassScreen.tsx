import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';

export default function SetPassScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="rounded-full bg-[#A084E8] ">
          <Text className="text-white text-center font-bold text-lg py-4">
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
