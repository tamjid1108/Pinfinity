import {
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "../../components/Themed";
import MasonryList from "../../components/MasonryList";
// import pins from "../../assets/data/pins";
import Colors from "../../constants/Colors";
import { useState, useEffect, useCallback } from "react";
import { BottomSheet } from "react-native-btr";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../context/auth";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import profile from "../../backend/profile";
import pins from "../../backend/pins";

export default function ProfileTab() {
  const navigator = useNavigation();
  const [mypins, setMyPins] = useState([]);
  const colorScheme = useColorScheme();
  const { signout, user } = useAuth();
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
      .get("/get-user/" + user.uid)
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
      .get("/get-pins/" + user.uid)
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

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const openEditProfile = () => {
    setVisible(!visible);
    navigator.navigate("ProfileUpdate", {
      firstname,
      surname,
      username,
      about,
      profileUri,
    });
  };

  return (
    <ScrollView>
      <View style={styles.top_container}>
        <Pressable style={{ padding: 20 }} onPress={toggleBottomNavigationView}>
          <SimpleLineIcons
            name="options-vertical"
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        </Pressable>
      </View>
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
        <Text style={styles.title}>Your pins, right here!</Text>
        <MasonryList pins={mypins} />
      </View>
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
      >
        <View
          style={[
            styles.bottom_container,
            { backgroundColor: Colors[colorScheme ?? "light"].inputBackground },
          ]}
        >
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            Profile settings
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={openEditProfile}>
              <Text style={styles.settings_text}>Edit public profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                signout();
              }}
            >
              <Text style={styles.settings_text}>Logout</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            text="Close"
            onPress={toggleBottomNavigationView}
            bgColor="#656565"
            fgColor="white"
            textSize={18}
            width="30%"
          />
        </View>
      </BottomSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
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
