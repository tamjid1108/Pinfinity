import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
interface ICustomButton {
  onPress: () => void;
  text: string;
  bgColor?: string;
  fgColor?: string;
  width?: string;
  textSize?: number;
}

const CustomButton = ({
  onPress,
  text,
  bgColor,
  fgColor,
  width,
  textSize,
}: ICustomButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        bgColor ? { backgroundColor: bgColor } : {},
        width ? { width: width } : {},
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          fgColor ? { color: fgColor } : {},
          textSize ? { fontSize: textSize } : {},
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
