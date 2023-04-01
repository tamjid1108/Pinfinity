import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="HomeTab"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="SearchTab"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="NewPinTab"
        options={{
          title: "Post a pin",
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(BoardTab)"
        options={{
          title: "Your boards",
          tabBarIcon: ({ color }) => (
            <Feather name="clipboard" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
