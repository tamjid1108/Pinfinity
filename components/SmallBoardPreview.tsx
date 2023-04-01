import { StyleSheet, Image } from "react-native";
import React from "react";
import { View } from "./Themed";

const SmallBoardPreview = ({ board }) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pinsArray[0].pinUri }}
          style={{
            width: "100%",
            aspectRatio: 0.5,
            margin: 1,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View style={styles.column}>
        {board.pinsArray[1] ? (
          <Image
            source={{ uri: board.pinsArray[1].pinUri }}
            style={styles.box1}
          />
        ) : (
          <View style={styles.box1}></View>
        )}
        {board.pinsArray[2] ? (
          <Image
            source={{ uri: board.pinsArray[2].pinUri }}
            style={styles.box2}
          />
        ) : (
          <View style={styles.box2}></View>
        )}
      </View>
    </View>
  );
};

export default SmallBoardPreview;

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column: {
    width: 50,
    backgroundColor: "transparent",
    marginRight: 3,
  },
  box1: {
    height: 49,
    aspectRatio: 1,
    marginBottom: 2,
    backgroundColor: "#65656555",
    borderTopRightRadius: 10,
  },
  box2: {
    height: 49,
    aspectRatio: 1,
    backgroundColor: "#65656555",
    borderBottomRightRadius: 10,
  },
});
