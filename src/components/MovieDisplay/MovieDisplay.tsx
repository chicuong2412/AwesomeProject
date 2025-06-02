/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {icons} from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Movie, StackRootIn} from '../../interfaces/interfaces';
import Config from 'react-native-config';

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'MainStack'>;

export default function MovieDisplay({item}: {item: Movie}) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {
          itemId: item.id,
        });
      }}
      className="text-white w-[30%] flex-col">
      <View className="">
        <Image
          source={{
            uri: `${Config.PUBLIC_LINK}/api/images/${item.posterPath}`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          numberOfLines={1}
          className="text-white mt-1"
          style={{
            fontFamily: 'DMSans-Bold',
            fontWeight: 'bold',
            fontSize: 12,
          }}>
          {item.title}
        </Text>
        <View className="flex-row gap-1 items-center">
          <Image
            source={icons.star}
            style={{
              width: 11,
              height: 11,
            }}
          />
          <Text
            className="text-white"
            style={{
              fontFamily: 'DMSans-Bold',
              fontWeight: 'bold',
              fontSize: 11,
            }}>
            {Math.round(item.voteAverage)}/10
          </Text>
        </View>

        <Text
          className="text-light-300"
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 10,
          }}>
          {item.generes[0]?.name} • {item.hasSeason ? 'Series TV' : 'Movie'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
