import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/init";
import { habits } from "@/db/schema";
import HabitComponent from "@/components/HabitComponent";

function AddHabit() {
  const [name, setName] = useState("");
  const ref = useRef<TextInput>(null);
  return (
    <View style={{ marginVertical: 20, padding: 20 }}>
      <TextInput
        ref={ref}
        placeholder="Add habit"
        defaultValue={name}
        onChangeText={(text) => setName(text)}
      />
      <Button
        title="Add random Habit"
        onPress={() => {
          db.insert(habits)
            .values({
              name,
              color: "turquoise",
              description: "Rand description",
            })
            .finally(() => {
              setName("");
              ref.current?.clear();
              ref.current?.blur();
            });
        }}
      />
    </View>
  );
}

const HomeScreen = () => {
  const { data } = useLiveQuery(db.select().from(habits));

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 8 }}>
        <Text
          style={{
            fontSize: 32,
            opacity: 0.5,
            fontWeight: "700",
            marginBottom: 12,
          }}
        >
          Habits
        </Text>
        <View style={{ gap: 8 }}>
          {data.map((habit) => {
            return <HabitComponent key={String(habit.id)} habit={habit} />;
          })}
        </View>
        <AddHabit />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
