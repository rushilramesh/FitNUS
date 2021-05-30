import React, { useState } from "react";
import { View, Text } from "react-native"
import {getUserHistory } from "../Api/userApi";
import { getWorkoutById } from "../Api/workoutApi";


export default function Tracker({navigation}) {
    const [calories, setCalories] = useState(0)

    function totalCalories() {
        return getUserHistory().onSnapshot((snapshot) => {
          snapshot.docs
            .map((doc) =>
              getWorkoutById(doc.id).onSnapshot(
                (documentSnapshot) => documentSnapshot.data().calories
              )
            )
            .reduce((x, y) => x + y, 0);
        });
      }
    return (
        <View>
            <Text>Fitness Tracker</Text>
        </View>
    )
}