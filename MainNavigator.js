import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigatorRoutes from './Screen/DrawerNavigatorRoutes';
import OTPVerificationScreen from './Screen/OTPVerificationScreen';
import ForgotPassword from './Screen/ForgotPassword';
import ProductDescription from './Screen/DrawerScreens/ProductDescription';
import Orders from './Screen/DrawerScreens/Orders';


const Stack = createStackNavigator();

const Auth = () => {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false, cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPVerificationScreen}
        options={{
          title: 'Verify',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyleInterpolator: forFade,
        }}
      />
       <Stack.Screen
        name="ForgotPassowrd"
        component={ForgotPassword}
        options={{
          title: 'Forgot Passowrd',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigatorRoutes"
          component={DrawerNavigatorRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDescription"
          component={ProductDescription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;