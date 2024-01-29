import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Loader from '../Components/Loader';
import { LinearGradient } from 'expo-linear-gradient';
import apiConfig from '../../apiConfig';

const ProductScreen = ({ route}) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const { user } = route.params;
  const [size, setSize] = useState(11);
  const sizes = product.size;  
  const [count, setCount] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const productId=product._id;
  const userId=user._id;

    useEffect(() => {
      if (user && user.cart) {
        console.log(user.cart);
        const cartItem = user.cart.find(item => item.trophy._id === productId);
        if (cartItem) {
          setCount(cartItem.qty);
          setIsInCart(true);
        }
      }
    }, [user]);


    const handleMinusPress = async() => {
      if (count > 0) {
        await fetch(`${apiConfig.baseURL}/minus-cart-qty/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('API error:', response.status, response.statusText);
            throw new Error('API error');
          }
        })
        .then(responseData => {
          console.log(responseData);
          if (count === 1) {
            setIsInCart(false);
          } else {
            setCount(count - 1);
          }
        })
        .catch(error => {
          console.error('Error calling API:', error);
        });
      }
    };
    

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
        setIsInCart(true);
        setCount(count + 1);
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
    <View style={styles.container}>
      <View style={{paddingTop: 44,paddingLeft: 15,elevation: 4,zIndex: 4,position: 'absolute'}}>
        <TouchableOpacity onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
      </TouchableOpacity>
      </View>


      {product ? (
        <>
        <View style={{width: '100%',height:'40%', alignItems: 'center'}}>
          <Image source={{ uri: `data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}` }} style={styles.productImage} />
          <LinearGradient
          colors={[ '#FF5150','#FB7D7D']}
          start={{ x: 0.04, y: 0.96 }}
          end={{ x: 0.82, y: 0.18 }}
          style={styles.cardOverlay} >
          </LinearGradient>
        </View>
        <View style={{height:'60%', width:'100%'}}>
          <View style={{marginLeft: 10}}> 
        <ScrollView vertical showsVerticalScrollIndicator={true}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around', marginRight: 10}}>
                <Text style={styles.productTitle}>{product.trophyName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
          </View>
            <Text >{product.trophyType}</Text>
            <Text >{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={{ color: 'black', fontFamily: 'EuclidFlexRegular', fontSize: 25, marginLeft: 1, marginTop: 1, marginBottom: -25, }}>Size</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10,}}>           
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex:1, flexDirection: 'row', }}>
              {sizes.map((s, i) => (
                <TouchableOpacity key={i} style={[styles.sizedesign,{backgroundColor: size === s ? '#FF9F1C' : '#FFFFFF' , shadowColor: size === s ? '#FF9F1C' : '#000'}]} onPress={() => setSize(s)}>
                  <Text style={{ color: size === s ? '#FFFFFF' : '#000000', fontSize: 24 }}>{s}"</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={{flex: 0, flexDirection: 'column', backgroundColor: '#FAFAFA',marginTop: 10,height: 150,}}>
            <Text style={{fontSize: 22,marginTop:2, fontFamily: 'EuclidFlexRegular', marginBottom: -12, textTransform: 'uppercase', color: '#000'}}>Product Details</Text>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <View style={{paddingHorizontal:10, borderRightWidth:1, borderColor:'black'}}>
                <Text style={styles.subtitle1}>Product</Text>
                <Text style={styles.subtitle1}>Type </Text>
              </View>
              <View style={{paddingHorizontal:10}}>
                <Text style={styles.subtitle2}>{product.category}</Text>
                <Text style={styles.subtitle2}>{product.trophyType}</Text>
              </View>
            </View>
          <View style={ {fontSize: 20,color: '#000F',textDecorationLine: 'underline', marginLeft:10}} />
            <TouchableOpacity>
              <Text style={styles.moreDetails}>More Details</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
           </View>
          <View style={styles.buttonContainer}>
            {isInCart ? (
            <View style={{flexDirection:'row', justifyContent: 'space-evenly', alignContent: 'space-around', width: '100%'}}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleMinusPress}>
                <Icon name="remove-outline" size={25} color="white" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{count}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
                <Icon name="add-outline" size={25} color="white" />
              </TouchableOpacity>

              
            </View>
            
            <TouchableOpacity onPress={handleAddToCart} style={styles.activeCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          </View>
            ) : (
            <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            )} 
          </View>
        </View>
     </>
      ) : (
        <Loader/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  productImage: {
    width: '300%',
    height: 250,
    marginVertical: 40,
    marginHorizontal: -70,
    marginBottom:5,
    resizeMode: 'contain',
    zIndex:4,
    elevation:4
  },
  productTitle: {
    fontSize: 30,
    marginBottom: 8,
    textTransform: 'uppercase',
    fontFamily: 'ArialRounded',
    marginLeft: -26,
    alignItems: 'flex-start'
  },
  productPrice: {
    fontSize: 30,
    color: '#FF9F1C',
    marginBottom: 8,
    paddingLeft: 30,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    padding:10,
  },
  back: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  subtitle1: {
    fontSize: 14,
    marginBottom: -15,
    textAlign: 'right',
    fontFamily: 'EuclidFlexMedium',
    color: 'gray',
  },
  subtitle2: {
    fontSize: 14,
    marginBottom: -15,
    textAlign: 'left',
    fontFamily: 'EuclidFlexMedium',
    color: 'gray',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  moreDetails: {
    fontSize: 16,
    color: '#FF9F1C',
    marginTop: 15,
  },
  cardOverlay: {
    height: 400,
    width:500,
    borderRadius: 35,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    left:90,
    bottom: 15,
    shadowOpacity: 0.5,
    shadowColor: '#FF5150',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    elevation:3,
    zIndex: 1,
  },
  buttonContainer: {
      backgroundColor: '#FFFFFF',
      height: 80,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 5,
      marginTop: 'auto', 
    },
  quantityContainer: {
    backgroundColor: '#FF9F1C',
    borderRadius: 20,
    width:'30%',
    left: 10,
    height:40,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#FFF',
  },
  addToCartButton: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: 25,
    marginHorizontal:10,
    width: 300,
    height: 50,
  },
  activeCartButton:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    marginRight: 10,
    borderRadius: 25,
    // marginHorizontal:10,
    width:'30%',
    height: 50,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 22,
  },
  sizedesign: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 6,
    marginRight: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 4, height: 6 },
    shadowRadius: 5,  
    elevation:2,
  },
});

export default ProductScreen;
