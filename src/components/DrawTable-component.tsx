// DrawTableComponent.tsx
// r0m454rc4.

import React from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { MazeNode } from "./MazeNode";

type DrawTableComponentProps = {
  rows: number;
  columns: number;
  draggedCells: { [key: string]: boolean };
  path?: [number, number][];
  openSet?: MazeNode[];
  closedSet?: Set<string>;
  currentNode?: MazeNode | null;
};

export const DrawTableComponent: React.FC<DrawTableComponentProps> = (
  props
) => {
  const {
    rows,
    columns,
    draggedCells,
    path = [],
    openSet = [],
    closedSet = new Set(),
    currentNode = null,
  } = props;

  const isPath = (row: number, col: number) =>
    path.some(([r, c]) => r === row && c === col);
  const isOpenSet = (row: number, col: number) =>
    openSet.some(
      (node) => node.position[0] === row && node.position[1] === col
    );
  const isClosedSet = (row: number, col: number) =>
    closedSet.has(`${row},${col}`);
  const isCurrentNode = (row: number, col: number) =>
    currentNode?.position[0] === row && currentNode?.position[1] === col;

  let cells: any = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const blockCellKey = `block-${row}-${col}`,
        goalCellKey = `goal-${row}-${col}`,
        pathCellKey = `path-${row}-${col}`,
        startCellKey = `start-${row}-${col}`;

      cells.push(
        <View key={`col_${col}_row_${row}`} style={styles.cell}>
          {isPath(row, col) ? (
            <View style={[styles.drawingTableAsset, styles.pathCell]} />
          ) : isOpenSet(row, col) ? (
            <View style={[styles.drawingTableAsset, styles.openSetCell]} />
          ) : isClosedSet(row, col) ? (
            <View style={[styles.drawingTableAsset, styles.closedSetCell]} />
          ) : isCurrentNode(row, col) ? (
            <View style={[styles.drawingTableAsset, styles.currentNodeCell]} />
          ) : draggedCells[blockCellKey] ? (
            <Animated.Image
              source={require("../../assets/images/Block.png")}
              style={styles.drawingTableAsset}
            />
          ) : draggedCells[pathCellKey] ? (
            <Animated.Image
              source={require("../../assets/images/Path.png")}
              style={styles.drawingTableAsset}
            />
          ) : draggedCells[startCellKey] ? (
            <Animated.Image
              source={require("../../assets/images/Start.png")}
              style={styles.drawingTableAsset}
            />
          ) : draggedCells[goalCellKey] ? (
            <Animated.Image
              source={require("../../assets/images/Goal.png")}
              style={styles.drawingTableAsset}
            />
          ) : null}
        </View>
      );
    }
  }

  return <View style={styles.table}>{cells}</View>;
};

const styles = StyleSheet.create({
  drawingTableAsset: {
    width: 35,
    height: 35,
  },
  table: {
    top: -40,
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("screen").width / 1.3,
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
  pathCell: {
    backgroundColor: "#5576cc",
  },
  openSetCell: {
    backgroundColor: "#339761",
  },
  closedSetCell: {
    backgroundColor: "#ff4500",
  },
  currentNodeCell: {
    backgroundColor: "orange",
  },
});
