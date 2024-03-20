import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.drawingArea}>
        <Text style={styles.getStartedText}>
          To open previously drawed maze, you must click on the upper icon.
        </Text>
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
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#f5f6ee",
  },

  drawingArea: {
    width: "83.5%",
    height: "80%",
    borderRadius: 7,
    backgroundColor: "red",
    position: "absolute",
    // This is to give distance between header & nav bar. 
    top: "5.5%",
  },

  // https://www.youtube.com/watch?v=I7POH4acHV8 -> 1:02:20.
  // btnWrapper: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // activeBtn: {
  //   flex: 1,
  //   position: "absolute",
  //   top: -20,
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   backgroundColor: "#edecd8",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // inactiveBtn: {
  //   flex: 1,
  //   backgroundColor: "#edecd8",
  // },
});
