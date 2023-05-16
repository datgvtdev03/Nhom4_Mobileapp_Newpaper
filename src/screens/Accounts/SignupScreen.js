import React, {useState} from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import CustomTextInput from "../../Shared/CustomTextInput";
import CustomButton from "../../Shared/CustomButton";

const SignupScreen = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



  return (
    <View style={styles.container}>
      <View style={{flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../assets/logo1.png")}
          style={{ width: "50%", marginTop: 30 }}
        />
      </View>

      <View style={styles.viewBottom}>
        <Text style={{ fontWeight: "bold", fontSize: 24, color: '#225254'}}>ĐĂNG KÍ</Text>
        <View
          style={{
            borderWidth: 1,
            width: "80%",
            marginVertical: 10,
            borderColor: "#225254",
          }}
        />

        <View style={styles.viewTextInput}>
          <CustomTextInput placeholder="Họ và tên" />
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../../assets/user1.png")}
          />
        </View>

        <View style={styles.viewTextInput}>
          <CustomTextInput placeholder="Email" />

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
        <CustomButton title="ĐĂNG KÍ" />
        <Text style={styles.textOr}>HOẶC</Text>
        <CustomButton title="ĐĂNG NHẬP" style={styles.btnSignup} onPress={() => navigation.navigate('Login')}/>
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
