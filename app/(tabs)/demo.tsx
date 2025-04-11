import { View, Text, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";

const Demo = () => {
  const { state, startRecognizing, stopRecognizing, destroyRecognizer } =
    useVoiceRecognition();
  const [borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">(
    "lightgray"
  );
  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingTop: 50 }}>
      <Text>Demo</Text>
      <Pressable
        onPressIn={() => {
          setBorderColor("lightgreen");
          startRecognizing();
        }}
        onPressOut={() => {
          setBorderColor("lightgray");
          stopRecognizing();
        }}
        style={{
          width: "90%",
          padding: 30,
          gap: 10,
          borderWidth: 3,
          alignItems: "center",
          borderRadius: 10,
          borderColor: borderColor,
        }}
      >
        <Text>{state.isRecording ? "Release to Send" : "Hold to Speak"}</Text>
      </Pressable>
      <Text>{JSON.stringify(state, null, 2)}</Text>
    </View>
  );
};

export default Demo;
