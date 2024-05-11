import { StyleSheet, View, Animated } from "react-native";

export const DrawTableComponent: React.FC<{
  rows: number;
  columns: number;
  draggedCells: { [key: string]: boolean };
}> = ({ rows, columns, draggedCells }) => {
  let cells = [];

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

const styles = StyleSheet.create({
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
