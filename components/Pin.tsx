import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Vibration,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "./Themed";

export default function Pin(props) {
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

  const { title, image } = props.pin;

  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setRatio(width / height);
    });
  }, [image]);

  return (
    <View style={styles.pin}>
      <TouchableWithoutFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
        delayLongPress={300}
      >
        {showIcons ? (
          <View>
            <Image
              source={{ uri: image }}
              style={[styles.image, { aspectRatio: ratio }]}
              blurRadius={30}
            />
            <Pressable onPress={onPin} style={styles.action_button}>
              <AntDesign name="pushpino" size={24} color="white" />
            </Pressable>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            style={[styles.image, { aspectRatio: ratio }]}
          />
        )}
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{showIcons ? title : truncate(title)}</Text>
    </View>
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
