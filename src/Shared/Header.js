import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#225254',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase', // Hiển thị chữ in hoa
  },
});
export default Header;
