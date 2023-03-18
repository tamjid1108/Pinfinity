import { StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "../../components/Themed";
import MasonryList from "../../components/MasonryList";
import pins from "../../assets/data/pins";

export default function ProfileTab() {
  return (
    <ScrollView>
      <View style={styles.profile}>
        <View>
          <Image
            source={{
              uri: "https://media.licdn.com/dms/image/D5603AQE46ZBPlCLQEg/profile-displayphoto-shrink_800_800/0/1673192951205?e=2147483647&v=beta&t=6JLQp8jth0E43xMALYIHYEDLOBmqc83MBTaV9AIIPzo",
            }}
            style={styles.image}
          />
          <Pressable style={styles.action_button}>
            <Feather name="edit-2" size={24} color="white" />
          </Pressable>
        </View>

        <Text style={styles.name}>Tamjid Logan</Text>
        <Text style={styles.subtitle}>@tam_11</Text>

        <Text style={styles.subtitle}>123 followers | 101 following</Text>
      </View>
      <View>
        <Text style={styles.title}>Your pins, right here!</Text>
        <MasonryList pins={pins} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.7,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
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
