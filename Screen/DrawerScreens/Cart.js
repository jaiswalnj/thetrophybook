import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../Components/CartItem';

const Cart = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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
        console.log(userId);
        const data = await fetch(`http://192.168.1.2:8005/user/${userId}`)
          .then((response)=> response.json())
          .then((responseJson)=>{
            if (responseJson) {
              setUser(responseJson.data);
              setCartItems(responseJson.data.cart);
              console.log(cartItems);
            } else {
              console.error(responseJson.message);
            }
          })
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [])
  );

  return (
    <View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CartItem
            cartItem={item}
            onCustomize={() => {
              console.log('Customize pressed for item:', item);
            }}
            onRemove={() => {
              console.log('Remove pressed for item:', item);
            }}
          />
        )}
      />
    </View>
  );
};

export default Cart