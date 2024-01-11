import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBarButton from './Components/CustomTabBarButton';
import CustomTabBar from './Components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';
import Category from './DrawerScreens/Category';
import HomeScreen from './DrawerScreens/HomeScreen';
import Cart from './DrawerScreens/Cart';
import Favourite from './DrawerScreens/Favourite';
import More from './DrawerScreens/More';
import CategoryList from './Components/CategoryList';

const Tab = createBottomTabNavigator();

const DraweerNavigatorRoutes = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: 'black',
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ color, focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Category') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'More') {
              iconName = focused ? 'reorder-three' : 'reorder-three-outline';
            }
  
            return <Icon name={iconName} size={30} color={color}  />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: props => <CustomTabBarButton route="Home" {...props} />,
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            tabBarButton: props => <CustomTabBarButton route="Category" {...props} />,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarButton: props => <CustomTabBarButton route="Cart" {...props} />,
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarButton: props => <CustomTabBarButton route="Favourite" {...props} />,
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarButton: props => <CustomTabBarButton route="More" {...props} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default DraweerNavigatorRoutes;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
