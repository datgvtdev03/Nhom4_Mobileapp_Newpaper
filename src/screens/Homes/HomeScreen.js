import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
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

import SlideShow from "../../Shared/SlideShow";
import CustomTextInput from "../../Shared/CustomTextInput";
import { API_URL_GET_POSTS } from "../../Config/config";

const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkHouse();
    getDataFromAPI();
    setSelectedButton("Mới");
  }, []);

  const getDataFromAPI = async () => {
    try {
      const response = await fetch(
        API_URL_GET_POSTS
      );
      const data = await response.json();
      setData(data);
      setIsLoading(false);
      console.log("get: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = (button) => {
    setSelectedButton(button);
    getDataFromAPI();
  };

  const renderButton = (button) => (
    <TouchableOpacity
      key={button}
      style={[
        styles.button,
        button === selectedButton ? styles.selectedButton : null,
      ]}
      onPress={() => handleButtonPress(button)}
    >
      <Text
        style={[
          styles.buttonText,
          button === selectedButton ? styles.selectedButtonText : null,
        ]}
      >
        {button}
      </Text>
    </TouchableOpacity>
  );

  const handleRefresh = () => {
    setIsLoading(true);
    getDataFromAPI();
  };

  const renderData = () => {
    if (data) {
      const filteredData = data.filter(
        (item) => item?.theLoai === selectedButton
      );

      // const filteredData = data.filter(
      //   (item) => item.theLoai && item.theLoai.name === selectedButton
      // );

      if (filteredData.length > 0) {
        return (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View>
                <View style={[styles.itemContainer]}>
                  <Image
                    source={{ uri: item?.uri }}
                    style={styles.imageContainer}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailNews', {item: item})}
                    style={{ marginLeft: 12, flex: 3 }}
                  >
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.itemText}
                    >
                      {item.tieuDe}
                    </Text>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={{color: 'white', fontWeight: 'normal'}}
                    >
                      {item.noiDung}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: "grey",
                    marginTop: 10,
                  }}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            extraData={isLoading} // Đưa isLoading vào extraData
            onRefresh={handleRefresh} // Xử lý refresh khi kéo xuống
            refreshing={isLoading} // Thiết lập refreshing khi đang loading
          />
        );
      } else {
        return (
          <View style={styles.dataContainer}>
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
    } else {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
  };

  const checkHouse = () => {
    const currentHour = new Date().getHours();
    let message = "";

    if (currentHour >= 5 && currentHour < 12) {
      message = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      message = "Good afternoon";
    } else {
      message = "Good evening";
    }
    setGreeting(message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewXinChao}>
        <Text style={styles.textXinChao}>{greeting}</Text>
      </View>

      <View style={styles.viewSearch}>
        <View style={styles.viewSearchText}>
          <Image
            style={{ width: 20, height: 20, marginLeft: 16 }}
            source={require("../../../assets/search.png")}
          />
          <TextInput
            style={styles.textSearch}
            placeholder="Tìm kiếm"
            onFocus={() => {
              navigation.navigate("ChangePW");
            }}
          />
          <CustomTextInput />
        </View>
      </View>

      <View style={{ flex: 4.5 }}>
        <SlideShow />
      </View>

      <View style={{ flex: 1, marginTop: 5 }}>
        <ScrollView horizontal>
          {renderButton("Mới")}
          {renderButton("Thời sự")}
          {renderButton("Thể thao")}
          {renderButton("Pháp luật")}
          {renderButton("Giáo dục")}
          {renderButton("Kinh tế")}
        </ScrollView>
      </View>

      <View style={{ flex: 9, padding: 12 }}>{renderData()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#225254",
  },
  viewXinChao: {
    flex: 1.5,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  textXinChao: {
    color: "#ffffff",
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "bold",
  },

  viewSearch: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  viewSearchText: {
    backgroundColor: "#ffffff",
    width: "90%",
    height: 44,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textSearch: {
    width: "100%",
    height: "100%",
    marginLeft: 11,
    justifyContent: "center",
  },

  button: {
    backgroundColor: "white",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    borderRadius: 12,
  },
  selectedButton: {
    backgroundColor: "#D9F1F4",
  },
  buttonText: {
    color: "black",
  },
  selectedButtonText: {
    color: "#225254",
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12,
  },
  itemText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  imageContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 85,
    borderRadius: 10,
    flex: 1,
  },
});

export default HomeScreen;
