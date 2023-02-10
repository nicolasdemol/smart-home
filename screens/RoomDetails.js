import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { TouchableOpacity, StyleSheet, View, ScrollView } from "react-native";
import { Divider, Text, Card, IconButton } from "react-native-paper";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import { useRoute } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import Light from "../components/devices/Light";

import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  getDoc,
  documentId,
  deleteDoc,
} from "firebase/firestore";
import Washer from "../components/devices/Washer";
import Heater from "../components/devices/Heater";
import Freezer from "../components/devices/Freezer";
import Refrigerator from "../components/devices/Refrigerator";
import Oven from "../components/devices/Oven";
import Cleaner from "../components/devices/Cleaner";
import Electricity from "../components/meters/Electricity";
import Gas from "../components/meters/Gas";
import Water from "../components/meters/Water";

const s = StyleSheet.create({
  device: {
    flex: 1,
    marginTop: 10,
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
  contentContainer: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
  },
  bottomHeader: {
    textAlign: "center",
    fontSize: 24,
    paddingVertical: 12,
    fontWeight: "bold",
  },
  picker: {
    width: 380,
    height: 140,
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default function RoomDetails() {
  const route = useRoute();
  const room = route.params.room;
  const [devicesList, setDevicesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState("");
  const [devicesConnected, setDevicesConnected] = useState([]);
  const { user } = useAuth();

  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

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
  }, []);

  useEffect(() => {
    const handleDevicesConnected = async () => {
      const docRef = doc(db, "rooms", room.id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data.devicesConnected) {
        const devicesRef = collection(db, "devices");
        const q = query(
          devicesRef,
          where(documentId(), "in", data.devicesConnected)
        );
        const docDevicesSnap = await getDocs(q);
        const devices = [];
        docDevicesSnap.forEach((doc) =>
          devices.push({ id: doc.id, ...doc.data() })
        );
        setDevicesConnected(devices);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    handleDevicesConnected();
  }, []);

  const handleRemoveRoom = async () => {
    setLoading(true);
    const docRef = doc(db, "rooms", room.id);
    await deleteDoc(docRef).then(console.log("Success delete"));
    setLoading(false);
  };

  return (
    <>
      <Background>
        <Header>{room.type}</Header>
        <Divider />
        <Button mode="contained" onPress={() => handleSnapPress(0)}>
          Connect device(s)
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          style={{ backgroundColor: "#CC0000", marginTop: 0 }}
          mode="contained"
          onPress={() => handleRemoveRoom()}
        >
          Delete the room
        </Button>
        <ScrollView style={s.device}>
          {devicesConnected.map((device, index) => (
            <Device key={index} device={device} />
          ))}
        </ScrollView>
      </Background>
      <BottomSheet
        backgroundStyle={{}}
        ref={sheetRef}
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={s.contentContainer}>
          <Text style={s.bottomHeader}>Connect device(s)</Text>
          <DevicesList roomId={room.id} devicesList={devicesList} />
        </View>
      </BottomSheet>
    </>
  );
}

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

const DevicesList = ({ roomId, devicesList }) => {
  const [loading, setLoading] = useState(false);

  const handleAddDevice = async (deviceId) => {
    console.log(deviceId, roomId);
    setLoading(true);
    await updateDoc(doc(db, "rooms", roomId), {
      devicesConnected: arrayUnion(deviceId),
    }).catch((e) => console.error("Error adding document: ", e));
    setLoading(false);
  };

  return (
    <ScrollView>
      {devicesList.map((device, index) => (
        <Card key={index} style={s.card} mode="contained">
          <Card.Title
            titleVariant="headlineLarge"
            title={device.customName}
            subtitleVariant="labelLarge"
            subtitle={device.deviceName}
            right={(props) => (
              <IconButton
                {...props}
                size={36}
                icon="plus"
                onPress={() => handleAddDevice(device.id)}
              />
            )}
          />
        </Card>
      ))}
    </ScrollView>
  );
};
