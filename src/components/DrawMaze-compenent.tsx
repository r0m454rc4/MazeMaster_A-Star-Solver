import React, { useRef } from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";

export default function DrawMazeComponent() {
  const blockPan = useRef(new Animated.ValueXY()).current;
  const goalPan = useRef(new Animated.ValueXY()).current;
  const pathPan = useRef(new Animated.ValueXY()).current;
  const startPan = useRef(new Animated.ValueXY()).current;

  const blockPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: blockPan.x, dy: blockPan.y }],
        {
          useNativeDriver: false,
        }
      ),

      // This is to return to the initial position after releasing.
      onPanResponderRelease: () => {
        Animated.spring(blockPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const goalPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: goalPan.x, dy: goalPan.y }],
        {
          useNativeDriver: false,
        }
      ),

      onPanResponderRelease: () => {
        Animated.spring(goalPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const pathPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pathPan.x, dy: pathPan.y }],
        {
          useNativeDriver: false,
        }
      ),

      onPanResponderRelease: () => {
        Animated.spring(pathPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const startPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: startPan.x, dy: startPan.y }],
        {
          useNativeDriver: false,
        }
      ),

      onPanResponderRelease: () => {
        Animated.spring(startPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.drawingArea}>
      <Animated.Image
        // Import image.
        source={require("../../assets/images/Block.png")}
        style={[
          styles.block,
          {
            transform: [{ translateX: blockPan.x }, { translateY: blockPan.y }],
          },
        ]}
        {...blockPanResponder.panHandlers}
      />

      <Animated.Image
        source={require("../../assets/images/Goal.png")}
        style={[
          styles.goal,
          {
            transform: [{ translateX: goalPan.x }, { translateY: goalPan.y }],
          },
        ]}
        {...goalPanResponder.panHandlers}
      />

      <Animated.Image
        source={require("../../assets/images/Path.png")}
        style={[
          styles.path,
          {
            transform: [{ translateX: pathPan.x }, { translateY: pathPan.y }],
          },
        ]}
        {...pathPanResponder.panHandlers}
      />

      <Animated.Image
        source={require("../../assets/images/Start.png")}
        style={[
          styles.start,
          {
            transform: [{ translateX: startPan.x }, { translateY: startPan.y }],
          },
        ]}
        {...startPanResponder.panHandlers}
      />
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
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  drawingArea: {
    width: "83.5%",
    height: "70%",
    borderRadius: 7,
    backgroundColor: "orange",
    position: "absolute",
    // This is to give distance between header & nav bar.
    top: "3%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  // Style buttons.
  block: {
    width: 30,
    height: 30,
    top: "40%",
    left: "-5%",
    backgroundColor: "red",
  },
  goal: {
    width: 30,
    height: 30,
    top: "40%",
    left: "-2%",
    backgroundColor: "blue",
  },
  path: {
    width: 30,
    height: 30,
    top: "40%",
    left: "1%",
    backgroundColor: "green",
  },
  start: {
    width: 30,
    height: 30,
    top: "40%",
    left: "4%",
    backgroundColor: "white",
  },

  // Style buttons - IPhone.
  // block: {
  //   width: 30,
  //   height: 30,
  //   top: "70%",
  //   left: "-5%",
  //   backgroundColor: "red",
  // },
  // goal: {
  //   width: 30,
  //   height: 30,
  //   top: "70%",
  //   left: "-2%",
  //   backgroundColor: "blue",
  // },
  // path: {
  //   width: 30,
  //   height: 30,
  //   top: "70%",
  //   left: "1%",
  //   backgroundColor: "green",
  // },
  // start: {
  //   width: 30,
  //   height: 30,
  //   top: "70%",
  //   left: "4%",
  //   backgroundColor: "white",
  // },
});
