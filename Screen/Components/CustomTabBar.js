import {View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';

const CustomTabBar = props => {
  return (
    <View >
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;