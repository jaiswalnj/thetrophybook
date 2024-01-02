import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
      <Image
        source={require('../../Image/favicon.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;