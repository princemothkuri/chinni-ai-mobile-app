import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@/lib/redux/features/AppMain/appMainSlice"; // Import the action to set login state

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useColorScheme(); // Detect the current theme (light or dark)

  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !username) {
      Alert.alert("Error", "Please fill in all details");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      const response: { success: boolean } = await new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 2000)
      );

      if (response.success) {
        Alert.alert("Success", "Registration successful!");
        dispatch(setIsLoggedIn(false));
        // Navigate or perform post-registration actions
      } else {
        Alert.alert("Error", "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "#121212" : "#f8f9fa", // Set background color based on theme
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme === "dark" ? "#fff" : "#333" }, // Set title color based on theme
        ]}
      >
        Register
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000", // Adjust text color for dark mode
          },
        ]}
        placeholder="Full Name"
        placeholderTextColor={theme === "dark" ? "#bbb" : "#aaa"}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000", // Adjust text color for dark mode
          },
        ]}
        placeholder="Username"
        placeholderTextColor={theme === "dark" ? "#bbb" : "#aaa"}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000", // Adjust text color for dark mode
          },
        ]}
        placeholder="Email"
        placeholderTextColor={theme === "dark" ? "#bbb" : "#aaa"}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            {
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              color: theme === "dark" ? "#fff" : "#000", // Adjust text color for dark mode
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
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={theme === "dark" ? "#fff" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.passwordContainer, { marginTop: -20 }]}>
        <TextInput
          style={[
            styles.passwordInput,
            {
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              color: theme === "dark" ? "#fff" : "#000", // Adjust text color for dark mode
            },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor={theme === "dark" ? "#bbb" : "#aaa"}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color={theme === "dark" ? "#fff" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.disabledButton,
          { backgroundColor: theme === "dark" ? "#28a745" : "#007bff" }, // Button color based on theme
        ]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  passwordInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "35%",
    transform: [{ translateY: -12 }], // Adjust for vertical centering of the icon
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#7cd7a8",
  },
});

export default Register;
