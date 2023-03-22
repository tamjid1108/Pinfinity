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
import pins from "../../assets/data/pins";
import Colors from "../../constants/Colors";
import { useState } from "react";
import { BottomSheet } from "react-native-btr";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../context/auth";
import { useNavigation } from "@react-navigation/native";

export default function ProfileTab() {
  const navigator = useNavigation();
  const colorScheme = useColorScheme();
  const { signout } = useAuth();

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const openEditProfile = () => {
    navigator.navigate("ProfileUpdate");
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
              uri: "http://10.1.236.13:8000/user/get-user/1679413276630-pinfinity-JHX.jpeg",
            }}
            style={styles.image}
          />
        </View>

        <Text style={styles.name}>Tamjid Logan</Text>
        <Text style={styles.subtitle}>@tam_11</Text>

        <Text style={styles.subtitle}>123 followers | 101 following</Text>
      </View>
      <View>
        <Text style={styles.title}>Your pins, right here!</Text>
        <MasonryList pins={pins} />
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
    paddingVertical: 20,
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
