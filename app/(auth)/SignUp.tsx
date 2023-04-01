import {
  ActivityIndicator,
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
import { useAuth } from "../../context/auth";

const SignUp = () => {
  const router = useRouter();
  const { signUp } = useAuth();

  const colorScheme = useColorScheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReveal, setIsReveal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEye = () => {
    setIsReveal(!isReveal);
  };

  const onRegisterPressed = async () => {
    setIsLoading(true);
    signUp(name, email, password);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const onSignInPress = () => {
    router.push("/SignIn");
  };

  const onTermsOfUsePressed = () => {
    // console.warn("terms of use");
  };

  const onPrivacyPressed = () => {
    // console.warn("privacy");
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>

          <View style={styles.container}>
            {/* <Text style={styles.label}>Name</Text> */}
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor={
                Colors[colorScheme ?? "light"].inputPlaceholder
              }
              style={styles.input}
            />
          </View>

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

          <View style={{ marginTop: 20 }}>
            <ActivityIndicator
              animating={isLoading}
              color="#d10000"
              size="large"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <CustomButton
              text="Register"
              onPress={onRegisterPressed}
              bgColor="#d10000"
              fgColor="white"
              width="50%"
            />
          </View>
          <Text style={styles.text}>
            By registering, you confirm that you accept our{" "}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
          </Text>

          <View style={styles.buttonsContainer}>
            <SocialSignInButtons />
          </View>

          <CustomButton
            text="Have an account? Sign in"
            onPress={onSignInPress}
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
    marginBottom: 20,
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
    marginBottom: 40,
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
    fontSize: 18,
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
