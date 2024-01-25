import React from 'react';
import MainNavigator from './MainNavigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';


const App = () => {
  return (
    <MainNavigator/>
  );
};

AppRegistry.registerComponent(appName, () => App);
export default App;