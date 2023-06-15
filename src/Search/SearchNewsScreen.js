import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { API_URL_SEARCH_POSTS } from "../Config/config";
import Header from "../Shared/Header";

const SearchNewsScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (text) => {
    setKeyword(text);
    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`${API_URL_SEARCH_POSTS}?keyword=${text}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Tìm kiếm bài viết"} onPress={() => navigation.goBack()} />
      <TextInput
        style={styles.textInput}
        placeholder="Nhập từ khóa"
        value={keyword}
        onChangeText={handleSearch}
      />
      {searchResults.length > 0 ? (
        <Text style={styles.resultText}>
          {searchResults.length} Kết qủa tìm kiếm cho: "{keyword}"
        </Text>
      ) : null}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("DetailNews", {item: item})}>
              <View style={{ flex: 1 }}>
                <Text style={{color: 'gray', marginLeft: 8}}>{item?.theLoai}</Text>
              </View>

              <View style={{ flex: 5, flexDirection: "row" }}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.uri }} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.tieuDe}</Text>
                  <Text numberOfLines={3}>{item.noiDung}</Text>
                </View>
              </View>
              </TouchableOpacity>
              

            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <ActivityIndicator size="large" color="#225254" />
          <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    borderWidth: 1,
    height: 44,
    borderColor: "#225254",
    margin: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  resultText: {
    marginLeft: 12,
    color: "#225254",
  },
  itemContainer: {
    flexDirection: "column",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#D9F1F4",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 5
  },
  imageContainer: {
    flex: 2,
    padding: 8,
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 5
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
  textContainer: {
    flex: 4,
    padding: 8,
  },
  title: {
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: {
    margin: 12,
    fontSize: 16,
    color: "#888",
  },
});

export default SearchNewsScreen;
