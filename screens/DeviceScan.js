import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function DeviceScan() {
  const [hasPermission, setHasPermission] = useState();
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const addDevice = async ({ type, data }) => {
    setScanned(true);
    const qrData = data.split(" ");
    const device = {
      customName: qrData[0],
      deviceName: qrData[0],
      type: qrData[1],
      manufacturerId: qrData[2],
      model: qrData[3],
      serial: qrData[4],
      userId: user?.uid,
    };
    await addDoc(collection(db, "devices"), device).catch((e) =>
      console.error("Error adding document: ", e)
    );
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={s.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : addDevice}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
