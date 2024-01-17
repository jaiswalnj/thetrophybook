import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';

const ProductScreen = ({ route}) => {
  const navigation = useNavigation();
  const { product } = route.params;
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
      <TouchableOpacity style={styles.back} onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
      </TouchableOpacity>
      {product ? (
        <>
        <View style={{width: '100%',height:300, alignItems: 'center'}}>
          <Image source={{ uri: `data:${product.image.image.contentType};base64,${base64String}` }} style={styles.productImage} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.trophyName}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Text>{product.trophyType}</Text>
            <Text>{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
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
