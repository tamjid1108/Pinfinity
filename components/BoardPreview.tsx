import { StyleSheet, Image } from "react-native";
import React from "react";
import pins from "../assets/data/pins";
import { View, Text } from "./Themed";

interface IPin {
  id: string;
  title: string;
  image: string;
}

interface IBoard {
  id: string;
  title: string;
  pins: IPin[];
}

const Grid1 = ({ board }: IBoard) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[0].image }}
          style={{
            width: "100%",
            aspectRatio: 1.5,
            margin: 1,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

const Grid2 = ({ board }: IBoard) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[0].image }}
          style={{
            width: "100%",
            aspectRatio: 0.75,
            margin: 1,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[1].image }}
          style={{
            width: "100%",
            aspectRatio: 0.75,
            margin: 1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

const Grid3 = ({ board }: IBoard) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[0].image }}
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
        <Image
          source={{ uri: board.pins[1].image }}
          style={{ width: "100%", aspectRatio: 0.5, margin: 1 }}
        />
      </View>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[2].image }}
          style={{
            width: "100%",
            aspectRatio: 0.5,
            margin: 1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

const Grid4 = ({ board }: IBoard) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[0].image }}
          style={{
            width: "100%",
            aspectRatio: 1.5,
            margin: 1,
            borderTopLeftRadius: 10,
          }}
        />
        <Image
          source={{ uri: board.pins[1].image }}
          style={{
            width: "100%",
            aspectRatio: 1.5,
            margin: 1,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[2].image }}
          style={{
            width: "100%",
            aspectRatio: 1.5,
            margin: 1,
            borderTopRightRadius: 10,
          }}
        />
        <Image
          source={{ uri: board.pins[3].image }}
          style={{
            width: "100%",
            aspectRatio: 1.5,
            margin: 1,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

const Grid5 = ({ board }: IBoard) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[0].image }}
          style={{
            width: "100%",
            aspectRatio: 0.496,
            margin: 1,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[1].image }}
          style={{
            width: "100%",
            aspectRatio: 1,
            margin: 1,
          }}
        />
        <Image
          source={{ uri: board.pins[2].image }}
          style={{
            width: "100%",
            aspectRatio: 1,
            margin: 1,
          }}
        />
      </View>
      <View style={styles.column}>
        <Image
          source={{ uri: board.pins[3].image }}
          style={{
            width: "100%",
            aspectRatio: 1,
            margin: 1,
            borderTopRightRadius: 10,
          }}
        />
        <Image
          source={{ uri: board.pins[4].image }}
          style={{
            width: "100%",
            aspectRatio: 1,
            margin: 1,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

const BoardPreview = ({ board }: IBoard) => {
  let result: JSX.Element;
  switch (board.pins.length) {
    case 1:
      result = <Grid1 board={board} />;
      break;
    case 2:
      result = <Grid2 board={board} />;
      break;
    case 3:
      result = <Grid3 board={board} />;
      break;
    case 4:
      result = <Grid4 board={board} />;
      break;
    default:
      result = <Grid5 board={board} />;
      break;
  }
  return (
    <View>
      <Text style={styles.title}>{board.title}</Text>
      <View style={styles.preview}>{result}</View>
    </View>
  );
};

export default BoardPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  preview: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
