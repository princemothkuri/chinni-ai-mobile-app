import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  setIsLoggedIn,
  setProfile,
} from "@/lib/redux/features/AppMain/appMainSlice";
import { useRouter } from "expo-router";

const Profile = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const profileData = useSelector((state: RootState) => state.appMain.profile);

  useEffect(() => {
    if (!profileData) {
      setTimeout(() => {
        const profile = {
          name: "John Doe",
          email: "johndoe@example.com",
          username: "johndoe123",
        };
        dispatch(setProfile(profile));
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
    }
  }, [profileData]);

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    router.push("/login");
  };

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
    },
  ];
  const textStyle = {
    color: theme === "light" ? "#000" : "#fff",
  };

  const renderProfile = () => (
    <View style={styles.content}>
      <Text style={[styles.heading, textStyle]}>User Profile</Text>
      <View style={[styles.infoContainer]}>
        <Text style={[styles.label, textStyle]}>Name:</Text>
        <Text style={[styles.value, textStyle]}>
          {profileData?.name || "N/A"}
        </Text>
      </View>
      <View style={[styles.infoContainer]}>
        <Text style={[styles.label, textStyle]}>Email:</Text>
        <Text style={[styles.value, textStyle]}>
          {profileData?.email || "N/A"}
        </Text>
      </View>
      <View style={[styles.infoContainer]}>
        <Text style={[styles.label, textStyle]}>Username:</Text>
        <Text style={[styles.value, textStyle]}>
          {profileData?.username || "N/A"}
        </Text>
      </View>
      <Button
        title="Logout"
        color={theme === "light" ? "#007bff" : "#bb86fc"}
        onPress={handleLogout}
      />
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loader}>
      <Text style={textStyle}>Loading...</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      {isLoading ? renderLoading() : renderProfile()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  content: {
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
    flex: 1, // Use all available space
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%", // Adjust width for a cleaner layout
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
  },
  loader: {
    flex: 1, // Use all available space
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
});

export default Profile;
