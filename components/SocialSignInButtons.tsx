import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import { Text } from "../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const SocialSignInButtons = () => {
  const colorScheme = useColorScheme();
  const onSignInFacebook = () => {
    // console.warn("onSignInFacebook");
  };

  const onSignInGoogle = () => {
    // console.warn("onSignInGoogle");
  };

  const onSignInApple = () => {
    // console.warn("onSignInApple");
  };

  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 50 }}>
        or continue with
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../assets/images/authLogos/facebook.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/authLogos/google.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Image
            source={require("../assets/images/authLogos/apple.png")}
            style={styles.logo}
          /> */}
          <View style={{ margin: 25 }}>
            <AntDesign
              name="apple1"
              size={45}
              color={Colors[colorScheme ?? "light"].text}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialSignInButtons;

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
    margin: 25,
  },
});
