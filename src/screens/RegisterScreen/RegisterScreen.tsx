/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {Register} from '../../services/AuthServices';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'Register'
>;

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {errors, data, refetch, loading, reset} = useFetch(() => {
    return Register(email, password);
  });
  const [helperText, setHelperText] = useState<string | null>(null);

  const handleRegister = () => {
    if (loading) {
      return;
    }

    if (email === '' || password === '' || confirmPassword === '') {
      setHelperText('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setHelperText('Passwords do not match');
      return;
    }
    refetch();
  };

  useEffect(() => {
    if (errors !== null) {
      switch (errors.response?.status) {
        case 400:
          setHelperText('Invalid email or password');
          break;
        case 409:
          setHelperText('Email already exists');
          break;
        default:
          setHelperText('Something went wrong, please try again later');
          break;
      }
      return;
    }
    if (data != null) {
      ToastAndroid.showWithGravity(
        'Registration successful! Please log in.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      reset();
      navigation.navigate('Login');
    }
  }, [data, errors, navigation, reset]);

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

      <View className="flex-row justify-center mb-8 mt-10 px-10">
        <TouchableOpacity
          className="border border-white py-3 rounded-full mr-2 w-[50%]"
          onPress={() => navigation.navigate('Login')}>
          <Text className="text-white font-semibold text-center text-xl">
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[50%]">
          <LinearGradient
            colors={['#D6C7FF', '#AB8BFF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="py-3"
            style={{
              borderRadius: 50,
            }}>
            <Text className="text-black font-semibold text-center text-xl">
              Sign up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View className="px-10">
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#A3A3A3"
          className="bg-[#23233B] text-white px-4 py-5 rounded-lg mb-5"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />

        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-5 px-4">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showPassword}
            className="flex-1 text-white py-5"
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-6 px-4">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showConfirmPassword}
            className="flex-1 text-white py-5"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-[#A084E8] py-4 mt-5 rounded-full mb-4"
          onPress={handleRegister}>
          <Text className="text-white text-center font-bold text-lg">
            Register
          </Text>
        </TouchableOpacity>
        {helperText == null ? (
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
