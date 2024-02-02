import React, { useEffect, useState, version } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Loader from '../Components/Loader';
import { LinearGradient } from 'expo-linear-gradient';
import apiConfig from '../../apiConfig';
import StarRating from 'react-native-star-rating';


const { width, height } = Dimensions.get('window');

const ProductScreen = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const { user } = route.params;
  const [size, setSize] = useState();
  const sizes = product.size;
  const [count, setCount] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const productId = product._id;
  const userId = user._id;
  const [rating, setRating] = useState(product.customer_feedback.ratings.average);


  useEffect(() => {
    if (user && user.cart) {
      const cartItem = user.cart.find((item) => item.trophy._id === productId);
      if (cartItem) {
        setCount(cartItem.qty);
        setSize(cartItem.size);
        setIsInCart(true);
      }
    }
  }, [user]);

  const handleMinusPress = async () => {
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
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('API error:', response.status, response.statusText);
            throw new Error('API error');
          }
        })
        .then((responseData) => {
          if (count === 1) {
            setIsInCart(false);
          } else {
            setCount(count - 1);
          }
        })
        .catch((error) => {
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
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message === 'Item added to the cart') {
            setIsInCart(true);
            setCount(count + 1);
          } else {
            Alert.alert('Error', data.message || 'Failed to add item to the cart');
          }
        });
    } catch (error) {
      console.error('Error adding item to the cart:', error.message);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    fetch(`${apiConfig.baseURL}/customer-feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: newRating,
        product_id: productId,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response:', data);
    })
    .catch((error) => {
      console.error('Error updating rating:', error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 44, paddingLeft: 15, elevation: 150, zIndex: 4, position: 'absolute' }}>
        <TouchableOpacity onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
          <Icon name="arrow-back-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {product ? (
        <>
          <View style={{ width: '100%', height: '45%', alignItems: 'center' }}>
            <Image source={{ uri: `data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}` }} style={styles.productImage} />
            <LinearGradient
              colors={['#FF5150', '#FB7D7D']}
              start={{ x: 0.04, y: 0.96 }}
              end={{ x: 0.82, y: 0.18 }}
              style={styles.cardOverlay}
            />
          </View>
          <View style={{ height: width > 600 ? '60%' : 'auto', width: '100%', marginHorizontal: width * 0.02 }}>
            <View style={{ marginLeft: width > 600 ? '3%' : '1%' }}>
              <ScrollView vertical showsVerticalScrollIndicator={true}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: height*0.01 }}>
                  <Text style={styles.productTitle}>{product.trophyName}</Text>
                  <Text style={styles.productPrice}>${product.price}</Text>
                </View>
                <View style={{maxWidth:width*0.15, marginVertical: height*0.005}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  selectedStar={(rating) => handleRatingChange(rating)}
                  fullStarColor="#FF9F1C"
                  starSize= {width* 0.04}
                />
                </View>
                <Text style={styles.productDescription}>{product.description}This is a metal trophy made for basketball games. It comes in three different colors, like bronze, silver and gold. </Text>
                <Text style={{ color: 'black', fontFamily: 'EuclidFlexRegular', marginTop: height * 0.02, fontSize: height *0.025, letterSpacing: 2, height: height* 0.03, marginVertical: height * 0.008  }}>Size</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%'}}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: 'row', }}>
                    {sizes.map((s, i) => (
                      <TouchableOpacity key={i} style={[styles.sizedesign, { backgroundColor: size === s ? '#FF9F1C' : '#FFFFFF', shadowColor: size === s ? '#FF9F1C' : '#000' }]} onPress={() => setSize(s)}>
                        <Text style={{ color: size === s ? '#FFFFFF' : '#000000', fontSize: width > 600 ? 24 : 18 }}>{s}"</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View style={{ flex: 0, flexDirection: 'column', backgroundColor: '#FAFAFA', marginTop:  5, height:  120, }}>
                  <Text style={{ color: 'black', fontFamily: 'EuclidFlexRegular', fontSize: height *0.025, letterSpacing: 2, height: height* 0.03, marginVertical: height * 0.008   }}>Product Details</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', height: height*0.05 }}>
                    <View style={{ borderRightWidth: 1, borderColor: 'gray', paddingHorizontal:width*0.02 }}>
                      <Text style={styles.subtitle1}>Product</Text>
                      <Text style={styles.subtitle1}>Type </Text>
                    </View>
                    <View style={{ paddingHorizontal:width*0.02 }}>
                      <Text style={styles.subtitle2}>{product.category}</Text>
                      <Text style={styles.subtitle2}>{product.trophyType}</Text>
                    </View>
                  </View>
                  <View style={{ fontSize: 18, color: '#000F', textDecorationLine: 'underline' }} />
                  <TouchableOpacity>
                    <Text style={styles.moreDetails}>More Details</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>

            <View style={styles.buttonContainer}>
              {isInCart ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-around', width: '100%' }}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={handleMinusPress}>
                      <Icon name="remove-outline" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{count}</Text>
                    <TouchableOpacity onPress={handleAddToCart}>
                      <Icon name="add-outline" size={20} color="white" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={handleAddToCart} style={styles.activeCartButton}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: height*0.02, }}>
                      <Icon name="add-outline" size={24} color="white" />
                      <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: 5, }}>
                    <Icon name="add-outline" size={24} color="white" />
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          
        </>
      ) : (
        <Loader />
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
    width: '200%',
    height: '70%',
    marginVertical: height * 0.08,
    resizeMode: 'contain',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    zIndex: 4,
  },
  productTitle: {
    fontSize: width* 0.07,
    marginTop: width > 600 ? '4%' : '2%',
    maxWidth: width * 0.7,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'ArialRounded',
    alignItems: 'flex-start'
  },
  productPrice: {
    fontSize: width* 0.06,
    marginTop: width > 600 ? '4%' : '2%',
    marginRight: width * 0.06,
    color: '#FF9F1C',
  },
  productDescription: {
    fontSize:  width * 0.034,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.72)',
    marginVertical: height * 0.008,
    marginRight: width * 0.05,
    
  },
  back: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  subtitle1: {
    height: height*0.04,
    fontSize: height * 0.0148,
    marginBottom: height * -0.025 ,
    marginVertical: height * 0.008,
    textTransform: 'uppercase',
    textAlign: 'right',
    fontFamily: 'EuclidFlexMedium',
    color: 'gray',
  },
  subtitle2: {
    height: height*0.04,
    fontSize: height * 0.0148,
    marginBottom: height * -0.025,
    marginVertical: height * 0.008,
    textAlign: 'left',
    textTransform: 'uppercase',
    fontFamily: 'EuclidFlexMedium',
    color: 'gray',
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 5,
  },
  moreDetails: {
    fontSize: height * 0.015,
    color: '#FF9F1C',
    textTransform: 'uppercase',
    fontFamily: 'EuclidFlexMedium',
    marginVertical: height * 0.015,
  },
  cardOverlay: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowColor: '#b00f0e',
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 100,
    elevation: 8,
    zIndex: 1,
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    position: 'absolute',
    height: height * 0.1,
    bottom:0,
    paddingHorizontal: width * 0.03,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
  },
  quantityContainer: {
    backgroundColor: '#FF9F1C',
    borderRadius: 20,
    width: width * 0.25,
    height: height * 0.045,
    marginHorizontal: width * 0.02,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  quantityText: {
    fontSize: width*0.05,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addToCartButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: height*0.04,
    width: width * 0.045,
    height: height*0.06,
  },
  activeCartButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: 30,
    alignItems: 'center',
    width: width * 0.5,
    height: height*0.055,
  },
  addToCartButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'EuclidFlexMedium',
    letterSpacing: 1.1,
    textAlign: 'center',
    height: height*0.05,
    fontSize:  width * 0.05,
    width: width* 0.4,
  },
  sizedesign: {
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.014,
    borderRadius: 6,
    marginBottom: 4,
    marginHorizontal: width * 0.02,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ProductScreen;
