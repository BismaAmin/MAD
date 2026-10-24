import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import ClothesScreen from '../screens/ClothesScreen';
import AccessoriesScreen from '../screens/AccessoriesScreen';
import MakeupScreen from '../screens/MakeupScreen';
import { useShop } from '../context/ShopContext';
import { COLORS } from '../styles/GlobalStyles';

const Tab = createBottomTabNavigator();

// --- YEH CUSTOM TAB BAR HAI JO EVEN SPACING DEGA ---
function CustomTabBar({ state, descriptors, navigation }) {
  const { cart, isDarkMode } = useShop();
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // Sirf wahi tabs dikhayenge jo visible hain
  const visibleRoutes = state.routes.filter(route => 
    ['Home', 'Cart', 'Account'].includes(route.name)
  );

  return (
    <View style={[styles.tabBarContainer, { 
      backgroundColor: isDarkMode ? COLORS.darkCard : COLORS.light,
      borderTopColor: isDarkMode ? COLORS.darkBorder : COLORS.border 
    }]}>
      {visibleRoutes.map((route, index) => {
        const isFocused = state.index === state.routes.indexOf(route);

        const onPress = () => {
          const event = navigation.emit({     //send event to perf action
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,     //prevent event to perfrom default action 
          });

          if (!isFocused && !event.defaultPrevented) {     //already sel, event prevention
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Cart') iconName = 'cart-outline';
        else if (route.name === 'Account') iconName = 'person-outline';

        const color = isFocused ? COLORS.gold : (isDarkMode ? '#888888' : COLORS.textGray);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem} // <-- YEH FLEX: 1 BARABAR JAGAH DEGA
            activeOpacity={0.7}
          >
            <View style={{ position: 'relative' }}>
              <Ionicons name={iconName} size={22} color={color} />
              {route.name === 'Cart' && cartCount > 0 && (     //kuch cart mein ho
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, { color }]}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />} // <-- Custom bar lagaya for our pref
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      
      {/* Hidden Tabs (Yeh tab bar par nahi aayenge kyunke humne filter kiya hai) */}
      <Tab.Screen name="Clothes" component={ClothesScreen} />
      <Tab.Screen name="Accessories" component={AccessoriesScreen} />
      <Tab.Screen name="Makeup" component={MakeupScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 65,
    borderTopWidth: 1,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1, // <-- Sab se important line: Teeno items barabar jagah lenge
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  badge: {
    position: 'absolute', top: -4, right: -8,
    minWidth: 16, height: 16, borderRadius: 8,
    backgroundColor: COLORS.red,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: COLORS.white, fontSize: 9, fontWeight: 'bold' },
});

export default TabNavigator;