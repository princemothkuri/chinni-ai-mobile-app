import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@/lib/redux/features/AppMain/appMainSlice"; // Import the action to set login state
import { useRouter } from "expo-router";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const theme = useColorScheme(); // Get the current theme (light or dark)

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert("Error", "Please fill the details");
      return;
    }

    setLoading(true);

    try {
      // Simulate an API call
      const response = await new Promise<{ success: boolean }>((resolve) =>
        setTimeout(() => resolve({ success: true }), 2000)
      );

      if (response.success) {
        Alert.alert("Success", "Logged in successfully!");
        dispatch(setIsLoggedIn(true));
        router.push("/home");
        // Navigate or perform post-login actions here
      } else {
        Alert.alert("Error", "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#121212" : "#f8f9fa" },
      ]}
    >
      <Text
        style={[styles.title, { color: theme === "dark" ? "#fff" : "#333" }]}
      >
        Login
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000", // Text color adjustment for dark mode
          },
        ]}
        placeholder="Email or Username"
        placeholderTextColor={theme === "dark" ? "#bbb" : "#aaa"}
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              color: theme === "dark" ? "#fff" : "#000", // Text color adjustment for dark mode
            },
          ]}
          placeholder="Password"
          placeholderTextColor={theme === "dark" ? "#bbb" : "#aaa"}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)} // Toggle password visibility
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"} // Toggle between eye and eye-off icons
            size={24}
            color={theme === "dark" ? "#fff" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#7aa0d6",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "35%",
    transform: [{ translateY: -12 }], // Adjust for vertical centering of the icon
  },
});

export default Login;
