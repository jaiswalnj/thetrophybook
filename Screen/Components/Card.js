import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import apiConfig from '../../apiConfig';
import StarRating from 'react-native-star-rating';
const { width, height } = Dimensions.get('window');

const Card = ({ imageUrl, title, price, productId, userId, useCustomColor, liked, onPress, rating}) => {
  const BUTTON_SHRINK_FACTOR = 0.2;

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
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message === 'Item added to the cart') {
            Alert.alert('Success', 'Item added to the cart successfully');
          } else {
            Alert.alert('Error', data.message || 'Failed to add item to the cart');
          }
        });
    } catch (error) {
      console.error('Error adding item to the cart:', error.message);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const gradientColors = useCustomColor
    ? ['#64ECC7', '#87FFDE', '#64ECC7', '#39FFC9']
    : ['#FFC473', '#FFC473', '#FFC473', '#FFC473'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.455, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <TouchableOpacity style={styles.likeButton} onPress={() => onPress(productId, userId)}>
          <Icon name={liked ? 'heart' : 'heart-outline'} size={24} color='#FF2E2E' />
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity
        style={styles.addButton}
        activeScale={handleAddToCart ? BUTTON_SHRINK_FACTOR : 2}
        onPress={handleAddToCart}
        activeOpacity={0.88}
      >
        <Icon name="add-outline" size={29} color="black" style={{ padding:-1}} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={styles.price}>₹{price}</Text>
      <View style={{marginTop: 20, marginRight:35}}>
      <StarRating disabled={false} maxStars={5} rating={rating} fullStarColor="#FF9F1C" starSize= {14}/>
      </View>
      </View>
      <Text style={styles.subtitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: width * 0.50,
    height: height * 0.40,
  },
  gradientCard: {
    width: width * 0.42,
    height: height * 0.28,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#64ECC7',
    shadowOpacity: 0.3,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 2,
    marginHorizontal:width * 0.02,
    },
  image: {
    width: '200%',
    height: '70%',
    marginVertical: height * 0.055,
    marginHorizontal: width * -0.22,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.05,
    paddingTop: 2,
    paddingHorizontal: 16,
    color: 'black',
    fontFamily: 'EuclidFlexMedium',
  },
  subtitle: {
    fontSize: width * 0.045,
    paddingTop: 2,
    paddingHorizontal: 16,
    color: 'black',
    fontFamily: 'EuclidFlexRegular',
  },
  price: {
    fontSize: width * 0.06,
    fontWeight: 'regular',
    fontFamily: 'ArialRounded',
    marginTop: 10,
    letterSpacing: 0.2,
    color: 'black',
    paddingLeft: 16,
  },
  likeButton: {
    position: 'absolute',
    top: width * 0.03,
    right: width * 0.03,
    zIndex: 1,
  },
  addButton: {
    position: 'absolute',
    padding: -1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 2,
    height: '9%',
    width: width * 0.07,
    left: width * 0.39,
    top: height * 0.255,
    elevation: 2,
    zIndex: 1,
  },
});

export default Card;
