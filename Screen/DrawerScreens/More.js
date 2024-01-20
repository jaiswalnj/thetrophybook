import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {PermissionsAndroid} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


const More = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState([]);
  const [userImage, setUserImage] = useState()

  useEffect(()=>{
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '');
      } catch (error) {
        console.error('Error fetching user Id:', error);
      }
    };
    fetchUserId();
  },[userId]);

  useFocusEffect(React.useCallback(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetch(`http://192.168.29.25:8005/user/${userId}`)
          .then((response)=> response.json())
          .then((responseJson)=>{
            if (responseJson) {
              setUser(responseJson.data);
              setUserImage({ uri: `data:${responseJson.data.image.image.contentType};base64,${base64.fromByteArray(responseJson.data.image.image.data.data)}`} || require('../../Image/logo.png'));
              console.log(user);
            } else {
              console.error(responseJson.message);
            }
          })
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId])
  );

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
    <View style={styles.container}>
     
      <View style={styles.header}>
        <Image
          source={userImage}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.username}</Text>
      </View>


      <View style={styles.orderSummary}>
        <TouchableOpacity style={styles.orderButton} onPress={() => {navigation.replace('Orders')}}>
          <Text style={styles.orderText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderText}>Returns</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderText}>Addresses</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  orderText: {
    textAlign: 'center',
  },
  options: {
    flexDirection: 'column',
  },
  option: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
  },
});

export default More
