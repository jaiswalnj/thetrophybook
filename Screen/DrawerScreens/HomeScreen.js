import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Card from '../Components/Card';
import CategoryCard from '../Components/CategoryCard';
import base64 from 'base64-js';
import Loader from '../Components/Loader';
import apiConfig from '../../apiConfig';
import CategoryOverlay from './CategoryOverlay';
const { width, height } = Dimensions.get('window');

 
const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(2);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Trophies');
  const [loading, setLoading] = useState(false);
  const [trophySections, setTrophySections] = useState([]);
  const filteredTrophyTypes = trophySections.map((section) => section.trophyType);
  const scrollViewRef = useRef(null);


  const categories = [
    { title: 'Medals' },
    { title: 'Momentos' },
    { title: 'Trophies' },
    { title: 'Badges' },
    { title: 'Cups' },
    { title: 'More' },
  ];

  const handlePress = (index, category) => {
    setActiveIndex(index);
    setCategory(category);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.likedItems) {
        setLikedItems(user.likedItems);
        setUserName(user.username);
        setUserId(user._id);
      }
    }, [user])
  );

  const handleLikePress = async (productId, userId) => {
    try {
      const isLiked = likedItems.some((item) => item._id === productId);

      if (isLiked) {
        const response = await fetch(`${apiConfig.baseURL}/removeFromLikedItems/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLikedItems((prevLikedItems) => prevLikedItems.filter((item) => item._id !== productId));
        } else {
          console.error(data.message);
        }
      } else {
        const response = await fetch(`${apiConfig.baseURL}/addToLikedItems/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLikedItems((prevLikedItems) => [...prevLikedItems, data.data]);
        } else {
          console.error(data.message);
        }
      }
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async (category) => {
      try {
        setLoading(true);
        setProducts([]);
        const response = await fetch(`${apiConfig.baseURL}/getProducts?category=${category}`);
        const data = await response.json();

        if (response.ok) {
          setProducts([...data]);
          console.log(products);
          setLoading(false);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProducts(category);
  }, [category]);

  useEffect(() => {
    const organizeTrophiesIntoSections = () => {
      const sections = {};
      products.forEach((product) => {
        const trophyType = product.trophyType;
        if (!sections[trophyType]) {
          sections[trophyType] = [];
        }
        sections[trophyType].push(product);
      });

      const sectionsArray = Object.entries(sections).map(([trophyType, trophies]) => ({
        trophyType,
        trophies,
      }));

      setTrophySections(sectionsArray);
    };
    organizeTrophiesIntoSections();
  }, [products]);

  const scrollToTrophySection = (trophyType) => {
    const index = trophySections.findIndex((section) => section.trophyType === trophyType);
    if (scrollViewRef.current && index !== -1) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        y: 0,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: height * 0.07 }}>
      <Loader loading={loading} />
      <View style={{ flex: 1, padding: width * 0.04, backgroundColor: '#FAFAFA' }}>
        <View style={{ paddingTop: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', marginTop: height * 0.01, marginBottom: height * 0.02 }}>
          <Text
            style={{
              fontSize: width * 0.1,
              textAlign: 'left',
              marginLeft: width * 0.01,
            }}
          >
            Hello {userName}
          </Text>

          <View style={[styles.profileImage, { backgroundColor: '#b23838' }]}>
            <Text style={{ color: "black", fontSize: width * 0.1, alignSelf: 'center' }}>
              {userName ? userName.charAt(0) : "?"}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1, flexDirection: 'row', maxHeight: height * 0.125 }}
        >
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity onPress={() => handlePress(index, category.title)} key={index}>
                <CategoryCard
                  title={category.title}
                  active={activeIndex === index}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{position:'absolute',top : height*0.87,right: 10, zIndex: 2 }}>
        <CategoryOverlay trophyTypes={filteredTrophyTypes} onSelectCategory={scrollToTrophySection}/>
        </View>
        <ScrollView
          vertical
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, maxHeight: height * 0.85 }}
        >

          {trophySections.map((section) => (
            <View key={section.trophyType} >
              <Text style={{ fontSize: width * 0.05, textAlign: 'left', fontFamily: 'EuclidFlexRegular',height: height * 0.04}}>{section.trophyType}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {section.trophies.map((product, index) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProductDescription', { product, user })}
                    key={index}
                  >
                    <Card
                      imageUrl={`data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}`}
                      title={product.trophyName}
                      price={product.price}
                      productId={product._id}
                      userId={userId}
                      useCustomColor={index % 2 === 0}
                      liked={likedItems.some((item) => item._id === product._id)}
                      onPress={(productId, userId) => handleLikePress(productId, userId)}
                      rating={product.customer_feedback.ratings.average}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.07,
  },
  profileImage: {
    width: width * 0.15,
    aspectRatio: 1,
    borderRadius: width * 0.075,
    marginRight: width * 0.02,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
});

export default HomeScreen;
