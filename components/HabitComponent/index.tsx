import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { habits } from "@/db/schema";
import HabitLogsComponent from "../HabitLogsComponent";

type Props = {
  habit: typeof habits.$inferSelect;
};

const HabitComponent = ({ habit }: Props) => {
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{habit.name}</Text>
      <HabitLogsComponent habit={habit} />
    </View>
  );
};

export default HabitComponent;

const styles = StyleSheet.create({});
