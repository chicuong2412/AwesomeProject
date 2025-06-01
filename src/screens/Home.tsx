/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootNaviagtion} from '../types/interfaces.ts';
import {images} from '../constants/images.ts';
import {icons} from '../constants/icons.ts';
import '../styles/global.css';
import MovieDisplay from '../components/MovieDisplay/MovieDisplay.tsx';
import {fetchData} from '../services/DataService.ts';
import {useFetch} from '../hooks/useFetch.ts';
import {Movie} from '../interfaces/interfaces';

export default function Home() {
  const {
    data: movies = [],
    loading,
    refetch: loadMovies,
    errors,
  } = useFetch<Movie[]>(() => {
    return fetchData('movies/discover');
  }, false);

  useEffect(() => {
    loadMovies();
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

      <ScrollView className="px-5">
        <Image
          source={icons.logo}
          className="mx-auto mt-12 mb-2 w-[80] h-[80]"
          resizeMode="contain"
        />
        {/* <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search through over 300+ movies online"
        /> */}

        <Image
          source={images.Posters}
          className="mx-auto mt-5 mb-5 w-[360] h-[140]"
          resizeMode="cover"
        />
        <Text
          className=" text-white py-2"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Latest movies
        </Text>
        <FlatList
          data={movies}
          renderItem={({item}) => {
            return <MovieDisplay item={item} key={item.id} />;
          }}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
          scrollEnabled={false}
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
            </>
          }
        />
      </ScrollView>
    </View>
  );
}
