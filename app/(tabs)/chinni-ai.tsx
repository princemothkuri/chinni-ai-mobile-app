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

// Define the Message type
type Message = {
  type: "user" | "ai"; // Specify the possible types
  text: string;
};

const ChinniAi: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Use the Message type
  const [inputText, setInputText] = useState<string>("");
  const [isMicOn, setMicOn] = useState<boolean>(false);
  const [isSpeaking, setSpeaking] = useState<boolean>(true);
  const [isListening, setListening] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");

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
    "Can you help me find information on the latest tech trends?",
    "What are the most recent advancements in AI and machine learning?",
    "Can AI help me gather real-time data for market research?",
    "Can I get personalized recommendations based on my past interactions?",
    "Generate an image based on my description.",
    "Can you analyze and summarize past conversations for insights?",
    "How can AI assist with writing content or creative brainstorming?",
    "Can AI predict trends based on current data?",
    "Help me with designing a unique logo using AI-generated visuals.",
    "Can you provide real-time updates on weather or news?",
  ];

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Access Required",
            message:
              "Chinni AI needs access to your microphone for speech recognition.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Microphone permission granted");
        } else {
          console.log("Microphone permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === "ios") {
      Alert.alert(
        "Permission Required",
        "Please enable microphone access in settings to use speech recognition.",
        [{ text: "OK", onPress: () => console.log("Permission alert closed") }]
      );
    }
  };

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      // if (!hasPermission) {
      //   requestPermissions();
      // }
      if (!hasPermission) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
      }
    };

    checkMicrophonePermission();
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = () => console.log("Speech started");
    Voice.onSpeechResults = (result) => console.log("Speech results:", result);
    Voice.onSpeechError = (error) => console.error("Speech error:", error);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    setListening(true);
    console.log(Voice);

    try {
      await Voice.start("en-US");
      console.log("Voice started successfully");
    } catch (error) {
      console.log("Error starting Voice:", error);
    }
  };

  const stopSpeechToText = async () => {
    setListening(false);
    await Voice.stop();
  };

  // Define the type of result
  const onSpeechResults = (result: SpeechResultsEvent) => {
    console.log("Speech Results:", result);
    if (result?.value && result?.value.length > 0) {
      setRecognizedText(result.value[0]);
      setInputText((prev) => prev + (result.value ? result.value[0] : ""));
    }
  };

  const onSpeechError = (error: SpeechErrorEvent) => {
    console.log("Speech Error:", error.error);
    Alert.alert(
      "Speech Recognition Error",
      error.error?.message || "Unknown error occurred"
    );
  };

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
                { color: isDarkTheme ? "#ccc" : "#333" },
              ]}
            >
              Start the conversation by asking about:
            </Text>
            {suggestedMessages.map((message, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setMessages((prev) => [
                    ...prev,
                    { type: "user", text: message },
                  ]);
                }}
                style={styles.suggestedMessage}
              >
                <Text
                  style={[
                    styles.suggestedText,
                    {
                      color: isDarkTheme ? "#62b6ff" : "#007bff",
                    },
                  ]}
                >
                  {message}
                </Text>
              </TouchableOpacity>
            ))}
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
        {/* AI Speaker Control */}
        {!inputText && (
          <TouchableOpacity
            onPress={() => setSpeaking(!isSpeaking)}
            style={styles.iconButton}
          >
            <Icon
              name={isSpeaking ? "volume-up" : "volume-off"}
              size={24}
              color={isDarkTheme ? "#62b6ff" : "#007bff"}
            />
          </TouchableOpacity>
        )}

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

        {/* Mic Button */}
        {!inputText && (
          <TouchableOpacity
            onPress={() => {
              if (isListening) {
                stopSpeechToText();
              } else {
                startSpeechToText();
              }
            }}
            style={styles.iconButton}
          >
            <Icon
              name={isListening ? "mic" : "mic-off"}
              size={24}
              color="#007bff"
            />
          </TouchableOpacity>
        )}
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
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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
});

export default ChinniAi;
