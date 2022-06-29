import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import routes from "./routes";
import HomeScreen from "../screens/HomeScreen/index";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import WatchlistScreen from "../screens/WatchlistScreen/index";

const Tab = createBottomTabNavigator();

export default BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "#181818",
        },
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.WATCHLIST}
        component={WatchlistScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
