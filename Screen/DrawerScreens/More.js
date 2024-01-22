import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Feedback from '../Components/Feedback';
import apiConfig from '../../apiConfig';

const More = ({user}) => {
  const [userName, setUserName] = useState('');
  const [orderHistory, setOrderHistory] = useState();
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
        if (user && user.username) {
          setUserName(user.username);
          setOrderHistory(user.orderHistory);
        }
    }, [user])
  );

  const handleFeedbackPress = () => {
    setIsFeedbackModalVisible(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalVisible(false);
  };

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
      <View style={{ paddingTop: 10, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, marginBottom: 10 }}>Profile</Text>
      </View>
    <View style={{padding:20}}>
      <View style={styles.header}>
        <View style={[styles.profileImage, { backgroundColor: '#808080'}]}>
        <Text style={{ color: "white", fontSize:50, alignSelf: 'center'}}>
              {userName ? userName.charAt(0) : "?"}
          </Text>
          </View>
        <Text style={styles.profileName}>{userName}</Text>
      </View>


      <View style={styles.orderSummary}>
        <TouchableOpacity style={styles.orderButton} onPress={() => {navigation.replace('Orders',{orderHistory})}}>
          <Text style={styles.orderText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
      <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleFeedbackPress}>
        <Text style={styles.optionText}>Feedback</Text>
      </TouchableOpacity>
      <Feedback isVisible={isFeedbackModalVisible} onClose={handleCloseFeedbackModal} />
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop:10}}>
      <Text style={styles.title}>Contact Us</Text>

      <View style={styles.contactDetails}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailText}>contact@example.com</Text>

        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailText}>(123) 456-7890</Text>

        <Text style={styles.detailLabel}>Address:</Text>
        <Text style={styles.detailText}>123 Main Street, Cityville, Country</Text>
      </View>
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    textAlign: 'center',
    borderRadius: 40,
    borderWidth:1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10,
    marginBottom: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactDetails: {
    marginTop: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default More
