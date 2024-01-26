import React,{useEffect,useRef ,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBarButton from './Components/CustomTabBarButton';
import CustomTabBar from './Components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './DrawerScreens/HomeScreen';
import Cart from './DrawerScreens/Cart';
import Favourite from './DrawerScreens/Favourite';
import More from './DrawerScreens/More';
import apiConfig from '../apiConfig';

const Tab = createBottomTabNavigator();



const DraweerNavigatorRoutes = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const isMounted = useRef(true);

  const fetchUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      const data = await fetch(`${apiConfig.baseURL}/user/${storedUserId}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) {
            setUser(responseJson.data);
          } else {
            console.error(responseJson.message);
          }
        });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      const intervalId = setInterval(fetchUserData, 3000);

      return () => {
        clearInterval(intervalId);
        isMounted.current = false;
      };
    }, [])
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (isMounted.current) {
        fetchUserData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, fetchUserData]);


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

            if (route.name === 'HomeScreen') {
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
          name="HomeScreen"
          children={() => <HomeScreen user={user} />}
          options={{
            tabBarButton: props => <CustomTabBarButton route="HomeScreen" {...props} />,
          }}
        />
         <Tab.Screen
          name="Favourite"
          children={() => <Favourite user={user} />}
          options={{
            tabBarButton: props => <CustomTabBarButton route="Favourite" {...props} />,
          }}
        />
        <Tab.Screen
          name="Cart"
          children={() => <Cart user={user} />}
          options={{
            tabBarButton: props => <CustomTabBarButton route="Cart" {...props} />,
          }}
        />
        <Tab.Screen
          name="More"
          children={() => <More user={user} />}
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
    zIndex:0,
  }
});
