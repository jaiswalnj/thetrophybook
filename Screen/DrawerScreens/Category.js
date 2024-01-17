import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';

const Category = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Sidebar Content</Text>
  </View>
  );
};

export default Category;