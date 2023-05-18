import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const ProfileScreen = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API và lấy dữ liệu
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://6399d10b16b0fdad774a46a6.mockapi.io/booCar"); // Thay thế URL API của bạn vào đây
      const jsonData = await response.json();
      setData(jsonData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const renderData = () => {
    if (!selectedButton) {
      return null;
    }

    // Lọc dữ liệu dựa trên selectedButton
    const filteredData = data.filter((item) => item.role === selectedButton);

    const renderItem = ({ item }) => (
      <Text>{item.fullName}</Text>
    );

    return (
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
    );
  };

  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={() => handleButtonPress("Mới")}>
        <Text>Mới</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleButtonPress("Nổi bật")}>
        <Text>Nổi bật</Text>
      </TouchableOpacity>
      {/* Các button khác */}
      {renderData()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default ProfileScreen;