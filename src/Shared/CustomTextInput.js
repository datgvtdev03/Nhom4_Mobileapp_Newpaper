import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  numberOfLines,
  style,
  multiline,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor='grey'
      numberOfLines={numberOfLines}
      multiline={multiline}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 44,
  },
});
export default CustomTextInput;
