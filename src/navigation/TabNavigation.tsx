/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SearchScreen from '../screens/SearchTab/SearchScreen';
import {ImageBackground, LayoutChangeEvent, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import TabButton from '../components/TabButton/TabButton';
import SavedScreen from '../screens/SavedScreen/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {images} from '../constants/images';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const MyTabBar = ({state, navigation}: BottomTabBarProps) => {
  const [dimension, setDimesion] = useState({height: 20, width: 100});
  const tabPositionX = useSharedValue(0);

  const buttonWidth = dimension.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimesion({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const animatedStyleBg = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPositionX.value,
        },
      ],
    };
  });

  return (
    <View
      onLayout={onTabbarLayout}
      className="bg-[#0F0D23] rounded-[50] absolute bottom-[20] mx-[20] justify-between items-center flex-row">
      <Animated.View
        style={[
          animatedStyleBg,
          {
            position: 'absolute',
            // backgroundColor: '#D6C7FF',
            borderRadius: 30,
            height: dimension.height,
            width: buttonWidth + 20,
          },
        ]}>
        <ImageBackground
          imageStyle={{borderRadius: 30}}
          resizeMode="cover"
          className="w-full h-full rounded"
          source={images.highlight}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabButton
            onLongPress={onLongPress}
            onPress={onPress}
            routeName={route.name}
            key={route.name}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
};
