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
  

  const [isScrollable, setIsScrollable] = useState(false);
  const toggleScroll = () => {setIsScrollable(!isScrollable);};

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


  useEffect(() => {
    const fetchProducts = async (category) => {
      try {
        setLoading(true);
        setProducts([])
        const response = await fetch(`http://192.168.1.2:8005/getProducts?category=${category}`);
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
    <SafeAreaView style={{flex: 1, marginBottom:30}}>
      <Loader loading={loading} />
      <View style={{flex: 1, padding: 16, backgroundColor: '#FAFAFA'}}>
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
                    onPress={() => navigation.navigate('ProductDescription', { product })}
                  >
                    <Card
                      imageUrl={`data:${product.image.image.contentType};base64,${base64.fromByteArray(product.image.image.data.data)}`}
                      title={product.title}
                      price={product.price}
                      productId={product._id}
                      userId={userId}
                      useCustomColor={index % 2 === 0}
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