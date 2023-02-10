import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Header(props) {
  return <Text style={s.header} {...props} />;
}

const s = StyleSheet.create({
  header: {
    fontSize: 42,
    marginLeft: 10,
    color: theme.colors.primary,
    fontWeight: "900",
    paddingVertical: 12,
    alignSelf: "flex-start",
  },
});
