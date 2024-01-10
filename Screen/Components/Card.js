import React,{useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Card = ({ imageUrl, title, price, width}) => {
    const [like, setLike] = useState('heart-outline')
    onLikePress =() =>{
        if(like === 'heart-outline'){
            setLike('heart')
        }else{
            setLike('heart-outline')
        }
    }
    onAddPress= () =>{

    }
    return (
        <View style={styles.Container}>
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
    
          <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
            <Icon name={like} size={24} color="black" />
          </TouchableOpacity>
    
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <Icon name="add-outline" size={48} color="black" />
          </TouchableOpacity>
          <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.title}>{title}</Text>
        </View>
      );
    };

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        textAlign: 'right',
        width: 220,
        overflow: 'hidden',
      },
  card: {
    backgroundColor: '#64ECC7',
    width: 200,
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: ''
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 40,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#555',
    paddingTop:20,
    paddingLeft: 16,
    paddingBottom: 10,
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
    shadowOpacity: 0.50,
    height: 40,
    width: 40,
    bottom: 95,
    right: 15,
    zIndex: 1,
  },
});

export default Card;
