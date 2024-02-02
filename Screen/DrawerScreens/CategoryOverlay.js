import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');


const FloatingButton = ({ onPress }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <Icon name="add" size={30} color="white" />
  </TouchableOpacity>
);

const CategoryOverlay = ({ trophyTypes, onSelectCategory }) => {
  const [visible, setVisible] = useState(false);

  const handleCategorySelect = (type) => {
    onSelectCategory(type);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <FloatingButton onPress={() => setVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            {trophyTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(type)}
              >
                <Icon name="square-outline" size={20} color="black" />
                <Text style={styles.categoryText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name="exit-outline" size={30} color='black' />
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    height:'30%',
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#FFF8E0',
    top:height*0.58,
    borderRadius:20,
  },
  overlayContent: {
    flex: 1,
    backgroundColor: '#FFF8E0',
    justifyContent: 'flex-start',
    padding:8,
    width: '100%',
    borderRadius: 10,
    alignItems:'',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF9F1C',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  categoryItem: {
    flexDirection: 'row',
    alignSelf:'right',
    marginTop: 10,
  },
  categoryText: {
    marginLeft: 10,
  },
});

export default CategoryOverlay;
