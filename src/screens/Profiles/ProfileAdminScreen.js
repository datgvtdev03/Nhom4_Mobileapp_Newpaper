import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import Header from "../../Shared/Header";
import useStore from "../../Config/store";
import ModalPoup from "../../Shared/ModalPopup";
const ProfileScreenAdmin = ({ navigation }) => {
  const userInfo = useStore((state) => state.userInfo);
  const logout = useStore((state) => state.logout);

  const [alertModal, setAlertModal] = useState(false);

  const openModal = () => {
    setAlertModal(true);
  };

  const closeModal = () => {
    setAlertModal(false);
  };
 
  const handleLogout = () => {

    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }

  return (
    <View style={styles.container}>
      <Header title="Hồ sơ của tôi" onPress={() => navigation.goBack()} />

      <View style={{ flex: 4, justifyContent: "center", padding: 12, marginTop: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../../../assets/profile.png")} />
        </View>
        <View
          style={{ borderWidth: 0.3, marginTop: 12, borderColor: "#225254" }}
        />

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: "700", color: "#225254", fontSize: 16 }}>
            Họ và tên: {userInfo.fullName}
          </Text>
          <View
            style={{ borderWidth: 0.3, marginTop: 12, borderColor: "#225254" }}
          />

          <Text
            style={{
              fontWeight: "700",
              color: "#225254",
              marginTop: 12,
              fontSize: 16,
            }}
          >
            Email: {userInfo.email}
          </Text>
          <View
            style={{ borderWidth: 0.3, marginTop: 12, borderColor: "#225254" }}
          />
          <Text
            style={{
              fontWeight: "700",
              color: "#225254",
              marginTop: 12,
              fontSize: 16,
            }}
          >
            Quyền: {userInfo.permission}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 0.3,
          marginHorizontal: 12,
          borderColor: "#225254",
          marginTop: 12,
        }}
      />

      <View style={{ flex: 6, marginHorizontal: 12, marginTop: 12 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManagerNews')}>
          <Text style={{color: '#ffffff'}}>Danh sách bài viết</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePW", {account: userInfo})}>
          <Text style={{color: '#ffffff'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={{color: '#ffffff'}}>Đăng xuất</Text>
        </TouchableOpacity>
        
        <ModalPoup visible={alertModal}>
          <Text style={{ marginTop: 0, fontSize: 20, textAlign: "center" }}>
            Bạn có chắc chắn muốn đăng xuất?
          </Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
              <TouchableOpacity onPress={closeModal} style={{height: 44, flex: 5, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={{height: 44, flex: 5, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Ok</Text>
              </TouchableOpacity>
          </View>
        </ModalPoup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#225254",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginVertical: 12
  },
  
});
export default ProfileScreenAdmin;
