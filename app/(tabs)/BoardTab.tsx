import { FlatList, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../components/Themed";
import BoardPreview from "../../components/BoardPreview";
import boards from "../../assets/data/boards";

const BoardTab = () => {
  const renderItem = (board) => {
    return <BoardPreview board={board.item} />;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.preview_example}>
          <Text style={styles.title}>Pin to create boards!</Text>
        </View>
        <FlatList
          data={boards}
          renderItem={renderItem}
          keyExtractor={(board) => board.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default BoardTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 40,
    fontWeight: "bold",
    color: "white",
  },
  preview_example: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    margin: 40,
    backgroundColor: "#d10000",
    borderRadius: 10,
  },
});
