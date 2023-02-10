import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { Switch } from "react-native-paper";
import RadioButtons from "../RadioButtons";
import { db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";

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

const Cleaner = ({ device }) => {
  const data = [{ value: "Min" }, { value: "Medium" }, { value: "Max" }];
  const [isSwitchOn, setIsSwitchOn] = React.useState(
    device?.params?.state || false
  );
  const [value, setValue] = React.useState(device?.params?.level || "Medium");

  useEffect(() => {
    const unsubscribe = async () => {
      await updateDoc(doc(db, "devices", device.id), {
        params: { state: isSwitchOn, level: value },
      });
    };
    unsubscribe();
  }, [value, isSwitchOn]);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <Card style={s.card} mode="contained">
      <View style={s.cardContainer}>
        <Text style={s.text}>{device.customName}</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
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
          Mode
        </Text>
        <RadioButtons
          style={[
            s.cardContainer,
            { paddingHorizontal: 20, paddingVertical: 10 },
          ]}
          data={data}
          defaultOption={value}
          onSelect={(value) => setValue(value)}
        />
      </View>
    </Card>
  );
};

export default Cleaner;
