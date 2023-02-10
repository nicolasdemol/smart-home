import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";

export default function StartScreen({ navigation }) {
  return (
    <Background center>
      <Logo />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Register
      </Button>
    </Background>
  );
}
