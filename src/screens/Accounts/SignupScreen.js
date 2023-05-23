import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";

const SignupScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("user");


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


  const onRegister = () => {
    if (fullName.trim() === "" || email.trim() === "" || password.trim() === "") {
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
        fullName: fullName,
        email: email,
        password: password,
        permission: permission
      };

      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          Alert.alert("Đăng ký thành công");
          navigation.navigate("Login");
        })
        .catch(err => {
          Alert.alert("Đăng ký không thành công");
          console.log(err);
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
        <Text style={{ fontWeight: "bold", fontSize: 24, color: '#225254' }}>ĐĂNG KÍ</Text>
        <View
          style={{
            borderWidth: 1,
            width: "80%",
            marginVertical: 10,
            borderColor: "#225254",
          }}
        />

        <View style={styles.viewTextInput}>
          <CustomTextInput placeholder="Họ và tên" value={fullName} onChangeText={setFullName} />
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../../assets/user1.png")}
          />
        </View>

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
        <CustomButton title="ĐĂNG KÍ" onPress={onRegister} />
        <Text style={styles.textOr}>HOẶC</Text>
        <CustomButton title="ĐĂNG NHẬP" style={styles.btnSignup} onPress={() => navigation.navigate('Login')} />
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
    flex: 6.5,
    flexDirection: "column",
    backgroundColor: "white",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    alignItems: "center",
    justifyContent: 'center',
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

export default SignupScreen;
