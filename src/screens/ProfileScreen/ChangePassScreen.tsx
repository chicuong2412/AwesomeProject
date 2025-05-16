import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../constants/images';
import {icons} from '../../constants/icons';

export default function ChangePassScreen() {
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ScrollView className="bg-black" contentContainerStyle={{flexGrow: 1}}>
      <Image
        source={images.bg2}
        resizeMode="cover"
        style={{width: '100%'}}
        className="absolute z-0"
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-8 pb-4 mt-8 mb-10">
        <TouchableOpacity>
          <Image source={icons.back} className="w-[28] h-[28]" />
        </TouchableOpacity>
        <Text
          className="text-white text-2xl"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
          }}>
          Change Your Password
        </Text>
        <View style={{width: 24}} /> {/* Placeholder for alignment */}
      </View>

      {/* Body */}
      <View className="px-4">
        <Text
          className="text-white text-left mb-3"
          style={{fontFamily: 'DMSans-Medium'}}>
          Enter your old password
        </Text>
        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-5 px-4">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showOldPassword}
            className="flex-1 text-white py-5"
          />
          <TouchableOpacity
            onPress={() => setShowOldPassword(!showOldPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showOldPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          className="text-white text-left mb-3"
          style={{fontFamily: 'DMSans-Medium'}}>
          Enter your new password
        </Text>
        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-5 px-4">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showNewPassword}
            className="flex-1 text-white py-5"
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showNewPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          className="text-white text-left mb-3"
          style={{fontFamily: 'DMSans-Medium'}}>
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

        <TouchableOpacity className="bg-[#A084E8] mt-5">
          <Text className="text-white text-center font-bold text-lg py-4">
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
