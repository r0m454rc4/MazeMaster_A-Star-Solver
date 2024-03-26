import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import TableWithCells from "./CanvasTable-component";

export default function DrawMazeComponent() {
  const blockPan = useRef(new Animated.ValueXY()).current;
  const goalPan = useRef(new Animated.ValueXY()).current;
  const pathPan = useRef(new Animated.ValueXY()).current;
  const startPan = useRef(new Animated.ValueXY()).current;

  // https://stackoverflow.com/questions/46188512/reactnative-panresponder-limit-x-position
  const maxLatDist = Dimensions.get("screen").width / 1.1;
  const maxVertDist = Dimensions.get("screen").height / 1.65;

  const blockPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx <= maxLatDist && gestureState.dy <= maxVertDist) {
          console.log(
            `Block, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
          );

          return Animated.event([null, { dx: blockPan.x, dy: blockPan.y }], {
            useNativeDriver: false,
          })(
            // Return parameters.
            event,
            gestureState
          );
        }
      },

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
      onPanResponderMove: (event, gestureState) => {
        console.log(`Goal, x: ${gestureState.moveX}, y: ${gestureState.moveY}`);

        return Animated.event([null, { dx: goalPan.x, dy: goalPan.y }], {
          useNativeDriver: false,
        })(
          // Return parameters.
          event,
          gestureState
        );
      },

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
      onPanResponderMove: (event, gestureState) => {
        console.log(`Path, x: ${gestureState.moveX}, y: ${gestureState.moveY}`);

        return Animated.event([null, { dx: pathPan.x, dy: pathPan.y }], {
          useNativeDriver: false,
        })(
          // Return parameters.
          event,
          gestureState
        );
      },

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
      onPanResponderMove: (event, gestureState) => {
        console.log(
          `Start, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
        );

        return Animated.event([null, { dx: startPan.x, dy: startPan.y }], {
          useNativeDriver: false,
        })(
          // Return parameters.
          event,
          gestureState
        );
      },

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
      <View style={styles.drawingArea}>
        <TableWithCells />
      </View>

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
    // width: "83.5%",
    width: Dimensions.get("screen").width / 1.1,
    height: Dimensions.get("screen").height / 1.65,
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

  block: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "-5%",
    backgroundColor: "red",
  },
  goal: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "-2%",
    backgroundColor: "blue",
  },
  path: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "1%",
    backgroundColor: "green",
  },
  start: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "4%",
    backgroundColor: "white",
  },
});
