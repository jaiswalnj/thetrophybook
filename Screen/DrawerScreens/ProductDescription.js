import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Loader from '../Components/Loader';
import { LinearGradient } from 'expo-linear-gradient';

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
        const cartItem = user.cart.find(item => item._id === productId);
        if (cartItem) {
          setCount(cartItem.quantity);
          setIsInCart(true);
        }
      }
    }, [user]);


  const handleMinusPress = async () => {
    
    if (count > 0) {
      if(count===1){
        setIsInCart(false);
      }else{
        setCount(count - 1);
      }
      try {
        const response = await fetch(`http://192.168.1.4:8005/minus-cart-qty/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
        } else {
          console.error('API error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error calling API:', error);
      }
    }
  };

  const handleAddToCart = async () => {
    setCount(count + 1);
    try {
      const data = await fetch(`http://192.168.1.4:8005/addToCart/${productId}`, {
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
      <ScrollView vertical showsVerticalScrollIndicator={true}>
      
      <View style={{
        paddingTop: 44,
        paddingLeft: 15,
        elevation: 4,
        zIndex: 4,
        position: 'absolute'
      }}>
        <TouchableOpacity onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
      </TouchableOpacity>
      </View>


      {product ? (
        <>
        <View style={{width: '100%',height:300, alignItems: 'center'}}>
          <Image source={{ uri: `data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}` }} style={styles.productImage} />
          <LinearGradient
          colors={['#FB7D7D', '#FF5150']}
          start={{ x: 0.04, y: 0.96 }}
          end={{ x: 0.82, y: 0.18 }}
          style={styles.cardOverlay} ></LinearGradient>
          </View>
          <View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal:10, justifyContent:'center'}}>
                <Text style={styles.productTitle}>{product.trophyName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            <Text style={{paddingHorizontal:10,}}>{product.trophyType}</Text>
            <Text style={{paddingHorizontal:10,}}>{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            
            
            <Text style={{ color: 'black', fontSize: 25, marginLeft: 1, marginTop: 10, marginBottom: 15 }}>Size:</Text>
            
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-around' ,
          width: '100%', 
          paddingHorizontal: 10,
          }}>           

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex:1, flexDirection: 'row', }}>
            {sizes.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: size === s ? '#FF9F1C' : '#FFFFFF',
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginRight: 10,
                  shadowColor: 'black',
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 4, height: 4 },
                  shadowRadius: 3,  
                }}
                onPress={() => setSize(s)}
              >
                <Text style={{ color: size === s ? '#FFFFFF' : '#000000', fontSize: 24 }}>{s}"</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        <View style={{
          flex: 0, 
          flexDirection: 'column', 
          backgroundColor: '#FAFAFA',
          marginTop: 10,
          height: 150,
          paddingHorizontal:10,
        }}>
      <Text style={{fontSize: 24,fontWeight: 'bold',marginBottom: 10, color: '#000'}}>Product Details</Text>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={{paddingHorizontal:10, borderRightWidth:1, borderColor: 'black',}}>
        <Text style={styles.subtitle1}>Product</Text>
        <Text style={styles.subtitle1}>Type</Text>
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

    <View style={{
      backgroundColor:'#FFFFFF',
      // flex:1,
      // alignSelf: 'flex-end',
      position: 'relative',
      backgroundColor:'#FFF',
      // top:,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding:5,
      alignItems:'center',
      width: '100%',
      height: 60,
      justifyContent: 'space-between',
      width: '109%',
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 5,
     }}>
      
      {isInCart ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleMinusPress}>
            <Icon name="remove-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{count}</Text>
          <TouchableOpacity onPress={handleAddToCart}>
            <Icon name="add-outline" size={25} color="black" />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#FAFAFA',
    height: '100%',
    width: '100%',
  },
  productImage: {
    width: '300%',
    height: 250,
    marginVertical: 40,
    marginHorizontal: -70,
    resizeMode: 'contain',
    zIndex:1,
  },
  productTitle: {
    fontSize: 35,
    marginBottom: 8,
    alignItems: 'flex-start'
  },
  productPrice: {
    fontSize: 38,
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
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right'
  },
  subtitle2: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left'
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  moreDetails: {
    fontSize: 16,
    color: '#FF9F1C',
    textDecorationLine: 'underline',
    marginLeft:10
  },
  cardOverlay: {
    height: 400,
    width:500,
    borderRadius: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    left:90,
    bottom: 0,
    zIndex: -1,
  },
  quantityContainer: {
    backgroundColor: '#FF9F1C',
    borderRadius: 20,
    width:100,
    height:40,
    borderRadius: 16,
    width:'50%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  addToCartButton: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FF9F1C',
    borderRadius: 25,
    marginHorizontal:10,
    width:200,
    height: 50,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default ProductScreen;
