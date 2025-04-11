import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const theme = useColorScheme();
  const isLight = theme === "light";

  return (
    <>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require("@/assets/images/hero-image.jpg")} // Replace with the actual path to the image
          style={styles.heroImage}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.5)"]}
          style={styles.heroOverlay}
        >
          <Text style={[styles.heroText, { color: "#fff" }]}>
            Welcome to Chinni Assistant
          </Text>
          <Text style={[styles.subtitle, { color: "#ddd" }]}>
            Your AI-powered companion for seamless voice and text interactions.
          </Text>
        </LinearGradient>
      </View>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isLight ? "#fff" : "#000" },
        ]}
      >
        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text
            style={[
              styles.sectionHeading,
              { color: isLight ? "#000" : "#fff" },
            ]}
          >
            Why Choose Chinni?
          </Text>

          {/* Feature Items */}
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                styles.featureItem,
                index % 2 === 0 ? styles.leftAligned : styles.rightAligned,
              ]}
            >
              <Image source={feature.image} style={styles.featureImage} />
              <View style={styles.featureContent}>
                <Text
                  style={[
                    styles.featureTitle,
                    { color: isLight ? "#007bff" : "#bb86fc" },
                  ]}
                >
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: isLight ? "#333" : "#ccc" },
                  ]}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const features = [
  {
    title: "🎨 AI-Powered Image Generation",
    description:
      "Use cutting-edge AI tools to create stunning, high-quality images on demand.",
    image: require("@/assets/images/art.jpg"), // Replace with the generated image
  },
  {
    title: "🌐 Real-Time Internet Search",
    description:
      "Access accurate and up-to-date information from the internet in real-time.",
    image: require("@/assets/images/internet.jpg"), // Replace with generated image
  },
  {
    title: "🗣️ Voice & Text Commands",
    description:
      "Interact with Chinni seamlessly through voice or text commands, receiving responses in both formats.",
    image: require("@/assets/images/command.jpg"), // Replace with generated image
  },
  {
    title: "🧠 Context-Aware Interaction",
    description:
      "Chinni remembers past conversations and provides context-aware responses to enhance your experience.",
    image: require("@/assets/images/memory.jpg"), // Replace with generated image
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  featuresSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  leftAligned: {
    flexDirection: "row",
  },
  rightAligned: {
    flexDirection: "row-reverse",
  },
  featureImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  featureDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Home;
