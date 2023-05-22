import React, { useState, useEffect } from "react";
import { View, Button, Image, StyleSheet, Alert, FlatList } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted!");
      // Xử lý khi không được cấp quyền truy cập
    }
    // Xử lý khi được cấp quyền truy cập
    console.log('Permission granted!');
    // Gọi hàm lấy vị trí
    getLocation();
  };

  const getLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    } catch (error) {
      console.error('Error getting location', error);
      // Xử lý khi không thể lấy được vị trí
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted!");
      // Xử lý khi không được cấp quyền truy cập
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const selectedImage = {
        uri: result.assets[0].uri, // Truy cập vào thuộc tính uri thông qua mảng assets
        type: "image/jpeg",
        name: "image.jpg",
      };
      setImage(selectedImage);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) {
        console.log("No image selected!");
        return;
      }

      const formData = {
        uri: image,
      };
      await fetch("https://632c7f2b5568d3cad8870c47.mockapi.io/Friends", {
        method: "POST",
        // body: formData,
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert("Dki thanh cong");
          console.log("updated: ", JSON.stringify(responseJson));
        })
        .catch((err) => {
          Alert.alert("Dki khong thanh cong");
        });

      // TODO: Xử lý phản hồi từ máy chủ sau khi tải lên thành công
    } catch (error) {
      console.error(error);
      // TODO: Xử lý lỗi
    }
  };

  return (
    <View style={styles.container}>
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
        <Button title="Select Image" onPress={selectImage} />
        <Button title="Upload Image" onPress={uploadImage} disabled={!image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default UploadImage;
