import { StyleSheet, ScrollView } from "react-native";
import pins from "../../assets/data/pins";
import Pin from "../../components/Pin";

import { Text, View } from "../../components/Themed";

export default function HomeTab() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {pins
            .filter((pin, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} />
            ))}
        </View>
        <View style={{ flex: 1 }}>
          {pins
            .filter((pin, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
});
