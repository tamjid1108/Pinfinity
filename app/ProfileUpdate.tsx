import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import {
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  useColorScheme,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/auth";
import profile from "../backend/profile";

const ProfileUpdate = () => {
  const route = useRoute();
  const [image, setImage] = useState(null);

  const [firstname, setFirstname] = useState(route.params?.firstname);
  const [surname, setSurname] = useState(route.params?.surname);
  const [username, setUsername] = useState(route.params?.username);
  const [about, setAbout] = useState(route.params?.about);
  const [aboutLength, setAboutLength] = useState(route.params?.about.length);
  const [profileUri, setProfileUri] = useState(route.params?.profileUri);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  // useEffect(() => {
  //   profile
  //     .get("/get-user/" + user.uid)
  //     .then((response) => {
  //       setFirstname(response.data.firstname);
  //       setSurname(response.data.surname);
  //       setUsername(response.data.username);
  //       setAbout(response.data.about);
  //       setProfileUri(response.data.profileUri);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onUpdatePressed = () => {
    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("surname", surname);
    formData.append("username", username);
    formData.append("about", about);
    if (image != null) {
      formData.append("profile", {
        uri: image,
        type: "image/jpeg",
        name: user.uid + ".jpeg",
      });
    }

    // console.log(image);
    // console.log(image.uri);
    // console.log(image.type);
    // console.log(image.fileName);

    setIsLoading(true);
    profile
      .put("/update-user/" + user.uid, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log("User updated");
        setIsLoading(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
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
                      uri: profileUri,
                    }
              }
              style={styles.image}
            />
            {/* <Image
                key={key}
                source={{ uri }}
                style={{ width: 100, height: 100 }}
                onError={reloadImage}
            /> */}
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

          <Text style={styles.input_title}>User name</Text>
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

        <View>
          <ActivityIndicator
            animating={isLoading}
            color="#d10000"
            size="large"
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
    height: 150,
    aspectRatio: 1,
    borderRadius: 100,
  },
  input_title: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 15,
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
    marginBottom: 20,
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
