import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailedScreen from "../screens/CoinDetailedScreen/index";
import routes from "./routes";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.ROOT}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.ROOT} component={BottomTabNavigator} />
      <Stack.Screen name={routes.COIN_DETAIL} component={CoinDetailedScreen} />
    </Stack.Navigator>
  );
};
