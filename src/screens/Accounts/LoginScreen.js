import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Kiểm tra độ dài mật khẩu và không chứa ký tự đặc biệt
    const passwordPattern = /^[a-zA-Z0-9]{6,12}$/;
    return passwordPattern.test(password);
  };

  const onLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      // Kiểm tra các trường không được để trống
      Alert.alert("Vui lòng điền đầy đủ thông tin.");
    } else if (!validateEmail(email)) {
      // Kiểm tra định dạng email
      Alert.alert("Email không đúng định dạng.");
    } else if (!validatePassword(password)) {
      // Kiểm tra độ dài và ký tự đặc biệt trong mật khẩu
      Alert.alert("Mật khẩu phải có độ dài từ 6 đến 12 ký tự và không chứa ký tự đặc biệt.");
    } else {
      const data = {
        email: email,
        password: password,
      };
    
      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          if (response.length > 0) {
            const user = response[0];
            if (user.permission === 'admin') {
              // Đăng nhập thành công với quyền admin
              navigation.replace('TabbarAdmin');
            } else {
              // Đăng nhập thành công với quyền user
              navigation.replace('TabbarUser');
            }
          } else {
            // Đăng nhập không thành công
            Alert.alert("Email hoặc mật khẩu không chính xác.");
          }
        })
        .catch(error => {
          console.error('Lỗi kết nối:', error);
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
          <CustomTextInput placeholder="Email" value={email} onChangeText={setEmail} />

          <Image
            style={{ width: 20, height: 14 }}
            source={require("../../../assets/mail.png")}
          />
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

        <CustomButton title="ĐĂNG NHẬP" onPress={onLogin}/>

        <Text style={styles.textOr}>HOẶC</Text>
        <CustomButton
          title="ĐĂNG KÍ"
          style={styles.btnSignup}
          onPress={() => navigation.navigate("Signup")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={{ textDecorationLine: "underline" }}>Bỏ qua</Text>
        </TouchableOpacity>
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
    flex: 5.5,
    flexDirection: "column",
    backgroundColor: "white",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    alignItems: "center",
    justifyContent: "center",
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
    paddingVertical: 12,
    width: "80%",
    borderRadius: 8,
    marginVertical: 10,
  },
});
export default LoginScreen;
