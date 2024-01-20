import React,{useEffect,useState} from 'react';
import {View, Text, SafeAreaView, Button, Alert, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../Components/Card';
import CategoryCard from '../Components/CategoryCard';
import Icon from 'react-native-vector-icons/Ionicons';
import base64 from 'base64-js';
import Loader from '../Components/Loader';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();
  const [likedItems, setLikedItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(2);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Trophies');
  const [loading, setLoading] = useState(false);
  const [trophySections, setTrophySections] = useState([]);

  const categories = [
    { title: 'Medals'},
    { title: 'Momentos'},
    { title: 'Trophies'},
    { title: 'Badges'},
    { title: 'Cups'},
    { title: 'More'},
  ];


  const handlePress = (index, category) => {
    setActiveIndex(index);
    setCategory(category);
  };

  const handleLikePress = async (productId, userId) => {
    try {
      const isLiked = likedItems.some((item) => item._id === productId);
  
      if (isLiked) {
        const response = await fetch(`http://192.168.1.4:8005/removeFromLikedItems/${productId}`, {
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
        const response = await fetch(`http://192.168.1.4:8005/addToLikedItems/${productId}`, {
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

  useEffect(()=>{
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '');
        const storedUserName = await AsyncStorage.getItem('username');
        setUserName(storedUserName || '');
      } catch (error) {
        console.error('Error fetching user Id:', error);
      }
    };
    fetchUserData();
  },[userId]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const data = await fetch(`http://192.168.1.4:8005/user/${userId}`)
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson) {
                setUser(responseJson.data);
                setLikedItems(responseJson.data.likedItems);
                console.log(likedItems);
              } else {
                console.error(responseJson.message);
              }
            });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, [userId])
  );


  useEffect(() => {
    const fetchProducts = async (category) => {
      try {
        setLoading(true);
        setProducts([])
        const response = await fetch(`http://192.168.29.25:8005/getProducts?category=${category}`);
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



  return (
    <SafeAreaView style={{flex: 1, marginBottom:35}}>
      <Loader loading={loading} />
      <View style={{flex: 1, padding: 12, backgroundColor: '#FAFAFA'}}>
        <View style={{paddingTop:5 ,flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 40,
              textAlign: 'left',
              marginLeft: 5,
              marginTop: 35,
              marginBottom: 20,
            }}> Hello {userName}
          </Text>
          
          <View style={[styles.profileImage, { backgroundColor: '#808080'}]}>
            <Text style={{ color: "#ffffff", fontSize:40, alignSelf: 'center'}}>
                  {userName ? userName.charAt(0) : "?"}
              </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

          <ScrollView vertical showsVerticalScrollIndicator={false}>

          {trophySections.map((section) => (
            <View key={section.trophyType}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{ fontSize: 22, textAlign: 'left',}}>{section.trophyType}</Text>
              <TouchableOpacity style={{flexDirection:'row', alignItems: 'center'}}>
                <Text style={{fontSize:20, textAlign: 'right', color:'#FFCD1C'}}>More</Text>
                <Icon name='chevron-forward-outline' size={22} color='#FFCD1C'  />
              </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {section.trophies.map((product, index) => (
                  <TouchableOpacity
                    key={product.productId}
                    onPress={() => navigation.navigate('ProductDescription', { product,userId })}
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
    marginTop:10,
    marginBottom: 45,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop:40,
    marginRight:10,
    borderColor:'black',
    borderWidth:1,
  },
  container: {
    // ...
  },
  cardContainer: {
    flexDirection: 'row',
    // ...
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    
  },
  titleText: {
    // ...
  },
  moreText: {
    color: "#FFCD1C"
  },
  gradientCard: {

  },
  
});

export default HomeScreen;