/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {fetchDataMovieDetail} from '../../services/DataService';
import {icons} from '../../constants/icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MovieDetails, StackRootIn} from '../../interfaces/interfaces';
import Config from 'react-native-config';
import api from '../../axios/AxiosConfig';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'Details'>;

export default function DetailScreen({
  route,
}: {
  route: RouteProp<StackRootIn, 'Details'>;
}) {
  const {itemId} = route.params;

  const navigate = useNavigation<NavigationProp>();

  const {data, refetch} = useFetch<MovieDetails>(() => {
    return fetchDataMovieDetail(itemId.toString());
  }, false);

  const [IsFavorite, setIsFavorite] = React.useState(false);

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api
      .post(`${Config.PUBLIC_LINK}/api/users/checkFavorite/${itemId}`)
      .then(response => {
        console.log(response);
        setIsFavorite(response.data.data);
      });
  }, [itemId]);

  return (
    <View className="bg-primary flex-1">
      <View className="h-[40%] mb-3">
        <Image
          source={{
            uri: `${Config.PUBLIC_LINK}/api/images/` + data?.backdropPath,
          }}
          className="w-full h-full"
        />
        <TouchableOpacity
          onPress={() => {
            navigate.navigate('Video', {
              itemId: itemId});
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
          className="absolute top-[20] left-2 opacity-40 font-bold"
          onPress={() => {
            navigate.goBack();
          }}>
          {/* <View className="absolute top-[10]"> */}
          <MaterialIcons name="keyboard-backspace" color="black" size={30} />
          {/* </View> */}
        </TouchableOpacity>
        {/* <Icon name="rocket" size={30} color="#900" /> */}
        {/* <MaterialIcons name ="keyboard-backspace" color="red" size={90} /> */}
      </View>

      <ScrollView className="px-5 mt-2 mb-10">
        <Text
          className="text-white text-2xl"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
          }}>
          {data?.title}
        </Text>
        <Text
          className="text-[#A8B5DB] mb-5"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          {data?.releaseDate.split('-')[0]} • {data?.status} • {data?.runtime}{' '}
          minutes
        </Text>
        <View className="mb-8 flex-row gap-2">
          <View className="w-[110] h-[30]">
            <View className="flex-row bg-[#221F3D] justify-center px-5 h-full items-center rounded">
              <Image className="mr-1" source={icons.star} />
              <Text
                className="text-white"
                style={{
                  fontFamily: 'DMSans-Bold',
                  fontWeight: 'bold',
                }}>
                {Math.round(data?.voteAverage || 0)}
              </Text>
              <Text
                className="text-[#A8B5DB]"
                style={{
                  fontFamily: 'DMSans-Bold',
                  fontWeight: 'bold',
                }}>
                /10 ({data?.voteCount})
              </Text>
            </View>
          </View>
          <View className="text-[#A8B5DB] h-[30]">
            <View className="flex-row gap-1 justify-center items-center h-full rounded">
              <TouchableOpacity
                onPress={() => {
                  if (IsFavorite) {
                    api
                      .post(
                        `${Config.PUBLIC_LINK}/api/users/remove-favorite-movie/${itemId}`,
                      )
                      .then(() => {
                        setIsFavorite(false);
                      });
                  } else {
                    api
                      .post(
                        `${Config.PUBLIC_LINK}/api/users/add-favorite-movie/${itemId}`,
                      )
                      .then(() => {
                        setIsFavorite(true);
                      });
                  }
                }}>
                <Image
                  source={IsFavorite ? icons.love : icons.save}
                  className="w-8 h-8"
                  style={{borderRadius: 50}}
                />
              </TouchableOpacity>
              <Text
                className="text-[#A8B5DB]"
                style={{
                  fontFamily: 'DMSans-Bold',
                  fontWeight: 'bold',
                }}>
                {IsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </View>
          </View>
        </View>
        <Text
          className="text-[#A8B5DB] pb-1"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
          }}>
          Overview
        </Text>
        <Text
          className="text-white text-base mb-5"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          {data?.overview}
        </Text>

        <View className="flex-row gap-[10%] mb-10">
          <View className="w-[60%]">
            <Text
              className="text-[#A8B5DB] mb-3"
              style={{
                fontFamily: 'DMSans-Medium',
              }}>
              Release Date
            </Text>
            <Text
              className="text-[#D6C7FF] text-xl"
              style={{
                fontFamily: 'DMSans-Bold',
                fontWeight: 'bold',
              }}>
              {new Date(
                data?.releaseDate.toString() || '2024-12-11',
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              (WorldWide)
            </Text>
          </View>
          <View className="w-[30%]">
            <Text
              className="text-[#A8B5DB] text-base mb-3"
              style={{
                fontFamily: 'DMSans-Medium',
              }}>
              Status
            </Text>
            <Text
              className="text-[#D6C7FF] text-xl"
              style={{
                fontFamily: 'DMSans-Bold',
                fontWeight: 'bold',
              }}>
              {data?.status ? 'Released' : 'Ongoing'}
            </Text>
          </View>
        </View>
        <View className="mb-10">
          <Text
            className="text-[#A8B5DB] mb-3"
            style={{
              fontFamily: 'DMSans-Medium',
            }}>
            Generes
          </Text>
          <View className="flex-row gap-2">
            {data?.generes.map(({name}, index) => {
              return (
                <Text
                  key={index}
                  className="text-white font-bold px-3 py-1 bg-[#221F3D] rounded"
                  style={{
                    fontFamily: 'DMSans-Bold',
                    fontWeight: 'bold',
                  }}>
                  {name}
                </Text>
              );
            })}
          </View>
        </View>
        <View className="mb-10">
          <Text
            className="text-[#A8B5DB] mb-3"
            style={{
              fontFamily: 'DMSans-Medium',
            }}>
            Countries
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            {data?.productionCompanies.map(({name}, index) => {
              return (
                <Text
                  key={index}
                  className="text-white font-bold px-3 py-1 bg-[#221F3D] rounded"
                  style={{
                    fontFamily: 'DMSans-Bold',
                    fontWeight: 'bold',
                  }}>
                  {name}
                </Text>
              );
            })}
          </View>
        </View>
        <View className="flex-row gap-[10%] mb-10">
          <View>
            <Text
              className="text-[#A8B5DB] mb-3"
              style={{
                fontFamily: 'DMSans-Medium',
              }}>
              Budget
            </Text>
            <Text
              className="text-[#D6C7FF]"
              style={{
                fontFamily: 'DMSans-Bold',
                fontWeight: 'bold',
              }}>
              {new Intl.NumberFormat('en-US', {
                currency: 'USD',
                style: 'currency',
              }).format(data?.budget || 0)}
            </Text>
          </View>
          <View>
            <Text
              className="text-[#A8B5DB] mb-3"
              style={{
                fontFamily: 'DMSans-Medium',
              }}>
              Revenue
            </Text>
            <Text
              className="text-[#D6C7FF]"
              style={{
                fontFamily: 'DMSans-Bold',
                fontWeight: 'bold',
              }}>
              {new Intl.NumberFormat('en-US', {
                currency: 'USD',
                style: 'currency',
              }).format(data?.revenue || 0)}
            </Text>
          </View>
        </View>
        <View>
          <Text
            className="text-[#A8B5DB] mb-3"
            style={{
              fontFamily: 'DMSans-Medium',
            }}>
            Production Companies
          </Text>
          <View className="flex-row gap-2 flex-wrap">
            {data?.productionCompanies.map(({name}, index) => {
              return (
                <Text
                  key={index}
                  className="text-white font-bold px-3 py-1 bg-[#221F3D] rounded"
                  style={{
                    fontFamily: 'DMSans-Bold',
                    fontWeight: 'bold',
                  }}>
                  {name}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
