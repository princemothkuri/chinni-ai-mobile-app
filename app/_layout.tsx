import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import StoreProvider from "@/providers/StoreProvider";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import App from "./App";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StoreProvider>
      <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: colorScheme === "light" ? "#f8f9fa" : "#121212",
            },
          ]}
        >
          <StatusBar
            style={colorScheme === "light" ? "dark" : "light"}
            backgroundColor={colorScheme === "light" ? "#f8f9fa" : "#121212"}
            translucent={Platform.OS === "android"}
          />
          <App />
        </SafeAreaView>
      </ThemeProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
