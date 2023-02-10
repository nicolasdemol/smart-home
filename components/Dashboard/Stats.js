import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { Divider } from "react-native-paper";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Text, Card } from "react-native-paper";
import { db } from "../../services/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import Background from "../Background";

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

const Stats = () => {
  const [consumption, setConsumption] = useState([]);
  const { user } = useAuth();

  const units = { water: "L", gas: "m3", electricity: "kWh" };

  useEffect(() => {
    const unsubscribe = async () => {
      const q = query(
        collection(db, "devices"),
        where("userId", "==", user.uid),
        where("type", "==", "meter")
      );
      const querySnapshot = await getDocs(q);
      const devices = [];
      querySnapshot.forEach((doc) =>
        devices.push({ id: doc.id, ...doc.data() })
      );
      setConsumption(devices);
    };
    unsubscribe();
  }, []);

  return (
    <Background>
      <SafeAreaView style={s.container}>
        <Header>Stats</Header>
        <Divider />
        <Card style={s.card} mode="contained">
          <View style={s.cardContainer}>
            <Text style={s.text}>Total consumptions</Text>
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
            <Text
              style={{ paddingLeft: 10, paddingTop: 10 }}
              variant="labelLarge"
            >
              Hourly consumptions
            </Text>
            <View style={{ flexDirection: "row" }}>
              {consumption.map((device, index) => (
                <Text
                  key={index}
                  style={[
                    s.cardContainer,
                    { paddingHorizontal: 4, paddingVertical: 10 },
                    s.text,
                  ]}
                >
                  {device.params.value || NaN}
                  {units[device.deviceName]}
                </Text>
              ))}
            </View>
          </View>
        </Card>
      </SafeAreaView>
    </Background>
  );
};

export default Stats;
