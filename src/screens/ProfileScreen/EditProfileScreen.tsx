/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../constants/images';
import {icons} from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {StackRootIn, UserProfile} from '../../interfaces/interfaces';
import {useFetch} from '../../hooks/useFetch';
import {fetchMyProfile, UpdateProfile} from '../../services/DataService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Config from 'react-native-config';

type NavigationProps = NativeStackNavigationProp<StackRootIn, 'Drawer'>;

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'plgkiet',
    name: 'Tung Tung Tung Tung Tung',
    email: 'sahurlovetralalerotralala@gmail.com',
    doB: '30/11/2003',
    screenTime: 0,
    id: '',
  });

  const navigation = useNavigation<NavigationProps>();

  const [image, setImage] = useState<Asset | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    data: profileData,
    refetch: profileRefetch,
    errors,
    loading,
  } = useFetch<UserProfile>(() => {
    return fetchMyProfile();
  });

  useEffect(() => {
    profileRefetch();
  }, []);

  useEffect(() => {
    if (profileData != null) {
      setProfile(profileData);
    }
  }, [profileData]);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append('name', profile.name);
    form.append('username', profile.username);
    form.append('email', profile.email);
    form.append('doB', profile.doB);
    form.append('avatar', image);

    UpdateProfile(form)
      .then(rp => {
        if (rp.status === 200) {
          ToastAndroid.showWithGravity(
            'Profile updated successful!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('MainStack');
        }
      })
      .catch(_error => {});
  };

  const handleChange = (field: string, value: string) => {
    setProfile({...profile, [field]: value});
  };

  return (
    <ScrollView className="bg-black" contentContainerStyle={{flexGrow: 1}}>
      <Image
        source={images.bg2}
        resizeMode="cover"
        style={{
          width: '100%',
        }}
        className="absolute z-0"
      />

      <View className="flex-row items-center justify-between px-4 pt-8 pb-4 mt-8">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={icons.back} className="w-[28] h-[28]" />
        </TouchableOpacity>
        <Text
          className="text-white text-2xl "
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
          }}>
          Edit profile
        </Text>
        <View style={{width: 24}} />
      </View>

      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full bg-[#3B4A6B] items-center justify-center">
          {image !== null ? (
            <Image
              source={{uri: image.uri}}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: `${Config.PUBLIC_LINK}/api/images/avatar/${profile.avatar}`,
              }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          )}
        </View>
        <TouchableOpacity
          onPress={pickImage}
          className="mt-2 bg-[#A084E8] rounded-full px-4 py-2">
          <Text className="text-white">Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View className="px-6">
        <Text
          className="text-white mb-1"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Username
        </Text>
        <View className="flex-row items-center border border-[white] rounded-full px-4 py-3 mb-4">
          <TextInput
            value={profile.username}
            onChangeText={text => handleChange('username', text)}
            className="flex-1 text-white py-3"
            placeholder="Username"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Image source={icons.fill} className="w-[15] h-[15]" />
          </TouchableOpacity>
        </View>

        <Text
          className="text-white mb-1"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Name
        </Text>
        <View className="flex-row items-center border border-[white] rounded-full px-4  py-3 mb-4">
          <TextInput
            value={profile.name}
            onChangeText={text => handleChange('firstName', text)}
            className="flex-1 text-white py-3"
            placeholder="First Name"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Image source={icons.fill} className="w-[15] h-[15]" />
          </TouchableOpacity>
        </View>

        <Text
          className="text-white mb-1"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Email
        </Text>
        <View className="flex-row items-center border border-[white] rounded-full px-4 py-3 mb-4">
          <TextInput
            value={profile.email}
            onChangeText={text => handleChange('email', text)}
            className="flex-1 text-white py-3"
            placeholder="Email"
            placeholderTextColor="#A3A3A3"
            keyboardType="email-address"
          />
          <TouchableOpacity>
            <Image source={icons.fill} className="w-[15] h-[15]" />
          </TouchableOpacity>
        </View>

        <Text
          className="text-white mb-1"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          Date of Birth
        </Text>
        <View className="flex-row items-center border border-[white] rounded-full px-4 py-3 mb-8">
          <TextInput
            value={profile.doB}
            onChangeText={text => handleChange('dob', text)}
            className="flex-1 text-white py-3"
            placeholder="Date of Birth"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Image source={icons.calen} className="w-[15] h-[15]" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleUpdate();
          }}>
          <LinearGradient
            colors={['#A084E8', '#8F6ED5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="rounded-full mt-5 mb-8">
            <Text className="text-white text-center font-bold text-lg py-4">
              UPDATE
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
