/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Config from 'react-native-config';
import {icons} from '../../constants/icons';
import {Movie, StackRootIn} from '../../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'MainStack'>;

export default function LovedMovieItem({
  item,
  idx,
}: {
  item: Movie;
  idx: number;
}) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      key={idx}
      onPress={() => {
        navigation.navigate('Details', {
          itemId: item.id,
        });
      }}>
      <View className="mr-4 relative">
        <TouchableOpacity className="absolute right-2 top-2 z-10 p-1">
          <Image
            source={icons.love}
            className="w-8 h-8"
            style={{borderRadius: 50}}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: `${Config.PUBLIC_LINK}/api/images/${item.posterPath}`,
          }}
          className="w-32 h-48 rounded-xl"
        />
        <Text className="text-white text-xs mt-1">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
