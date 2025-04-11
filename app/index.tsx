import { View, Text } from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const Index = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.appMain);

  if (isLoggedIn) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/login" />;
  }
};

export default Index;
