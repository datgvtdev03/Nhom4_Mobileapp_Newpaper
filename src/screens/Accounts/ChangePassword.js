import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomTextInput1 from "../../Shared/CustomTextInput";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";
import Header from "../../Shared/Header";
import ModalPoup from "../../Shared/ModalPopup";
// import { API_URL_PUT_CHANGE_PASSWORD } from "../../Config/config";

const ChangePasswordScreen = ({ navigation }) => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [enterNewPasswordVisible, setEnterNewPasswordVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [enterNewPassword, setEnterNewPassword] = useState("");

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleEnterNewPasswordVisibility = () => {
    setEnterNewPasswordVisible(!enterNewPasswordVisible);
  };

  const handleChangePassword = async () => {
    if (newPassword !== enterNewPassword) {
      console.log("mat khau k trung khop");
      return;
    }


    try {
      const response = await fetch('http://15.10.111.40:3000/users/update/:id', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      if (response.ok) {
        // Password successfully changed, handle the success case here
      } else {
        // Handle the error case here
      }
    } catch (error) {
      console.log(error);
      // Handle the error case here
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Đổi mật khẩu" onPress={() => navigation.goBack()} />

      <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.viewAddOrEdit}>
          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '700', color: "#225254" }}>Mật khẩu cũ</Text>
          <View style={{ alignItems: "flex-end" }}>
            <CustomTextInput1
              style={{
                borderColor: "#225254",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                marginTop: 5,
                width: "90%",
              }}
              placeholder="Mật khẩu cũ"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
          </View>

          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '700', color: "#225254" }}>Mật khẩu mới</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.viewTextInput}>
              <CustomTextInput
                placeholder="Mật khẩu mới"
                secureTextEntry={!newPasswordVisible}
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TouchableOpacity onPress={toggleNewPasswordVisibility}>
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
                placeholder="Nhập lại mật khẩu mới"
                secureTextEntry={!enterNewPasswordVisible}
                value={enterNewPassword}
                onChangeText={setEnterNewPassword}
              />

              <TouchableOpacity onPress={toggleEnterNewPasswordVisibility}>
                <Image
                  style={{ width: 20, height: 14 }}
                  source={
                    enterNewPasswordVisible
                      ? require("../../../assets/hidden.png") // Đường dẫn đến hình ảnh khi mật khẩu ẩn
                      : require("../../../assets/view.png") // Đường dẫn đến hình ảnh khi mật khẩu hiển thị
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
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
            onPress={() => {}}
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
            onPress={handleChangePassword}
          />
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
    width: "80%",
  },
  viewButton: {
    flex: 1.5,
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
  viewTextInput: {
    flexDirection: "row",
    borderColor: "#225254",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 8,
    marginTop: 5,
    // marginLeft: 20
  },
});
export default ChangePasswordScreen;
