import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";
import Header from "../../Shared/Header";
import { API_URL_USER_CHANGEPASSWORD } from "../../Config/config";

const ChangePasswordScreen = ({ navigation, route }) => {
  const { account } = route.params;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [successVisible, setSuccessVisible] = useState(false);


  const handleChangePassword = (idAccount) => {
    if (oldPassword == "" || newPassword == "" || confirmNewPassword == "") {
      setErrorVisible(true);
      setErrorMessage("Không để rỗng các trường.");
      return;
    }

    if (oldPassword != account.password) {
      setErrorVisible(true);
      setErrorMessage("Mật khẩu cũ không chính xác.");
      return;
    }

    // Kiểm tra mật khẩu mới và mật khẩu xác nhận phải trùng nhau
    if (newPassword !== confirmNewPassword) {
      setErrorVisible(true);
      setErrorMessage("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }

    // Gọi API để thay đổi mật khẩu
    fetch(API_URL_USER_CHANGEPASSWORD + idAccount, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    })
      .then((response) => response)
      .then((data) => {
        // Xử lý kết quả từ API

        if (data) {
          // Thay đổi mật khẩu thành công
          // Alert.alert("Thông báo", "Đổi mật khẩu thành công.");
          // Điều hướng người dùng về màn hình trước đó
          aboutEmpty()

          setSuccessVisible(true)
          // navigation.goBack();
        } else {
          // Thay đổi mật khẩu thất bại
          setErrorVisible(true);
          setErrorMessage("Đổi mật khẩu không thành công.");
        }
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi kết nối đến máy chủ.");
      });
  };

  const closeSucces = () =>{
    setSuccessVisible(false)
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });  }
  const aboutEmpty = () => {
    setOldPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Đổi mật khẩu" onPress={() => navigation.goBack()} />

      <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.viewAddOrEdit}>
          <ScrollView>
            <Text style={{ marginTop: 12 }}>Mật khẩu cũ</Text>
            <CustomTextInput
              style={styles.textInput}
              placeholder="Mật khẩu cũ"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <Text style={{ marginTop: 12 }}>Mật khẩu mới</Text>
            <CustomTextInput
              style={styles.textInput}
              placeholder="Mật khẩu mới"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={{ marginTop: 12 }}>Nhập lại mật khẩu mới</Text>
            <CustomTextInput
              style={styles.textInput}
              placeholder="Nhập lại mật khẩu mới"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
          </ScrollView>
        </View>
      </View>

      <View style={styles.viewButton}>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            title="Huỷ"
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Lưu"
            onPress={() => handleChangePassword(account.id)}
          />
        </View>
      </View>

      <Modal visible={errorVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setErrorVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/warning.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        </View>
      </Modal>
      <Modal visible={successVisible} animationType="fade" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => closeSucces()}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.successText}>Vui lòng đăng nhập lại.</Text>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
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
  textInput: {
    borderColor: "#225254",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 3,
  },
  viewButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#225254",
    borderColor: "#225254",
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "70%",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeButtonText: {
    fontSize: 35,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ChangePasswordScreen;
