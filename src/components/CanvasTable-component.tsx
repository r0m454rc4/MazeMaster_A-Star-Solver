import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

const CELL_SIZE = 35;
const NUM_ROWS = 11;
const NUM_COLS = 9;

const TableWithCells = () => {
  const renderCells = () => {
    const cells = [];

    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;

        cells.push(
          <Rect
            key={`${row}-${col}`}
            x={x}
            y={y}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="transparent"
            stroke="black"
            strokeWidth="1"
          />
        );

        // On the future, this will show the drawed blocks.
        // cells.push(
        //   <SvgText
        //     key={`text-${row}-${col}`}
        //     x={x + CELL_SIZE / 2}
        //     y={y + CELL_SIZE / 2}
        //     fill="black"
        //     fontSize="12"
        //     textAnchor="middle"
        //     alignmentBaseline="central"
        //   >
        //     {`(${row}, ${col})`}
        //   </SvgText>
        // );
      }
    }

    return cells;
  };

  return (
    <View style={styles.container}>
      <Svg width={NUM_COLS * CELL_SIZE} height={NUM_ROWS * CELL_SIZE}>
        {renderCells()}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TableWithCells;
