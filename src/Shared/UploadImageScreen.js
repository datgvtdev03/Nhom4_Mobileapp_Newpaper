import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImageScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ uri: pickerResult.uri });
  };

  const uploadImage = () => {
    // Thực hiện xử lý tải lên ảnh tại đây
    console.log('Image selected:', selectedImage);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && <Image source={selectedImage} style={{ width: 200, height: 200 }} />}
      <Button title="Select Image" onPress={selectImage} />
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
