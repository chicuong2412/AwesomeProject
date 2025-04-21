/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {fetchDataMovieDetail} from '../../services/DataService';
import {icons} from '../../constants/icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MovieDetails, StackRootIn} from '../../interfaces/interfaces';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'Home'>;

export default function DetailScreen({
  route,
}: {
  route: RouteProp<StackRootIn, 'Details'>;
}) {
  const {itemId} = route.params;
  console.log(itemId);

  const navigate = useNavigation<NavigationProp>();

  const {data, refetch} = useFetch<MovieDetails>(() => {
    return fetchDataMovieDetail(itemId.toString());
  }, false);
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="bg-primary flex-1">
      <View className="h-[40%] mb-3">
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/original/' + data?.backdrop_path,
          }}
          className="w-full h-full"
        />
        <TouchableOpacity
          onPress={() => {
            navigate.navigate('Video');
          }}>
          <View className="w-[50] h-[50] bg-white justify-center absolute flex-row items-center rounded-[100%] bottom-[-25] right-[30]">
            <Image
              style={{
                objectFit: 'contain',
              }}
              className="w-[25]"
              source={icons.play}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-[20] left-2 opacity-40"
          onPress={() => {
            navigate.goBack();
          }}>
          {/* <View className="absolute top-[10]"> */}
          <MaterialIcons name="keyboard-backspace" color="#D9D9D9" size={30} />
          {/* </View> */}
        </TouchableOpacity>
        {/* <Icon name="rocket" size={30} color="#900" /> */}
        {/* <MaterialIcons name ="keyboard-backspace" color="red" size={90} /> */}
      </View>

      <ScrollView className="px-5 mt-2">
        <Text className="text-white font-bold text-2xl">{data?.title}</Text>
        <Text className="text-[#A8B5DB] mb-5">
          {data?.release_date.split('-')[0]} {'\u26AC'} {data?.status}{' '}
          {'\u26AC'} {data?.runtime} minutes
        </Text>
        <View className="mb-8 flex-row gap-2">
          <View className="w-[110] h-[30]">
            <View className="flex-row bg-[#221F3D] justify-center px-5 h-full items-center rounded">
              <Image className="mr-1" source={icons.star} />
              <Text className="text-white font-bold">
                {Math.round(data?.vote_average || 0)}
              </Text>
              <Text className="text-[#A8B5DB]">/10 ({data?.vote_count})</Text>
            </View>
          </View>
          <View className="max-w-12 text-[#A8B5DB] h-[30]">
            <View className="flex-row gap-1 justify-center items-center px-5 bg-[#221F3D] h-full rounded">
              <Image source={icons.save} />
              <Text className="text-[#A8B5DB]">1</Text>
            </View>
          </View>
        </View>
        <Text className="text-[#A8B5DB] pb-1">Overview</Text>
        <Text className="text-white text-base mb-5">{data?.overview}</Text>

        <View className="flex-row gap-[10%] mb-10">
          <View className="w-[60%]">
            <Text className="text-[#A8B5DB] mb-3">Release Date</Text>
            <Text className="text-[#D6C7FF] text-xl">
              {new Date(
                data?.release_date.toString() || '2024-12-11',
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              (WorldWide)
            </Text>
          </View>
          <View className="w-[30%]">
            <Text className="text-[#A8B5DB] text-base mb-3">Status</Text>
            <Text className="text-[#D6C7FF] text-xl">{data?.status}</Text>
          </View>
        </View>
        <View className="mb-10">
          <Text className="text-[#A8B5DB] mb-3">Generes</Text>
          <View className="flex-row gap-2">
            {data?.genres.map(({name}, index) => {
              return (
                <Text
                  key={index}
                  className="text-white font-bold px-3 py-1 bg-[#221F3D] rounded">
                  {name}
                </Text>
              );
            })}
          </View>
        </View>
        <View className="mb-10">
          <Text className="text-[#A8B5DB] mb-3">Countries</Text>
          <View className="flex-row gap-2">
            {data?.production_countries.map(({name}, index) => {
              return (
                <Text
                  key={index}
                  className="text-white font-bold px-3 py-1 bg-[#221F3D] rounded">
                  {name}
                </Text>
              );
            })}
          </View>
        </View>
        <View className="flex-row gap-[10%]">
          <View>
            <Text className="text-[#A8B5DB] mb-3">Budget</Text>
            <Text className="text-[#D6C7FF]">{new Intl.NumberFormat("en-US", {
              currency: "USD",
              style: "currency",
              
            }).format(data?.budget || 0)}</Text>
          </View>
          <View>
            <Text className="text-[#A8B5DB] mb-3">Revenue</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
