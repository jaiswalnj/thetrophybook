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
      <View style={{paddingTop: 44,paddingLeft: 15,elevation: 150,zIndex: 4,position: 'absolute'}}>
        <TouchableOpacity onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
      </TouchableOpacity>
      </View>


      {product ? (
        <>
        <View style={{width: '100%',height:'47%', alignItems: 'center'}}>
          <Image source={{ uri: `data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}` }} style={styles.productImage} />
          <LinearGradient
          colors={[ '#FF5150','#FB7D7D']}
          start={{ x: 0.04, y: 0.96 }}
          end={{ x: 0.82, y: 0.18 }}
          style={styles.cardOverlay} >
          </LinearGradient>
        </View>
        <View style={{height:'60%', width:'100%'}}>
          <View style={{marginLeft: 14}}> 
        <ScrollView vertical showsVerticalScrollIndicator={true}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around', marginRight: 10}}>
                <Text style={styles.productTitle}>{product.trophyName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
          </View>
            <Text >{product.trophyType}</Text>
            <Text >{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={{ color: 'black', fontFamily: 'EuclidFlexRegular', fontSize: 20, marginLeft: 1, marginTop: 1, marginBottom: -25, letterSpacing:2}}>Size</Text>
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
                <Icon name="remove-outline" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{count}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
                <Icon name="add-outline" size={28} color="white"  />
              </TouchableOpacity>

              
            </View>
            
            <TouchableOpacity onPress={handleAddToCart} style={styles.activeCartButton}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: 10,}}>
                <Icon name="add-outline" size={28} color="white"  />
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </View>     
          </TouchableOpacity>
          </View>
            ) : (
            <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
              <View style={{flexDirection: 'row',  justifyContent: 'center', alignContent: 'center', marginTop: 10,}}>
                <Icon name="add-outline" size={28} color="white"  />
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </View>   
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
    marginVertical: 110,
    marginHorizontal: -70,
    marginBottom:5,
    resizeMode: 'contain',
    shadowColor: 'black',
    elevation: 14 ,
    shadowOpacity: 0.9,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 9,
    zIndex:4,
    elevation:4
  },
  productTitle: {
    fontSize: 30,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing:2,
    fontFamily: 'ArialRounded',
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
    textTransform: 'uppercase',
    textAlign: 'right',
    fontFamily: 'EuclidFlexMedium',
    color: 'gray',
  },
  subtitle2: {
    fontSize: 14,
    marginBottom: -15,
    textAlign: 'left',
    textTransform: 'uppercase',
    fontFamily: 'EuclidFlexMedium',
    color: 'gray',
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
  },
  moreDetails: {
    fontSize: 13,
    color: '#FF9F1C',
    textTransform: 'uppercase',
    fontFamily: 'EuclidFlexMedium',
    marginTop: 15,
  },
  cardOverlay: {
    height: 800,
    width:500,
    borderRadius: 35,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    left:90,
    bottom: 15,
    shadowOpacity: 0.9,
    shadowColor: '#b00f0e',
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 88,
    elevation: 8,
    zIndex: 1,
  },
  buttonContainer: {
      backgroundColor: '#FFFFFF',
      height: 80,
      flexDirection: 'row',
      position: 'relative',
      bottom: -14,
      top: 'auto',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 5,
      // marginTop: 'auto', 
    },
  quantityContainer: {
    backgroundColor: '#FF9F1C',
    borderRadius: 20,
    width:'30%',
    left: 10,
    height:50,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#FFF',
  },
  addToCartButton: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: 24,
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
    marginLeft:20,
    borderRadius: 25,
    alignContent:'center',
    // marginHorizontal:10,
    width:'30%',
    height: 50,
  },
  addToCartButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'EuclidFlexMedium',
    letterSpacing: 1.1,
    textAlign: 'center',
    fontSize: 22,
  },
  sizedesign: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 6,
    marginRight: 14,
    shadowOpacity: 0.1,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 10,  
    elevation:2,
  },
});

export default ProductScreen;
