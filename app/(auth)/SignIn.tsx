import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { View, Text, TextInput } from "../../components/Themed";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReveal, setIsReveal] = useState(false);

  const onEye = () => {
    setIsReveal(!isReveal);
  };
  const onLoginPressed = async () => {
    router.replace("/ProfileTab");
  };

  const onSignUpPress = () => {
    router.replace("/SignUp");
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Log in to your account</Text>

          <View style={styles.container}>
            {/* <Text style={styles.label}>Email</Text> */}
            <TextInput
              value={email}
              placeholder="Email address"
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          <View style={styles.container}>
            {/* <Text style={styles.label}>Password</Text> */}

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password (at least 8 characters)"
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
              secureTextEntry={!isReveal ? true : false}
              style={styles.input}
            />
            <TouchableOpacity onPress={onEye} style={styles.eye_button}>
              <Feather
                name={!isReveal ? "eye" : "eye-off"}
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton
              text="Log in"
              onPress={onLoginPressed}
              bgColor="#d10000"
              fgColor="white"
              width="50%"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <SocialSignInButtons />
          </View>

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            textSize={16}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  container: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    marginBottom: 100,
  },
  label: {
    fontSize: 18,
    alignContent: "flex-start",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  text: {
    color: "gray",
    fontSize: 14,
    marginVertical: 5,
  },
  link: {
    color: Colors.light.tint,
  },
  input: {
    width: "100%",
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 60,
  },
  eye_button: {
    position: "absolute",
    right: 5,
    top: 12,
    padding: 10,
    borderRadius: 50,
  },
});
