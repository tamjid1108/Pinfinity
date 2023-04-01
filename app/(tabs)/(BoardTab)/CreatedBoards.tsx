import { FlatList, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "../../../components/Themed";
import BoardPreview from "../../../components/BoardPreview";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/auth";
import boards from "../../../backend/boards";

const CreatedBoards = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const fetchDetails = useCallback(() => {
    boards
      .get("/get-boards/" + user.uid)
      .then((response) => {
        setMyBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useFocusEffect(
    useCallback(() => {
      fetchDetails();
    }, [fetchDetails])
  );

  const [myBoards, setMyBoards] = useState([]);

  const renderItem = (board) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("IndividualBoard", { board: board.item });
        }}
      >
        {/* <Pressable> */}
        <BoardPreview board={board.item} />
      </Pressable>

      // </Pressable>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.preview_example}>
          <Text style={styles.title}>Pin to create boards!</Text>
        </View>
        <FlatList
          data={myBoards}
          renderItem={renderItem}
          keyExtractor={(board) => board.boardid}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default CreatedBoards;

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
