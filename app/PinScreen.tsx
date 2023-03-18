import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import pins from "../assets/data/pins";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "../components/Themed";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PinScreen = () => {
  const [ratio, setRatio] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const pinId = route.params?.id;
  const pin = pins.find((p) => p.id === pinId);

  useEffect(() => {
    Image.getSize(pin.image, (width, height) => {
      setRatio(width / height);
    });
  }, [pin]);

  const goBack = () => {
    navigation.goBack();
  };

  if (!pin) {
    return <Text>Pin not found!</Text>;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Text style={styles.title}>{pin.title}</Text>
        <TouchableOpacity style={styles.pick_button} activeOpacity={0.9}>
          <Text style={styles.button_text}>Pin</Text>
        </TouchableOpacity>
      </View>
      <Pressable
        onPress={goBack}
        style={[styles.action_button, { top: insets.top + 15 }]}
      >
        <Entypo name={"chevron-left"} size={24} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    margin: 10,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 25,
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  action_button: {
    position: "absolute",
    left: 15,
    backgroundColor: "#252525",
    opacity: 0.8,
    padding: 10,
    borderRadius: 50,
  },
  pick_button: {
    backgroundColor: "#D10000",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
    width: "30%",
    alignSelf: "center",
  },
  button_text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default PinScreen;
