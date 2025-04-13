import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  useColorScheme,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/build/Ionicons";

// Define the Message type
type Message = {
  type: "user" | "ai"; // Specify the possible types
  text: string;
};

const ChinniAi: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Use the Message type
  const [inputText, setInputText] = useState<string>("");

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages((prev) => [...prev, { type: "user", text: inputText }]);
      setInputText("");
    }
  };

  // Suggested topics when no messages are present
  const suggestedMessages = [
    {
      title: "Create image",
      description: "Create an image based on your description.",
      icon: "image",
    },
    {
      title: "Get advice",
      description: "Get advice on your problem.",
      icon: "chat",
    },
    {
      title: "Summarize text",
      description: "Summarize the text you want to summarize.",
      icon: "document",
    },
    {
      title: "Surprise me",
      description: "Surprise me with a random idea.",
      icon: "dice",
    },
    {
      title: "Send email",
      description: "Send an email to your friend.",
      icon: "mail",
    },
    {
      title: "Make a plan",
      description: "Make a plan for your day.",
      icon: "calendar",
    },
  ];

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#121212" : "#f9f9f9" },
      ]}
      behavior="padding"
    >
      {/* Chat History Section */}
      <View
        style={[
          styles.chatContainer,
          {
            backgroundColor: isDarkTheme ? "#1e1e1e" : "#ffffff",
            borderColor: isDarkTheme ? "#333" : "#ddd",
          },
        ]}
      >
        {messages.length === 0 ? (
          // Show suggested messages when chat is empty
          <View
            style={[
              styles.suggestedMessagesContainer,
              { backgroundColor: isDarkTheme ? "#333" : "#f4f4f4" },
            ]}
          >
            <Text
              style={[
                styles.suggestedText,
                {
                  color: isDarkTheme ? "#fff" : "#000",
                  fontSize: 22,
                  marginBottom: 20,
                },
              ]}
            >
              Let's get started!
            </Text>
            <Text
              style={[
                styles.suggestedText,
                {
                  color: isDarkTheme ? "#aaa" : "#333",
                  fontSize: 16,
                  marginBottom: 30,
                },
              ]}
            >
              Choose an action below or type your own message to get started
            </Text>
            <View style={styles.gridContainer}>
              {suggestedMessages.map((label, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setMessages((prev) => [
                      ...prev,
                      { type: "user", text: label.title },
                    ])
                  }
                  style={styles.gridButton}
                >
                  <Ionicons name={label.icon as any} size={24} color="white" />
                  <Text style={styles.gridButtonText}>{label.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          // Display messages if present
          <FlatList
            data={messages}
            inverted
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }: { item: Message }) => (
              <View
                style={[
                  styles.messageBox,
                  item.type === "user" ? styles.userMessage : styles.aiMessage,
                  {
                    backgroundColor:
                      item.type === "user"
                        ? isDarkTheme
                          ? "#007bff"
                          : "#007bff"
                        : isDarkTheme
                        ? "#333"
                        : "#e0e0e0",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    {
                      color:
                        item.type === "user"
                          ? "#fff"
                          : isDarkTheme
                          ? "#fff"
                          : "#000",
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.messagesList}
          />
        )}
      </View>

      {/* Input Section */}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: isDarkTheme ? "#1e1e1e" : "#fff" },
        ]}
      >
        {/* Text Input */}
        <TextInput
          style={[
            styles.textInput,
            inputText && { width: "90%" },
            {
              backgroundColor: isDarkTheme ? "#333" : "#f0f0f0",
              color: isDarkTheme ? "#fff" : "#000",
              borderColor: isDarkTheme ? "#555" : "#ddd",
            },
          ]}
          placeholder="Type your message"
          placeholderTextColor={isDarkTheme ? "#aaa" : "#888"}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  chatContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBox: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: "75%",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  aiMessage: {
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconButton: {
    marginHorizontal: 5,
    padding: 5,
  },
  suggestedMessagesContainer: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 20,
    borderRadius: 8,
  },
  suggestedMessage: {
    marginVertical: 5,
  },
  suggestedText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  gridButton: {
    width: "45%",
    height: 80,
    margin: 5,
    padding: 15,
    backgroundColor: "#fe6863",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 6,
  },
  gridButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  sendButton: {
    backgroundColor: "#fe6863",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChinniAi;
