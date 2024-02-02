import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Dimensions} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CartItem from '../Components/CartItem';
import apiConfig from '../../apiConfig';

const { width, height } = Dimensions.get('window');

const Cart = ({user}) => {
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
      return total + (item.trophy.price*item.qty);
    } else {
      console.warn(`Invalid price for item ${item.trophy._id}: ${item.trophy.price}`);
    }
    return total;
  }, 0);

  const handleCraftQuotation = () =>{
    generatebill();
    AddToOrderHistory();
  }

  const AddToOrderHistory = async () => {
    try {
      
      const data = await fetch(`${apiConfig.baseURL}/addToOrderHistory`, {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user._id,
      }),
      }).then((response) => response.json());

      console.log('addToOrderHistory API Response:', data);
    } catch (error) {
      console.error('Error calling addToOrderHistory API:', error.message);
    }
  };

  const generatebill = async () => {
    try {
      const createPdfResponse = await fetch(`${apiConfig.baseURL}/create-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user._id,
        }),
      });
  
      if (!createPdfResponse.ok) {
        throw new Error(`HTTP error! Status: ${createPdfResponse.status}`);
      }
      Alert.alert('Order Placed', 'Your order has been successfully placed!');
    } catch (error) {
      console.error('Error handling order:', error.message);
    }
  };

  return (
    <View style={{ backgroundColor: '#FAFAFA', flex: 1, marginBottom: height * 0.07 }}>
      <View style={{alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: width * 0.08, textAlign: 'center', marginTop: height * 0.05, marginBottom: height * 0.01 }}> Cart </Text>
      </View>
      <View style={{ flex: 1 }}>
        {cartItems.length > 0 ? (
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
                    setCartItems((prevCartItems) =>
                      prevCartItems.filter((cartItem) => cartItem.trophy._id !== productId)
                    );
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
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Your cart is empty</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <View style={{ backgroundColor: '#FF9F1C', padding: width * 0.02, height: height * 0.05, width: width * 0.4, borderRadius: width * 0.05, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Add Items</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {cartItems.length > 0 && (
        <View style={{ backgroundColor: '#FFF8DF', margin: width * 0.04, borderRadius: width * 0.05,marginBottom:  width * 0.07}}>
          <View style={{ padding: width * 0.02 }}>
            <Text style={{ fontSize: width * 0.04, textAlign: 'left', padding: height * 0.005 }}>Price Details</Text>
            <View style={{padding: height * 0.005 , borderTopWidth: 0.5, borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: width * 0.04, textAlign: 'right' }}>Total: </Text>
              <Text style={{ fontSize: width * 0.04, textAlign: 'right' }}>₹{totalCartPrice}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: width * 0.04 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
              <View style={{ backgroundColor: '#FF9F1C',padding: width * 0.02, height: height * 0.05, width: width * 0.4, borderRadius: width * 0.05, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Add Items</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCraftQuotation}>
              <View style={{backgroundColor: '#FF9F1C',padding: width * 0.02, height: height * 0.05, width: width * 0.4, borderRadius: width * 0.05, alignItems: 'center'}}>
                <Text style={{ color: 'white', height: height*0.05 }}>Craft Quotation</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;
