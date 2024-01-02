import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';


const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setTimeout(async () => {
        setAnimating(false);
        const userId = await AsyncStorage.getItem('user_id');
        navigation.replace(userId === null ? 'Auth' : 'DrawerNavigatorRoutes');
      }, 5000);
    };

    if (animating) {
      checkUser();
    }
  }, [animating, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/splash.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});