import React from "react";
import { StyleSheet, View } from "react-native";
import DrawMazeComponent from "../../components/DrawMaze-compenent";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <DrawMazeComponent />
    </View>
  );
}

// Styles is an object, which has container, title, getStartedText... as properties.
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
  drawingArea: {
    width: "83.5%",
    height: "80%",
    borderRadius: 7,
    backgroundColor: "orange",
    position: "absolute",
    // This is to give distance between header & nav bar.
    top: "5.5%",
  },
});
