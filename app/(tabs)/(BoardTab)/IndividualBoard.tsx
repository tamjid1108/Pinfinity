import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import MasonryList from "../../../components/MasonryList";
import { useRouter, useSearchParams } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput } from "../../../components/Themed";
import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import Colors from "../../../constants/Colors";
import CustomButton from "../../../components/CustomButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import boards from "../../../backend/boards";

const IndividualBoard = () => {
  const router = useRouter();
  const route = useRoute();
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  board = route.params?.board;
  const [finaltitle, setFinalTitle] = React.useState(board.title);
  const [title, setTitle] = React.useState(board.title);

  const goBack = () => {
    router.back();
  };

  const onDeletePressed = () => {
    boards
      .delete("/delete-board/" + board.boardid)
      .then((response) => {
        router.replace("/CreatedBoards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSavePressed = () => {
    const formData = new FormData();
    formData.append("title", title);
    boards
      .put("/update-board/" + board.boardid, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFinalTitle(title);
        setVisible(false);
        console.log("board updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.top_container}>
        <Pressable onPress={goBack} style={styles.back_button}>
          <Entypo
            name={"chevron-left"}
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        </Pressable>
        <Pressable
          style={{ padding: 10, margin: 20 }}
          onPress={toggleBottomNavigationView}
        >
          <SimpleLineIcons
            name="options"
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        </Pressable>
      </View>

      <View style={{ marginTop: 20, marginHorizontal: 30, marginBottom: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          {finaltitle}
        </Text>
      </View>
      <MasonryList pins={board.pinsArray} />

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
      >
        <View
          style={[
            styles.bottom_container,
            { backgroundColor: Colors[colorScheme ?? "light"].inputBackground },
          ]}
        >
          <TextInput
            onChangeText={setTitle}
            placeholder={board.title + " (tap to edit)  "}
            textAlign="center"
            placeholderTextColor={
              Colors[colorScheme ?? "light"].inputPlaceholder
            }
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          />
          <View
            style={[
              styles.action_container,
              {
                backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
              },
            ]}
          >
            <CustomButton
              text="Delete"
              onPress={onDeletePressed}
              bgColor="#656565"
              fgColor="white"
              textSize={18}
              width="40%"
            />
            <CustomButton
              text="Save"
              onPress={onSavePressed}
              bgColor="#d10000"
              textSize={18}
              fgColor="white"
              width="40%"
            />
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

export default IndividualBoard;

const styles = StyleSheet.create({
  top_container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  back_button: {
    padding: 10,
    margin: 10,
  },
  bottom_container: {
    backgroundColor: "black",
    alignItems: "center",
    width: "100%",
    height: 200,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 10,
    marginBottom: 40,
  },
  action_container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
