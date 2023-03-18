import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "../../components/Themed";
import * as ImagePicker from "expo-image-picker";

export default function NewPinTab() {
  const [image, setImage] = useState(null);
  const [ratio, setRatio] = useState(1);

  const onClose = () => {
    setImage(null);
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
      setRatio(result.assets[0].width / result.assets[0].height);
    }
  };

  return (
    <>
      {image ? (
        <>
          <View style={styles.container}>
            <TouchableOpacity style={styles.next_button} activeOpacity={0.9}>
              <Text style={styles.button_text}>Next</Text>
            </TouchableOpacity>

            <View style={{ width: "60%" }}>
              <Image
                source={{ uri: image }}
                style={[styles.preview, { aspectRatio: ratio }]}
              />
              <Pressable onPress={onClose} style={styles.action_button}>
                <Ionicons name="ios-close" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Unleash inspiration</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.pick_button}
            activeOpacity={0.9}
          >
            <Text style={styles.button_text}>Pick</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
  },
  pick_button: {
    backgroundColor: "#D10000",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  next_button: {
    backgroundColor: "#D10000",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    top: 10,
    right: 10,
  },
  button_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  preview: {
    width: "100%",
    borderRadius: 20,
  },
  action_button: {
    position: "absolute",
    bottom: -20,
    right: "50%",
    backgroundColor: "#D10000",
    padding: 10,
    borderRadius: 50,
    transform: [{ translateX: 23 }],
  },
});