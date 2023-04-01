import { Text, View } from "../../components/Themed";
import { useState } from "react";
import AutoScrollView from "../../components/AutoScrollView";
import { StyleSheet, useColorScheme } from "react-native";
import { SearchBar } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { ScrollView, ImageBackground } from "react-native";

// const travel = require("../../assets/data/travel");

const SearchTab = () => {
  const colorScheme = useColorScheme();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const images = [
    "https://source.unsplash.com/random/800x800?travel",
    "https://source.unsplash.com/random/800x800?sun",
    "https://source.unsplash.com/random/800x800?cat",
    "https://source.unsplash.com/random/800x800?beach",
    "https://source.unsplash.com/random/800x800?city",
  ];

  return (
    <ScrollView>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          position: "absolute",
          top: 60,
          width: "95%",
          height: 60,

          alignSelf: "center",
          zIndex: 1,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderColor: Colors[colorScheme ?? "light"].background,
          borderRadius: 50,
        }}
        inputContainerStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          height: 40,
          borderRadius: 50,
        }}
        searchIcon={
          <Feather
            name="search"
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        }
      />

      <AutoScrollView images={images} />

      <Text style={styles.title}>Popular on Pinfinity</Text>

      <View style={styles.container}>
        <View style={styles.column}>
          <ImageBackground
            source={require("../../assets/images/popular/travel.jpg")}
            style={styles.image}
            blurRadius={2}
            borderRadius={18}
          >
            <Text style={styles.popular}>Travel</Text>
          </ImageBackground>
          <ImageBackground
            source={require("../../assets/images/popular/fashion.jpg")}
            style={styles.image}
            blurRadius={2}
            borderRadius={18}
          >
            <Text style={styles.popular}>Fashion</Text>
          </ImageBackground>
          <ImageBackground
            source={require("../../assets/images/popular/food.jpg")}
            style={styles.image}
            blurRadius={2}
            borderRadius={18}
          >
            <Text style={styles.popular}>Food</Text>
          </ImageBackground>
        </View>
        <View style={styles.column}>
          <ImageBackground
            source={require("../../assets/images/popular/music.jpg")}
            style={styles.image}
            blurRadius={2}
            borderRadius={18}
          >
            <Text style={styles.popular}>Music</Text>
          </ImageBackground>
          <ImageBackground
            source={require("../../assets/images/popular/sports.jpg")}
            style={styles.image}
            blurRadius={2}
            borderRadius={18}
          >
            <Text style={styles.popular}>Sports</Text>
          </ImageBackground>
          <ImageBackground
            source={require("../../assets/images/popular/nature.jpg")}
            style={styles.image}
            blurRadius={2}
            borderRadius={18}
          >
            <Text style={styles.popular}>Nature</Text>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  image: {
    width: 180,
    height: 120,
    marginBottom: 10,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    marginBottom: 30,
  },
  popular: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

export default SearchTab;
