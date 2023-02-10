import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import Button from "../Button";
import Header from "../Header";
import { db } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Light from "../devices/Light";
import Washer from "../devices/Washer";
import Heater from "../devices/Heater";
import Freezer from "../devices/Freezer";
import Refrigerator from "../devices/Refrigerator";
import Oven from "../devices/Oven";
import Cleaner from "../devices/Cleaner";
import Electricity from "../meters/Electricity";
import Gas from "../meters/Gas";
import Water from "../meters/Water";

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    width: "100%",
    marginVertical: 4,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 10,
    height: 100,
    overflow: "hidden",
    backgroundColor: "#f6f6f6",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  image: {
    zIndex: -1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    color: "white",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  bottomHeader: {
    fontSize: 24,
    paddingTop: 12,
    fontWeight: "bold",
  },
  picker: {
    width: 380,
    height: 140,
    justifyContent: "center",
    overflow: "hidden",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "white",
    opacity: 0.6,
  },
});

const Device = ({ device }) => {
  if (device.deviceName == "light") {
    return <Light device={device} />;
  }
  if (device.deviceName == "washer") {
    return <Washer device={device} />;
  }
  if (device.deviceName == "heater") {
    return <Heater device={device} />;
  }
  if (device.deviceName == "freezer") {
    return <Freezer device={device} />;
  }
  if (device.deviceName == "refrigerator") {
    return <Refrigerator device={device} />;
  }
  if (device.deviceName == "oven") {
    return <Oven device={device} />;
  }
  if (device.deviceName == "cleaner") {
    return <Cleaner device={device} />;
  }
  if (device.deviceName == "electricity") {
    return <Electricity device={device} />;
  }
  if (device.deviceName == "gas") {
    return <Gas device={device} />;
  }
  if (device.deviceName == "water") {
    return <Water device={device} />;
  }
};

const Devices = () => {
  const [devicesList, setDevicesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    const handleDevicesList = async () => {
      const q = query(
        collection(db, "devices"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const devices = [];
      querySnapshot.forEach((doc) =>
        devices.push({ id: doc.id, ...doc.data() })
      );
      setDevicesList(devices);
    };
    handleDevicesList();
  }, [loading]);

  const handleRemove = async (deviceId) => {
    setLoading(true);
    const docRef = doc(db, "devices", deviceId);
    await deleteDoc(docRef);
    setLoading(false);
  };

  return (
    <>
      <SafeAreaView style={s.container}>
        <Header>Devices</Header>
        <Divider />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("DeviceScan")}
        >
          Add a new device
        </Button>
        <ScrollView>
          {devicesList.map((device, index) => (
            <>
              <IconButton
                loading={loading}
                disabled={loading}
                onPress={() => handleRemove(device.id)}
                icon={"delete"}
              >
                Remove
              </IconButton>
              <Device key={index} device={device} />
            </>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Devices;
