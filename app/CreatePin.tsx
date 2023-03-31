import {
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  findNodeHandle,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { View, Text } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import { useRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";
import pins from "../backend/pins";
import { useAuth } from "../context/auth";

import uuid from "react-native-uuid";

const CreatePin = () => {
  const router = useRouter();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const colorScheme = useColorScheme();
  const image = route.params?.image;
  const ratio = route.params?.ratio;

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const goBack = () => {
    router.back();
  };
  const onPost = () => {
    const pinid = uuid.v4();
    let formData = new FormData();
    formData.append("pinid", pinid);
    formData.append("userid", user.uid);
    formData.append("title", title);
    formData.append("description", description);
    if (image != null) {
      formData.append("pin", {
        uri: image,
        type: "image/jpeg",
        name: user.uid + "-" + title + ".jpg",
      });
    }

    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);

    setIsLoading(true);
    pins
      .post("/create-pin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        router.replace("/HomeTab");
        setIsLoading(false);
        console.log("posted pin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="always">
        <View
          style={{
            alignItems: "flex-end",
            marginTop: 10,
            marginRight: 15,
          }}
        >
          <Pressable onPress={goBack} style={styles.back_button}>
            <Entypo name={"chevron-left"} size={24} color={"white"} />
          </Pressable>

          {!isLoading ? (
            <CustomButton
              text="Post"
              onPress={onPost}
              bgColor="#d10000"
              fgColor="white"
              textSize={18}
              width="25%"
            />
          ) : (
            <View
              style={{
                paddingHorizontal: 28,
                backgroundColor: "#d10000",
                paddingTop: 7,
                paddingBottom: 6,
                marginTop: 9,
                margin: 9,
                borderRadius: 50,
              }}
            >
              <ActivityIndicator
                animating={isLoading}
                color="#ffffff"
                size="large"
              />
            </View>
          )}
        </View>
        <View>
          <Image
            source={{ uri: image }}
            style={[
              ratio >= 1 ? { width: "70%" } : { height: 300 },
              {
                aspectRatio: ratio,
                marginVertical: 40,
                marginLeft: 30,
                borderRadius: 10,
              },
            ]}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 30,
            marginTop: 20,
          }}
        >
          Title
        </Text>
        <TextInput
          value={title}
          cursorColor={Colors[colorScheme ?? "light"].tint}
          onChangeText={setTitle}
          placeholder="Give your pin a title"
          placeholderTextColor={Colors[colorScheme ?? "light"].inputPlaceholder}
          style={[styles.input, { color: Colors[colorScheme ?? "light"].text }]}
        />

        <Text
          style={{
            fontSize: 18,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Description
        </Text>
        <TextInput
          value={description}
          cursorColor={Colors[colorScheme ?? "light"].tint}
          multiline
          onChangeText={setDescription}
          maxLength={100}
          placeholder="Say more about this pin"
          placeholderTextColor={Colors[colorScheme ?? "light"].inputPlaceholder}
          style={[styles.input, { color: Colors[colorScheme ?? "light"].text }]}
        />
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  back_button: {
    position: "absolute",
    left: 15,
    top: 10,
    backgroundColor: "#252525",
    opacity: 0.8,
    padding: 10,
    borderRadius: 50,
  },
  input: {
    marginHorizontal: 30,
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 10,
    width: "80%",
  },
});
