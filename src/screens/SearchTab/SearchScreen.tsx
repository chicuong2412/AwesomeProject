/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../../constants/images.ts';
import {icons} from '../../constants/icons.ts';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import MovieDisplay from '../../components/MovieDisplay/MovieDisplay.tsx';
import {FetchAllGeneres, fetchData} from '../../services/DataService.ts';
import {useFetch} from '../../hooks/useFetch.ts';
import {Genere, Movie} from '../../interfaces/interfaces';

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState('');

  const {
    data: movies = [],
    loading,
    refetch: loadMovies,
    errors,
  } = useFetch<Movie[]>(() => {
    return fetchData(
      'movies/search' +
        '?Search=' +
        searchValue +
        `${selectedGenere ? `&Genere=${selectedGenere}` : ''}`,
    );
  }, false);

  const {
    data: generes,
    refetch: genereRefetch,
    loading: genereLoading,
    errors: genereError,
  } = useFetch<Genere[]>(() => {
    return FetchAllGeneres();
  });

  const [selectedGenere, setSelectedGenere] = useState<number>();

  const handleClickSelectGenere = (id: number) => {
    if (selectedGenere === id) {
      setSelectedGenere(undefined);
      return;
    }
    setSelectedGenere(id);
  };

  useEffect(() => {
    genereRefetch();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      await loadMovies();
    }, 500);

    return () => clearTimeout(timeOut);
  }, [searchValue, selectedGenere]);

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
      <Image
        source={icons.logo}
        className="mx-auto mt-12 mb-2 w-[80] h-[80]"
        resizeMode="contain"
      />
      <View
        style={{
          marginTop: 10,
          marginBottom: 20,
        }}>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search through over many movies online"
        />
        <ScrollView
          horizontal
          style={{
            marginTop: 10,
            marginHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}>
          {generes?.map((genere, index) => (
            <TouchableOpacity
              style={styles.button}
              key={index}
              onPress={() => {
                handleClickSelectGenere(genere.id);
              }}>
              <Text
                style={[
                  styles.text,
                  {color: selectedGenere === genere.id ? '#AB8BFF' : '#FFF'},
                ]}>
                {genere.name}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="px-5">
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
            // marginTop: 20,
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
            // marginTop: 20,
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
              {errors && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {errors.message}
                </Text>
              )}

              {!loading && !errors && searchValue.trim() && (
                <>
                  <Text className="text-xl text-white font-bold mb-2">
                    Search results for{' '}
                    <Text className="text-[#D1C0FF]">{searchValue}</Text>
                  </Text>
                </>
              )}
            </>
          }
        />
              {!loading && !errors && searchValue.trim() && (
                <>
                  <Text className="text-xl text-white font-bold mb-2">
                    Search results for{' '}
                    <Text className="text-[#D1C0FF]">{searchValue}</Text>
                  </Text>
                </>
              )}
            </>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0F0D23',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
