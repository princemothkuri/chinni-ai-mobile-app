import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="chinni-ai"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "chatbox" : "chatbox-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Chinni AI",
        }}
      />
      <Tabs.Screen
        name="demo"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Demo",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
};
