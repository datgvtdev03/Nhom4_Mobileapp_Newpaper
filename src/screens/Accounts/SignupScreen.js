import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";
import { API_URL_SIGNUP } from "../../Config/config";

const SignupScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("user");


  const [notifullName, setNotiFullName] = useState("");
  const [notiEmail, setNotiEmail] = useState("");
  const [notiPassword, setNotiPassword] = useState("");


  const validateFullName = (fullName) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(fullName);
  };
  

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

  // const validatePassword = (password) => {
  //   return password.length >= 8 && password.length <= 12;
  // };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



  const onRegister = () => {
    if(!validateFullName(fullName)) {
      setNotiFullName("Họ và tên không hợp lệ!");
      return;
    } else if(!validateEmail(email)) {
      setNotiEmail("Email không hợp lệ!");
      return;
    } else if(!validatePassword(password)) {
      setNotiPassword("Mật khẩu phải có từ 6 đến 12 kí tự!");
      return;
    }

    const data = {
      fullName: fullName,
      email: email,
      password: password,
      permission: permission
    };

    fetch(API_URL_SIGNUP, {
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
            ĐĂNG KÍ
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: "100%",
              marginVertical: 10,
              borderColor: "#225254",
            }}
          />

          <View style={styles.viewTextInput}>
            <CustomTextInput
              placeholder="Họ và tên"
              value={fullName}
              onChangeText={setFullName}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../assets/user1.png")}
            />
          </View>
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
          <Text style={styles.textNoti}>{notifullName}</Text>
        </View>

        <View style={styles.viewTextInput}>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <Image
            style={{ width: 20, height: 14 }}
            source={require("../../../assets/mail.png")}
          />
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

        <CustomButton title="ĐĂNG KÍ" onPress={onRegister} />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textOr}>HOẶC</Text>
        </View>

        <CustomButton
          title="ĐĂNG NHẬP"
          style={styles.btnSignup}
          onPress={() => navigation.navigate("Login")}
        />
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
    color: 'red'
  },
});

export default SignupScreen;
