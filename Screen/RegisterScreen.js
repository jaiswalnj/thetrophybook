import React, {useState, createRef} from 'react';
import {StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../apiConfig';

import Loader from './Components/Loader';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();


  const handleSubmitButton = async() => {
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    try{
      const data = await fetch(`${apiConfig.baseURL}/signup` , { 
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({username:userName , email:userEmail , password:userPassword})
      }).then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson.status);
        if (responseJson.status === 'pending') {
          props.navigation.navigate('OTP');
          AsyncStorage.setItem('userId',responseJson.data.user_id);
        } else {
          setErrortext(responseJson.msg);
        }
      })
    }
    catch(error){
      console.log("error: "+error);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Image/logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput 
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Username"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View  style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) =>
                setUserAddress(UserAddress)
              }
              underlineColorAndroid="#f000"
              placeholder="Address"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFCD1C',
    borderWidth: 0,
    color: '#FFCD1C',
    borderColor: '#FFCD1C',
    height: 40,
    alignItems: 'center',
    width: '35%',
    borderRadius: 10,
    marginLeft: 130,
    marginRight: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    color: '#FFCD1C',
    borderColor: '#FFCD1C',
    height: 40,
    width: 150,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#FFCD1C',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});