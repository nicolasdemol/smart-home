import { StyleSheet, View } from "react-native";
import { Text, Divider } from "react-native-paper";
import Header from "../Header";
import Button from "../Button";
import { useAuth } from "../../hooks/useAuth";

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});

const Home = () => {
  const { user, signout } = useAuth();
  return (
    <View style={s.container}>
      <Header>Hello, {user?.displayName}</Header>
      <Divider />
      <Button
        mode="contained"
        onPress={() => {
          signout();
        }}
      >
        Logout
      </Button>
      <Text>{user?.uid}</Text>
    </View>
  );
};

export default Home;
