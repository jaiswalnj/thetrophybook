import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import base64 from 'base64-js';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = ({ cartItem, onRemove }) => {
  const [quantity, setQuantity] = useState(cartItem.qty);
  const [customization1, setCustomization1] = useState();
  const [customization2, setCustomization2] = useState();
  const [customization3, setCustomization3] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const cardItem = useRef();

  const handlePlusPress = () => {setQuantity(quantity + 1);};
  const handleMinusPress = () => {if (quantity > 0) {setQuantity(quantity - 1);}};

  useEffect( () => {
    if (isEditing){
      cardItem.current.setNativeProps({ style: { height: 180, width:135} });
    }else{
      cardItem.current.setNativeProps({ style: { height: 80, width:70} });
    }
  },[isEditing])



  const handleSave = () => {
    setIsEditing(false);
    
  };

  const handleCustomize = () => {
    setIsEditing(true);
    // console.log(cardItem.current); checking the ref call
    
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <>
    
    <View  style={styles.cartItemContainer} >
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
            <View style={{padding:5, width: 190}}>
              
                <View style= {{flexDirection: 'row',backgroundColor: '#FFF', justifyContent: 'space-between'}}> 
                
                <Text style={{fontSize:22}} >{cartItem.trophy.trophyName}</Text>
                
                
                <Icon name="trash-outline" size={25} color='#000' />
                
              </View>
                  
      <View style= {{flexDirection: 'row', height:50, width: '100%', alignItems:'center', marginTop: 2, justifyContent: 'space-between' }}>
          <View   style={styles.buttonbg}>

                <View style= {{flexDirection: 'row', }}>
                    <TouchableOpacity onPress={handleMinusPress}>
                      <View style={{ backgroundColor: '#FF9F1C',borderRadius: 1,padding: 1, justifyContent: 'center'}}>
                      <Icon name="remove-outline" size={18} color='white' />
                      </View>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 16, marginLeft: 8, marginRight: 8}}>{quantity}</Text>
                    <TouchableOpacity onPress={handlePlusPress}>
                      <View style={{backgroundColor: '#FF9F1C',borderRadius: 1,padding: 1,}}>
                      <Icon name="add-outline" size={18} color='white' />
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

            </View>



            <View style={{ flex:1, backgroundColor: '#FFF'}}>
              <TextInput
                style={styles.input}
                placeholder="Customization 2"
                value={customization2}
                onChangeText={(text) => setCustomization2(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Customization 3"
                value={customization3}
                onChangeText={(text) => setCustomization3(text)}
              />
              <View style={{width: '100%' ,height: 40, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TextInput
                style={styles.note}
                // style={`${styles.input} ${styles.note}`}
                placeholder="Add Note"
                value={customization3}
                onChangeText={(text) => setCustomization3(text)}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={{fontSize:14}}>Save</Text>
              </TouchableOpacity>
              </View>
              </View>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
            <View style={{padding:20}}>
            <Text style={styles.title}>{ cartItem.trophy.price}</Text>
            <Text style={styles.title}>{cartItem.trophy.trophyName}</Text>
            </View>
            <View style={styles.quantityContainer}>
              
            <View style={{flexDirection:'row', alignContent: 'space-between', }}>
              <TouchableOpacity onPress={() => handleCustomize()} style={{padding: 10}}>
              <Icon name='create-outline' size={20} color='black'/>
              </TouchableOpacity>
              
              
              <TouchableOpacity onPress={() => onRemove(cartItem.id)} style={{padding: 10}}>
              <Icon name='trash-bin-outline' size={20} color='black'/>
              </TouchableOpacity>
              </View>
                  <Text >Quantity: {cartItem.qty}</Text>

                  {/* the counter for item quantity */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    paddingHorizontal: 10,
    paddingBottom: 20 , 
    paddingVertical:5,
    backgroundColor: '#FAFAFA',
  },
  quantityContainer:{
    flex:2,
    backgroundColor: '#FF9F1C',
    borderRadius: 16,
    // padding:20,
    width:100,
    padding: 10,
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  
  card: {
    width: '100%',
    height: '100%',
    
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    // alignSelf: ''
  },
  detailsContainer: {
    flexDirection: 'row',
    

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonbg:{
      backgroundColor: '#FF9F1C',
      borderRadius: 16,
      width:'48%',
      flexDirection: 'row',
      // marginRight: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      // alignContent: 'space-around',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      
      height: 30,
    
  },
  year:{
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    width: '48%',
    textAlign: 'center',
    // marginBottom: 10,
    // marginTop: 10,
    // margin: '0 auto',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  saveButton: {
    // flex:1,
    backgroundColor: '#FFCD1C',
    height:35,
    width:'46%',
    // padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // alignSelf: 'flex-end',
    borderRadius: 10,
    marginTop: -9,
  },
  cardContainer: {
    height: 80,
    width: 70,
    marginRight:10
    // marginLeft: 10,
  },
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  note: {
    height: 30,
    borderColor: 'gray',
    borderStyle: 'dashed',
    padding: 5,
    
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,

  },
});

export default CartItem;
