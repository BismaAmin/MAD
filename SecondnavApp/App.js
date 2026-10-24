import './gesture-handler'; 
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider, useTheme } from './ThemeContext';
import HomeScreen from './frontend/screens/HomeScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import SettingsScreen from './frontend/screens/SettingsScreen';
import ContactScreen from './frontend/screens/ContactScreen';
import DrawerNavigator from './frontend/navigation/DrawerNavigator';

 
//true  = navi throu props
//false = 2 NAVIGATION TYPES: DRAWER + BOTTOM TAB  

const USE_PROP_NAVIGATION = false;



//navi thru props

function PropNavigationApp() {
  const [screen, setScreen] = useState('home');
  const goHome = () => setScreen('home'); 
  if (screen === 'profile')  return <ProfileScreen  goHome={goHome}/>;  //goback as prop
  if (screen === 'settings') return <SettingsScreen  goHome={goHome}/>;
  if (screen === 'contact')  return <ContactScreen  goHome={goHome}/>;

  return (
    <HomeScreen
      goToProfile={()  => setScreen('profile')} //parent
      goToSettings={() => setScreen('settings')}
      goToContact={()  => setScreen('contact')}
    />
  );
}

// ================================================================
//  NAVIGATION TYPES
//  DRAWER + BOTTOM TAB
//  Delegates entirely to DrawerNavigator (which contains the
//  BottomTabNavigator).
// ================================================================
function NavigationTypesApp() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

// ================================================================
//  MAIN EXPORT — picks which demo to render
// ================================================================
export default function App() {
  return (
    <ThemeProvider>
      {USE_PROP_NAVIGATION ? <PropNavigationApp /> : <NavigationTypesApp />}
    </ThemeProvider>
  );
}