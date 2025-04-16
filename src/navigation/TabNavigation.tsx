import React, {useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SearchScreen from '../screens/SearchTab/SearchScreen';
import {
  LayoutChangeEvent,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import TabButton from '../components/TabButton/TabButton';

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
      className="bg-[#0F0D23] rounded-[50] absolute bottom-[10] mx-[20] justify-between items-center flex-row">
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={[animatedStyleBg, {
            position: 'absolute',
            backgroundColor: '#723FEB',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimension.height,
            width: buttonWidth - 25,
        }]}
      />
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
