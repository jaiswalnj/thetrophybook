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
    <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 10, marginBottom: 10}}>
    <View style={[styles.circle, active && styles.activecircle]}>
      <View style={[styles.container, active && styles.activeContainer]}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
      <Text style={[styles.titleIdle, active && styles.titleSelected, {textTransform: 'uppercase' }]}>{title}</Text>
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
    backgroundColor: '#f7c619',
    width: 72,
    height: 72,
    justifyContent: 'center',
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
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  titleIdle: {
    marginTop: 4,
    fontSize: 12,
  },
  titleSelected: {
    marginTop: 4,
    fontSize: 16,
    color: "#f7c619",
  },
});

export default CategoryCard;
