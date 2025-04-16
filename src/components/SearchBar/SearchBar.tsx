import {View, TextInput, Image} from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import {icons} from '../../constants/icons';

interface InputProps {
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<string>>,
  placeholder?: string
}

const SearchBar = ({searchValue, setSearchValue, placeholder} : InputProps) => {
  return (
    <View className="bg-dark-200 px-5 py-2 rounded-full flex-row items-center">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
        placeholder={placeholder || 'Searh for films...'}
        value={searchValue}
        onChangeText={text => setSearchValue(text)}
      />
    </View>
  );
};

export default SearchBar;
