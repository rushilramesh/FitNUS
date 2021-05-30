import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getUserHistory } from "../Api/userApi";
import { getWorkoutById } from "../Api/workoutApi";

export default function Tracker({ navigation }) {
  const [calories, setCalories] = useState(0);


  useEffect(() => {
    console.log(calories)
    totalCalories();
  }, []);
  return (
    <View>
      <Text>Fitness Tracker</Text>
    </View>
  );
}
