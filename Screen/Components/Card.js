import React,{useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import apiConfig from '../../apiConfig';


const Card = ({ imageUrl, title, price, productId, userId, useCustomColor, liked, onPress}) => {
    
    const BUTTON_SHRINK_FACTOR = .2;

    const handleAddToCart = async () => {
      try {
        const data = await fetch(`${apiConfig.baseURL}/addToCart/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
        if (responseJson.message === 'Item added to the cart') {
          Alert.alert('Success', 'Item added to the cart successfully');
        } else {
          Alert.alert('Error', data.message || 'Failed to add item to the cart');
        }
      })
      } catch (error) {
        console.error('Error adding item to the cart:', error.message);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    };

    const gradientColors = useCustomColor
    ? ['#64ECC7', '#87FFDE', '#64ECC7', '#39FFC9']
    : ['#FFC473', '#FFC473', '#FFC473', '#FFC473'];


    return (
      <View style={styles.container}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0.455, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <Image source={{ uri: imageUrl }} style={styles.image} />
  
          <TouchableOpacity style={styles.likeButton} onPress={() => onPress(productId, userId)}>
          <Icon name={liked ? 'heart' : 'heart-outline'} size={24} color='black'/>
          </TouchableOpacity>
        </LinearGradient>
  
        <TouchableOpacity
          style={styles.addButton}
          activeScale={handleAddToCart ? BUTTON_SHRINK_FACTOR : 2}
          onPress={handleAddToCart}
          activeOpacity={0.88}
        >
          <Icon name="add-outline" size={29} color="black" style={{ position: 'center', top: 1, left: 2 }} />
        </TouchableOpacity>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      width:200,
      marginTop: 12,
      marginBottom: 15,
      marginHorizontal:10,
    },
    gradientCard: {
      width: 180,
      height: 250,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 3,
      alignSelf: '',
    },
    image: {
      width: '200%',
      height: 180,
      marginVertical: 50,
      marginHorizontal: -90,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 18,
      paddingTop: 4,
      paddingHorizontal: 16,
      color: 'black',
    },
    price: {
      fontSize: 25,
      fontWeight: 'regular',
      letterSpacing: 0.2,
      color: 'black',
      paddingTop: 20,
      paddingLeft: 16,
      paddingBottom: 2,
    },
    likeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
    },
    addButton: {
      position: 'absolute',
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 3,
      height: 30,
      width: 30,
      bottom: 60,
      right: 10,
      elevation: 2,
      zIndex: 1,
    },
  });
  
  export default Card;
  