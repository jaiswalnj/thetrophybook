import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItems from '../Components/CartItems';
import Icon from 'react-native-vector-icons/Ionicons';

const Cart = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  // ... other code (fetchUserData, toggleScroll, etc.)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        
        <Button
          
          onPress={() => navigation.goBack()}
          title="Back"
          icon={<Icon name="chevron-left" size={25} color="black" />}
        />
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <ScrollView contentContainerStyle={styles.cartContent}>
        {/* Render your cart items here */}
        <CartItems
          imageUrl="..."
          title="Product 1"
          price="12.99"
          width={220}
        />
        {/* Add more CartItems as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    height: 80, // Adjust height as needed
    paddingTop: 15, // Adjust padding as needed
  },
  headerTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cartContent: {
    padding: 10,
  },
});

export default Cart;
