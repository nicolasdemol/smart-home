import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const s = StyleSheet.create({
  option: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "bold",
  },
  unselected: {
    color: "#dfdfdf",
  },
  selected: {
    color: "#6f6fff",
  },
});

export default function RadioButtons({ data, onSelect, defaultOption, style }) {
  const [userOption, setUserOption] = useState(defaultOption);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View style={style}>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={item.value === userOption ? s.selected : s.unselected}
            onPress={() => selectHandler(item.value)}
          >
            <Text
              style={[
                s.option,
                item.value === userOption ? s.selected : s.unselected,
              ]}
            >
              {item.value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
