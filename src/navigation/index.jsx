import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/index";
import CoinDetailedScreen from "../screens/CoinDetailedScreen/index";
import routes from "./routes";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName={routes.HOME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={routes.COIN_DETAIL} component={CoinDetailedScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;
