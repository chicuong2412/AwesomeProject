/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../../constants/images';
import {icons} from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {ChangePass} from '../../services/AuthServices';
import {useAuth} from '../../Auth/AuthProvider';

export default function ChangePassScreen() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const {setLoading} = useAuth();
  const [helperText, setHelperText] = useState<string | null>(null);

  const {refetch, errors, data} = useFetch(async () => {
    if (setLoading != null) {
      setLoading(true);
    }
    var rp = await ChangePass(newPassword!);
    if (setLoading != null) {
      setLoading(false);
    }
    return rp;
  }, false);

  const navigation = useNavigation();

  const handleClickChangePass = () => {
    if (!newPassword) {
      setHelperText('Please, input new password');
      return;
    }

    if (!confirmPassword) {
      setHelperText('Please, input confirm password');
      return;
    }

    if (newPassword.localeCompare(confirmPassword) !== 0) {
      setHelperText(
        'Confirm password does not match with your new password, try again!!!',
      );
      return;
    }
    setHelperText(null);
    refetch();
  };

  useEffect(() => {
    if (setLoading != null) {
      setLoading(false);
    }
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
          setTimeout(() => {
            navigation.navigate('MainStack');
          }, 3000);

          break;
      }
      return;
    }

    setHelperText(null);

    if (data != null) {
      navigation.navigate('MainStack');
    }
  }, [errors, data, navigation, setLoading]);

  return (
    <ScrollView className="bg-black" contentContainerStyle={{flexGrow: 1}}>
      <Image
        source={images.bg2}
        resizeMode="cover"
        style={{width: '100%'}}
        className="absolute z-0"
      />

      <View className="flex-row items-center justify-between px-4 pt-8 pb-4 mt-8 mb-10">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
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
        <View style={{width: 24}} />
      </View>

      <View className="px-4">
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
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
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
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* {errors ? (
          <Text className="text-red-600 text-lg text-left mt-5">
            {helperText}
          </Text>
        ) : (
          ''
        )} */}
        {helperText !== null ? (
          <Text className="text-red-600 text-lg text-left mt-5">
            {helperText}
          </Text>
        ) : (
          ''
        )}

        <TouchableOpacity
          className="bg-[#A084E8] mt-5"
          onPress={() => {
            handleClickChangePass();
          }}>
          <Text className="text-white text-center font-bold text-lg py-4">
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
