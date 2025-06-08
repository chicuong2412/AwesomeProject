/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, { useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import SearchBar from '../../components/SearchBar/SearchBar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Movie, StackRootIn} from '../../interfaces/interfaces';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {fetchDataMovieFavoriteList} from '../../services/DataService';
import Config from 'react-native-config';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'MainStack'>;

export default function SavedScreen() {
  const [searchValue, setSearchValue] = useState('');

  const {data, refetch, loading, errors} = useFetch<Movie[]>(() => {
    return fetchDataMovieFavoriteList();
  }, false);

  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      refetch();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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

      <View className="px-5">
        <Image
          source={icons.logo}
          className="mx-auto mt-12 mb-2 w-[80] h-[80]"
          resizeMode="contain"
        />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search through your favorite movies"
        />
      </View>
      <View className="flex-row items-center gap-2 mt-10 px-5 mb-5">
        <Text
          className="text-2xl text-white"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          My{' '}
          <Text
            className="text-[#D1C0FF]"
            style={{
              fontFamily: 'DMSans-Bold',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Destiny
          </Text>
        </Text>
        <Image
          className="w-[24] h-[24]"
          resizeMode="contain"
          source={icons.like}
        />
      </View>
      <FlatList
        data={data && data.length > 0 ? data : []}
        numColumns={1}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {errors && (
              <Text className="text-red-500 px-5 my-3">
                Error: {errors.message}
              </Text>
            )}

            {!loading && !errors && searchValue.trim() && (
              <>
                <Text className="text-xl text-white font-bold">
                  Search results for:{' '}
                  <Text className="text-[#D1C0FF]">{searchValue}</Text>
                </Text>
              </>
            )}
          </>
        }
        className="flex-col flex-wrap px-3"
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {itemId: item.id})}>
              <View
                style={{
                  backgroundColor: 'rgba(112,112,112,0.23)',
                }}
                key={index}
                className="gap-[4%] mb-4 h-[113] flex-row rounded-[20] px-5 relative py-3">
                <View className="w-[20%]">
                  <Image
                    resizeMode="cover"
                    className="h-full"
                    source={{
                      uri: `${Config.PUBLIC_LINK}/api/images/${item.posterPath}`,
                    }}
                  />
                </View>
                <View className="w-[60%]">
                  <Text
                    className="text-white"
                    style={{
                      fontFamily: 'DMSans-Bold',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 2,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    className="flex-row gap-2"
                    style={{
                      marginBottom: 2,
                    }}>
                    <View className="flex-row items-center">
                      <Image className="h-[10] w-[10]" source={icons.star} />
                      <Text
                        className="text-white"
                        style={{
                          fontFamily: 'DMSans-Bold',
                          fontWeight: 'bold',
                          fontSize: 10,
                        }}>
                        {item.voteAverage}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className="text-light-300"
                        style={{
                          fontFamily: 'DMSans-Bold',
                          fontWeight: 'bold',
                          fontSize: 10,
                        }}>
                        {item?.generes[0]?.name} •{' '}
                        {item.hasSeason ? 'Series TV' : 'Movie'}
                      </Text>
                    </View>
                  </View>
                  <Text
                    numberOfLines={4}
                    className="text-light-300"
                    style={{
                      fontFamily: 'DMSans-Bold',
                      fontSize: 10,
                    }}>
                    {item.overview}
                  </Text>
                </View>
                <TouchableOpacity
                  className="w-[10%] justify-center items-center"
                  onPress={() =>
                    navigation.navigate('Video', {itemId: item.id})
                  }>
                  <Image
                    className="w-[50] h-[50]"
                    resizeMode="contain"
                    source={icons.playIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
