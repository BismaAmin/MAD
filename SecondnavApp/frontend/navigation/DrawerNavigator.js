import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../ThemeContext';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { background, text } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: background },   //header bg follows theme
        headerTintColor: text,                          //header text follows theme
        headerShadowVisible: false,
        drawerStyle: { backgroundColor: background },
        drawerActiveTintColor: '#d6962f',
        drawerInactiveTintColor: text,
      }}
    >
      <Drawer.Screen
        name="kausar"
        component={BottomTabNavigator}
        options={{
          title: 'Menu',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileDirect"   //route name
        component={ProfileScreen}
        options={{
          title: 'Profile ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsDirect"
        component={SettingsScreen}
        options={{
          title: 'Settings ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactDirect"
        component={ContactScreen}
        options={{
          title: 'Contact ',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="email" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}