/* eslint-disable react-native/no-inline-styles */
// components/CustomDrawerContent.tsx
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity, Text, View} from 'react-native';
import {useAuth} from '../Auth/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomDrawerContent(props: any) {
  const {clearTokens} = useAuth();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{flex: 1, backgroundColor: '#12082A'}}>
      <View style={{flex: 1}}>
        <DrawerItemList {...props} />
      </View>

      <TouchableOpacity
        onPress={async () => {
          await clearTokens();
          navigation.navigate('Login');
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
