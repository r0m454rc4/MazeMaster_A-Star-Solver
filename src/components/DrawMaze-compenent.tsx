import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

export default function DrawMazeComponent() {
  const blockPan = useRef(new Animated.ValueXY()).current;
  const pathPan = useRef(new Animated.ValueXY()).current;
  const startPan = useRef(new Animated.ValueXY()).current;
  const goalPan = useRef(new Animated.ValueXY()).current;

  const maxLeftDistBlock = -67,
    maxRightDistBlock = Dimensions.get("screen").width / 1.57;
  const maxLeftDistPath = -135,
    maxRigthDistPath = Dimensions.get("screen").width / 2.097;
  const maxLeftDistStart = -195,
    maxRightDistStart = Dimensions.get("screen").width / 3.05;
  const maxLeftDistGoal = -255,
    maxRightDistGoal = Dimensions.get("screen").width / 5.3;

  const maxBottomtDist = Dimensions.get("screen").height / 20,
    maxToptDist = -455;

  const [draggedCells, setDraggedCells] = useState<{ [key: string]: boolean }>(
    {}
  );

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
          // console.log(
          //   `Block, x: ${gestureState.moveX} dx:(${gestureState.dx}) res:(${
          //     gestureState.moveX - gestureState.dx
          //   }), y: ${gestureState.moveY}`
          // );
          // Calculate row and col based on gesture position of the block relative to the table.
          const blockCol = Math.floor((gestureState.moveX - 50) / 35);
          const blockRow = Math.floor((gestureState.moveY - 150) / 35);

          // Update the position of the block.
          blockPan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });

          // Update the list of dragged cells.
          const blockCellKey = `block-${blockRow}-${blockCol}`;
          setDraggedCells((prevDraggedCells) => ({
            ...prevDraggedCells,
            [blockCellKey]: true,
          }));

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
          // console.log(
          //   `Path, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
          // );

          const pathCol = Math.floor((gestureState.moveX - 50) / 35);
          const pathRow = Math.floor((gestureState.moveY - 150) / 35);

          const pathCellKey = `path-${pathRow}-${pathCol}`;
          setDraggedCells((prevDraggedCells) => ({
            ...prevDraggedCells,
            [pathCellKey]: true,
          }));

          return Animated.event([null, { dx: pathPan.x, dy: pathPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
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
          // console.log(
          //   `Start, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
          // );

          const startCol = Math.floor((gestureState.moveX - 50) / 35);
          const startRow = Math.floor((gestureState.moveY - 150) / 35);

          startPan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });

          const startCellKey = `start-${startRow}-${startCol}`;
          setDraggedCells((prevDraggedCells) => ({
            ...prevDraggedCells,
            [startCellKey]: true,
          }));

          return Animated.event([null, { dx: startPan.x, dy: startPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
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
          // console.log(
          //   `Goal, x: ${gestureState.moveX}, y: ${gestureState.moveY}`
          // );

          const goalCol = Math.floor((gestureState.moveX - 50) / 35);
          const goalRow = Math.floor((gestureState.moveY - 150) / 35);

          goalPan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });

          // Update the list of dragged cells.
          const goalCellKey = `goal-${goalRow}-${goalCol}`;
          setDraggedCells((prevDraggedCells) => ({
            ...prevDraggedCells,
            [goalCellKey]: true,
          }));

          return Animated.event([null, { dx: goalPan.x, dy: goalPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
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

  const table = (rows: number, columns: number) => {
    const cells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const blockCellKey = `block-${row}-${col}`,
          goalCellKey = `goal-${row}-${col}`,
          pathCellKey = `path-${row}-${col}`,
          startCellKey = `start-${row}-${col}`;

        cells.push(
          <View key={`col_${col}_row_${row}`} style={styles.cell}>
            {(draggedCells[blockCellKey] && (
              <Animated.Image
                source={require("../../assets/images/Block.png")}
                style={styles.drawingTableAsset}
              />
            )) ||
              (draggedCells[pathCellKey] && (
                <Animated.Image
                  source={require("../../assets/images/Path.png")}
                  style={styles.drawingTableAsset}
                />
              )) ||
              (draggedCells[startCellKey] && (
                <Animated.Image
                  source={require("../../assets/images/Start.png")}
                  style={styles.drawingTableAsset}
                />
              )) ||
              (draggedCells[goalCellKey] && (
                <Animated.Image
                  source={require("../../assets/images/Goal.png")}
                  style={styles.drawingTableAsset}
                />
              ))}
          </View>
        );
      }
    }

    return <View style={styles.table}>{cells}</View>;
  };

  return (
    <View style={styles.drawingArea}>
      <View style={styles.drawingArea}>{table(11, 9)}</View>

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
  path: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "-2%",
  },
  start: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "3%",
  },
  goal: {
    width: 35,
    height: 35,
    top: Dimensions.get("screen").height / 4,
    left: "8%",
  },

  drawingTableAsset: {
    width: 35,
    height: 35,
  },

  table: {
    top: -40,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 330,
    justifyContent: "center",
    alignItems: "center",
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
