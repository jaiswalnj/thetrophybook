import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Touchable  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Loader from '../Components/Loader';
import { LinearGradient } from 'expo-linear-gradient';

const ProductScreen = ({ route}) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const [size, setSize] = useState(11);
  const sizes = [11, 12, 13, 14, 15];  
  const [count, setCount] = useState(0);

  // const { name, type, dimensions } = product; adding details to an item

  const handlePlusPress = () => {setCount(count + 1);};
  const nopress = () => {setCount(count+0);};
  const handleMinusPress = () => {if (count > 0) {setCount(count - 1);}};

  const handleAddToCart = () => {
    // Handle adding item to cart here
  };

  const base64String = base64.fromByteArray(product.image.image.data.data);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(`http://192.168.1.2:8005/product/${productId}`);
  //       const data = await response.json();

  //       if (response.ok) {
  //         setProduct(data.data);
  //         setBase64String(base64.fromByteArray(data.data.image.image.data.data));
  //       } else {
  //         console.error(data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [productId]);

  return (
    <View style={styles.container}>
      
      <View style={{
        paddingTop: 44,
        // paddingBottom: 10,
        paddingLeft: 15,
        elevation: 4,
        zIndex: 4,
        // position: 'relative',
        position: 'absolute'
      }}>
        <TouchableOpacity onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
        {/* <Icon name="add-outline" size={30} color='black' /> */}
        
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
          <View style={styles.productInfo}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.productTitle}>{product.trophyName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            <Text>{product.trophyType}</Text>
            <Text>{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            
            
            <Text style={{ color: 'black', fontSize: 25, marginRight: 1, marginTop: 10, marginBottom: 15 }}>Size:</Text>
            
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-around' ,
          width: '100%' 
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
                  shadowOpacity: 0.9,
                  shadowOffset: { width: 10, height: 10 },
                  shadowRadius: 5,
                  
                  
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
          // padding: 2,
          backgroundColor: '#FAFAFA',
          marginTop: 10,
          borderRadius: 16,
          height: 150,
        }}>
      <Text style={{fontSize: 24,fontWeight: 'bold',marginBottom: 10, color: '#000'}}>Product Details</Text>
      <Text style={styles.subtitle}>Product:{/*name*/}</Text>
      <Text style={styles.subtitle}>Type: {/*type*/}</Text>
      <Text style={styles.subtitle}>Dimensions: {/*dimensions*/}</Text>
      <View style={ {fontSize: 20,color: '#000F',textDecorationLine: 'underline',}} />
      
      <TouchableOpacity>
      <Text style={styles.moreDetails}>More Details</Text>
      </TouchableOpacity>
    </View>

    <View style={{
      // flex:1,
      // alignSelf: 'flex-end',
      position: 'relative',
      left:-1,
      marginLeft:-16,
      right:-1,
      backgroundColor:'#FFF',
      // top:,
      bottom:-70,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '109%',
      shadowColor: 'black',
      shadowOpacity: 1.2,
      shadowOffset: { width: 10, height: 10 },
      shadowRadius: 5,
     }}>
      
      
      {/* <TouchableOpacity onPress={nopress} > */}
    {/* Bottom bar */}
      <View

        style={{
          
          backgroundColor: '#FF9F1C',
          borderRadius: 16,
          padding:20,
          width:'50%',
          padding: 10,
          flexDirection: 'row',
          alignContent: 'space-around',
          alignItems: 'center',
          justifyContent: 'space-evenly',
           // height: 10,
          
        }}
      >
        <TouchableOpacity onPress={handleMinusPress}>
          <View
            style={{
              backgroundColor: '#FF9F1C',
              borderRadius: 1,
              padding: 1,
            }}
          >
            {/* <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>-</Text> */}
            <Icon name="remove-outline" size={25} color='white' />
          </View>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20 }}>{count}</Text>
        <TouchableOpacity onPress={handlePlusPress}>
          <View
            style={{
              backgroundColor: '#FF9F1C',
              borderRadius: 1,
              padding: 1,
            }}
          >
            {/* <Text style={{ color: 'white', fontSize: 30 }}>+</Text> */}
            <Icon name="add-outline" size={25} color='white' />
            
          </View>
        </TouchableOpacity>
      </View>
      {/* </TouchableOpacity> */}
      
    <TouchableOpacity onPress={handleAddToCart}>
      <View
        style={{
          backgroundColor: '#FF9F1C',
          borderRadius: 16,
          padding:20,

          width:'100%',
        }}>
      
          <Text style={{ color: 'white', fontSize: 20, alignContent: 'center' }}> Add to Cart</Text>
        
                  </View>
                </TouchableOpacity>
                
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
    // height: '100%',
    backgroundColor: '#FAFAFA',
  },
  productImage: {
    width: '200%',
    height: 250,
    marginVertical: 50,
    marginHorizontal: -90,
    resizeMode: 'center',
    zIndex:1,
  },
  productInfo: {
    padding: 16,
    
  },
  productTitle: {
    fontSize: 45,
    fontWeight: 'bold',
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
  },
  back: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  moreDetails: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  cardOverlay: {
    height: 400,
    width:500,
    borderRadius: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    left:110,
    bottom: 15,
    zIndex: -1,
  },
});

export default ProductScreen;
