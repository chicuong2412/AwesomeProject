import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import ChangePasswordScreen from '../screens/ProfileScreen/ChangePassScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#AB8BFF',
        drawerInactiveTintColor: '#FFFFFF',
        drawerLabelStyle: {fontFamily: 'DMSans-Bold'},
        drawerStyle: {
          backgroundColor: '#12082A',
          width: 240,
        },
      }}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />
      <Drawer.Screen name="Change Password" component={ChangePasswordScreen} />
    </Drawer.Navigator>
  );
}
