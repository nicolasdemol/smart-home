import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Divider, Text, Badge, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Button from "../Button";
import Header from "../Header";
import BottomSheet from "@gorhom/bottom-sheet";
import TextInput from "../TextInput";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginVertical: 4,
    padding: 0,
  },
  cardImage: {
    height: 150,
    overflow: "hidden",
    borderRadius: 10,
  },
  cardBottom: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
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

const Rooms = () => {
  const [roomName, setRoomName] = useState({ value: "", error: "" });
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const { user } = useAuth();
  const sheetRef = useRef(null);

  const navigation = useNavigation();

  // variables
  const snapPoints = useMemo(() => ["60%", "85%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    const handleRoomList = async () => {
      const q = query(collection(db, "rooms"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, ...doc.data() });
      });
      setRoomList(rooms);
    };
    handleRoomList();
  }, [loading]);

  const handleNewRoom = async () => {
    setLoading(true);
    await addDoc(collection(db, "rooms"), {
      name: roomName.value || "",
      type: selectedRoomType,
      userId: user?.uid,
    }).catch((e) => console.error("Error adding document: ", e));
    setLoading(false);
  };

  const getImage = (name) => {
    switch (name) {
      case "bath":
        return require("../../assets/images/rooms/bath.jpeg");
      case "bed":
        return require("../../assets/images/rooms/bed.jpeg");
      case "dining":
        return require("../../assets/images/rooms/dining.jpeg");
      case "kitchen":
        return require("../../assets/images/rooms/kitchen.jpeg");
      case "living":
        return require("../../assets/images/rooms/living.jpeg");
      case "study":
        return require("../../assets/images/rooms/study.jpeg");
      default:
        return require("../../assets/images/rooms/default.jpeg");
    }
  };

  return (
    <>
      <SafeAreaView style={s.container}>
        <Header>Rooms</Header>
        <Button mode="contained" onPress={() => handleSnapPress(0)}>
          Create a new room
        </Button>
        <ScrollView>
          {roomList.map((room, index) => (
            <Card
              key={index}
              mode="contained"
              style={s.card}
              onPress={() => navigation.navigate("RoomDetails", { room: room })}
            >
              <View style={s.cardImage}>
                <Image source={getImage(room.type)} style={s.image} />
              </View>
              <View style={s.cardBottom}>
                <View>
                  <Text variant="headlineLarge">{room.type}</Text>
                  <Text variant="labelLarge">{room.name}</Text>
                </View>
                <Badge
                  size={24}
                  style={{
                    paddingHorizontal: 8,
                    backgroundColor: "black",
                    marginLeft: "auto",
                    alignSelf: "center",
                  }}
                >
                  {room.devicesConnected ? room.devicesConnected.length : 0}{" "}
                  devices
                </Badge>
              </View>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={s.contentContainer}>
          <Text style={s.bottomHeader}>Create a new room</Text>
          <TextInput
            label="Custom name for the room (optional)"
            returnKeyType="next"
            value={roomName.value}
            onFocus={() => handleSnapPress(1)}
            onChangeText={(text) => setRoomName({ value: text, error: "" })}
            error={!!roomName.error}
            errorText={roomName.error}
            autoCapitalize="none"
          ></TextInput>
          <Picker
            style={s.picker}
            selectedValue={selectedRoomType}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedRoomType(itemValue);
            }}
          >
            <Picker.Item label="Living Room" value="living" />
            <Picker.Item label="Kitchen" value="kitchen" />
            <Picker.Item label="Bedroom" value="bed" />
            <Picker.Item label="Bathroom" value="bath" />
            <Picker.Item label="Dining Room" value="dining" />
            <Picker.Item label="Study Room" value="study" />
          </Picker>
          <Button
            loading={loading}
            disabled={loading}
            mode="contained"
            onPress={handleNewRoom}
          >
            Create a new room
          </Button>
        </View>
      </BottomSheet>
    </>
  );
};

export default Rooms;
