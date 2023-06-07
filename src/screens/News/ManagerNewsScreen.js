import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Header from "../../Shared/Header";
import { API_URL_GET_POSTS, API_URL_POST_DELETE } from "../../Config/config";
import ModalPoup from "../../Shared/ModalPopup";

const ManagerNewsScreen = ({ navigation }) => {
  const [dataNews, setDataNews] = useState([]);

  const [alertModal, setAlertModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openModal = () => {
    setAlertModal(true);
  };

  const closeModal = () => {
    setAlertModal(false);
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const handleEdit = (newsItem) => {
    navigation.navigate("ADD", {
      isEditMode: true,
      newsItem: newsItem,
    });
    // console.log("selectedItem: ", newsItem);
  };

  const getDataFromAPI = async () => {
    try {
      const response = await fetch(API_URL_GET_POSTS);
      const data = await response.json();
      setDataNews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = (idDelete) => {
    fetch(API_URL_POST_DELETE + idDelete, {
      method: "DELETE",
    })
      .then((json) => {
        console.log("Xoa thanh cong");
        getDataFromAPI();
      })
      .catch((err) => {
        console.log("Loi", err);
      });
  };

  return (
    <View style={styles.container}>
      <Header title="Danh sách bài viết" onPress={() => navigation.goBack()} />
      <FlatList
        data={dataNews}
        renderItem={({ item }) => (
          <View style={styles.viewItems}>
            <View style={{ flex: 1, marginBottom: 5 }}>
              <Text style={{ color: "gray" }}>{item?.theLoai}</Text>
            </View>

            <View
              style={{
                flex: 5,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2 }}>
                <Image
                  source={{ uri: item?.uri }}
                  style={{ height: 100, borderRadius: 20, marginRight: 5 }}
                />
              </View>

              <View style={{ flex: 4 }}>
                <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>
                  {item.tieuDe}
                </Text>
                <Text>{item.noiDung}</Text>
              </View>

              <View
                style={{
                  flex: 0.6,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItemId(item.id);
                    openModal();
                  }}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image source={require("../../../assets/delete.png")} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image source={require("../../../assets/edit.png")} />
                </TouchableOpacity>

              </View>
              <ModalPoup visible={alertModal}>
                  <Text
                    style={{ marginTop: 0, fontSize: 20, textAlign: "center" }}
                  >
                    Bạn có chắc chắn muốn xoá không?
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 50,
                    }}
                  >
                    <TouchableOpacity
                      onPress={closeModal}
                      style={{ height: 44, flex: 5, alignItems: "center" }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Huỷ
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        onDelete(selectedItemId);
                        closeModal();
                      }}
                      style={{ height: 44, flex: 5, alignItems: "center" }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Có
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ModalPoup>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewItems: {
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    padding: 12,
    flex: 1,
    flexDirection: "column",
  },
});

export default ManagerNewsScreen;
