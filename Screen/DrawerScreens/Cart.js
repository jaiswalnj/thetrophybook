import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../Components/CartItem';

const Cart = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '6598525fea5dc95f82511a33');
      } catch (error) {
        console.error('Error fetching user Id:', error);
      }
    };
    fetchUserId();
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const data = await fetch(`http://192.168.1.4:8005/user/${userId}`)
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson) {
                setUser(responseJson.data);
                setCartItems(responseJson.data.cart);
                console.log(cartItems);
              } else {
                console.error(responseJson.message);
              }
            });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, [userId])
  );

  const totalCartPrice = cartItems.reduce((total, item) => {
    if (item.price && typeof item.price === 'number') {
      console.log(`Item price for ${item._id}: ${item.price}`);
      return total + item.price;
    } else {
      console.warn(`Invalid price for item ${item._id}: ${item.price}`);
    }
    return total;
  }, 0);

  console.log('Total Cart Price:', totalCartPrice);

  const handleRedirectToHomepage = () => {
    navigation.navigate('DrawerNavigatorRoutes');
  };

  const handleAddToOrderHistory = async () => {
    try {
      const data = await fetch('http://192.168.1.4:8005/addToOrderHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      }).then((response) => response.json());

      console.log('addToOrderHistory API Response:', data);
    } catch (error) {
      console.error('Error calling addToOrderHistory API:', error.message);
    }
  };

  return (
    <View style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
      <View style={{ paddingTop: 10, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, marginBottom: 10 }}> Cart </Text>
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
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
      </ScrollView>
      <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ddd' }}>
        <Text style={{ fontSize: 20, textAlign: 'right' }}>Total: ₹{totalCartPrice}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <TouchableOpacity onPress={handleRedirectToHomepage}>
          <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Add Items</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddToOrderHistory}>
          <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Craft Quotation</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart