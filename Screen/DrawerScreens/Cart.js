import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CartItem from '../Components/CartItem';
import apiConfig from '../../apiConfig';

const Cart = ({ navigation, user }) => {
  const [cartItems, setCartItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.cart) {
        setCartItems(user.cart);
      }
    }, [user])
  );

  const totalCartPrice = cartItems.reduce((total, item) => {
    if (item.price && typeof item.price === 'number' && !isNaN(item.price)) {
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
      const data = await fetch('${apiConfig.baseURL}/addToOrderHistory', {
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
    <View style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
      <View style={{ paddingTop: 10, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, marginBottom: 10 }}> Cart </Text>
      </View>
      <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CartItem
                cartItem={item}
                onCustomize={() => {
                  console.log('Customize pressed for item:', item);
                }}
                onRemove={async () => {
                  const productId = item._id;
                  await fetch(`http://192.168.1.4:8005/removeFromCart/${productId}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user_id: user._id,
                    }),
                  })
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      return response.json();
                    })
                    .then(data => {
                      console.log('API response:', data);
                    })
                    .catch(error => {
                      console.error('Error calling API:', error);
                    });
                }}
              />
            )}
          />
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
    </View>
  );
};

export default Cart;
