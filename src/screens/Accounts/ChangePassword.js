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

const ChangePasswordScreen = ({ navigation }) => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [enterNewPasswordVisible, setEnterNewPasswordVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [enterNewPassword, setEnterNewPassword] = ("");

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleEnterNewPasswordVisibility = () => {
    setEnterNewPasswordVisible(!enterNewPasswordVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Đổi mật khẩu"
        onPress={() => navigation.goBack()}
      />

      <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.viewAddOrEdit}>
          <ScrollView>
            <Text style={{ marginTop: 12 }}>Mật khẩu cũ</Text>
            <CustomTextInput1
              style={{borderColor: "#225254",
              borderWidth: 1, borderRadius: 8, paddingHorizontal: 10,marginTop: 3}}
              placeholder="Mật khẩu cũ"
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <Text style={{ marginTop: 12 }}>Mật khẩu mới</Text>
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
            
            <Text style={{ marginTop: 12 }}>Nhập lại mật khẩu mới</Text>
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
            onPress={() => {}}
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
  viewTextInput: {
    flexDirection: "row",
    borderColor: "#225254",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 8,
    marginTop: 3
  },
});
export default ChangePasswordScreen;
