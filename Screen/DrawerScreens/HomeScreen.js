import React,{useEffect,useState} from 'react';
import {View, Text, SafeAreaView, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '');
        const storedUserEmail = await AsyncStorage.getItem('email');
        setUserEmail(storedUserEmail || '');
        const storedUserName = await AsyncStorage.getItem('username');
        setUserName(storedUserName || '');
      } catch (error) {
        console.error('Error fetching user Id:', error);
      }
    };

    fetchUserData();
  }, []); 

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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            The Trophybook App
            {'\n\n'}
            Hello {userName}
            {'\n\n'}
            Email: {userEmail}
            {'\n\n'}
            {userId}
          </Text>
          <Button 
          title="Logout"
          onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;