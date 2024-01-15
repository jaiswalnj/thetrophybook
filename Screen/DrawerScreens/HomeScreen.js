import React,{useEffect,useState} from 'react';
import {View, Text, SafeAreaView, Button, Alert, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import CategoryCard from '../Components/CategoryCard';
import Icon from 'react-native-vector-icons/Ionicons';
import base64 from 'base64-js';
import Loader from '../Components/Loader';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Momentoes');
  const [loading, setLoading] = useState(false);


  const handlePress = (index, category) => {
    setActiveIndex(index);
    setCategory(category);
  };
  

  const [isScrollable, setIsScrollable] = useState(false);
  const toggleScroll = () => {setIsScrollable(!isScrollable);};


  useEffect(() => {
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
    const fetchProducts = async (category) => {
      try {
        console.log(category);
        const response = await fetch(`http://192.168.1.2:8005/getProducts?category=${category}`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
          console.log(products);
          setLoading(false);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchUserData();
    fetchProducts(category);
  }, [category]);



  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
      <View style={{flex: 1, padding: 16, backgroundColor: '#FAFAFA'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}></View>
          


        <View style={{paddingTop:10 ,flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 40,
              textAlign: 'left',
              marginLeft: 15,
              marginTop: 40,
              marginBottom: 20,
            }}> Hello {userName}
          </Text>
          
          <Icon name='person-circle-outline' size={60} color='black' marginTop ={40} marginBottom ={20} />
        </View>


        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => handlePress(0, 'Trophies')} key={0}>
          <CategoryCard
              title={'Trophies'}
              active={activeIndex === 0}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1, 'Medals')} key={1}>
          <CategoryCard
              title={'Medals'}
              active={activeIndex === 1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(2, 'Momentoes')} key={2}>
          <CategoryCard
              title={'Momentoes'}
              active={activeIndex === 2}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(3, 'Badges')} key={3}>
          <CategoryCard
              title={'Badges'}
              active={activeIndex === 3}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(4, 'More')} key={4}>
          <CategoryCard
              title={'More'}
              active={activeIndex === 4}
            />
          </TouchableOpacity>
          </View>

      <ScrollView
      vertical
      showsVerticalScrollIndicator={false}>


        <View style={styles.container}>
          <View style={styles.header} >
            <Text style={styles.titleText}>All Trophies {userName}</Text>
            <TouchableOpacity onPress={toggleScroll} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.moreText}>MORE{userName}</Text>
              <Icon name="chevron-forward-outline" size={14} color="#FFCD1C" />
            </TouchableOpacity>
        </View>

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={isScrollable} 
        >

        <View style={styles.productContainer}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.productId}
                onPress={() => navigation.navigate('ProductDescription', {product})}
              >
                <Card
                  imageUrl={`data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}`}
                  title={product.title}
                  price={product.price}
                  width={200}
                />
              </TouchableOpacity>
            ))}
          </View>


        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'left',
              
            }}> Metal Trophies {userName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'justify',
              color: "#FFCD1C",
              marginTop: 4,
            }}> MORE{userName}
            <Icon name="chevron-forward-outline" size={14} color='#FFCD1C' />
          </Text>
          
        </View>
          <Card 
            imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
            title={'Trophy'}
            price={1500}
            width={200}/>
          <Card 
            imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
            title={'Trophy'}
            price={1500}
            width={200}/>

      
          

        </View>
        </ScrollView>
        
      </View>
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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