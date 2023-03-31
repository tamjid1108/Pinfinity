import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Vibration,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { useNavigation } from "@react-navigation/native";
import PinScreen from "./PinScreen";

export default function Pin(props) {
  const navigation = useNavigation();

  const [showIcons, setShowIcons] = useState(false);
  const [ratio, setRatio] = useState(1);

  const handleLongPress = () => {
    setShowIcons(true);
    Vibration.vibrate(50);
  };

  const truncate = (title) => {
    if (title.length > 18) {
      return title.substring(0, 18) + "...";
    }
    return title;
  };

  const handlePress = () => {
    setShowIcons(false);
  };

  const onPin = () => {};

  const { pinid, pinUri, title, description } = props.pin;

  useEffect(() => {
    Image.getSize(pinUri, (width, height) => {
      setRatio(width / height);
    });
  }, [pinUri]);

  const openPinScreen = () => {
    navigation.navigate("PinScreen", { pinid, pinUri, title, description }); // navigate to PinScreen with a pin object passed as a parameter
  };

  return (
    <Pressable style={styles.pin} onPress={openPinScreen}>
      <TouchableWithoutFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
        delayLongPress={300}
      >
        {showIcons ? (
          <View>
            <Image
              source={{ uri: pinUri }}
              style={[styles.image, { aspectRatio: ratio }]}
              blurRadius={30}
            />
            <Pressable onPress={onPin} style={styles.action_button}>
              <AntDesign name="pushpino" size={24} color="white" />
            </Pressable>
          </View>
        ) : (
          <Image
            source={{ uri: pinUri }}
            style={[styles.image, { aspectRatio: ratio }]}
          />
        )}
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{showIcons ? title : truncate(title)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    marginBottom: 10,
    padding: 6,
  },
  image: {
    width: "100%",
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  action_button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#D10000",
    padding: 10,
    borderRadius: 50,
  },
});
