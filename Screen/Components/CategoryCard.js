import React,{useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CategoryCard = ({title, active }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    let imagePath;

    if (title === 'Trophies') {
      imagePath = require('../../Image/Category/trophies.png');
    } else if (title === 'Medals') {
      imagePath = require('../../Image/Category/medals.png');
    } else if (title === 'Badges') {
      imagePath = require('../../Image/Category/badges.png');
    } else if (title === 'Cups') {
      imagePath = require('../../Image/Category/cups.png');
    } else if (title === 'Momentos') {
      imagePath = require('../../Image/Category/momentos.png');
    } else if (title === 'More') {
      imagePath = require('../../Image/Category/more.png');
    }
    setImage(imagePath);
  }, [title]);

  
  return (
    <View style={{alignItems: 'center', marginHorizontal:10}}>
    <View style={[styles.circle, active && styles.activecircle]}>
      <View style={[styles.container, active && styles.activeContainer]}>
      <Image source={image} style={styles.image} />
      </View>
    </View>
    <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  activeContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#FFCD1C',
    width: 60,
    height: 60,

  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 1,
  },
  activecircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  titleIdle: {
    marginTop: 4,
    fontSize: 8,
  },
  titleSelected: {
    marginTop: 4,
    fontSize: 10,
  },
});

export default CategoryCard;
