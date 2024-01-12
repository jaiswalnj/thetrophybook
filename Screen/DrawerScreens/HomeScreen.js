import React,{useEffect,useState} from 'react';
import {View, Text, SafeAreaView, Button, Alert, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import CategoryCard from '../Components/CategoryCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePress = (index) => {setActiveIndex(index);} 

  const [isScrollable, setIsScrollable] = useState(false);
  const toggleScroll = () => {setIsScrollable(!isScrollable);};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '');
        const storedUserEmail = await AsyncStorage.getItem('email');
        setUserEmail(storedUserEmail || '');
        const storedUserName = await AsyncStorage.getItem('username');
        setUserName(storedUserName || '');
      } catch (error) {
        console.error('Error fetching user Id:', error);
      }
    };

    fetchUserData();
  }, []); 



  return (
    <SafeAreaView style={{flex: 1}}>
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


        <View style={{flexDirection:'row', justifyContent: 'space-around', marginBottom: 30}}>
          
          <TouchableOpacity onPress={()=> handlePress(0)} key={0} >
          <CategoryCard imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
          title={'Trophies'}
          active={activeIndex === 0}
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> handlePress(1)} key={1}>
          <CategoryCard imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
          title={'Medals'}
          active={activeIndex === 1}
          /> 
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> handlePress(2)} key={2}>
          
          <CategoryCard imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
          title={'Momentos'}
          active={activeIndex === 2}
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress(3)} key={3}>
          <CategoryCard imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'} 
          title={'Badges'} 
          active={activeIndex === 3}
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress(4)} key={4}>
          <CategoryCard imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'} 
          title={'More'} 
          active={activeIndex === 4}
          />
          </TouchableOpacity>
          
        
            
        </View>

        {/* {<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 22,
              
              textAlign: 'left',
              
            }}> All Trophies {userName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#FFCD1C",
              textAlign: 'justify',
              marginTop: 4,
            }}> MORE{userName}
            <Icon name="chevron-forward-outline" size={14} color='#FFCD1C' />
          </Text>
          
        </View>} */}
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
        scrollEnabled={isScrollable} // Enable/disable scrolling based on state
        >
          <LinearGradient
      colors={['#64ECC7', '#87FFDE', '#64ECC7', '#39FFC9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientCard}
           >

          <View style={styles.cardContainer}>

          

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
          
          <Card  
            imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
            title={'Trophy'}
            price={1500}
            width={200}/>

        
        
        </View>
        </LinearGradient>
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
  // Define your styles here, e.g.,
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
  
  // ... other styles
});

export default HomeScreen;