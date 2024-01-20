import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const Orders = ({route}) => {
    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity style={styles.back} onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  back: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  });

export default Orders