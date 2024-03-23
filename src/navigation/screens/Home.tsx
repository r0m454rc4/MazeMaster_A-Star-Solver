import React from "react";
import { StyleSheet, View } from "react-native";
import DrawMazeComponent from "../../components/DrawMaze-compenent";
import UploadMazeComponent from "../../components/UploadMaze-component";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <DrawMazeComponent /> */}

      <View style={styles.uploadButtons}>
        <UploadMazeComponent />
      </View>
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
    marginVertical: 90,
    height: 1,
    width: "80%",
    backgroundColor: "#f5f6ee",
  },

  uploadButtons: {
    marginTop: "0%",
  },
});
