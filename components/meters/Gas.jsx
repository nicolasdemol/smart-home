import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const s = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    padding: 20,
    overflow: "hidden",
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginHorizontal: 10,
    flexDirection: "row",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

const Gas = ({ device }) => {
  return (
    <Card style={s.card} mode="contained">
      <View style={s.cardContainer}>
        <Text style={s.text}>{device.customName}</Text>
      </View>
      <View
        style={[
          {
            borderWidth: 2,
            borderRadius: 10,
            marginTop: 10,
            borderColor: "#dfdfdf",
            marginHorizontal: 10,
          },
        ]}
      >
        <Text style={{ paddingLeft: 10, paddingTop: 10 }} variant="labelLarge">
          Current consumption
        </Text>
        <Text
          style={[
            s.cardContainer,
            { paddingHorizontal: 20, paddingVertical: 10 },
            s.text,
          ]}
        >
          {device?.params?.value || NaN}
          {" m3"}
        </Text>
      </View>
    </Card>
  );
};

export default Gas;
