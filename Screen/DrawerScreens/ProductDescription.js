import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Loader from '../Components/Loader';

const ProductScreen = ({ route}) => {
  const navigation = useNavigation();
  const { product } = route.params;
  const [size, setSize] = useState(11);
  const sizes = [11, 12, 13, 14, 15];  
  const [count, setCount] = useState(0);


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
      <TouchableOpacity style={styles.back } onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
      </TouchableOpacity>
      {product ? (
        <>
        <View style={{width: '100%',height:300, alignItems: 'center'}}>
          <Image source={{ uri: `data:${product.image.image.contentType};base64,${base64String}` }} style={styles.productImage} />
          </View>
          <View style={styles.productInfo}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={styles.productTitle}>{product.trophyName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            <Text>{product.trophyType}</Text>
            <Text>{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            
            
            <Text style={{ color: 'black', fontSize: 30, marginRight: 10, marginTop: 10, marginBottom: 20 }}>Size:</Text>
            
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8, justifyContent: 'space-around' , width: '100%' }}>           

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flex:1, flexDirection: 'row', }}>
            {sizes.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: size === s ? '#FF9F1C' : '#FFFFFF',
                  paddingHorizontal: 25,
                  paddingVertical: 8,
                  borderRadius: 5,
                  marginRight: 10,
                  
                  
                }}
                onPress={() => setSize(s)}
              >
                <Text style={{ color: size === s ? '#FFFFFF' : '#000000', fontSize: 24 }}>{s}"</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

    <View style={{
      position: 'absolute',
      backgroundColor:'#FFFFFF',
      padding: 10,
      flexDirection: 'row',
      marginTop: 440,
      justifyContent: 'space-evenly',
      width: 500,
      height: 80,
     }}>
      
      {/* <TouchableOpacity onPress={nopress} > */}
    {/* Bottom bar */}
      <View

        style={{
          
          backgroundColor: '#FF9F1C',
          borderRadius: 16,
          padding:20,
          width:100,
          padding: 10,
          flexDirection: 'row',
          // // marginTop: 10,
          alignContent: 'flex-end',
          alignItems: 'center',
          justifyContent: 'space-between',
          // width: 100,
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
            <Text style={{ color: 'white', fontSize: 40, textAlign: 'justify' }}>-</Text>
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
            <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
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

          width:250,
        }}>
      
          <Text style={{ color: 'white', fontSize: 20 }}> Add to Cart</Text>
        
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
  },
  productPrice: {
    fontSize: 38,
    color: '#007bff',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  back: {
    paddingTop: 20,
  },
});

export default ProductScreen;
