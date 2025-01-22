import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { db } from "@/db/init";
import { habitLogs, habits } from "@/db/schema";
import { and, between, eq } from "drizzle-orm";
import dayjs from "dayjs";

type Props = {
  habit: typeof habits.$inferSelect;
};

const HabitLogsComponent: FC<Props> = ({ habit }) => {
  const { data } = useLiveQuery(
    db
      .select()
      .from(habitLogs)
      .where(
        and(
          eq(habitLogs.habit_id, habit.id),
          between(
            habitLogs.date,
            dayjs().startOf("month").toDate(),
            dayjs().endOf("month").toDate()
          )
        )
      )
  );

  const daysInMonth = useMemo(
    () => [...Array(dayjs().daysInMonth()).keys()],
    []
  );

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontStyle: "italic" }}>Habit Logs for {habit.id}</Text>
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
          {daysInMonth.map((day) => {
            const log =
              data && data.find((log) => dayjs(log.date).date() === day + 1);
            const isFromFuture = false && dayjs().date() < day + 1;
            return (
              <Pressable
                key={`day-${day}-${habit.id}`}
                disabled={isFromFuture}
                style={{ opacity: isFromFuture ? 0.3 : 1 }}
                onPress={() => {
                  const date = dayjs().set("day", day).toDate();

                  if (log) {
                    db.delete(habitLogs)
                      .where(eq(habitLogs.id, log.id))
                      .execute();
                    return;
                  }

                  db.insert(habitLogs)
                    .values({
                      date: date,
                      completed: true,
                      habit_id: habit.id,
                    })
                    .execute();
                }}
              >
                <View
                  style={[
                    styles.log,
                    // TODO: Fix the optional color here. We are always going
                    // to have a color
                    {
                      backgroundColor: log?.completed
                        ? habit.color!
                        : "lightgrey",
                    },
                  ]}
                >
                  <Text style={{ fontSize: 12, opacity: 0 }}>{day + 1} </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default HabitLogsComponent;

const styles = StyleSheet.create({
  log: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
});

// {data.length ? (
//   data.map((log) => {
//     return (
//       <View key={`log-${log.id}-${log.habit_id}`}>
//         <Text>
//           {log.id} - {dayjs(log.date).format("DD/MM/YYYY")}{" "}
//         </Text>
//       </View>
//     );
//   })
// ) : (
//   <Text>No logs yet!</Text>
// )}
