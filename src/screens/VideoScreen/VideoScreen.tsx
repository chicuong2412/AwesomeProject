import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video, {VideoRef} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Season, StackRootIn} from '../../interfaces/interfaces';
import EpisodeDisplay from '../../components/EpisodeDisplay/EpisodeDisplay';
import {images} from '../../constants/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'Home'>;

type TypeList =
  | {
      type: 'EPISODE';
    }
  | {
      type: 'RELATED';
    };

const season: Season = {
  idSeason: '1',
  listEpisodes: [
    {
      idEpisode: '1',
      duration: 23,
      imageSrc: '../../assets/images/image.png',
      movieId: '1',
      name: 'Episode 1',
      overview:
        'Hải tặc trẻ tuổi Monkey D. Luffy mâu thuẫn với những gã hải tặc khác khi chúng tấn công một du thuyền. May thay, Luffy sở hữu sức mạnh của trái cao su.',
      seasonId: '1',
    },
    {
      idEpisode: '1',
      duration: 23,
      imageSrc: '../../assets/images/image.png',
      movieId: '1',
      name: 'Episode 1',
      overview:
        'Hải tặc trẻ tuổi Monkey D. Luffy mâu thuẫn với những gã hải tặc khác khi chúng tấn công một du thuyền. May thay, Luffy sở hữu sức mạnh của trái cao su.',
      seasonId: '1',
    },
    {
      idEpisode: '1',
      duration: 23,
      imageSrc: '../../assets/images/image.png',
      movieId: '1',
      name: 'Episode 1',
      overview:
        'Hải tặc trẻ tuổi Monkey D. Luffy mâu thuẫn với những gã hải tặc khác khi chúng tấn công một du thuyền. May thay, Luffy sở hữu sức mạnh của trái cao su.',
      seasonId: '1',
    },
    {
      idEpisode: '1',
      duration: 23,
      imageSrc: '../../assets/images/image.png',
      movieId: '1',
      name: 'Episode 1',
      overview:
        'Hải tặc trẻ tuổi Monkey D. Luffy mâu thuẫn với những gã hải tặc khác khi chúng tấn công một du thuyền. May thay, Luffy sở hữu sức mạnh của trái cao su.',
      seasonId: '1',
    },
    {
      idEpisode: '1',
      duration: 23,
      imageSrc: '../../assets/images/image.png',
      movieId: '1',
      name: 'Episode 1',
      overview:
        'Hải tặc trẻ tuổi Monkey D. Luffy mâu thuẫn với những gã hải tặc khác khi chúng tấn công một du thuyền. May thay, Luffy sở hữu sức mạnh của trái cao su.',
      seasonId: '1',
    },
  ],
  movieId: '1',
};

const related = [
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
  {
    imgSrc: '../../assets/images/poster.png',
  },
];

export default function VideoScreen() {
  const videoRef = useRef<VideoRef>(null);
  const background = require('../../assets/Video.mp4');

  const navigate = useNavigation<NavigationProp>();

  const [currList, setCurrList] = useState<TypeList>({
    type: 'EPISODE',
  });

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      className="flex-1 bg-primary"
      edges={['bottom', 'left', 'right', 'top']}>
      <TouchableOpacity className="absolute top-[30] right-4 opacity-25 z-50" onPress={() => {
        navigate.goBack();
      }}>
        <View 
        // className="w-[10] h-[10] bg-black"
        >
          <MaterialIcons name="close" color="#D9D9D9" size={30} />
        </View>
      </TouchableOpacity>

      <Video
        ref={videoRef}
        source={background}
        controls
        resizeMode="contain"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 250,
        }}
        className="w-full bg-primary sticky"
        fullscreenAutorotate={true}
        onFullscreenPlayerWillPresent={() => Orientation.lockToLandscape()}
        onFullscreenPlayerWillDismiss={() => Orientation.lockToPortrait()}
      />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        bounces={false}
        // contentContainerStyle={{paddingTop: 0, flexGrow: 1}}
        // className="bg-blue-200"
        scrollsToTop={false}
        stickyHeaderIndices={[0]}
        className="bg-primary"> */}
      <View className="px-4">
        <Text className="text-white font-bold text-3xl mb-1">One piece</Text>
        <View className="w-[200] h-[6] bg-[#AB8BFF]" />
        <Text className="text-white text-2xl mt-5 mb-5">Episode 1</Text>
        <Text className="text-base font-light text-[#D9D9D9] mb-5">
          Hải tặc trẻ tuổi Monkey D. Luffy mâu thuẫn với những gã hải tặc khác
          khi chúng tấn công một du thuyền. May thay, Luffy sở hữu sức mạnh của
          trái cao su.
        </Text>
        <View className="flex-row gap-3 mb-5">
          <TouchableOpacity
            onPress={() => {
              setCurrList({
                type: 'EPISODE',
              });
            }}>
            <Text
              className={`text-white text-base ${
                currList.type === 'EPISODE' ? 'font-bold' : 'font-extralight'
              }`}>
              Episode List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrList({
                type: 'RELATED',
              });
            }}>
            <Text
              className={`text-white text-base ${
                currList.type === 'RELATED' ? 'font-bold' : 'font-extralight'
              }`}>
              Related
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
      <FlatList
        data={currList.type === 'EPISODE' ? season.listEpisodes : related}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: '2%',
          width: '100%',
        }}
        contentContainerClassName="px-4"
        renderItem={({item, index}) => {
          if (currList.type === 'EPISODE') {
            return <EpisodeDisplay index={index} item={item} />;
          } else {
            return (
              <View className="w-[120] h-[200]">
                <View className="w-full h-full">
                  <Image
                    resizeMode="contain"
                    className="w-full h-full"
                    source={images.Poster}
                  />
                </View>
              </View>
            );
          }
        }}
      />
    </SafeAreaView>
  );
}
