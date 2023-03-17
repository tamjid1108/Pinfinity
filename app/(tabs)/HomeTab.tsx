import { ScrollView } from "react-native";
import pins from "../../assets/data/pins";
import MasonryList from "../../components/MasonryList";

export default function HomeTab() {
  return (
    <ScrollView>
      <MasonryList pins={pins} />
    </ScrollView>
  );
}
