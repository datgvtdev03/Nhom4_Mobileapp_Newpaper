import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, ScrollView, Text, Dimensions, Animated } from "react-native";

const SlideShow = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = async () => {
    try {
      const response = await fetch("https://6399d10b16b0fdad774a46a6.mockapi.io/facebook");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * windowWidth, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset;
          const currentIndex = Math.round(contentOffset.x / windowWidth);
          setActiveIndex(currentIndex);
        }}
        contentContainerStyle={{ width: windowWidth * images.length }}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image?.uri?.uri }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  slide: {
    width: Dimensions.get("window").width,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationText: {
    fontSize: 20,
    color: "gray",
    marginHorizontal: 5,
  },
  paginationActiveText: {
    color: "black",
  },
});

export default SlideShow;



