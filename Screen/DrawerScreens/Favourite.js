import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Liked from '../Components/Liked';
import apiConfig from '../../apiConfig';


const { width, height } = Dimensions.get('window');

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
    <View style={{ backgroundColor: '#FAFAFA', marginBottom: height * 0.07}}>
      <View style={{ alignItems: 'center', backgroundColor: '#FAFAFA', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: width * 0.08,
            textAlign: 'center',
            marginTop: height * 0.05,
            marginBottom: height * 0.01,
          }}> Favourite
        </Text>
      </View>
        
      <View style={{width: width * 1}}>
      <FlatList
        style={{height: height * 0.80}}
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
    </View>
  );
};

export default Favourite;
