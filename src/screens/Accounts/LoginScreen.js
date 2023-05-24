import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";
import { API_URL_LOGIN } from "../../Config/config";
import ModalPopup from "../../Shared/ModalPopup";
import useStore from "../../Config/store";

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notiEmail, setNotiEmail] = useState("");
  const [notiPassword, setNotiPassword] = useState("");

  const [alertModal, setAlertModal] = useState(false);

  const store = useStore();

  const openModal = () => {
    setAlertModal(true);
  };

  const closeModal = () => {
    setAlertModal(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 12;
  };

  const onLogin = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setNotiEmail("Email không hợp lệ");
      isValid = false;
    } else {
      setNotiEmail("");
    }

    if (!validatePassword(password)) {
      setNotiPassword("Mật khẩu không hợp lệ");
      isValid = false;
    } else {
      setNotiPassword("");
    }

    if (isValid) {
      const data = {
        email: email,
        password: password,
      };

      fetch(API_URL_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length > 0) {
            const user = response[0];
            if (user.permission === "admin") {
              // Đăng nhập thành công với quyền admin
              store.setUserInfo(user); // Lưu thông tin người dùng vào store
              navigation.replace("TabbarAdmin");
            } else {
              // Đăng nhập thành công với quyền user
              store.setUserInfo(user); // Lưu thông tin người dùng vào store
              navigation.replace("TabbarUser");
            }
          } else {
            // Đăng nhập không thành công
            openModal();
          }
        })
        .catch((error) => {
          console.error("Lỗi kết nối:", error);
          // Xử lý lỗi kết nối API
        });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../assets/logo1.png")}
          style={{ width: "50%", marginTop: 30 }}
        />
      </View>

      <View style={styles.viewBottom}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24, color: "#225254" }}>
            ĐĂNG NHẬP
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: "80%",
              marginVertical: 10,
              borderColor: "#225254",
            }}
          />

          <View style={styles.viewTextInput}>
            <CustomTextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Image
              style={{ width: 20, height: 14 }}
              source={require("../../../assets/mail.png")}
            />
          </View>
        </View>
        <View
          style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
        >
          <Text style={styles.textNoti}>{notiEmail}</Text>
        </View>

        <View style={styles.viewTextInput}>
          <CustomTextInput
            placeholder="Mật khẩu"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
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
        <View
          style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
        >
          <Text style={styles.textNoti}>{notiPassword}</Text>
        </View>

        <CustomButton title="ĐĂNG NHẬP" onPress={onLogin} />
        <ModalPopup visible={alertModal}>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={closeModal}>
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
            Tài khoản hoặc mật khẩu không đúng!
          </Text>
        </ModalPopup>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textOr}>HOẶC</Text>
        </View>

        <CustomButton
          title="ĐĂNG KÍ"
          style={styles.btnSignup}
          onPress={() => navigation.navigate("Signup")}
        />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={{ textDecorationLine: "underline" }}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#225254",
  },

  viewBottom: {
    flex: 7,
    backgroundColor: "white",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 30,
  },

  textOr: {
    fontWeight: "bold",
  },
  btnSignup: {
    backgroundColor: "#3A7578",
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
    marginTop: 10,
  },
  textNoti: {
    color: "red",
  },
});
export default LoginScreen;
