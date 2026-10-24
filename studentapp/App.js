import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, useTheme } from './ThemeContext';
import ContactScreen from './screens/ContactScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isDark, background, text } = useTheme();     //des

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{         //def set toall
          headerStyle: { backgroundColor: background },
          headerTintColor: text,     //but tit icon
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false,     //remv line btw header and cotent
          contentStyle: { backgroundColor: background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>  
      <AppNavigator />
    </ThemeProvider>
  );
}