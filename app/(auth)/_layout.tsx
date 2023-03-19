import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
