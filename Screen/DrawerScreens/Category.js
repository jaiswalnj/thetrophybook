{// import { View, Text, Alert, Modal, StyleSheet, Pressable} from 'react-native'
// import React from 'react'

// const Category = () => {
  
//   return (
//     <Modal
//         animationType="slide"
//         transparent={true}
//         visible={true}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//           <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text>Hellow</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(false)}>
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//   )
// }
// }
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     flexDirection: 'row',
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     width:80,
//     height:80,
//     borderRadius: 20,
//     margin: 10,
//     elevation: 2,
//     alignItems:'center'
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default Category
}

import React, { useState } from 'react';
import { Animated, Button, StyleSheet, View } from 'react-native';

const CategoryButton = ({ onPress, isOpen }) => {
  const animatedValue = useState(new Animated.Value(0))[0];

  const handlePress = () => {
    Animated.timing(animatedValue, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View
      style={[styles.buttonContainer, { transform: [{ translateY: animatedValue }] }]}
    >
      <Button title="Categories" onPress={handlePress} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust as needed
    right: 20, // Adjust as needed
  },
});

export default CategoryButton;
