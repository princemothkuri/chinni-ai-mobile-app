import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "log-in" : "log-in-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Login",
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person-add" : "person-add-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Register",
        }}
      />
    </Tabs>
  );
};
