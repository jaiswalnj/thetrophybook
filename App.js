// import React from 'react';
import React,{useEffect} from 'react';
import MainNavigator from './MainNavigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import * as Font from 'expo-font';


const App = () => {

  const loadFonts = async () => {
    await Font.loadAsync({
      'EuclidFlexMedium': require('./assets/fonts/EuclidFlex/EuclidFlexMedium.ttf'),
      "ArialRounded": require('./assets/fonts/ArialRounded/ArialRoundedFont.ttf'),
      "EuclidFlexRegular": require('./assets/fonts/EuclidFlex/EuclidFlexRegular.ttf'),
      "EuclidFlexLight": require('./assets/fonts/EuclidFlex/EuclidFlexLight.ttf'),
    });
  };
  useEffect(() => {
    const loadAssetsAsync = async () => {
      await Promise.all([loadFonts()]);
    };
    loadAssetsAsync();
  }, []);
  return (
    <MainNavigator/>
  );
};

AppRegistry.registerComponent(appName, () => App);
export default App;