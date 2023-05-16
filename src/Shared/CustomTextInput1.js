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
    <View
      style={{
        flexDirection: "row",
        borderColor: "#225254",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#000000"
        numberOfLines={numberOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    // borderColor: '#225254',
    // borderWidth: 1,
    // padding: 10,
    // borderRadius: 8,
    // marginVertical: 10,
  },
});
export default CustomTextInput1;
