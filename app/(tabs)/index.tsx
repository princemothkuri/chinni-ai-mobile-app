import React, { useEffect, useRef } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Alert,
} from "react-native";

// Import your custom components (adjust relative paths as needed)
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { HelloWave } from "../../components/HelloWave";

// Feature cards data using online images
const featureData = [
  {
    title: "Task Manager",
    description:
      "Effortlessly manage your tasks with timely notifications and smart organization.",
    image: { uri: "https://source.unsplash.com/80x80/?tasks" },
  },
  {
    title: "Alarm Manager",
    description:
      "Set alarms with customizable tones, repeat options, and intuitive scheduling.",
    image: { uri: "https://source.unsplash.com/80x80/?alarm" },
  },
  {
    title: "Conversation Memory",
    description:
      "Experience personalized assistance with context aware conversation history",
    image: { uri: "https://source.unsplash.com/80x80/?ai" },
  },
   {
      title: "Real-time search",
      description:
        "Access instant , relevant information from trusted sources",
      image: { uri: "https://source.unsplash.com/80x80/?ai" },
    },
 {
      title: "Smart Email Assistant",
      description:
        "Compose,manage and schedule Emails with AI-powered suggestions and templates",
      image: { uri: "https://source.unsplash.com/80x80/?ai" },
    },
];

export default function HomeScreen() {
  // Animated values for staggered animations of header, features, and footer
  const headerAnim = useRef(new Animated.Value(0)).current;
  const featuresAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  // Animated value for header image zoom effect
  const imageZoom = useRef(new Animated.Value(1.1)).current;

  useEffect(() => {
    // Sequence the animations: image zoom, then header content, features, and footer.
    Animated.sequence([
      // Header image zoom-out effect
      Animated.timing(imageZoom, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Fade & slide in header content
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Fade & slide in features section
      Animated.timing(featuresAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Fade & slide in footer section
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerAnim, featuresAnim, footerAnim, imageZoom]);

  // Helper to produce a fade/slide animated style from an Animated.Value
  const getAnimatedStyle = (animValue: Animated.Value) => ({
    opacity: animValue,
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
  });

  // Dummy onPress handlers – replace these with actual navigation or functions
  const handleFeaturePress = (title: string) => {
    Alert.alert(`${title} Clicked!`);
  };

  const handleFooterLinkPress = (link: string) => {
    Alert.alert(`Navigate to ${link}`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Animated.View
          style={[
            styles.headerImageContainer,
            { transform: [{ scale: imageZoom }] },
          ]}
        >
          <Image
            source={{ uri: "https://source.unsplash.com/800x400/?technology" }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          {/* Gradient overlay for better text readability */}
          <View style={styles.headerGradientOverlay} />
        </Animated.View>
      }
    >
      {/* HEADER / WELCOME SECTION */}
      <Animated.View style={getAnimatedStyle(headerAnim)}>
        <ThemedView style={styles.headerSection}>
          <ThemedText type="title" style={styles.headerTitle}>
            Welcome to ChinniAI
          </ThemedText>
          <HelloWave style={styles.helloWave} />
          <ThemedText style={styles.headerSubTitle}>
            Your Smart AI Companion to Manage Tasks, Set Alarms, and Boost Your
            Productivity.
          </ThemedText>
        </ThemedView>
      </Animated.View>

      {/* FEATURES SECTION */}
      <Animated.View style={getAnimatedStyle(featuresAnim)}>
        <ThemedView style={styles.featuresSection}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>
            Explore Our Features
          </ThemedText>
          <View style={styles.featuresContainer}>
            {featureData.map((feature, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.featureCard}
                onPress={() => handleFeaturePress(feature.title)}
              >
                <Image
                  source={feature.image}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
                <ThemedText type="subtitle" style={styles.featureTitle}>
                  {feature.title}
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedView>
      </Animated.View>

      {/* FOOTER SECTION */}
      <Animated.View style={getAnimatedStyle(footerAnim)}>
        <ThemedView style={styles.footerSection}>
          <ThemedText type="title" style={styles.footerTitle}>
            ChinniAI
          </ThemedText>
          <ThemedText style={styles.footerText}>
            Your Intelligent Companion for a More Productive Life.
          </ThemedText>
          <View style={styles.footerLinks}>
            <TouchableOpacity
              style={styles.footerLinkButton}
              onPress={() => handleFooterLinkPress("About")}
            >
              <ThemedText style={styles.linkText}>About</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerLinkButton}
              onPress={() => handleFooterLinkPress("Privacy Policy")}
            >
              <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerLinkButton}
              onPress={() => handleFooterLinkPress("Terms of Service")}
            >
              <ThemedText style={styles.linkText}>Terms of Service</ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.copyright}>
            © {new Date().getFullYear()} ChinniAI. All rights reserved.
          </ThemedText>
        </ThemedView>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Header image and overlay styles
  headerImageContainer: {
    height: 220,
    width: "100%",
  },
  headerImage: {
    height: "100%",
    width: "100%",
  },
  headerGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  // Header section styles
  headerSection: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  headerSubTitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  helloWave: {
    marginVertical: 12,
  },
  // Features section styles
  featuresSection: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 2,
  },
  featureImage: {
    height: 80,
    width: 80,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
    color: "#333",
  },
  featureDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "#777",
  },
  // Footer section styles
  footerSection: {
    backgroundColor: "#222",
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  footerLinkButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  linkText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  copyright: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});

export { };
