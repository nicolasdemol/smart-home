import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "../core/theme";

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={s.container}>
      <Image style={s.image} source={require("../assets/arrow_back.png")} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 48,
    height: 48,
  },
});
