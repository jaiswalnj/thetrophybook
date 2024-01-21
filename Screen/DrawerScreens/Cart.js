import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CartItem from '../Components/CartItem';
import apiConfig from '../../apiConfig';

const Cart = ({user }) => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      if (user && user.cart) {
        setCartItems(user.cart);
      }
    }, [user])
  );

  const totalCartPrice = cartItems.reduce((total, item) => {
    if (item.trophy.price && typeof item.trophy.price === 'number' && !isNaN(item.trophy.price)) {
      return total + item.trophy.price;
    } else {
      console.warn(`Invalid price for item ${item.trophy._id}: ${item.trophy.price}`);
    }
    return total;
  }, 0);

  const handleAddToOrderHistory = async () => {
    try {
      const data = await fetch(`${apiConfig.baseURL}/addToOrderHistory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      }).then((response) => response.json());

      console.log('addToOrderHistory API Response:', data);
    } catch (error) {
      console.error('Error calling addToOrderHistory API:', error.message);
    }
  };

  return (
    <View style={{ backgroundColor: '#FAFAFA', flex: 1, marginBottom:85 }}>
      <View style={{ paddingTop: 10, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, marginBottom: 10 }}> Cart </Text>
      </View>
      <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CartItem
                userId={user._id}
                cartItem={item}
                onRemove={async () => {
                  try {
                    const productId = item.trophy._id;
                    const response = await fetch(`${apiConfig.baseURL}/removeFromCart/${productId}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user_id: user._id,
                      }),
                    });
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                  } catch (error) {
                    console.error('Error calling API:', error);
                  }
                }}                
              />
            )}
          />
        </View>
        <View style={{backgroundColor:'#FFF8DF', margin:10, borderRadius:15}}>

          <View style={{padding:10}}>
            <Text style={{ fontSize: 15, textAlign: 'left', padding:5}}>Price Details</Text>
            <View style={{padding:3, borderTopWidth: 0.5, borderBottomWidth: 0.5, flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{ fontSize: 15, textAlign: 'right' }}>Total: </Text>
              <Text style={{ fontSize: 15, textAlign: 'right' }}>₹{totalCartPrice}</Text>
            </View>
          </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>

          <TouchableOpacity onPress={() => {navigation.navigate('HomeScreen')}}>
            <View style={{ backgroundColor: '#FF9F1C', padding: 10, height:40, width:140, borderRadius: 20, alignItems:'center' }}>
              <Text style={{ color: 'white' }}>Add Items</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddToOrderHistory}>
            <View style={{ backgroundColor: '#FF9F1C', padding: 10, height:40, width:140, borderRadius: 20, alignItems:'center' }}>
              <Text style={{ color: 'white' }}>Craft Quotation</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;
