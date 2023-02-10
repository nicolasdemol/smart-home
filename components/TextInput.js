import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={s.container}>
      <Input
        theme={{ roundness: 10 }}
        style={s.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={s.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={s.error}>{errorText}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
