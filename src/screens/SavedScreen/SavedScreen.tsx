import {View, Text, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';
import SearchBar from '../../components/SearchBar/SearchBar';

const dataTest = [
  {
    id: '123',
    title: 'Werewolves',
    genre_ids: [],
    overview:
      'Werewolves” is a horror movie about a town haunted by deadly werewolf attacks. A young detective must uncover the truth before the next full moon.',
    poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg',
    vote_average: 4.6,
  },
  {
    id: '12',
    title: 'Werewolves',
    genre_ids: [],
    overview:
      'Werewolves” is a horror movie about a town haunted by deadly werewolf attacks. A young detective must uncover the truth before the next full moon.',
    poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg',
    vote_average: 4.6,
  },
  {
    id: '1',
    title: 'Werewolves',
    genre_ids: [],
    overview:
      'Werewolves” is a horror movie about a town haunted by deadly werewolf attacks. A young detective must uncover the truth before the next full moon.',
    poster_path: '/otXBlMPbFBRs6o2Xt6KX59Qw6dL.jpg',
    vote_average: 4.6,
  },
];

export default function SavedScreen() {
  const [searchValue, setSearchValue] = useState('');

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

      <View className="px-5">
        <Image
          source={icons.logo}
          className="mx-auto my-5 w-[80] h-[80]"
          resizeMode="contain"
        />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder="Search through over 300+ movies online"
        />
      </View>
      <View className="flex-row items-center gap-2 mt-16 px-5 mb-5">
        <Text className="text-xl text-white font-bold">
          My <Text className="text-[#D1C0FF]">Destiny</Text>
        </Text>
        <Image
          className="w-[24] h-[24]"
          resizeMode="contain"
          source={icons.like}
        />
      </View>
      <FlatList
        data={dataTest}
        numColumns={1}
        keyExtractor={item => item.id.toString()}
        className="flex-col flex-wrap px-3"
        renderItem={({item, index}) => {
          return (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: 'rgba(112,112,112,0.23)',
              }}
              key={index}
              className="gap-[4%] mb-4 h-[113] flex-row rounded-[20] px-5 relative py-3">
              <View className="w-[20%]">
                <Image
                  resizeMode="contain"
                  className="h-full"
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
              </View>
              <View className="w-[60%]">
                <Text className="text-white text-xs font-bold">
                  {item.title}
                </Text>
                <View className="flex-row gap-2">
                  <View className="flex-row items-center">
                    <Image className="h-[10] w-[10]" source={icons.star} />
                    <Text className="text-white font-bold text-s">
                      {item.vote_average}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-light-300 text-s">Movie * Action</Text>
                  </View>
                </View>
                <Text numberOfLines={4} className="text-light-300 text-s">
                  {item.overview}
                </Text>
              </View>
              <View className="w-[10%] justify-center items-center">
                <Image
                  className="w-[50] h-[50]"
                  resizeMode="contain"
                  source={icons.playIcon}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
