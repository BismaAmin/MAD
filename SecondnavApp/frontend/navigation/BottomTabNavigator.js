import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { background, text } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: background },
        tabBarActiveTintColor: '#d6962f',
        tabBarInactiveTintColor: text,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';
          else if (route.name === 'Contact') iconName = 'email';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}