import React,{useEffect,useState} from 'react';
import {View, Text, SafeAreaView, Button, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import CategoryCard from '../Components/CategoryCard';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [active, setActive] = useState(false);

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
      <View style={{flex: 1, padding: 16, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <View style={{paddingTop:10 ,flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 40,
              textAlign: 'left',
              marginBottom: 16,
            }}> Hello {userName}
          </Text>
          <Icon name='person-circle-outline' size={50} color='black'/>
          </View>
          <TouchableOpacity onPress={()=> active === true ? setActive(false) : setActive(true)}>
          <CategoryCard imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
          title={'Trophies'}
          active={active}
          />
          </TouchableOpacity>
          <Card imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
          title={'Trophy'}
          price={1500}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;