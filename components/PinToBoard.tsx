import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  Pressable,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-native-btr";
import { View, Text, TextInput } from "./Themed";
import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";
import SmallBoardPreview from "./SmallBoardPreview";
import { useAuth } from "../context/auth";
import uuid from "react-native-uuid";
import boards from "../backend/boards";
import { useRouter } from "expo-router";

const PinToBoard = (props) => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const [myBoards, setMyBoards] = useState([]);

  const [title, setTitle] = useState("");

  const [createBoard, setCreatBoard] = useState(false);

  useEffect(() => {
    boards.get("/get-boards/" + user.uid).then((response) => {
      setMyBoards(response.data);
    });
  }, []);

  const saveToExistingBoard = (boardid) => {
    const formData = new FormData();
    formData.append("newpinid", props.pinid);
    boards
      .put("/update-boards/" + boardid, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("pin added to board");
        router.replace("/CreatedBoards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCreatePressed = () => {
    const formData = new FormData();
    const boardid = uuid.v4();
    formData.append("boardid", boardid);
    formData.append("userid", user.uid);
    formData.append("title", title);
    formData.append("firstpinid", props.pinid);

    setIsLoading(true);

    boards
      .post("/create-board", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log("board created");
        router.replace("/CreatedBoards");
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(props.pinid);
  };

  const renderItem = (board) => {
    return (
      <Pressable
        onPress={() => {
          saveToExistingBoard(board.item.boardid);
        }}
      >
        <View
          style={[
            styles.board_info,
            { backgroundColor: Colors[colorScheme ?? "light"].inputBackground },
          ]}
        >
          <SmallBoardPreview board={board.item} />
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
            {board.item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <BottomSheet
      visible={props.visible}
      //setting the visibility state of the bottom sheet
      onBackButtonPress={props.toggle}
      //Toggling the visibility state on the click of the back botton
      onBackdropPress={props.toggle}
    >
      <View
        style={[
          styles.bottom_container,
          { backgroundColor: Colors[colorScheme ?? "light"].inputBackground },
        ]}
      >
        <Text style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}>
          Save to board
        </Text>

        {createBoard ? (
          <>
            <View
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
                marginBottom: 11,
              }}
            >
              <ActivityIndicator
                animating={isLoading}
                color={Colors[colorScheme ?? "light"].tint}
                size="large"
              />
            </View>
            <TextInput
              onChangeText={setTitle}
              placeholder={"Give your board a title"}
              textAlign="center"
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
              style={[
                styles.input,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            />
          </>
        ) : (
          <>
            <View
              style={{
                alignItems: "center",
                backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
                padding: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setCreatBoard(true);
                }}
                style={{
                  backgroundColor: "#d10000",
                  width: "100%",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingVertical: 40,
                    color: "white",
                  }}
                >
                  Create a new board
                </Text>
              </TouchableOpacity>
            </View>
            {myBoards.length != 0 && (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 30,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  or pin to existing boards
                </Text>

                <FlatList
                  data={myBoards}
                  renderItem={renderItem}
                  keyExtractor={(board) => board.boardid}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
          </>
        )}

        <View
          style={{
            alignItems: "center",
            backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {createBoard ? (
            <>
              <CustomButton
                text="Back"
                onPress={() => {
                  setCreatBoard(false);
                }}
                bgColor="#656565"
                fgColor="white"
                textSize={18}
                width="30%"
              />
              <CustomButton
                text="Create"
                onPress={onCreatePressed}
                bgColor="#d10000"
                textSize={18}
                fgColor="white"
                width="30%"
              />
            </>
          ) : (
            <CustomButton
              text="Cancel"
              onPress={props.toggle}
              bgColor="#656565"
              fgColor="white"
              textSize={18}
              width="30%"
            />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default PinToBoard;

const styles = StyleSheet.create({
  bottom_container: {
    width: "100%",
    padding: 20,
    maxHeight: "75%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  board_info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "",
    alignItems: "center",
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
