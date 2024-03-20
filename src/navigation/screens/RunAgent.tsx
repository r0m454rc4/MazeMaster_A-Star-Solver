import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OpenMazeComponent from "../../components/OpenMaze-compenent";

export default function RunAgentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} />

      <OpenMazeComponent></OpenMazeComponent>

      <Text style={styles.getStartedText}>Execute the agent.</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#f5f6ee",
  },
});
