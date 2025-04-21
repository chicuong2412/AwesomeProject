import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {icons} from '../../constants/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Movie, StackRootIn } from '../../interfaces/interfaces';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'Home'>;

export default function MovieDisplay({item}: {item: Movie}) {

  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Details', {
        itemId: item.id,
      })
    }} className="text-white w-[30%] flex-col">
      <View className="">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text numberOfLines={1} className="text-white font-bold">
          {item.title}
        </Text>
        <View className="flex-row gap-1">
          <Image source={icons.star} />
          <Text className="text-white">{Math.round(item.vote_average)}/10</Text>
        </View>
        <Text className="text-light-300">Movie</Text>
      </View>
    </TouchableOpacity>
  );
}
