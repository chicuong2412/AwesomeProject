/* eslint-disable react-native/no-inline-styles */
import {View, Image, TouchableOpacity, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../constants/images';
import {icons} from '../../constants/icons';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';
import {Login} from '../../services/AuthServices';
import {useAuth} from '../../Auth/AuthProvider';
import {AxiosError} from 'axios';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'Login'
>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<AxiosError | null>(null);

  const {setTokens} = useAuth();

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (email === undefined) {
      return;
    }

    if (password === undefined) {
      return;
    }

    try {
      const rp = await Login(email, password);

      setTokens(rp.data.token as string, rp.data.refreshToken as string);

      navigation.navigate('MainStack');
    } catch (error: any) {
      const rp = error as AxiosError;
      if (rp.status === 400) {
        setErrors(rp);
      }
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

      <View className="flex-row justify-center mb-8 mt-10 px-10">
        <TouchableOpacity className="rounded-full mr-2 w-[50%] ">
          <LinearGradient
            colors={['#D6C7FF', '#AB8BFF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="py-3"
            style={{
              borderRadius: 50,
            }}>
            <Text
              className="text-black text-center text-xl"
              style={{
                fontFamily: 'DMSans-Bold',
                fontWeight: 'bold',
              }}>
              Sign in
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-white w-[50%] py-3 rounded-full"
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text
            className="text-white text-center text-xl"
            style={{
              fontFamily: 'DMSans-Bold',
              fontWeight: 'bold',
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-10">
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#A3A3A3"
          className="bg-[#23233B] text-white px-4 py-5 rounded-lg mb-5"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <View className="flex-row items-center bg-[#23233B] rounded-lg mb-6 px-4">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A3A3A3"
            secureTextEntry={!showPassword}
            className="flex-1 text-white py-5"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-[#A084E8] font-bold">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-[#A084E8] py-4 mt-5 rounded-full mb-4"
          onPress={() => {
            handleLogin();
          }}>
          <Text className="text-white text-center font-bold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        {errors != null ? (
          <View className="flex-row items-center rounded-lg mb-6 px-4">
            <Text className="text-red-600">
              {errors.response?.data as string}
            </Text>
          </View>
        ) : (
          ''
        )}

        <TouchableOpacity
          className="mb-16"
          onPress={() => {
            navigation.navigate('MainForgotPassScreen');
          }}>
          <Text className="text-[white] text-right underline opacity-60">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-left pl-10">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text className="text-white underline font-bold">
            Create an account,
          </Text>
        </TouchableOpacity>
        <Text className="text-white"> if you're new</Text>
      </View>
    </View>
  );
}
