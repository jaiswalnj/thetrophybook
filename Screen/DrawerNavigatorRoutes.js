import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './DrawerScreens/HomeScreen';
import Category from './DrawerScreens/Category';
import Cart from './DrawerScreens/Cart';
import Likes from './DrawerScreens/Likes';
import More from './DrawerScreens/More';

const Tab = createBottomTabNavigator();


const DrawerNavigatorRoutes = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Category') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Likes') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'More') {
              iconName = focused ? 'reorder-three' : 'reorder-three-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFCD1C',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Category" component={Category} options={{headerShown: false}}/>
        <Tab.Screen name="Cart" component={Cart} options={{headerShown: false}}/>
        <Tab.Screen name="Likes" component={Likes} options={{headerShown: false}}/>
        <Tab.Screen name="More" component={More} options={{headerShown: false}}/>
      </Tab.Navigator>
  );
};

export default DrawerNavigatorRoutes;