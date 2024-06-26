// DrawMazeComponent.tsx
// r0m454rc4.

import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { DrawTableComponent } from "./DrawTable-component";
// tableData is a component that is used on UploadMaze, where I save the drawed value, I use a set to prevent duplicated data.
export const tableData: Set<string> = new Set();

export const DrawMazeComponent: React.FC<{
  onUploadSuccess: any;
}> = ({ onUploadSuccess }) => {
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

  // Manage the dragged cells.
  const [draggedCells, setDraggedCells] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Crear table after submitting save maze button.
  useEffect(() => {
    if (onUploadSuccess) {
      // Here I clear all the data that was os the set.
      setDraggedCells({});
      tableData.clear();
    }
  }, [onUploadSuccess]);

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
          // Here I calculate the colunm and row position of the block relative to the table.
          const blockCol = Math.floor((gestureState.moveX - 50) / 35);
          const blockRow = Math.floor((gestureState.moveY - 150) / 35);
          const maxLimits =
            blockRow >= 11 && blockRow <= 13 && blockCol >= 0 && blockCol <= 9;

          // Update the list of dragged cells.
          const blockCellKey = `block-${blockRow}-${blockCol}`;

          if (!maxLimits) {
            // console.log(blockCellKey);
            setDraggedCells((prevDraggedCells) => ({
              ...prevDraggedCells,
              [blockCellKey]: true,
            }));

            // Here I add the coordinates of the block to the set.
            tableData.add(`${blockCellKey}\n`);
          }

          return Animated.event([null, { dx: blockPan.x, dy: blockPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
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
          const pathCol = Math.floor((gestureState.moveX - 50) / 35);
          const pathRow = Math.floor((gestureState.moveY - 150) / 35);
          const maxLimits =
            pathRow >= 11 && pathRow <= 13 && pathCol >= 0 && pathCol <= 9;

          const pathCellKey = `path-${pathRow}-${pathCol}`;

          // Check if there's already a block at the same coordinate.
          let hasBlock = false;
          tableData.forEach((cell: any) => {
            if (cell.includes(`block-${pathRow}-${pathCol}`)) {
              hasBlock = true;
            }
          });

          if (!maxLimits && !hasBlock) {
            // console.log(pathCellKey);
            setDraggedCells((prevDraggedCells) => ({
              ...prevDraggedCells,
              [pathCellKey]: true,
            }));

            tableData.add(`${pathCellKey}\n`);
          }

          return Animated.event([null, { dx: pathPan.x, dy: pathPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
        }
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
        if (
          gestureState.dx >= maxLeftDistStart &&
          gestureState.dx <= maxRightDistStart &&
          gestureState.dy >= maxToptDist &&
          gestureState.dy <= maxBottomtDist
        ) {
          const startCol = Math.floor((gestureState.moveX - 50) / 35);
          const startRow = Math.floor((gestureState.moveY - 150) / 35);
          const maxLimits =
            startRow >= 11 && startRow <= 13 && startCol >= 0 && startCol <= 9;

          const startCellKey = `start-${startRow}-${startCol}`;

          let hasBlock = false;
          let hasPath = false;

          tableData.forEach((cell: any) => {
            if (cell.includes(`block-${startRow}-${startCol}`)) {
              hasBlock = true;
            }
          });

          tableData.forEach((cell: any) => {
            if (cell.includes(`path-${startRow}-${startCol}`)) {
              hasPath = true;
            }
          });

          // If there's not a block or a path on the same coordinate.
          if (!maxLimits && !hasBlock && !hasPath) {
            // console.log(startCellKey);
            setDraggedCells((prevDraggedCells) => ({
              ...prevDraggedCells,
              [startCellKey]: true,
            }));

            tableData.add(`${startCellKey}\n`);
          }

          return Animated.event([null, { dx: startPan.x, dy: startPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
        }
      },

      onPanResponderRelease: () => {
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
          const goalCol = Math.floor((gestureState.moveX - 50) / 35);
          const goalRow = Math.floor((gestureState.moveY - 150) / 35);
          const maxLimits =
            goalRow >= 11 && goalRow <= 13 && goalCol >= 0 && goalCol <= 9;

          const goalCellKey = `goal-${goalRow}-${goalCol}`;

          let hasBlock = false;
          let hasPath = false;
          let hasStart = false;

          tableData.forEach((cell: any) => {
            if (cell.includes(`block-${goalRow}-${goalCol}`)) {
              hasBlock = true;
            }
          });

          tableData.forEach((cell: any) => {
            if (cell.includes(`path-${goalRow}-${goalCol}`)) {
              hasPath = true;
            }
          });

          tableData.forEach((cell: any) => {
            if (cell.includes(`start-${goalRow}-${goalCol}`)) {
              hasStart = true;
            }
          });

          if (!maxLimits && !hasBlock && !hasPath && !hasStart) {
            // console.log(goalCellKey);
            setDraggedCells((prevDraggedCells) => ({
              ...prevDraggedCells,
              [goalCellKey]: true,
            }));

            tableData.add(`${goalCellKey}\n`);
          }

          return Animated.event([null, { dx: goalPan.x, dy: goalPan.y }], {
            useNativeDriver: false,
          })(event, gestureState);
        }
      },

      onPanResponderRelease: () => {
        Animated.spring(goalPan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.drawingArea}>
      <View style={styles.drawingArea}>
        <DrawTableComponent rows={11} columns={9} draggedCells={draggedCells} />
      </View>

      {/* Here I add the images that can be dragged on the table. */}
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
};

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
});
