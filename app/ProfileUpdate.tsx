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

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [firstname, setFirstname] = useState("HappySoul");
  const [surname, setSurname] = useState("_");
  const [username, setUsername] = useState("happysoul");
  const [about, setAbout] = useState("");
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

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

  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={styles.title}>Public profile</Text>

        <View>
          <View style={styles.container}>
            <Image
              source={
                image
                  ? { uri: image }
                  : {
                      uri: "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png",
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
          <View>
            <Text style={styles.subtitle}>First name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme ?? "light"].text,
                },
              ]}
              onChangeText={setFirstname}
              value={firstname}
              placeholder=""
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
            />
          </View>
          <View>
            <Text style={styles.subtitle}>Sur name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme ?? "light"].text,
                },
              ]}
              onChangeText={setSurname}
              value={surname}
              placeholder=""
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
            />
          </View>
          <View>
            <Text style={styles.subtitle}>Username</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme ?? "light"].text,
                },
              ]}
              onChangeText={setUsername}
              value={username}
              placeholder=""
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
            />
          </View>
          <View>
            <Text style={styles.subtitle}>About</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme ?? "light"].text,
                },
              ]}
              onChangeText={setAbout}
              value={about}
              placeholder="Tell your story"
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.pick_button} activeOpacity={0.9}>
          <Text style={styles.button_text}>Update</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  pick_button: {
    backgroundColor: "#D10000",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: "40%",
    alignSelf: "center",
    marginVertical: 20,
  },
  button_text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  action_button: {
    position: "absolute",
    left: 15,
    top: 50,
    opacity: 0.8,
    padding: 10,
    borderRadius: 50,
  },
  root: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    fontSize: 20,
    width: "90%",
    marginLeft: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  edit_button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#D10000",
    padding: 10,
    borderRadius: 50,
  },
  container: {
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default ProfileUpdate;
