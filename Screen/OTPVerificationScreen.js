import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../apiConfig';

const OTPVerificationScreen = ({navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [userId, setUserId] = useState();
  const inputRefs = useRef([]);


  const handleOTP = async() => {
    const enteredOTP = otp.join('');
    const storedUserId = await AsyncStorage.getItem('userId');
    setUserId(storedUserId);
    console.log(enteredOTP,userId);
    try{
      const data = await fetch(`${apiConfig.baseURL}/verifyOtp` , { 
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({userId:userId, otp: enteredOTP})
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      if (responseJson.status === 'verified') {
        navigation.navigate('LoginScreen');
       } else if (responseJson.status === 'resetpassword') {
          navigation.navigate('ResetPasswrod');
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
        clearOTP();
      }
    })
    } 
      catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      clearOTP();
    }
  };
  

  const clearOTP = () => {
    setOtp(['', '', '', '']);
    inputRefs.current[0].focus();
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (key === 'Enter' && index === 3 ) {
      handleOTP();
    }
  };

  const handleInputChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;

    setOtp(newOTP);
    
    if (text.length === 1) {
      const nextIndex = index < otp.length - 1 ? index + 1 : 3;
      inputRefs.current[nextIndex].focus();
    } else {
      const prevIndex = index > 0 ? index - 1 : 0;
      inputRefs.current[prevIndex].focus();
    }
  };
  

  return (
    <View style={styles.container}>
      <Image
            source={require('../Image/logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 20,
            }}
          />
      <Text style={styles.title}>Enter the OTP sent to your email</Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
            value={value}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <TouchableOpacity 
        style={styles.buttonStyle} 
        activeOpacity={0.5} 
        onPress={handleOTP}>
        <Text style={styles.buttonTextStyle}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  otpInput: {
    height: 40,
    borderColor: '#FFCD1C',
    borderWidth: 1,
    width: 40,
    borderRadius: 10,
    textAlign: 'center',
    marginRight: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFCD1C',
    borderWidth: 0,
    color: '#FFCD1C',
    borderColor: '#FFCD1C',
    height: 40,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 16,
  },
});


export default OTPVerificationScreen;

