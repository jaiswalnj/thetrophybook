import React,{useState,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import apiConfig from '../../apiConfig';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Liked = ({ imageUrl, title, price, productId, userId, useCustomColor, onRemove}) => {
    const navigation = useNavigation();
    
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
  
          <TouchableOpacity style={styles.likeButton} onPress={onRemove}>
          <Icon name='heart' size={20} color='#FF2E2E'/>
          </TouchableOpacity>
        </LinearGradient>
  
        <TouchableOpacity
          style={styles.addButton}
          activeScale={handleAddToCart ? BUTTON_SHRINK_FACTOR : 2}
          onPress={handleAddToCart}
          activeOpacity={0.88}
        >
          <Icon name="add-outline" size={29} color="black" style={{padding:-1 }} />
        </TouchableOpacity>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      width: width * 0.45,
      height: height * 0.40,
      marginTop: height * 0.008,
      marginBottom: height * 0.002,
      marginLeft:width * 0.02,
      marginRight: width * 0.02,
      paddingHorizontal:5,
    },
    gradientCard: {
      width: width * 0.4,
      height: height * 0.28,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 3,
      backgroundColor: '#64ECC7',
      shadowOpacity: 0.3,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 2,
      marginVertical: width * 0.02,
      marginHorizontal:width * 0.02,
      },
    image: {
      width: '200%',
      height: '70%',
      marginVertical: height * 0.055,
      marginHorizontal: width * -0.22,
      resizeMode: 'contain',
    },
    title: {
      fontSize: width * 0.05,
      paddingTop: 2,
      paddingHorizontal: 16,
      color: 'black',
      fontFamily: 'EuclidFlexMedium',
    },
    price: {
      fontSize: width * 0.06,
      fontWeight: 'regular',
      fontFamily: 'ArialRounded',
      marginTop: 10,
      letterSpacing: 0.2,
      color: 'black',
      paddingLeft: 16,
    },
    likeButton: {
      position: 'absolute',
      top: width * 0.03,
      right: width * 0.03,
      zIndex: 1,
    },
    addButton: {
      position: 'absolute',
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 2,
      height: height * 0.036,
      width: height * 0.036,
      left: width * 0.38,
      top: height * 0.27,
      elevation: 2,
      zIndex: 1,
    },
  });

export default Liked;
