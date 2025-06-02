/* eslint-disable react-native/no-inline-styles */
// components/CustomDrawerContent.tsx
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {useAuth} from '../Auth/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../interfaces/interfaces';
import {icons} from '../constants/icons';

type CustomDrawerNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'Drawer'
>;

export default function CustomDrawerContent(props: any) {
  const {clearTokens} = useAuth();
  const navigation = useNavigation<CustomDrawerNavigationProp>();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{flex: 1, backgroundColor: '#12082A'}}>
      <Image
        source={icons.logo}
        className="mx-auto pb-2 mt-2 mb-5 w-[60] h-[60]"
        resizeMode="contain"
      />
      <View style={{flex: 1}}>
        <DrawerItemList {...props} />
      </View>

      <TouchableOpacity
        onPress={() => {
          clearTokens();
          navigation.replace('Login');
        }}
        style={{
          padding: 15,
          borderTopWidth: 1,
          borderTopColor: '#AB8BFF',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <Icon name="logout" size={20} color="#AB8BFF" />
          <Text
            style={{
              color: '#AB8BFF',
              fontFamily: 'DMSans-Bold',
              marginLeft: 10,
            }}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
