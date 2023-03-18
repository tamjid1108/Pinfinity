import { Text, View } from "../../components/Themed";
import { useState } from "react";
import AutoScrollView from "../../components/AutoScrollView";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import { SearchBar } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const SearchTab = () => {
  const colorScheme = useColorScheme();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const images = [
    "https://source.unsplash.com/random/400x400?cat",
    "https://source.unsplash.com/random/400x400?nature",
    "https://source.unsplash.com/random/400x400?food",
    "https://source.unsplash.com/random/400x400?car",
    "https://source.unsplash.com/random/400x400?city",
  ];

  return (
    <View>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          position: "absolute",
          top: 60,
          width: "90%",
          height: 45,
          alignSelf: "center",
          zIndex: 1,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderColor: Colors[colorScheme ?? "light"].background,
          borderRadius: 50,
        }}
        inputContainerStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          height: 30,
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
    </View>
  );
};

export default SearchTab;
