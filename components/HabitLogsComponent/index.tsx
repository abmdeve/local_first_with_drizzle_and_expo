import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/init";
import { habitLogs } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  habitId: number;
};

const HabitLogsComponent: FC<Props> = ({ habitId }) => {
  const { data } = useLiveQuery(
    db.select().from(habitLogs).where(eq(habitLogs.habit_id, habitId))
  );

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontStyle: "italic" }}>Habit Logs for {habitId}</Text>
      <View style={{ gap: 8 }}>
        {data.length ? (
          data.map((log) => {
            return (
              <View key={`logs-${log.id}-${log.habit_id}`}>
                <Text>
                  {log.id} - {log.date}{" "}
                </Text>
              </View>
            );
          })
        ) : (
          <Text>No logs yet!</Text>
        )}
      </View>
    </View>
  );
};

export default HabitLogsComponent;

const styles = StyleSheet.create({});
