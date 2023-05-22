import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';

const Header = ({title, onPress, style}) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="light-content" backgroundColor="#225254" />
      <TouchableOpacity style={{flex: 1, marginTop: 20}} onPress={onPress}>
        <Image source={require('../../assets/back-arrow.png')}/>
      </TouchableOpacity>

      <View style={{flex: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#225254',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // paddingVertical: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase', // Hiển thị chữ in hoa
  },
});
export default Header;
