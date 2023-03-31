import {
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import pins from "../assets/data/pins";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "../components/Themed";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import PinToBoard from "../components/PinToBoard";

const PinScreen = () => {
  const [ratio, setRatio] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const pinId = route.params?.id;
  const pin = pins.find((p) => p.id === pinId);

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    Image.getSize(pin.image, (width, height) => {
      setRatio(width / height);
    });
  }, [pin]);

  const onPinPressed = () => {
    console.warn("pin it");
  };

  const onFollowPressed = () => {
    console.warn("follow pressed");
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (!pin) {
    return <Text>Pin not found!</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Image
            source={{ uri: pin.image }}
            style={[styles.image, { aspectRatio: ratio }]}
          />

          <View>
            <View style={styles.userinfo}>
              <View style={{ width: "70%" }}>
                <Text style={styles.title}>Tamjid L</Text>
                <Text style={styles.subtitle}>123 followers</Text>
              </View>

              <CustomButton
                text="Follow"
                onPress={onFollowPressed}
                bgColor="#656565"
                fgColor="white"
                textSize={16}
              />
            </View>

            <Text style={styles.pin_title}>{pin.title}</Text>
            <Text style={styles.pin_subtitle}>{pin.description}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <CustomButton
              text="Save"
              onPress={toggleBottomNavigationView}
              bgColor="#d10000"
              fgColor="white"
              width="30%"
            />
          </View>
        </View>
        <Pressable
          onPress={goBack}
          style={[styles.action_button, { top: insets.top - 25 }]}
        >
          <Entypo name={"chevron-left"} size={24} color={"white"} />
        </Pressable>
      </ScrollView>
      <PinToBoard visible={visible} toggle={toggleBottomNavigationView} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  userinfo: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#65656530",
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: "600",
    lineHeight: 25,
    backgroundColor: "#65656530",
  },
  subtitle: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: "400",
    lineHeight: 25,
    backgroundColor: "#65656530",
  },
  pin_title: {
    fontSize: 24,
    // textAlign: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
    lineHeight: 25,
  },
  pin_subtitle: {
    fontSize: 18,
    // textAlign: "center",
    fontWeight: "400",
    marginHorizontal: 20,
    marginBottom: 15,
    lineHeight: 25,
  },

  action_button: {
    position: "absolute",
    left: 15,
    backgroundColor: "#252525",
    opacity: 0.8,
    padding: 10,
    borderRadius: 50,
  },

  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default PinScreen;
