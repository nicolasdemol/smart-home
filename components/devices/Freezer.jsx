import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Switch } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const s = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 100,
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

const Freezer = ({ device }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(
    device?.params?.state || false
  );
  const [range, setRange] = React.useState(device?.params?.level || 0);

  useEffect(() => {
    const unsubscribe = async () => {
      await updateDoc(doc(db, "devices", device.id), {
        params: { state: isSwitchOn, level: range },
      });
    };
    unsubscribe();
  }, [range, isSwitchOn]);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <Card style={s.card} mode="contained">
      <View style={s.cardContainer}>
        <Text style={s.text}>{device.customName}</Text>
        <Text style={s.text}>{Math.floor(range) + "°C"}</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View>
        <Slider
          value={range}
          onValueChange={(value) => setRange(value)}
          minimumValue={-10}
          maximumValue={10}
        />
      </View>
    </Card>
  );
};

export default Freezer;
