import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../constants/images';

export default function EditProfileScreen() {
  const [profile, setProfile] = useState({
    username: 'plgkiet',
    firstName: 'Tung Tung Tung Tung Tung',
    lastName: 'Sahur',
    email: 'sahurlovetralalerotralala@gmail.com',
    dob: '30/11/2003',
  });

  const handleChange = (field: string, value: string) => {
    setProfile({...profile, [field]: value});
  };

  return (
    <ScrollView className="bg-primary" contentContainerStyle={{flexGrow: 1}}>
      <Image
        source={images.bg}
        resizeMode="cover"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
        }}
        className="absolute z-0"
      />
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-8 pb-4">
        <TouchableOpacity>
          <Text className="text-white text-2xl">{'<'}</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Edit profile</Text>
        <View style={{width: 24}} /> {/* Placeholder for alignment */}
      </View>

      {/* Profile Image */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full bg-[#3B4A6B] items-center justify-center">
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/ffffff/camera.png',
            }} // Replace with your image or SVG
            className="w-16 h-16"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Form */}
      <View className="px-6">
        {/* Username */}
        <Text className="text-white mb-1">Username</Text>
        <View className="flex-row items-center border border-[#A084E8] rounded-full px-4 mb-4">
          <TextInput
            value={profile.username}
            onChangeText={text => handleChange('username', text)}
            className="flex-1 text-white py-3"
            placeholder="Username"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Text className="text-[#A084E8] text-lg">✏️</Text>
            {/* <Icon name="pencil" size={20} color="#A084E8" /> */}
          </TouchableOpacity>
        </View>

        {/* First Name */}
        <Text className="text-white mb-1">First Name</Text>
        <View className="flex-row items-center border border-[#A084E8] rounded-full px-4 mb-4">
          <TextInput
            value={profile.firstName}
            onChangeText={text => handleChange('firstName', text)}
            className="flex-1 text-white py-3"
            placeholder="First Name"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Text className="text-[#A084E8] text-lg">✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Last Name */}
        <Text className="text-white mb-1">Last Name</Text>
        <View className="flex-row items-center border border-[#A084E8] rounded-full px-4 mb-4">
          <TextInput
            value={profile.lastName}
            onChangeText={text => handleChange('lastName', text)}
            className="flex-1 text-white py-3"
            placeholder="Last Name"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Text className="text-[#A084E8] text-lg">✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text className="text-white mb-1">Email</Text>
        <View className="flex-row items-center border border-[#A084E8] rounded-full px-4 mb-4">
          <TextInput
            value={profile.email}
            onChangeText={text => handleChange('email', text)}
            className="flex-1 text-white py-3"
            placeholder="Email"
            placeholderTextColor="#A3A3A3"
            keyboardType="email-address"
          />
          <TouchableOpacity>
            <Text className="text-[#A084E8] text-lg">✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Date of Birth */}
        <Text className="text-white mb-1">Date of Birth</Text>
        <View className="flex-row items-center border border-[#A084E8] rounded-full px-4 mb-8">
          <TextInput
            value={profile.dob}
            onChangeText={text => handleChange('dob', text)}
            className="flex-1 text-white py-3"
            placeholder="Date of Birth"
            placeholderTextColor="#A3A3A3"
          />
          <TouchableOpacity>
            <Text className="text-[#A084E8] text-lg">📅</Text>
          </TouchableOpacity>
        </View>

        {/* Update Button */}
        <TouchableOpacity>
          <LinearGradient
            colors={['#A084E8', '#8F6ED5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="rounded-full mb-8">
            <Text className="text-white text-center font-bold text-lg py-4">
              UPDATE
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
