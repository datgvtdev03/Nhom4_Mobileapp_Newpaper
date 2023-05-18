import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";

import SlideShow from "../../Shared/SlideShow";
import UploadImageScreen from "../../Shared/UploadImageScreen";
import CustomTextInput1 from "../../Shared/CustomTextInput1";
import Header from "../../Shared/Header";
import CustomTextInput from "../../Shared/CustomTextInput";

const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [data, setData] = useState(null);


  const getDataFromAPI = async () => {
    try {
      const response = await fetch("https://632c7f2b5568d3cad8870c47.mockapi.io/friends");
      const data = await response.json();
      setData(data);
      console.log("data: " + JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

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

  // const renderData = () => {
  //   if (data) {
  //     return (
  //       <FlatList
  //         data={data}
  //         renderItem={({ item }) => (
  //           <View style={styles.itemContainer}>
  //             <Text style={styles.itemText}>{item.title}</Text>
  //             <Text style={styles.itemDescription}>{item.detail}</Text>
  //           </View>
  //         )}
  //         keyExtractor={(item) => item.id.toString()}
  //       />
  //     );
  //   } else {
  //     return (
  //       <View style={styles.dataContainer}>
  //         <Text style={styles.dataText}>Đang tải dữ liệu...</Text>
  //       </View>
  //     );
  //   }
  // };


  const renderData = () => {
    if (data) {
      
      const filteredData = data.filter(item => item.loai === selectedButton);
  
      if (filteredData.length > 0) {
        return (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.detail}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        );
      } else {
        return (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Không có dữ liệu phù hợp</Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Đang tải dữ liệu...</Text>
        </View>
      );
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

    setSelectedButton("Mới");
    getDataFromAPI()
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
    backgroundColor: "#D9F1F4",
  },
  buttonText: {
    color: "black",
  },
  selectedButtonText: {
    color: "#225254",
  },
});

export default HomeScreen;
