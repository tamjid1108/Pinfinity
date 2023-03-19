import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn("onSignInFacebook");
  };

  const onSignInGoogle = () => {
    console.warn("onSignInGoogle");
  };

  const onSignInApple = () => {
    console.warn("onSignInApple");
  };

  return (
    <>
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#4285f4"
        fgColor="#fff"
        width="80%"
        textSize={18}
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#fff"
        fgColor="#363636"
        width="80%"
        textSize={18}
      />
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#4267B2"
        fgColor="#fff"
        width="80%"
        textSize={18}
      />
    </>
  );
};

export default SocialSignInButtons;
