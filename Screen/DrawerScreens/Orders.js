import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Orders = ({orderHistory}) => {
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
      paddingTop: 20,
    },
  });

export default Orders