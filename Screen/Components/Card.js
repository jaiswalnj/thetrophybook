import React,{useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableOpacityComponent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as Font from 'expo-font'; 



const Card = ({ imageUrl, title, price, width}) => {
    const [like, setLike] = useState('heart-outline')
    onLikePress =() =>{
        if(like === 'heart-outline'){
            setLike('heart')
        }else{
            setLike('heart-outline')
        }
    }
    
    const BUTTON_SHRINK_FACTOR = .2;

    onAddPress= () =>{

    }
    return (
        <View style={styles.Container}>
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
    
          <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
            <Icon name={like} size={22} color="black" />
          </TouchableOpacity>
    
        </View>
        <TouchableOpacity style={styles.addButton} activeScale={onAddPress ? BUTTON_SHRINK_FACTOR : 2 } onPress={onAddPress} activeOpacity={0.88}>
            <Icon name="add-outline" size={42} color="black" />
            
          </TouchableOpacity>
          <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.title}>{title}</Text>
        </View>
      );
    };

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#FAFAFA',
        textAlign: 'right',
        width: 220,
        overflow: 'hidden',
        marginTop: 12,
        marginBottom: 15,
      },
  card: {
    backgroundColor: '#64ECC7',
    width: 180,
    height: 250,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: ''
  },
  image: {
    width: '200%',
    height: 180,
    marginVertical: 50,
    marginHorizontal: -90,
    resizeMode: 'center',
  },
  title: {
    fontSize: 18,
    //fontFamily: 'EuclidFlex',
    //fontWeight: 500,
    paddingTop: 4,
    paddingHorizontal: 16
  },
  price: {
    fontSize: 25,
    fontFamily: 'ArialRoundedMT',
    fontWeight: 'regular',
    letterSpacing: 0.2,
    color: 'black',
    paddingTop:20,
    paddingLeft: 16,
    paddingBottom: 2,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius:5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width:10, height:10},
    shadowRadius:5,
    height: 40,
    width: 40,
    bottom: 75,
    right: 30,
    elevation: 4,
    zIndex: 1,
  },
});

export default Card;
