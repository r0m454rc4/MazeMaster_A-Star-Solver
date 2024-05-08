import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { DrawMazeComponent } from "../../components/DrawMaze-component";
import { UploadMazeComponent } from "../../components/UploadMaze-component";

export default function HomeScreen() {
  // State to trigger the resetting of draggedCells
  const [uploadSuccess, setUploadSuccess] = useState(false);

  return (
    <View style={styles.container}>
      {/* Clear table after upload maze. */}
      <DrawMazeComponent onUploadSuccess={() => setUploadSuccess(true)} />

      <View style={styles.uploadButtons}>
        <UploadMazeComponent onUploadSuccess={() => setUploadSuccess(true)} />
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
    marginTop: "125%",
  },
});
