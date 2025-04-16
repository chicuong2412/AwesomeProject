import {Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {icons} from '../../constants/icons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function TabButton({
  onPress,
  onLongPress,
  routeName,
  isFocused,
}: {
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
}) {
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      {duration: 300},
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      className="justify-center items-center flex flex-1 flex-col h-[52]"
      key={routeName}
      onPress={onPress}
      onLongPress={onLongPress}
      >
      <Animated.View style={animatedIconStyle}>
        {iconsDisplayed[routeName as keyof typeof iconsDisplayed](
          isFocused ? '#151312' : '#A8B5DB',
        )}
      </Animated.View>
      <Text
        className={
          isFocused
            ? 'text-secondary text-base font-semibold ml-2'
            : 'text-white'
        }>
        {routeName}
      </Text>
    </TouchableOpacity>
  );
}

const iconsDisplayed = {
  Home: (color: string) => (
    <Image source={icons.home} tintColor={color} className="size-5" />
  ),
  Search: (color: string) => (
    <Image source={icons.search} tintColor={color} className="size-5" />
  ),
  Details: (color: string) => (
    <Image source={icons.search} tintColor={color} className="size-5" />
  ),
};
