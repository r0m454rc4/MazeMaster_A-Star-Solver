import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  PanResponderInstance,
} from "react-native";

const RedCube = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [draggedCells, setDraggedCells] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number }>({
    row: -1,
    col: -1,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // Calculate row and col based on gesture position relative to the table
        const col = Math.floor((gesture.moveX - 135) / 35); // Assuming cell width is 35
        const row = Math.floor((gesture.moveY - 135) / 35); // Assuming cell height is 35

        // Calculate the absolute position of the red cube relative to the table
        const redCubeX = gesture.moveX - gesture.dx;
        const redCubeY = gesture.moveY - gesture.dy;

        // Adjust row and col based on the position of the red cube
        const adjustedCol = Math.floor((redCubeX - 135) / 35);
        const adjustedRow = Math.floor((redCubeY - 135) / 35);

        setHoveredCell({ row: adjustedRow, col: adjustedCol });

        // Update the position of the red cube
        pan.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });

        // Update the list of dragged cells
        const cellKey = `${row}-${col}`;
        setDraggedCells((prevDraggedCells) => ({
          ...prevDraggedCells,
          [cellKey]: true,
        }));
      },

      onPanResponderRelease: () => {
        // On release, snap the cube back to initial position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 }, // Initial position
          useNativeDriver: false,
        }).start();
      },
    })
  ).current as PanResponderInstance;

  const Table = () => {
    const cells = [];

    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 9; col++) {
        // This cell key must be the same as the one in line 45.
        const cellKey = `${row}-${col}`;

        cells.push(
          <View key={cellKey} style={styles.cell}>
            {draggedCells[cellKey] && (
              <Animated.Image
                source={require("../../assets/images/Block.png")}
                style={styles.block}
              />
            )}
          </View>
        );
      }
    }

    return cells;
  };

  return (
    <View style={styles.container}>
      <View style={styles.table}>{Table()}</View>
      {/* Render red cube */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.redCube]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  table: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 330, // Adjust this to fit the table within the screen
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: 35,
    height: 35,
    borderColor: "black",
    borderWidth: 1,
  },
  block: {
    width: 35,
    height: 35,
  },
  redCube: {
    marginTop: 20,
    width: 35,
    height: 35,
    backgroundColor: "red",
    alignItems: "center",
  },
});

export default RedCube;
