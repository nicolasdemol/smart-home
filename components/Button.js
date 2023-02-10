import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        s.button,
        mode === "outlined" && {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.primary,
        },
        style,
      ]}
      labelStyle={s.text}
      mode={mode}
      {...props}
    />
  );
}

const s = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    width: "100%",
    height: "auto",
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  text: {
    alignItems: "center",
    fontWeight: "bold",
    minHeight: 26,
    lineHeight: 26,
    fontSize: 18,
  },
});
