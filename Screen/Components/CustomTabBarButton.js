import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const CustomTabBarButton = (props) => {
  const {route, children, accessibilityState, onPress} = props;
  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.activeBtn]}>
          <>{children}</>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn,
        ]}>
        <>{children}</>
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    top: -15,
    width: 90,
    height: 90,
    borderRadius: 90/ 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#FFCD1C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.50,
    shadowRadius: 2,
    elevation: 3,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
});