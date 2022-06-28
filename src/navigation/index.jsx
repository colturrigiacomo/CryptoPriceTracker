import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/index";
import CoinDetailedScreen from "../screens/CoinDetailedScreen/index";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CoinDetailedScreen" component={CoinDetailedScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;
