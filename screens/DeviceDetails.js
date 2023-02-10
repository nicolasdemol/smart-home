import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import Light from "../components/devices/Light";
import Washer from "../components/devices/Washer";
import { theme } from "../core/theme";
import { useRoute } from "@react-navigation/native";

export default function DeviceDetails() {
  const route = useRoute();
  const device = route.params.device;
  return (
    <Background>
      <Header>Options</Header>
      <Divider />
      <View style={s.device}>
        <Device device={device} />
      </View>
    </Background>
  );
}

const Device = ({ device }) => {
  if (device.deviceName == "light") {
    return <Light level={device.params.level} state={device.params.state} />;
  }
  if (device.deviceName == "washer") {
    return <Washer level={device.params.level} state={device.params.state} />;
  }
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    marginVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 100,
    overflow: "hidden",
  },
  device: {
    flex: 1,
    marginTop: 10,
  },
});
