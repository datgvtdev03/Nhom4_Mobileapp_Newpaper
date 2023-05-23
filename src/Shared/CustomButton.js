// CustomButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#225254',
    height: 44,
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
