import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import apiConfig from '../apiConfig';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async() => {
    try{
        const data = await fetch(`${apiConfig.baseURL}/forgetPassword` , { 
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({email:email})
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        if (responseJson.status === 'A mail has been sent to you for resetting your password.') {
            Alert.alert('A mail has been sent to you for resetting your password.');
            navigation.navigate('LoginScreen');
        } else {
          Alert.alert(responseJson.message);
        }
      })
      } 
        catch (error) {
        Alert.alert('Error', error );
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to Verify</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#FFCD1C',
  },
  button: {
    backgroundColor: '#FFCD1C',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ForgotPassword