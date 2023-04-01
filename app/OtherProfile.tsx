import {
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Text, View } from "../components/Themed";
import MasonryList from "../components/MasonryList";
import { useState, useEffect, useCallback } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import profile from "../backend/profile";
import pins from "../backend/pins";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";

export default function ProfileTab() {
  const route = useRoute();
  const navigator = useNavigation();
  const [theirpins, setMyPins] = useState([]);
  const colorScheme = useColorScheme();
  const userid = route.params.userid;
  const [number_of_pins, setNumber_of_pins] = useState(0);

  // const isFocused = useIsFocused();

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profileUri, setProfileUri] = useState(
    "https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png"
  );

  const fetchDetails = useCallback(() => {
    profile
      .get("/get-user/" + userid)
      .then((response) => {
        setFirstname(response.data.firstname);
        setSurname(response.data.surname);
        setUsername(response.data.username);
        setAbout(response.data.about);
        setProfileUri(response.data.profileUri);
      })
      .catch((error) => {
        console.log(error);
      });

    pins
      .get("/get-pins/" + userid)
      .then((response) => {
        // console.log(response.data);
        setMyPins(response.data);
        setNumber_of_pins(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useFocusEffect(
    useCallback(() => {
      fetchDetails();
    }, [fetchDetails])
  );

  const goBack = () => {
    navigator.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Pressable onPress={goBack} style={styles.back_button}>
          <Entypo
            name={"chevron-left"}
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        </Pressable>
        <View style={styles.profile}>
          <View>
            <Image
              source={{
                uri: profileUri,
              }}
              style={styles.image}
            />
          </View>

          <Text style={styles.name}>{firstname + " " + surname}</Text>
          <Text style={styles.subtitle}>
            {username != "" ? "@" + username : ""}
          </Text>

          <View style={styles.info}>
            <Text style={styles.info_text}>{"123\nFollowers"}</Text>
            <Text style={styles.info_text}>{`${number_of_pins}\nPins`}</Text>
            <Text style={styles.info_text}>{"101\nFollowing"}</Text>
          </View>
          <View style={{ width: "100%", marginBottom: 20 }}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.subtitle}>{about}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Get inspired!</Text>
          <MasonryList pins={theirpins} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 100,
  },
  back_button: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  info: {
    marginVertical: 20,
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#d10000",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderRadius: 10,
  },
  info_text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
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
  top_container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  bottom_container: {
    backgroundColor: "black",
    alignItems: "center",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  settings_text: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
  },
});
