import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { theme } from "./core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  DeviceScan,
  RoomDetails,
  DeviceDetails,
} from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Provider theme={theme}>
        <Navigation />
      </Provider>
    </AuthProvider>
  );
}

const Navigation = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: user == null ? false : true,
          title: false,
        }}
      >
        {user == null ? (
          <>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="DeviceScan" component={DeviceScan} />
            <Stack.Screen name="DeviceDetails" component={DeviceDetails} />
            <Stack.Screen name="RoomDetails" component={RoomDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
