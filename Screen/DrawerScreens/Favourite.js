import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Liked from '../Components/Liked';
import apiConfig from '../../apiConfig';

const Favourite = ({ user }) => {
  const [likedItems, setLikedItems] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.likedItems) {
        setLikedItems(user.likedItems);
      }
    }, [user])
  );

  return (
    <View style={{ marginBottom: 50, }}>
      <View style={{ paddingTop: 10, alignItems: 'center', backgroundColor: '#FAFAFA' }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 10,
          }}> Favourite
        </Text>
      </View>
      <FlatList
        data={likedItems}
        keyExtractor={(product) => product._id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDescription', { product: item, user })}>
            <Liked
              imageUrl={`data:${item.image.image.contentType};base64,${base64.fromByteArray(item.image.image.data.data)}`}
              title={item.trophyName}
              userId={user._id}
              productId={item._id}
              price={item.price}
              liked={true}
              useCustomColor={index % 3 === 0}
              onRemove={async () => {
                try{
                  productId=item._id;
                  setLikedItems((prevLikedItems) => prevLikedItems.filter((likedItem) => likedItem._id !== productId));
                  const response = await fetch(`${apiConfig.baseURL}/removeFromLikedItems/${productId}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user_id: user._id,
                    }),
                  });
                  setRefreshKey((prevKey) => prevKey + 1);
                }catch (error) {
                  console.error('Error toggling like status:', error);
                } 
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Favourite;
