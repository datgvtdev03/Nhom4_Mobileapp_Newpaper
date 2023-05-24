import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Loader,
  Shine,
  ShineOverlay,
} from "rn-placeholder";

import ModalPoup from "../../Shared/ModalSuccess";

const ProfileScreen = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = React.useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = async () => {
    try {
      const response = await fetch(
        "https://6399d10b16b0fdad774a46a6.mockapi.io/facebook"
      );
      const data = await response.json();
      setData(data);
      setIsLoading(false);
      // console.log("data: " + JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    getDataFromAPI();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Placeholder
          Left={PlaceholderMedia}
          Right={PlaceholderMedia}
          Animation={Loader}
        >
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => openModal()}>
          <Text>Click</Text>
        </TouchableOpacity>
        <ModalPoup visible={visible}>

          <View style={{ alignItems: 'flex-end' }}>
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
              source={require("../../../assets/success.png")}
              style={{ height: 150, width: 150, marginVertical: 10 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
          >
            Thanh cong
          </Text>
        </ModalPoup>
      </View>

      <View style={{ flex: 5 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image source={{ uri: item?.uri?.uri }} style={styles.image} />
              <Text style={styles.title}>{item.tieuDe}</Text>
              <Text style={styles.description}>{item.noiDung}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={isLoading} // Đưa isLoading vào extraData
          onRefresh={handleRefresh} // Xử lý refresh khi kéo xuống
          refreshing={isLoading} // Thiết lập refreshing khi đang loading */}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: 200,
    height: 200,
  },
});
export default ProfileScreen;
