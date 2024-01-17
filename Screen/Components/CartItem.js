import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import base64 from 'base64-js';
import {LinearGradient} from 'expo-linear-gradient';

const CartItem = ({ cartItem, onCustomize, onRemove }) => {
  const [quantity, setQuantity] = useState();
  const [customization1, setCustomization1] = useState();
  const [customization2, setCustomization2] = useState();
  const [customization3, setCustomization3] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCustomize = () => {
    setIsEditing(true);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <View style={styles.cartItemContainer}>

        <LinearGradient
      colors={['#64ECC7', '#87FFDE', '#64ECC7', '#39FFC9']}
      start={{ x: 0.455, y: 0 }}
      end={{ x:1, y: 1 }}
      style={styles.card}>
      <Image source={{ uri: `data:${cartItem.trophy.image.image.contentType};base64,${base64.fromByteArray(cartItem.trophy.image.image.data.data)}` }}  style={styles.image}/>
      </LinearGradient>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{cartItem.trophy.trophyName}</Text>
        { isEditing ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Customization 1"
                value={customization1}
                onChangeText={(text) => setCustomization1(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Customization 2"
                value={customization2}
                onChangeText={(text) => setCustomization2(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Customization 3"
                value={customization3}
                onChangeText={(text) => setCustomization3(text)}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.quantityContainer}>
              <Text>Quantity: {cartItem.qty}</Text>
              <TouchableOpacity onPress={() => handleCustomize()}>
                <Text>Customize</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRemove(cartItem.id)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  card: {
    width: 80,
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: ''
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#FFCD1C',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default CartItem;
