import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootNaviagtion} from '../types/interfaces.ts';
import {images} from '../../constants/images.ts';
import {icons} from '../../constants/icons.ts';
import GradientText from '../../components/Text/GradientText';
import WhiteText from '../../components/Text/WhiteText';
import LinearGradient from 'react-native-linear-gradient';

const recentlyViewed = [
  {title: 'Werewolves', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
  {title: 'Aftermath', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
  {title: 'Red One', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
];

const lovedList = [
  {title: 'Werewolves', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
  {title: 'Aftermath', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
  {title: 'Red One', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
];

export default function ProfileScreen() {
  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        resizeMode="cover"
        style={{
          width: '100%',
        }}
        className="absolute z-0"
      />
      <ScrollView
        className="mt-6 mb-32"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-row justify-between items-center px-4 pt-10 mt-5">
          <Text className="text-white">
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                fontWeight: 'bold',
                fontSize: 22,
              }}>
              My{' '}
              <Text
                style={{
                  fontFamily: 'DMSans-Bold',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}
                className="text-[#AB8BFF]">
                Account
              </Text>
            </Text>
          </Text>

          <View className="flex-row">
            {/* <TouchableOpacity className="w-8 h-8 justify-center items-center">
              <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor="#AB8BFF"
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-8 h-8 justify-center items-center ml-4">
              <Image
                source={icons.bell}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity> */}
            <TouchableOpacity className="w-8 h-8 justify-center items-center ml-5">
              <Image
                source={icons.menu}
                className="w-12 h-12 mr-3"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile */}
        <View className="items-center mt-4 relative">
          <LinearGradient
            colors={['#292364', '#BBB9CB']}
            start={{x: 0.3, y: 0.3}}
            end={{x: 1, y: 1}}
            style={{
              width: '100%',
              paddingTop: 96,
              marginTop: 30,
              borderRadius: 50,
              alignItems: 'center',
              zIndex: 0,
              marginHorizontal: 16,
            }}>
            <WhiteText
              style={{
                fontSize: 72,
                marginTop: 10,
                marginBottom: 10,
              }}>
              SCREEN TIME FLEX
            </WhiteText>

            <View
              className="bg-[#12082A] mt-2 w-full items-center py-10 px-4"
              style={{borderRadius: 50}}>
              <GradientText text="14 hours" fontSize={60} />
            </View>
          </LinearGradient>

          <View className="absolute top-0 items-center z-10">
            <View className=" rounded-lg">
              <Image source={icons.avt} className="w-20 h-20 rounded-lg" />
            </View>
            <Text
              className="text-white mt-2 font-semibold"
              style={{fontFamily: 'Montserrat-Bold'}}>
              plgkiet
            </Text>
            <Text
              className="text-gray-400 text-xs"
              style={{fontFamily: 'Montserrat-Bold'}}>
              ID: 1234567890
            </Text>
          </View>
        </View>

        {/* Recently viewed */}
        <Text
          className="text-white ml-4 mt-5 mb-2"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Recently viewed
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4">
          {recentlyViewed.map((item, idx) => (
            <View key={idx} className="mr-4">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                className="w-32 h-48 rounded-t-lg"
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: 6,
                  backgroundColor: '#AB8BFF',
                }}
              />
            </View>
          ))}
        </ScrollView>

        {/* Loved list */}
        <Text
          className="text-white ml-4 mt-6 mb-2"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Your loved list
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4 mb-8">
          {lovedList.map((item, idx) => (
            <View key={idx} className="mr-4 relative">
              {/* Heart icon */}
              <TouchableOpacity className="absolute right-2 top-2 z-10 p-1">
                <Image
                  source={icons.love}
                  className="w-8 h-8"
                  style={{borderRadius: 50}}
                />
              </TouchableOpacity>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                className="w-32 h-48 rounded-xl"
              />
              <Text className="text-white text-xs mt-1">{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
