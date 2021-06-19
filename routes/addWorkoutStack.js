import React from "react";
import { Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import StartWorkout from "../screens/startworkout";
import Map from "../screens/map";
import AddExercises from "../screens/addExercises";
import { ExerciseDetails } from "../screens/exerciseDetails";
import EditExercise from "../screens/editWorkout";

const Stack = createStackNavigator();

const addWorkoutStack = ({ navigation , route}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Start Workout"
          component={StartWorkout}
          initialParams={{ template: route.params}}
        ></Stack.Screen>
        <Stack.Screen
          name="Add Exercises"
          component={AddExercises}
        ></Stack.Screen>
        <Stack.Screen
          name="Exercise Details"
          component={ExerciseDetails}
        ></Stack.Screen>
        {/* pass status of exercise into map navigation to display polyline */}
        <Stack.Screen name="Map" component={Map}></Stack.Screen> 
        <Stack.Screen
          name="Edit"
          component={EditExercise}
        ></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default addWorkoutStack;
