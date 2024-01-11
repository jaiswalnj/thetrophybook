import { View, Text } from 'react-native'
import React from 'react'
import Card from '../Components/Card'

const Favourite = () => {
  return (
    <View style={{flex: 1, padding: 8, backgroundColor: '#FAFAFA'}}>
      <Card imageUrl={'https://as2.ftcdn.net/v2/jpg/05/73/13/55/1000_F_573135545_QpPCuCRScNyy70u1m9P0DQmAl5w6Hhrf.webp'}
          title={'Trophy'}
          price={1500}
          width={180}/>
    </View>
  )
}

export default Favourite