/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  // Image,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {VideoRef} from 'react-native-video';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  EpisodeItemInfo,
  Movie,
  // MovieDetails,
  MovieItemDetail,
  Season,
  StackRootIn,
} from '../../interfaces/interfaces';
import EpisodeDisplay from '../../components/EpisodeDisplay/EpisodeDisplay';
// import {images} from '../../constants/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {
  fetchDataMovieDetailMain,
  fetchEpisodesBySeasonID,
  fetchRelatedMovies,
  fetchSeasonsByMovieID,
} from '../../services/DataService';
import {TypeList} from '../../types/interfaces';
import ListTabMovie from '../../components/ListTabMovie/ListTabMovie';
import VideoPlayer from '../../components/Video/Video';
import Config from 'react-native-config';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'Video'>;

// const related = [
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
//   {
//     imgSrc: '../../assets/images/poster.png',
//   },
// ];

const numColumns = 3;
const ITEM_WIDTH = Dimensions.get('window').width / numColumns - 20;

export default function VideoScreen({
  route,
}: {
  route: RouteProp<StackRootIn, 'Video'>;
}) {
  const {
    data: movieDetails,
    refetch: movieDetailRefetch,
    errors: ErrorMovieDetails,
    // loading: loadingDetails,
  } = useFetch<MovieItemDetail>(async () => {
    return await fetchDataMovieDetailMain(idMovie);
  }, false);
  const videoRef = useRef<VideoRef>(null);
  const [hasSeason, setHasSeason] = useState(true);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const navigate = useNavigation<NavigationProp>();
  const [url, setUrl] = useState<string>('');

  const {
    data: relatedMovies,
    refetch: relatedMoviesRefetch,
    errors: ErrorRelatedMovies,
    loading: relatedMoviesLoading,
  } = useFetch<Movie[]>(() => {
    return fetchRelatedMovies();
  }, false);

  const [currList, setCurrList] = useState<TypeList>({
    type: movieDetails?.hasSeason ? 'EPISODE' : 'RELATED',
  });

  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedEpisode, setSelectedEpisode] =
    useState<EpisodeItemInfo | null>(null);
  const [visible, setVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const {
    data: episodes,
    refetch: episodesRefetch,
    // errors: errorEpisodes,
    // loading: loadingEpisodes,
  } = useFetch<EpisodeItemInfo[]>(async () => {
    return await fetchEpisodesBySeasonID(selectedSeason?.id!);
  }, false);

  const [idMovie, setIdMovie] = useState<number>(route.params.itemId);

  useEffect(() => {
    movieDetailRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMovie]);

  useEffect(() => {
    relatedMoviesRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMovie]);

  useEffect(() => {
    setHasSeason(movieDetails?.hasSeason ?? false);
    if (ErrorMovieDetails !== null) {
      console.error('Error fetching movie details:', ErrorMovieDetails.message);
      // Handle the error appropriately, e.g., show a toast or alert
    }

    if (hasSeason) {
      setCurrList({
        type: 'EPISODE',
      });
      fetchSeasonsByMovieID(idMovie)
        .then(seasonsData => {
          setSeasons(seasonsData);
          if (seasonsData.length > 0) {
            setSelectedSeason(seasonsData[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching seasons:', error);
          // Handle the error appropriately, e.g., show a toast or alert
        });
    } else {
      setSelectedSeason(null);
      setSelectedEpisode(null);
      setUrl(
        `${Config.PUBLIC_LINK}/api/videos/${movieDetails?.path}/output.m3u8`,
      );
      videoRef.current?.seek(0);
    }
  }, [movieDetails, ErrorMovieDetails, hasSeason, idMovie]);

  useEffect(() => {
    if (selectedSeason != null) {
      episodesRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason]);

  useEffect(() => {
    if (episodes != null && episodes.length > 0) {
      setSelectedEpisode(episodes[0]);
    }
  }, [episodes]);

  useEffect(() => {
    if (selectedEpisode != null) {
      setUrl(
        `${Config.PUBLIC_LINK}/api/videos/${selectedEpisode?.path}/output.m3u8`,
      );
      videoRef.current?.seek(0);
    }
  }, [selectedEpisode, videoRef]);

  return (
    <SafeAreaView
      className="flex-1 bg-primary"
      edges={['bottom', 'left', 'right', 'top']}>
      <TouchableOpacity
        className="absolute top-[30] right-4 opacity-25 z-50"
        onPress={() => {
          navigate.goBack();
        }}>
        <View>
          <MaterialIcons name="close" color="black" size={30} />
        </View>
      </TouchableOpacity>

      <VideoPlayer url={url} />
      <View className="px-4">
        <Text
          className="text-white text-3xl mb-1"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
          }}>
          {movieDetails?.title || 'Movie Title'}
        </Text>
        <View className="w-[200] h-[6] bg-[#AB8BFF]" />
        {hasSeason && (
          <Text
            className="text-white text-2xl mt-1 mb-5"
            style={{
              fontFamily: 'DMSans-Medium',
            }}>
            {selectedEpisode?.title}
          </Text>
        )}
        <Text
          className="text-base font-light text-[#D9D9D9] mb-5"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          {(hasSeason) ? selectedEpisode?.overview : movieDetails?.overview}
        </Text>
        <ListTabMovie
          currList={currList}
          setCurrList={setCurrList}
          hasSeason={hasSeason}
        />
        {hasSeason && currList.type === 'EPISODE' && (
          <View>
            <TouchableOpacity
              style={styles.button}
              className="mb-4"
              onPress={() => setVisible(true)}>
              <Text style={styles.text}>
                Season {selectedSeason?.seasonNumber}
              </Text>
            </TouchableOpacity>
            <Modal visible={visible} transparent animationType="fade">
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setVisible(false)}>
                <FlatList
                  data={seasons}
                  keyExtractor={item => item.id.toString()}
                  style={styles.dropdown}
                  contentContainerStyle={{padding: 10, flexGrow: 0}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedSeason(item);
                        setVisible(false);
                      }}>
                      <Text style={styles.dropdownText}>{item.title}</Text>
                    </TouchableOpacity>
                  )}
                />
              </TouchableOpacity>
            </Modal>
          </View>
        )}
      </View>
      <View className="flex-1 px-4">
        {hasSeason && currList.type === 'EPISODE' ? (
          <FlatList
            data={episodes}
            contentContainerStyle={{
              gap: '2%',
              paddingBottom: insets.bottom + 86, // Adjust for bottom inset, +86 because of the EpisodeDisplay image fixed height
            }}
            numColumns={1}
            scrollEnabled={true}
            renderItem={({item, index}) => {
              return (
                <EpisodeDisplay
                  index={index}
                  item={item}
                  setSelectedEpisode={setSelectedEpisode}
                />
              );
            }}
          />
        ) : (
          <FlatList
            data={relatedMovies}
            contentContainerStyle={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: '100%',
            }}
            numColumns={1}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            ListHeaderComponent={
              <>
                {relatedMoviesLoading && (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="my-3"
                  />
                )}

                {ErrorRelatedMovies && (
                  <Text className="text-red-500 px-5 my-3">
                    Error: {ErrorRelatedMovies.message}
                  </Text>
                )}
              </>
            }
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIdMovie(item.id);
                  }}>
                  <View className={`w-[${ITEM_WIDTH}] h-[${ITEM_WIDTH * 1.5}]`} style= {styles.itemRelated}>
                    <View className="w-full h-full">
                      <Image
                        resizeMode="cover"
                        className="w-full h-full"
                        source={
                          item.posterPath
                            ? {
                                uri: `${Config.PUBLIC_LINK}/api/images/${item.posterPath}`,
                              }
                            : require('../../assets/images/poster.png')
                        }
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c6c6c',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
  },
  icon: {
    marginTop: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    minWidth: 'auto',
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
  itemRelated: {
    margin: 5,
    overflow: 'hidden',
    backgroundColor: '#232531',
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5, // poster aspect ratio
    elevation: 3,
  },
});
