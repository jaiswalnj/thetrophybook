import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import { useFocusEffect } from '@react-navigation/native';
import base64 from 'base64-js';
import Liked from '../Components/Liked';

const Favourite = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  useFocusEffect(React.useCallback(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        setUserId(storedUserId || '');
        const response = await fetch(`http://192.168.1.3:8005/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data.data);
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
  }, [userId])
  );
  return (
    <View style={{ flex: 1, flexDirection:'row', padding: 8, backgroundColor: '#FAFAFA', marginBottom:30}}>
      <FlatList
        data={likedItems}
        keyExtractor={(item) => item.itemId}
        renderItem={({ item }) => (
          <Liked
            imageUrl={`data:${item.image.image.contentType};base64,${base64.fromByteArray(item.image.image.data.data)}`}
            title={item.trophyName}
            price={item.price}
            liked={true}
          />
        )}
      />
    </View>
  );
};

export default Favourite;
