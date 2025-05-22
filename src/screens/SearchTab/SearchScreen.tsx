import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootNaviagtion} from '../types/interfaces.ts';
import {images} from '../../constants/images.ts';
import {icons} from '../../constants/icons.ts';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import MovieDisplay from '../../components/MovieDisplay/MovieDisplay.tsx';
import {fetchData} from '../../services/DataService.ts';
import {useFetch} from '../../hooks/useFetch.ts';
import {Movie} from '../../interfaces/interfaces';

export default function SearchScreen() {
  // const navigate = useNavigation();
  // const navigate = useNavigation<NativeStackNavigationProp<RootNaviagtion>>();

  const [searchValue, setSearchValue] = useState('');

  const {
    data: movies = [],
    reset,
    loading,
    refetch: loadMovies,
    errors,
  } = useFetch<Movie[]>(() => {
    return fetchData(
      (searchValue.localeCompare('') !== 0 ? 'search' : 'discover') +
        '/movie?query=' +
        searchValue,
    );
  }, false);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (searchValue.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  console.log(movies);

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        resizeMode="cover"
        // eslint-disable-next-line react-native/no-inline-styles
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
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search through over 300+ movies online"
        />
        <FlatList
          data={movies}
          renderItem={({item}) => {
            return <MovieDisplay item={item} key={item.id} />;
          }}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          // eslint-disable-next-line react-native/no-inline-styles
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
        />
      </ScrollView>
    </View>
  );
}
