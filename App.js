import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import colors from "./src/config/colors";
import navigationTheme from "./src/navigation/navigationTheme";
import WatchlistProvider from "./src/context/WatchlistContext";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <WatchlistProvider>
        <View style={styles.container}>
          <Navigation />
          <StatusBar style="light" />
        </View>
      </WatchlistProvider>
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
