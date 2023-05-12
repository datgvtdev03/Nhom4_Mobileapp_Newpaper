import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text> Day la man splash screen</Text>
      <Button title='goto login' onPress={() => navigation.navigate("Login")}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SplashScreen;