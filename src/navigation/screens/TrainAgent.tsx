import React from "react";
import { StyleSheet, View } from "react-native";
import OpenMazeComponent from "../../components/OpenMaze-component";

export default function TrainAgentScreen() {
  return (
    <View style={styles.container}>
      <OpenMazeComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#abd2bf",
  },
});
