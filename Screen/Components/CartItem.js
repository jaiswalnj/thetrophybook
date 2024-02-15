import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import base64 from 'base64-js';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import apiConfig from '../../apiConfig';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window');


const CartItem = ({userId, cartItem, onRemove,onCust }) => {
  const [quantity, setQuantity] = useState(cartItem.qty);
  const [customization1, setCustomization1] = useState(cartItem.year);
  const [customization2, setCustomization2] = useState(cartItem.text_on_trophy);
  const [customization3, setCustomization3] = useState(cartItem.occasion);
  const [customization4, setCustomization4] = useState(cartItem.additional_detail);
  const [isEditing, setIsEditing] = useState(false);
  const cardItem = useRef();
  const flexD = useRef();

  const handleMinusPress = async() => {
    const productId=cartItem.trophy._id;
    if (quantity > 0) {
      setQuantity(quantity - 1);
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
      })
      .catch(error => {
        console.error('Error calling API:', error);
      });
    }
  };
  

const handlePlusPress = async () => {
  const productId=cartItem.trophy._id;
  try {
    setQuantity(quantity + 1);
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
    } else {
      Alert.alert('Error', data.message || 'Failed to add item to the cart');
    }
  })
  } catch (error) {
    console.error('Error adding item to the cart:', error.message);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};

  useEffect( () => {
    if (isEditing){
      cardItem.current.setNativeProps({ style: { height: height * 0.26, width:width * 0.38} });
      flexD.current.setNativeProps({style: { flexDirection: 'column'}});
    }else{
      cardItem.current.setNativeProps({ style: { height: height* 0.15 , width: width * 0.23} });
      flexD.current.setNativeProps({style: { flexDirection: 'row'}});
    }
  },[isEditing])



  const handleSave = async () => {
    try {
      setIsEditing(false);
      const response = await fetch(`${apiConfig.baseURL}/cart-item-edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          cartItemId: cartItem._id,
          year: customization1,
          text_on_trophy: customization2,
          occasion: customization3,
          additional_detail: customization4,
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
  };

  const handleCustomize = () => {
    onCust();
    setIsEditing(true);
  };

  return (
    <>
    
    <View ref={flexD} style={styles.cartItemContainer} >

      <View ref={cardItem} style={styles.cardContainer}>
        <LinearGradient 
      colors={['#64ECC7', '#87FFDE', '#64ECC7', '#39FFC9']}
      start={{ x: 0.455, y: 0 }}
      end={{ x:1, y: 1 }}
      style={styles.card}>
      <Image  source={{ uri: `data:${cartItem.trophy.image.image.contentType};base64,${base64.fromByteArray(cartItem.trophy.image.image.data.data)}` }}  style={styles.image}/>
      </LinearGradient>
      </View>


      <View style={styles.detailsContainer}>
        { isEditing ? (

            <View style={{padding: height * 0.001, width: width * 0.6}}>              
                <View style= {{flex: 1, flexDirection: 'row', width: width * 1,  alignItems: 'center'}}>                 
                    <Text style={{fontSize:height * 0.03, marginTop:height * 0.001, marginLeft: width * 0.33}} >{cartItem.trophy.trophyName}</Text>
                </View>
                 
      <View style= {{flexDirection: 'row', height:height * 0.048, width: width  * 0.94, alignItems:'center', marginTop: height * 0.001, backgroundColor: '#FFF' }}>
                
          <View   style={styles.buttonbg}>
                <View style= {{flexDirection: 'row', }}>
                    <TouchableOpacity onPress={handleMinusPress}>
                      <View style={{ backgroundColor: '#FF9F1C',borderRadius: 1,padding: 1, justifyContent: 'center'}}>
                      <Icon name="remove-outline" size={height * 0.03} color='white' />
                      </View>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: height * 0.022, marginLeft: 8, marginRight: 8}}>{quantity}</Text>
                    <TouchableOpacity onPress={handlePlusPress}>
                      <View style={{backgroundColor: '#FF9F1C',borderRadius: height * 0.01,padding: 1,}}>
                      <Icon name="add-outline" size={height * 0.03} color='white' />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              <TextInput 
              style={styles.year}
                placeholder="Year"
                value={customization1}
                onChangeText={(text) => setCustomization1(text)}
              />
              
                <TouchableOpacity onPress={() => onRemove(cartItem.id)} style={{}}>
                  <Icon name='trash-outline' size={height * 0.038} style={{marginHorizontal: width * 0.02}} color='black'/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => onRemove(cartItem.id)} style={{backgroundColor: "gray", borderRadius: 10, width: width * 0.074, height: height * 0.041 }}>
                  <Icon name='add-outline' size={height * 0.038} style={{padding: 1}} color='white'/>
                </TouchableOpacity>

            </View>



            <View style={{ flex:1, backgroundColor: '#FFF', width: width * 0.93, }}>
              <TextInput
                style={styles.input}
                placeholder="Text on trophy"
                value={customization2}
                onChangeText={(text) => setCustomization2(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Occasion"
                value={customization3}
                onChangeText={(text) => setCustomization3(text)}
              />
              <View style={{width: width * 0.93 ,height: height * 0.06, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TextInput
                style={styles.note}
                placeholder="Add Note"
                value={customization4}
                onChangeText={(text) => setCustomization4(text)}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={{fontSize:14}}>Save</Text>
              </TouchableOpacity>
              </View>
              </View>
            </View>


          ) : (


            <View style={{flexDirection: 'row', width: width * 0.9}}>
                  
                  <View style={{padding:height * 0.008}}>
                    <Text style={styles.title}>₹{ cartItem.trophy.price}</Text>
                    <View style={{width: width * 0.22}}>
                    <StarRating
                          disabled={false}
                          maxStars={5}
                          rating={cartItem.trophy.customer_feedback.ratings.average}
                          fullStarColor="#FF9F1C"
                          starSize= {height * 0.018}
                        />
                      </View>

                    <Text style={styles.title2} >{cartItem.trophy.trophyName}</Text>
                    {/* <Text style={styles.title3}>Size:{cartItem.size}</Text> */}
                  </View>



                <View style={styles.quantityContainer}>
                  
                        <View style={{flexDirection:'row', alignContent: 'space-between', }}>
                            <TouchableOpacity onPress={() => handleCustomize()} style={{padding: width * 0.025}}>
                            <Icon name='create-outline' size={height * 0.034} color='black'/>
                            </TouchableOpacity>
                            
                            
                            <TouchableOpacity onPress={() => onRemove(cartItem.id)} style={{padding: width * 0.025}}>
                            <Icon name='trash-outline' size={height * 0.034} color='black'/>
                            </TouchableOpacity>
                        </View>
                        
                        <View   style={styles.buttonbg}>
                          <View style= {{flexDirection: 'row', }}>
                              <TouchableOpacity onPress={handleMinusPress}>
                                <View style={{ backgroundColor: '#FF9F1C',borderRadius: 1,padding: 1, justifyContent: 'center'}}>
                                <Icon name="remove-outline" size={height * 0.026} color='white' />
                                </View>
                              </TouchableOpacity>
                              <Text style={{ color: 'white', fontSize: height * 0.022, marginHorizontal: width * 0.015}}>{quantity}</Text>
                              <TouchableOpacity onPress={handlePlusPress}>
                                <View style={{backgroundColor: '#FF9F1C',borderRadius: 1,padding: 1,}}>
                                <Icon name="add-outline" size={height * 0.026} color='white' />
                                </View>
                              </TouchableOpacity>
                            </View>
                        </View>
                </View>
         </View>
          )
        }
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 1,
    backgroundColor: '#FAFAFA',
    marginVertical: height*0.001,
  },
  quantityContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.18,
    width: width * 0.02,
    height: height * 0.175,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.98 ,
    marginTop: height * 0.01,
    height: 'auto',
    paddingHorizontal: height * 0.01
  },
  cardContainer: {
    backgroundColor: '#FFF',
    height: height * 0.26,
    width:width * 0.38,
    marginHorizontal: width * 0.02,
    marginTop: height * 0.01,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  star: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    letterSpacing: width * 0.0035,
    fontFamily: 'ArialRounded',
    // not in use 
    marginTop: height * 0.01,
    marginBottom: height * 0.006,
  },
  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    letterSpacing: width * 0.0035,
    fontFamily: 'ArialRounded',
    marginTop: height * 0.01,
    marginBottom: height * 0.006,
  },
  title2: {
    fontSize: height * 0.028,
    fontFamily: 'EuclidFlexMedium',
    marginTop: height * 0.008,
    marginBottom: height * -0.025,
  },
  // title3: {
  //   fontSize: height * 0.019,
  //   // marginVertical: height * 0.001,
  // },
  buttonbg:{
      backgroundColor: '#FF9F1C',
      borderRadius: height * 0.02,
      marginVertical: height * 0.035,
      width: width * 0.3,
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      height: height * 0.038,
  },
  year:{
    height: height * 0.037,
    borderColor: 'gray',
    borderWidth: 1,
    width: width * 0.4,
    textAlign: 'center',
    marginHorizontal: width * 0.01,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input: {
    height: height * 0.04,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: height * 0.005,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#FFCD1C',
    height: height * 0.045,
    width:width * 0.45,
    // padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: height * 0.01,
    marginTop: -9,
  },
  note: {
    height: height * 0.042,
    borderColor: 'gray',
    borderStyle: 'dashed',
    borderWidth: width * 0.005,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: width * 0.01,
    width: width * 0.45,
  },
});

export default CartItem;
