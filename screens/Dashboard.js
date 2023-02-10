import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { Home, Rooms, Devices, Stats } from "../components/Dashboard";

const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "rooms",
      title: "Rooms",
      focusedIcon: "bed",
      unfocusedIcon: "bed-outline",
    },
    { key: "devices", title: "Devices", focusedIcon: "devices" },
    {
      key: "stats",
      title: "Stats",
      focusedIcon: "graph",
      unfocusedIcon: "graph-outline",
    },
  ]);

  const HomeRoute = () => <Home />;

  const RoomsRoute = () => <Rooms />;

  const DevicesRoute = () => <Devices />;

  const StatsRoute = () => <Stats />;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    rooms: RoomsRoute,
    devices: DevicesRoute,
    stats: StatsRoute,
  });

  return (
    <>
      <BottomNavigation
        activeColor="#000"
        inactiveColor="#fff"
        labeled={false}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default Dashboard;
