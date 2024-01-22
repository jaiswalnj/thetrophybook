import React,{useEffect, useState} from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const CategoryOverlay = ({ isVisible, onClose }) => {
  const [visible, setVisible] = useState(isVisible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(console.log("lol"))}
    >
      <View style={styles.overlayContainer}>
      
      <View style={{flexDirection:'column'}}>
          <View style={styles.overlayContent}>
              <View style={{paddingTop: 44,paddingLeft: 15}}>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                      <Icon name="exit-outline" size={30} color='black' />
                  </TouchableOpacity>
              </View>
              
              <View style={styles.overlayContent}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity >
                  <View>
                    <Icon name="square-outline" size={20} color="black" />
                  </View>
                  </TouchableOpacity>
                
                <Text>All Trophies</Text>
                </View>
              </View>

              <View style={styles.overlayContent}>
                <View style={{ flexDirection: 'row'}}>
                  <TouchableOpacity >
                  <View>
                    <Icon name="square-outline" size={20} color="black" />
                  </View>
                  </TouchableOpacity>
                
                <Text style={styles.Text}>All Trophies</Text>
                

                </View>
              </View>  
        
        
        
        
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf:'center',
    width:'70%',
    bottom: 50,
    alignItems: 'center',
    zIndex:-1,
    backgroundColor: '#FFF8E0',
  },
  overlayContent: {
    flex:1,
    backgroundColor: '#FFF8E0',
    padding: 8,
    width:'100%',
    borderRadius: 10,
    // alignContent: 'flex-start',
    // justifyContent: 'space-between',
    // alignItems:'flex-start',
    alignSelf: 'flex-start',
    zIndex:-1,
    alignItems: 'center',
  },
  Text: {
    padding: 1,
    textAlign: 'right',
    // margin: 10,
  },
  
});

export default CategoryOverlay;
