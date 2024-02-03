import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
    
const Orders = ({ route }) => {
  const { orderHistory } = route.params;
  const navigation = useNavigation();
  console.log(orderHistory);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {item._id}</Text>
      <Text style={styles.orderDate}>Order Date: {new Date(item.date_ordered).toLocaleDateString()}</Text>

      {item.trophy && (
        <View style={styles.trophyContainer}>
          <View style={styles.trophyDetails}>
            <Text>Trophy Id: {item.trophy}</Text>
          </View>
        </View>
      )}

      <Text>Quantity: {item.qty}</Text>
      <Text>Text on Trophy: {item.text_on_trophy}</Text>
      <Text>Occasion: {item.occasion}</Text>
      <Text>Additional Detail: {item.additional_detail}</Text>
    </View>
  );
    
  return (
    <View>
      <View style={{paddingTop: 44,paddingLeft: 15,elevation: 4,zIndex: 4,position: 'absolute'}}>
        <TouchableOpacity onPress={() => navigation.replace('DrawerNavigatorRoutes')}>
        <Icon name="arrow-back-sharp" size={30} color='black' />
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 10, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 30, marginBottom: 10 }}>Orders</Text>
      </View>

      <FlatList
        style={{height: height * 0.91}}
        data={orderHistory}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
      />

        </View>
      );
    };
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  back: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 8,
  },
  trophyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trophyImage: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 4,
  },
  trophyDetails: {
    flex: 1,
  },
});

export default Orders;