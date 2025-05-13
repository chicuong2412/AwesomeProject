import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

const recentlyViewed = [
  { title: 'Werewolves', image: './assets/images/aw.png' },
  { title: 'Aftermath', image: './assets/images/aw.png' },
  { title: 'Red One', image: './assets/images/aw.png' },
];

const lovedList = [
  { title: 'Werewolves', image: './assets/images/aw.png' },
  { title: 'Aftermath', image: './assets/images/aw.png' },
  { title: 'Red One', image: './assets/images/aw.png' },
];

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#18122B]">
      {/* Header */}
      <View className="pt-8 px-4">
        <Text className="text-white text-lg font-bold">My Account</Text>
        {/* Add icons here */}
      </View>

      {/* Profile */}
      <View className="items-center mt-4">
        <View className="bg-[#635985] p-4 rounded-full">
          <Image
            source={
              {
                uri: "./assets/images/aw.png"
              }
            }
            className="w-16 h-16 rounded-full"
          />
        </View>
        <Text className="text-white mt-2 font-semibold">plgkiet</Text>
        <Text className="text-gray-400 text-xs">ID: 1234567890</Text>
      </View>

      {/* Screen Time */}
      <View className="bg-[#443C68] mx-4 mt-6 rounded-3xl p-6 items-center">
        <Text className="text-white text-3xl font-bold">
          SCREEN TIME FLEX
        </Text>
        <Text className="text-[#FFB100] text-4xl font-bold mt-2">
          14 <Text className="text-2xl">hours</Text>
        </Text>
      </View>

      <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
        {/* Recently Viewed */}
        <Text className="text-white text-lg font-semibold ml-4 mb-2">Recently viewed</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
          {recentlyViewed.map((item, idx) => (
            <View key={idx} className="mr-4">
              <Image source={item.image} className="w-24 h-36 rounded-lg" />
              <Text className="text-white text-xs mt-1">{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Loved List */}
        <Text className="text-white text-lg font-semibold ml-4 mt-6 mb-2">Your loved list</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
          {lovedList.map((item, idx) => (
            <View key={idx} className="mr-4">
              <View className="absolute z-10 right-2 top-2 bg-white/20 rounded-full p-1">
                {/* Heart Icon here */}
              </View>
              <Image source={item.image} className="w-24 h-36 rounded-lg" />
              <Text className="text-white text-xs mt-1">{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
