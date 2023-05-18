import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import SlideShow from "../../Shared/SlideShow";
import UploadImageScreen from "../../Shared/UploadImageScreen";
import CustomTextInput1 from "../../Shared/CustomTextInput1";
import Header from "../../Shared/Header";
import CustomTextInput from "../../Shared/CustomTextInput";

const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
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

  const renderData = () => {
    switch (selectedButton) {
      case 'Mới':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Mới</Text>
          </View>
        );
      case 'Nổi bật':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Nổi bật</Text>
          </View>
        );
      case 'Thời sự':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Thời sự</Text>
          </View>
        );
      case 'Thể thao':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Thể thao</Text>
          </View>
        );
      case 'Pháp luật':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Pháp luật</Text>
          </View>
        );
      case 'Giáo dục':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Giáo dục</Text>
          </View>
        );
      case 'Kinh tế':
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Dữ liệu cho button Kinh tế</Text>
          </View>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
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
  }, []);

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
          {renderButton("Nổi bật")}
          {renderButton("Thời sự")}
          {renderButton("Thể thao")}
          {renderButton("Pháp luật")}
          {renderButton("Giáo dục")}
          {renderButton("Kinh tế")}
        </ScrollView>
      </View>

      <View style={{ flex: 9 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {renderData()}
      </View>
      </View>
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
    backgroundColor: "blue",
  },
  buttonText: {
    color: "black",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default HomeScreen;
