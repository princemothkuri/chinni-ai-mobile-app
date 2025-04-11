import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const App = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.appMain);
  return (
    <Stack>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default App;
