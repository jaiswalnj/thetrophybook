import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';

const Favourite = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '');
        const response = await fetch(`http://192.168.1.2:8005/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data.data);
          console.log(user);
          setLikedItems(data.data.likedItems);
          console.log(likedItems);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: '#FAFAFA' }}>
      <FlatList
        data={likedItems}
        keyExtractor={(item) => item.itemId}
        renderItem={({ item }) => (
          <Card
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price} 
            width={180}
          />
        )}
      />
    </View>
  );
};

export default Favourite;
