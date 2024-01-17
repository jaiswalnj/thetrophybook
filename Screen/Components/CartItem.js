import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import base64 from 'base64-js';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

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
        { isEditing ? (
            <View style={{padding:20}}>
                <View style={{}}>
                <Text style={{fontSize:12}}>{cartItem.trophy.trophyName}</Text>
                </View>
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
                <Text style={{fontSize:14}}>Save</Text>
              </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
            <View style={{padding:20}}>
            <Text style={styles.title}>{cartItem.trophy.price}</Text>
            <Text style={styles.title}>{cartItem.trophy.trophyName}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity onPress={() => handleCustomize()}>
              <Icon name='create-outline' size={20} color='black'/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRemove(cartItem.id)}>
              <Icon name='trash-bin-outline' size={20} color='black'/>
              </TouchableOpacity>
              </View>
              <Text>Quantity: {cartItem.qty}</Text>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    paddingHorizontal: 10,
    paddingVertical:5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  card: {
    width: 70,
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: ''
  },
  detailsContainer: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#FFCD1C',
    height:30,
    width:70,
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default CartItem;
