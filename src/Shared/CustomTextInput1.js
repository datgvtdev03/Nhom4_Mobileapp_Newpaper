import React from "react";
import { StyleSheet, TextInput } from "react-native";

const CustomTextInput1 = ({
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
        placeholderTextColor="grey"
        numberOfLines={numberOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderColor: '#225254',
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 5,
    color: 'grey'
  },
});
export default CustomTextInput1;
