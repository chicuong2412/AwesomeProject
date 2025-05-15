import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {icons} from '../../constants/icons';
import {images} from '../../constants/images';

export default function EnterCodeScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
  ];

  const handleChange = (text: string, idx: number) => {
    if (text.length > 1) text = text.slice(-1);
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);
    if (text && idx < 3) {
      inputs[idx + 1].current?.focus();
    }
  };
  return (
    <View className="bg-primary flex-1 pt-[10%]">
      <Image
        source={images.bg}
        resizeMode="cover"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
        }}
        className="absolute z-0"
      />
      <Image
        source={icons.logo}
        className="mx-auto mt-12 mb-2 w-[80] h-[80]"
        resizeMode="contain"
      />
      <View className="px-10">
        
        <Text className="text-white text-2xl font-bold mb-2 mt-10">Enter Your</Text>
        <Text className="text-white text-2xl font-bold mb-6">
          Verification Code
        </Text>

        <View className="flex-row justify-between mb-8">
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={inputs[idx]}
              value={digit}
              onChangeText={text => handleChange(text, idx)}
              keyboardType="number-pad"
              maxLength={1}
              className="w-16 h-16 border-2 border-white rounded-lg text-white text-2xl text-center mx-1"
              style={{backgroundColor: 'transparent'}}
              returnKeyType="next"
              onSubmitEditing={() =>
                idx < 3 && inputs[idx + 1].current?.focus()
              }
            />
          ))}
        </View>

        <Text className="text-white text-left mb-2">
          We send the four digits verification to your email.
        </Text>
        <Text className="text-white text-left mb-6">
          You can check your inbox.
        </Text>

        <Text className="text-white text-left mb-6">
          Did not receive code?{' '}
          <Text className="text-[#A084E8] underline">Resend Now</Text>
        </Text>

        <TouchableOpacity className="rounded-full bg-[#A084E8] ">
          <Text className="text-white text-center font-bold text-lg py-4">
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
