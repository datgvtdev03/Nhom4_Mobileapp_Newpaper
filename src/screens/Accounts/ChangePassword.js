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
  safeAreaView
} from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";
import Header from "../../Shared/Header";
import { API_URL_PUT_CHANGE_PASSWORD } from "../../Config/config";

const ChangePasswordScreen = ({ navigation, route }) => {
  const { account } = route.params;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [successVisible, setSuccessVisible] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


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
    fetch(API_URL_PUT_CHANGE_PASSWORD + idAccount, {
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
          // aboutEmpty()
          setSuccessVisible(true);
        } else {
          setErrorVisible(true);
          setErrorMessage("Đổi mật khẩu không thành công.");
        }
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi kết nối đến máy chủ.");
      });
  };

  const closeSucces = () => {
    setSuccessVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const aboutEmpty = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const newTogglePasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const confirmTogglePasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  return (
    <View style={{ flex: 1 }}>
      <Header title="Đổi mật khẩu" onPress={() => navigation.goBack()} />

      <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.viewAddOrEdit}>
          <ScrollView>
            <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '700', color: "#225254" }}>Mật khẩu cũ</Text>
            <View style={{ alignItems: "flex-end" }}>
            <View style={styles.viewTextInput}>
              <CustomTextInput
                placeholder="Mật khẩu"
                secureTextEntry={!passwordVisible}
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  style={{ width: 20, height: 14 }}
                  source={
                    passwordVisible
                      ? require("../../../assets/hidden.png") // Đường dẫn đến hình ảnh khi mật khẩu ẩn
                      : require("../../../assets/view.png") // Đường dẫn đến hình ảnh khi mật khẩu hiển thị
                  }
                />
              </TouchableOpacity>
            </View>
            </View>

          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '700', color: "#225254" }}>Mật khẩu mới</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.viewTextInput}>
              <CustomTextInput
                placeholder="Mật khẩu"
                secureTextEntry={!newPasswordVisible}
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TouchableOpacity onPress={newTogglePasswordVisibility}>
                <Image
                  style={{ width: 20, height: 14 }}
                  source={
                    newPasswordVisible
                      ? require("../../../assets/hidden.png") // Đường dẫn đến hình ảnh khi mật khẩu ẩn
                      : require("../../../assets/view.png") // Đường dẫn đến hình ảnh khi mật khẩu hiển thị
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

            <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '700', color: "#225254" }}>Nhập lại mật khẩu mới</Text>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.viewTextInput}>
                <CustomTextInput
                  placeholder="Mật khẩu"
                  secureTextEntry={!confirmPasswordVisible}
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                />

                <TouchableOpacity onPress={confirmTogglePasswordVisibility}>
                  <Image
                    style={{ width: 20, height: 14 }}
                    source={
                      confirmPasswordVisible
                        ? require("../../../assets/hidden.png") // Đường dẫn đến hình ảnh khi mật khẩu ẩn
                        : require("../../../assets/view.png") // Đường dẫn đến hình ảnh khi mật khẩu hiển thị
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

          {/* </View> */}

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
            style={{borderRadius: 20}}
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
    flex: 1.5,
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
  viewBottom: {
    flex: 7,
    backgroundColor: "white",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 30,
  },
  viewTextInput: {
    flexDirection: "row",
    borderColor: "#225254",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ChangePasswordScreen;
