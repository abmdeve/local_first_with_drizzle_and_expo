import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useLocalMigrations } from "./hooks/useLocalMigrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { sqliteDb } from "./db/init";
import HomeScreen from "./screens/home";

export default function App() {
  useLocalMigrations();

  useDrizzleStudio(sqliteDb);
  return (
    <HomeScreen />
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
