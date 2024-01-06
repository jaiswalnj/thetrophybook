import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const More = ({navigation}) => {
  const handleLogout= () => {
    AsyncStorage.clear(); 
    Alert.alert('Logout ?', 'Press Confirm to Logout', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => {AsyncStorage.clear(); navigation.navigate('SplashScreen')}},
    ]);
  }
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
       <Button 
          title="Logout"
          onPress={handleLogout}
          />
    </View>
  )
}

export default More