import {
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  findNodeHandle,
} from "react-native";
import React from "react";
import { View, Text } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import { useRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";

const CreatePin = () => {
  const router = useRouter();
  const route = useRoute();

  const colorScheme = useColorScheme();
  const image = route.params?.image;
  const ratio = route.params?.ratio;

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const goBack = () => {
    router.back();
  };
  const onPost = () => {
    router.replace("/HomeTab");
  };
  return (
    <SafeAreaView>
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
        <CustomButton
          text="Post"
          onPress={onPost}
          bgColor="#d10000"
          fgColor="white"
          textSize={18}
          width="25%"
        />
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
        multiline
        onChangeText={setDescription}
        maxLength={100}
        placeholder="Say more about this pin"
        placeholderTextColor={Colors[colorScheme ?? "light"].inputPlaceholder}
        style={[styles.input, { color: Colors[colorScheme ?? "light"].text }]}
      />
      <View style={{ height: 300 }}></View>
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
