import { useCallback, useEffect, useState } from "react";
import { ScrollView, RefreshControl, useColorScheme } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import pins from "../../backend/pins";
import MasonryList from "../../components/MasonryList";
import Colors from "../../constants/Colors";

export default function HomeTab() {
  const [allpins, setAllPins] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    pins
      .get("/get-all-pins")
      .then((response) => {
        setRefreshing(false);
        setAllPins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    pins
      .get("/get-all-pins")
      .then((response) => {
        setAllPins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // <SkeletonContent
    //   containerStyle={{ flex: 1, width: 300 }}
    //   isLoading={isLoading}
    // >
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={
            Colors[colorScheme ?? "light"].inputBackground
          }
          colors={[Colors[colorScheme ?? "light"].tint]}
        ></RefreshControl>
      }
    >
      <MasonryList pins={allpins} />
    </ScrollView>
    // </SkeletonContent>
  );
}
