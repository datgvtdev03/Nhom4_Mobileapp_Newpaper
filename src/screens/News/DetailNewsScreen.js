import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import Header from "../../Shared/Header";

const DetailNewsScreen = (props) => {
  const navigation = props.navigation;
  const item = props.route.params?.item;
  return (
    <View style={styles.container}>
      <Header title={item.theLoai} onPress={() => navigation.goBack()} />
      <ScrollView style={{ padding: 12 }}>
        <Image
          style={{ width: "100%", height: 200, borderRadius: 10 }}
          source={{ uri: item?.uri }}
        />

        <Text>{item.tieuDe}</Text>
        <Text>{item.noiDung}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});

export default DetailNewsScreen;
