import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { theme } from "../core/theme";

export default function Background({ children, center }) {
  return (
    <ImageBackground resizeMode="repeat" style={s.background}>
      <KeyboardAvoidingView
        style={[s.container, { justifyContent: center ? "center" : "" }]}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
