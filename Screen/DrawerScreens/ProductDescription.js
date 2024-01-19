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
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal:10}}>
                <Text style={styles.productTitle}>{product.trophyName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            <Text style={{paddingHorizontal:10,}}>{product.trophyType}</Text>
            <Text style={{paddingHorizontal:10,}}>{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            
            
            <Text style={{ color: 'black', fontSize: 25, marginLeft: 10, marginTop: 10, marginBottom: 15 }}>Size:</Text>
            
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
        <Text style={styles.subtitle1}>Dimensions</Text>
        </View>
        <View style={{paddingHorizontal:10}}>
        <Text style={styles.subtitle2}>{product.category}</Text>
        <Text style={styles.subtitle2}>{product.trophyType}</Text>
        <Text style={styles.subtitle2}>4*4</Text>
        </View>
      </View>
      <View style={ {fontSize: 20,color: '#000F',textDecorationLine: 'underline', marginLeft:10}} />
        <TouchableOpacity>
        <Text style={styles.moreDetails}>More Details</Text>
        </TouchableOpacity>
      </View>

    <View style={{
      backgroundColor:'#FFFFFF',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding:5,
      alignItems:'center',
      width: '100%',
      height: 60,
      position: 'absolute',
      bottom: 0,
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 5,
     }}>
      
      <View
        style={{
          backgroundColor: '#FF9F1C',
          borderRadius: 20,
          width:100,
          height:40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <TouchableOpacity onPress={handleMinusPress}>
          <View
            style={{
              borderRadius: 1,
              padding: 4,
            }}>
            <Icon name="remove-outline" size={25} color='white' />
          </View>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20 }}>{count}</Text>
        <TouchableOpacity onPress={handlePlusPress}>
          <View
            style={{
              borderRadius: 1,
              padding: 4,
            }}
          >
            <Icon name="add-outline" size={25} color='white' />
            
          </View>
        </TouchableOpacity>
      </View>
      
          <TouchableOpacity onPress={handleAddToCart}>
            <View
              style={{
                flex:1,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: '#FF9F1C',
                borderRadius: 25,
                marginHorizontal:10,
                width:200,
                height: 50,
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    height: '100%',
    width: '100%',
  },
  productImage: {
    width: '200%',
    height: 250,
    marginVertical: 50,
    marginHorizontal: -90,
    resizeMode: 'center',
    zIndex:1,
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
    left:110,
    bottom: 15,
    zIndex: -1,
  },
});

export default ProductScreen;
