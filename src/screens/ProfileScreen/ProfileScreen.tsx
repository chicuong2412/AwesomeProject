/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootNaviagtion} from '../types/interfaces.ts';
import {images} from '../../constants/images.ts';
import {icons} from '../../constants/icons.ts';
import GradientText from '../../components/Text/GradientText';
import WhiteText from '../../components/Text/WhiteText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch.ts';
import {
  fetchDataMovieFavoriteList,
  fetchMyProfile,
} from '../../services/DataService.ts';
import {Movie, UserProfile} from '../../interfaces/interfaces';
import Config from 'react-native-config';
import LovedMovieItem from '../../components/LovedMovieItem/LovedMovieItem.tsx';

const recentlyViewed = [
  {title: 'Werewolves', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
  {title: 'Aftermath', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
  {title: 'Red One', poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg'},
];

export default function ProfileScreen() {
  const navigation = useNavigation();

  const {data, refetch, loading, errors} = useFetch<Movie[]>(() => {
    return fetchDataMovieFavoriteList();
  }, false);

  const {
    data: profileData,
    loading: profileLoading,
    errors: profileErrors,
    refetch: fetchProfile,
  } = useFetch<UserProfile>(() => {
    return fetchMyProfile();
  });

  useEffect(() => {
    refetch();
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        className="mb-20"
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-row justify-between items-center px-5 pt-10 mt-5">
          {/* Left side: Your + logo */}
          <View className="flex-row items-center">
            <Text
              className="text-[20px]"
              style={{
                fontFamily: 'DMSans-Bold',
                // color: '#AB8BFF',
                color: 'white',
              }}>
              My{' '}
            </Text>
            <Text
              className="text-[20px]"
              style={{
                fontFamily: 'DMSans-Bold',
                color: '#AB8BFF',
              }}>
              Account
            </Text>
            {/* <Image
              source={icons.logo}
              className="w-[28px] h-[28px] ml-2"
              resizeMode="contain"
            /> */}
          </View>

          {/* Right side: Menu or others */}
          <View className="flex-row">
            {/* Uncomment and use as needed */}
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
            <TouchableOpacity
              className="w-8 h-8 justify-center items-center ml-5"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
              <GradientText
                text={`${Math.floor(
                  (profileData?.screenTime || 0) / 3600,
                )} hours`}
                fontSize={60}
              />
            </View>
          </LinearGradient>

          <View className="absolute top-0 items-center z-10">
            <View className=" rounded-lg">
              <Image
                source={
                  profileData?.avatar != null && profileData.avatar
                    ? {
                        uri:
                          Config.PUBLIC_LINK +
                          '/api/images/avatar/' +
                          profileData?.avatar,
                      }
                    : icons.avt
                }
                className="w-20 h-20 rounded-lg"
              />
            </View>
            <Text
              className="text-white mt-2 font-semibold"
              style={{fontFamily: 'Montserrat-Bold'}}>
              {profileData?.username === '' || profileData?.username === null
                ? profileData?.email
                : profileData?.username}
            </Text>
            <Text
              className="text-gray-400 text-xs"
              style={{fontFamily: 'Montserrat-Bold'}}>
              ID: {profileData?.id}
            </Text>
          </View>
        </View>

        {/* Recently viewed */}
        {/* <Text
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
        </ScrollView> */}

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
          {data?.map((item, idx) => (
            <LovedMovieItem key={idx} item={item} idx={idx} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
