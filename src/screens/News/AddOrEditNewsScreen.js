import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../../Shared/Header";
import CustomTextInput1 from "../../Shared/CustomTextInput1";
import CustomButton from "../../Shared/CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { BottomPopup } from "../../Shared/BottomPopup";
import ModalPoup from "../../Shared/ModalPopup";

import { API_URL_POST_POSTS } from "../../Config/config";
const AddOrEditNewsScreen = ({ navigation, route}) => {

  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [tieuDe, setTieuDe] = useState("");
  const [noiDung, setNoiDung] = useState("");

  const [selectedTheLoai, setSelectedTheLoai] = useState(null);

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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
    console.log("Permission granted!");
    // Gọi hàm lấy vị trí
    getLocation();
  };

  const getLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    } catch (error) {
      console.error("Error getting location", error);
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
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: "image.jpg",
      };
      setImage(selectedImage);
    }
  };

  let theLoaiPopupRef = React.createRef();
  const onShowPopupTheLoai = () => {
    theLoaiPopupRef.show();
  };
  const onClosePopupTheLoai = () => {
    theLoaiPopupRef.close();
  };
  const handleValueChangeTheLoai = (value) => {
    setSelectedTheLoai(value);
    onClosePopupTheLoai(); //dong popup
  };

  const dataTheLoai = [
    { id: 1, name: "Mới" },
    { id: 2, name: "Thời sự" },
    { id: 3, name: "Thể thao" },
    { id: 4, name: "Pháp luật" },
    { id: 5, name: "Giáo dục" },
    { id: 6, name: "Kinh tế" },
  ];

  const openSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const openModalFail = () => {
    setErrorModalVisible(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const onCancel = () => {
    setImage(null);
    setTieuDe("");
    setNoiDung("");
    setSelectedTheLoai(null);
    navigation.navigate("Home");
  };

  

  const themBaiViet = async () => {
    if (!image || !tieuDe || !noiDung || !selectedTheLoai) {
      openModalFail();
      return;
    }

    try {
      const url = API_URL_POST_POSTS;
      const method = "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          uri: String(image.uri),
          tieuDe: tieuDe,
          noiDung: noiDung,
          theLoai: selectedTheLoai?.name,
        }),
      });

      if (response.ok) {
        console.log("Product added successfully: ", );
        openSuccessModal();

        setImage(null);
        setTieuDe("");
        setNoiDung("");
        setSelectedTheLoai(null);
        // navigation.navigate("Home")
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Thêm bài viết"}
        onPress={() => navigation.navigate("Home")}
      />

      <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.viewAddOrEdit}>
          <ScrollView>
            <Text>Ảnh</Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {image && (
                <Image source={{ uri: image.uri }} style={styles.image} />
              )}
              <TouchableOpacity
                onPress={selectImage}
                style={{
                  backgroundColor: "white",
                  borderColor: "#225254",
                  height: 44,
                  width: "100%",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#225254" }}>Chọn ảnh</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ marginTop: 12 }}>Tiêu đề</Text>
            <CustomTextInput1
              style={{ width: "100%" }}
              placeholder="Tiêu đề"
              value={tieuDe}
              onChangeText={setTieuDe}
            />

            <Text style={{ marginTop: 12 }}>Nội dung</Text>
            <CustomTextInput1
              style={{ width: "100%", height: 100 }}
              numberOfLines={4}
              multiline={true}
              placeholder="Nội dung"
              value={noiDung}
              onChangeText={setNoiDung}
            />

            <Text style={{ marginTop: 12 }}>Thể loại</Text>
            <TouchableWithoutFeedback onPress={onShowPopupTheLoai}>
              <Text style={styles.textSize}>
                {selectedTheLoai ? selectedTheLoai.name : "-Chọn thể loại-"}
              </Text>
            </TouchableWithoutFeedback>
            <BottomPopup
              ref={(target) => (theLoaiPopupRef = target)}
              onTouchOutside={onClosePopupTheLoai}
              title="Chọn thể loại"
              data={dataTheLoai}
              onCloseWithItem={handleValueChangeTheLoai}
            />
          </ScrollView>
        </View>
      </View>

      <View style={styles.viewButton}>
        <View
          style={{
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
          }}
        >
          <CustomButton
            style={{
              backgroundColor: "white",
              color: "#225254",
              borderColor: "#225254",
              borderRadius: 20,
            }}
            onPress={onCancel}
            title="Huỷ"
          />
        </View>

        <View
          style={{
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
          }}
        >
          <CustomButton
            title="Lưu"
            style={{ borderColor: "#ffffff", borderRadius: 20 }}
            onPress={themBaiViet}
            disabled={!image || !tieuDe || !noiDung || !selectedTheLoai}
          />

          <ModalPoup visible={successModalVisible}>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={closeSuccessModal}>
                  <Image
                    source={require("../../../assets/x.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../assets/success.png")}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Thêm thành công!
            </Text>
          </ModalPoup>

          <ModalPoup visible={errorModalVisible}>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={closeErrorModal}>
                  <Image
                    source={require("../../../assets/x.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../assets/warning.png")}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Nhập đủ các trường!
            </Text>
          </ModalPoup>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  viewAddOrEdit: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    margin: 12,
    padding: 16,
    width: "90%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  viewButton: {
    flex: 1,
    flexDirection: "row",
  },
  textSize: {
    fontSize: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#225254",
    borderRadius: 8,
    padding: 11,
    backgroundColor: "white",
    marginTop: 5,
    color: "grey",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
});

export default AddOrEditNewsScreen;