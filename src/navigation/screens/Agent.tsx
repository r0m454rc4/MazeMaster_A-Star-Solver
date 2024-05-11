import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import OpenMazeComponent from "../../components/OpenMaze-component";

export default function AgentScreen() {
  // State to to be able to reset draggedCells.
  const [opeSuccess, setOpenSuccess] = useState(false);

  // This is to reset the table after uploading more than one time.
  if (opeSuccess == true) {
    setOpenSuccess(false);
  }

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
