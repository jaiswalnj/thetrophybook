import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import base64 from 'base64-js';
import Liked from '../Components/Liked';

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
        keyExtractor={(product) => product.productId}
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
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Favourite;
