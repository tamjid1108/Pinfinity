import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

const AutoScrollView = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < images.length - 1) {
        scrollViewRef.current.scrollTo({
          x: (currentIndex + 1) * windowWidth,
          y: 0,
          animated: true,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          setCurrentIndex(
            Math.round(event.nativeEvent.contentOffset.x / windowWidth)
          );
        }}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 450,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    width: windowWidth,
    aspectRatio: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default AutoScrollView;
