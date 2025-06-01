import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {TypeList} from '../../types/interfaces';

export default function ListTabMovie({
  currList,
  setCurrList,
  hasSeason,
}: {
  currList: TypeList;
  setCurrList: React.Dispatch<React.SetStateAction<TypeList>>;
  hasSeason: boolean;
}) {
  useEffect(() => {
    console.log('Current List Type:', currList.type);
    
    
  }, [currList]);
  if (!hasSeason) {
    return (
      <View className="flex-row gap-3 mb-5">
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
    );
  }

  return (
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
  );
}
