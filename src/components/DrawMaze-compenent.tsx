import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

export default function DrawMazeComponent() {
  const blockPan = useRef(new Animated.ValueXY()).current;
  const goalPan = useRef(new Animated.ValueXY()).current;
  const pathPan = useRef(new Animated.ValueXY()).current;
  const startPan = useRef(new Animated.ValueXY()).current;

  const maxLeftDistBlock = -67,
    maxRightDistBlock = Dimensions.get("screen").width / 1.57;
  const maxLeftDistGoal = -135,
    maxRightDistGoal = Dimensions.get("screen").width / 2.097;
  const maxLeftDistPath = -195,
    maxRigthDistPath = Dimensions.get("screen").width / 3.05;
  const maxLeftDistStart = -255,
    maxRightDistStart = Dimensions.get("screen").width / 5.75;

  const maxBottomtDist = Dimensions.get("screen").height / 20,
    maxToptDist = -455;

  const blockPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (
          gestureState.dx >= maxLeftDistBlock &&
          gestureState.dx <= maxRightDistBlock &&
          gestureState.dy >= maxToptDist &&
          gestureState.dy <= maxBottomtDist
        ) {
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
      onPanResponderRelease: (event, gestureState) => {
        let dropPositionX = gestureState.moveX,
          dropPositionY = gestureState.moveY;

        console.log(
          `Block released on position x: ${dropPositionX}, y: ${dropPositionY}.`
        );

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
        if (
          gestureState.dx >= maxLeftDistGoal &&
          gestureState.dx <= maxRightDistGoal &&
          gestureState.dy >= maxToptDist &&
          gestureState.dy <= maxBottomtDist
        ) {
          console.log(
            `Goal, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
          );

          return Animated.event([null, { dx: goalPan.x, dy: goalPan.y }], {
            useNativeDriver: false,
          })(
            // Return parameters.
            event,
            gestureState
          );
        }
      },

      onPanResponderRelease: (event, gestureState) => {
        let dropPositionX = gestureState.moveX,
          dropPositionY = gestureState.moveY;

        console.log(
          `Block released on position x: ${dropPositionX}, y: ${dropPositionY}.`
        );

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
        if (
          gestureState.dx >= maxLeftDistPath &&
          gestureState.dx <= maxRigthDistPath &&
          gestureState.dy >= maxToptDist &&
          gestureState.dy <= maxBottomtDist
        ) {
          console.log(
            `Path, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
          );

          return Animated.event([null, { dx: pathPan.x, dy: pathPan.y }], {
            useNativeDriver: false,
          })(
            // Return parameters.
            event,
            gestureState
          );
        }
      },

      onPanResponderRelease: (event, gestureState) => {
        let dropPositionX = gestureState.moveX,
          dropPositionY = gestureState.moveY;

        console.log(
          `Block released on position x: ${dropPositionX}, y: ${dropPositionY}.`
        );

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
        if (
          gestureState.dx >= maxLeftDistStart &&
          gestureState.dx <= maxRightDistStart &&
          gestureState.dy >= maxToptDist &&
          gestureState.dy <= maxBottomtDist
        ) {
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
        }
      },

      onPanResponderRelease: (event, gestureState) => {
        let dropPositionX = gestureState.moveX,
          dropPositionY = gestureState.moveY;

        console.log(
          `Block released on position x: ${dropPositionX}, y: ${dropPositionY}.`
        );

        Animated.spring(startPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const Table = (rows: number, columns: number) => {
    // Generate rows.
    const renderRows = () => {
      const rowViews = [];

      for (let i = 0; i < rows; i++) {
        rowViews.push(
          <View key={`row_${i}`} style={styles.row}>
            {renderCells(columns)}
          </View>
        );
      }

      return rowViews;
    };

    // Generate cells for each row.
    const renderCells = (columns: number) => {
      const cellViews = [];

      for (let j = 0; j < columns; j++) {
        cellViews.push(<View key={`cell_${j}`} style={styles.cell}></View>);
      }

      return cellViews;
    };

    return <View style={styles.table}>{renderRows()}</View>;
  };

  return (
    <View style={styles.drawingArea}>
      <View style={styles.drawingArea}>{Table(11, 9)}</View>

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
    left: "-7%",
  },
  goal: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "-2%",
  },
  path: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "3%",
  },
  start: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "8%",
  },

  table: {
    marginTop: -75,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: "black",
  },
});
