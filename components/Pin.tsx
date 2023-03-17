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
    if (title.length > 15) {
      return title.substring(0, 15) + "...";
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
        delayLongPress={500}
      >
        {showIcons ? (
          <View>
            <Image
              source={{ uri: image }}
              style={[styles.image, { aspectRatio: ratio }]}
              blurRadius={30}
            />
            <Pressable onPress={onPin} style={styles.action_button}>
              <AntDesign name="pushpino" size={28} color="black" />
            </Pressable>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            style={[styles.image, { aspectRatio: ratio }]}
          />
        )}
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{truncate(title)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    marginBottom: 20,
    padding: 4,
  },
  image: {
    width: "100%",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  action_button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#ebebeb",
    padding: 10,
    borderRadius: 50,
  },
});
