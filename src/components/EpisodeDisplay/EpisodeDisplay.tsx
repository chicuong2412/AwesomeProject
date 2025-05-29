import {View, Text, Image} from 'react-native';
import React from 'react';
import {EpisodeItemInfo} from '../../interfaces/interfaces';
import {images} from '../../constants/images';

export default function EpisodeDisplay({
  item,
  index,
}: {
  item: EpisodeItemInfo;
  index: number;
}) {
  return (
    <View className="flex-wrap mb-4 w-full" key={index}>
      <View className="w-full h-[86] flex-row flex-wrap gap-[3%]">
        <View className="w-[37%]">
          <Image
            source={images.imageTest}
            className="w-full h-full rounded-md mr-4"
            // resizeMode="cover"
          />
        </View>
        <View className="w-[60%]">
          {/* <View className="flex-row justify-between items-center"> */}
          <Text
            className="text-white text-base mb-2"
            style={{
              fontFamily: 'DMSans-Bold',
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
          <Text
            className="text-white italic text-sm"
            style={{
              fontFamily: 'DMSans-Medium',
            }}>
            {item.duration} minutes
          </Text>
          {/* </View> */}
        </View>
      </View>
      <View className="w-full">
        <Text
          className="text-white text-sm mt-2 leading-5"
          style={{
            fontFamily: 'DMSans-Medium',
          }}>
          {item.overview}
        </Text>
      </View>
    </View>
  );
}
