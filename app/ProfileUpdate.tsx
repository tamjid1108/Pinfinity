import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  useColorScheme,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [aboutLength, setAboutLength] = useState(0);
  const [firstname, setFirstname] = useState("HappySoul");
  const [surname, setSurname] = useState("_");
  const [username, setUsername] = useState("happysoul");
  const [about, setAbout] = useState("");
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const makeChanges = (value) => {
    setAbout(value);
    setAboutLength(value.length);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onUpdatePressed = () => {
    console.warn("Update pressed");
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={styles.title}>Public profile</Text>

        <View>
          <View style={styles.container}>
            <Image
              source={
                image
                  ? { uri: image }
                  : {
                      uri: "https://media.licdn.com/dms/image/D5603AQE46ZBPlCLQEg/profile-displayphoto-shrink_800_800/0/1673192951205?e=2147483647&v=beta&t=6JLQp8jth0E43xMALYIHYEDLOBmqc83MBTaV9AIIPzo",
                    }
              }
              style={styles.image}
            />
            <Pressable style={styles.edit_button} onPress={pickImage}>
              <Feather name="edit-2" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={goBack} style={styles.action_button}>
          <Entypo
            name={"chevron-left"}
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        </Pressable>

        <View style={styles.root}>
          <Text style={styles.input_title}>First name</Text>
          <TextInput
            value={firstname}
            onChangeText={setFirstname}
            multiline={true}
            cursorColor={Colors[colorScheme ?? "light"].tint}
            placeholder=""
            placeholderTextColor={
              Colors[colorScheme ?? "light"].inputPlaceholder
            }
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          />

          <Text style={styles.input_title}>Surname</Text>
          <TextInput
            value={surname}
            onChangeText={setSurname}
            cursorColor={Colors[colorScheme ?? "light"].tint}
            placeholder=""
            placeholderTextColor={
              Colors[colorScheme ?? "light"].inputPlaceholder
            }
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          />

          <Text style={styles.input_title}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            cursorColor={Colors[colorScheme ?? "light"].tint}
            placeholder=""
            placeholderTextColor={
              Colors[colorScheme ?? "light"].inputPlaceholder
            }
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.input_title}>About </Text>
            <Text style={[styles.input_title, { opacity: 0.5, fontSize: 15 }]}>
              {aboutLength}/100
            </Text>
          </View>

          <TextInput
            value={about}
            onChangeText={makeChanges}
            cursorColor={Colors[colorScheme ?? "light"].tint}
            multiline={true}
            maxLength={100}
            placeholder="Tell your story"
            placeholderTextColor={
              Colors[colorScheme ?? "light"].inputPlaceholder
            }
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            text="Update"
            onPress={onUpdatePressed}
            bgColor="#d10000"
            fgColor="white"
            width="50%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    margin: 30,
    fontSize: 22,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 100,
  },
  input_title: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 20,
  },
  action_button: {
    position: "absolute",
    left: 20,
    top: 20,
    opacity: 0.8,
    padding: 10,
    borderRadius: 50,
  },
  root: {
    flex: 1,
    padding: 20,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 10,
  },
  // input: {
  //   height: 50,
  //   borderRadius: 10,
  //   fontSize: 20,
  //   width: "90%",
  //   marginLeft: 15,
  //   marginTop: 10,
  //   fontWeight: "bold",
  // },
  input: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    width: "80%",
  },
  edit_button: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#D10000",
    padding: 10,
    borderRadius: 50,
  },
  container: {
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",

    marginBottom: 20,
  },
});

export default ProfileUpdate;
