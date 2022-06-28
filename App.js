import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import colors from "./src/config/colors";
import navigationTheme from "./src/navigation/navigationTheme";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <View style={styles.container}>
        <Navigation />
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingTop: 50,
  },
});
