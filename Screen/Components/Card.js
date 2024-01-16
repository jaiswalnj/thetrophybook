import React,{useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableOpacityComponent,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font'; 
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const Card = ({ imageUrl, title, price, productId, userId, width}) => {
    const navigation = useNavigation();
    const [like, setLike] = useState('heart-outline')
    onLikePress =() =>{
        if(like === 'heart-outline'){
            setLike('heart')
        }else{
            setLike('heart-outline')
        }
    }
    
    const BUTTON_SHRINK_FACTOR = .2;

    const handleAddToCart = async () => {
      try {
        const data = await fetch(`http://192.168.1.2:8005/addToCart/${productId}`, {
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

    return (
        <View style={styles.Container}>
        <View style={styles.card}>
        <LinearGradient
      colors={['#64ECC7', '#87FFDE', '#64ECC7', '#39FFC9']}
      start={{ x: 0.455, y: 0 }}
      end={{ x:1, y: 1 }}
      style={styles.gradientCard}>
          <Image source={{ uri: imageUrl }} style={styles.image}/>
    
          <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
            <Icon name={like} size={21} color="black" />
          </TouchableOpacity>
    
        
        </LinearGradient>
        </View>

        <TouchableOpacity style={styles.addButton } activeScale={handleAddToCart ? BUTTON_SHRINK_FACTOR : 2 } onPress={handleAddToCart} activeOpacity={0.88}>
            <Icon name="add-outline" size={29} color="black" style={{ position: 'center', top:1, left: 2}} />
            
          </TouchableOpacity>
          <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.title}>{title}</Text>
        </View>
      );
    };

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#FAFAFA',
        textAlign: 'right',
        width: 220,
        overflow: 'hidden',
        marginTop: 12,
        marginBottom: 15,
      },


  card: {
    backgroundColor: '#64ECC7',
    width: 180,
    height: 250,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: ''
  },
  image: {
    width: '200%',
    height: 180,
    marginVertical: 50,
    marginHorizontal: -90,
    resizeMode: 'center',
  },
  title: {
    fontSize: 18,
    //fontFamily: 'EuclidFlex',
    //fontWeight: 500,
    paddingTop: 4,
    paddingHorizontal: 16
  },
  price: {
    fontSize: 25,
    // fontFamily: 'ArialRoundedMT',
    fontWeight: 'regular',
    letterSpacing: 0.2,
    color: 'black',
    paddingTop:20,
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
    borderRadius:5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width:10, height:10},
    shadowRadius:5,
    height: 30,
    width: 30,
    bottom: 70,
    right: 25,
    elevation: 4,
    zIndex: 1,
  },
});

export default Card;
