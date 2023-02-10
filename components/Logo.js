import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Logo() {
  return (
    <View style={s.root}>
      <Image source={require("../assets/logo.png")} style={s.image} />
      <Text style={s.text}>SMART HOME</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
  },
});
