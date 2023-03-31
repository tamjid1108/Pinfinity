import { StyleSheet } from "react-native";
import React from "react";
import Pin from "./Pin";
import { View } from "./Themed";

export default function MasonryList({ pins }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {pins
          .filter((pin, index) => index % 2 === 0)
          .map((pin) => (
            <Pin pin={pin} key={pin.pinid} />
          ))}
      </View>
      <View style={{ flex: 1 }}>
        {pins
          .filter((pin, index) => index % 2 === 1)
          .map((pin) => (
            <Pin pin={pin} key={pin.pinid} />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 4,
  },
});
