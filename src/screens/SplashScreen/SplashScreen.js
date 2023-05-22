import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';


const SplashScreen = ({navigation}) => {

  setTimeout(() => {
    navigation.replace('Login');
  }, 5000);


  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.image} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#225254',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: "80%",
    height: 200,
  },
});
export default SplashScreen;