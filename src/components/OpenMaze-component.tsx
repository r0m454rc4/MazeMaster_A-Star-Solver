import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { DrawTableComponent } from "./DrawTable-component";
import { MazeNode } from "./MazeNode"; // Import MazeNode

type CellType = "path" | "block" | "start" | "goal";
type Cell = {
  type: CellType;
  row: number;
  col: number;
};

export default function OpenMazeComponent() {
  const ipAddress = "192.168.1.181";
  const [modalVisible, setModalVisible] = useState(false);
  const [mazeName, setMazeName] = useState("");
  const [tableData, setTableData] = useState<{ [key: string]: boolean }>({});

  // This part is for A* algorithm.
  const [isMazeLoaded, setIsMazeLoaded] = useState(false);
  const [numericGrid, setNumericGrid] = useState<number[][]>([]);
  const [path, setPath] = useState<[number, number][]>([]);
  const [openSet, setOpenSet] = useState<MazeNode[]>([]);
  const [closedSet, setClosedSet] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<MazeNode | null>(null);

  // This is to execute runAStar when the maze is converted to numbers.
  useEffect(() => {
    if (isMazeLoaded) {
      const startNode = findNode(numericGrid, 2);
      const goalNode = findNode(numericGrid, 3);
      if (startNode && goalNode) {
        runAStar(startNode, goalNode);
      }
    }
  }, [isMazeLoaded, numericGrid]);

  const downloadMaze = async (filename: string) => {
    try {
      const response = await fetch(
        `http://${ipAddress}:8000/Mazes/${filename}`
      );
      if (response.status === 200) {
        const res = await FileSystem.downloadAsync(
          `http://${ipAddress}:8000/Mazes/${filename}`,
          FileSystem.documentDirectory + filename
        );
        openMaze(filename);
        setModalVisible(false);
        setMazeName("");
        return res;
      }
    } catch (error) {
      alert(`Error downloading the maze: ${error}`);
      setModalVisible(false);
    }
  };

  const openMaze = async (filename: string) => {
    try {
      const result = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + filename
      );
      drawMaze(result);
    } catch (error) {
      alert(`Error reading the file: ${error}`);
    }
  };

  const drawMaze = async (data: string) => {
    const lines = data.trim().split("\n");
    const mazeGrid = lines.map((line) =>
      line.split(",").map((item) => {
        const [type, row, col] = item.split("-");
        return {
          type: type as CellType,
          row: parseInt(row, 10),
          col: parseInt(col, 10),
        };
      })
    );

    console.log("Parsed maze grid:", mazeGrid);

    const draggedCells: { [key: string]: boolean } = {};
    mazeGrid.forEach((row) => {
      row.forEach((cell) => {
        const cellKey = `${cell.type}-${cell.row}-${cell.col}`;
        draggedCells[cellKey] = true;
      });
    });

    setTableData(draggedCells);
    convertMazeToNumeric(mazeGrid);
  };

  const convertMazeToNumeric = (mazeGrid: Cell[][]) => {
    const numericGrid = Array.from({ length: 11 }, () => Array(9).fill(-1));

    mazeGrid.forEach((row) => {
      row.forEach(({ type, row, col }) => {
        numericGrid[row][col] = {
          path: 0,
          block: 1,
          start: 2,
          goal: 3,
        }[type];
      });
    });

    console.log("Numeric Grid:", numericGrid);

    setNumericGrid(numericGrid);

    // After converting the maze to numeric, runAStar will execute.
    setIsMazeLoaded(true);
  };

  const findNode = (
    maze: number[][],
    value: number
  ): [number, number] | null => {
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === value) {
          return [i, j];
        }
      }
    }
    return null;
  };

  const heuristic = (a: [number, number], b: [number, number]) => {
    const h = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    console.log(`Heuristic from ${a} to ${b}:`, h);
    return h;
  };

  const getNeighbors = (node: MazeNode, maze: number[][]) => {
    if (!maze || maze.length === 0 || maze[0].length === 0) {
      return [];
    }

    const [x, y] = node.position;
    const neighbors: [number, number][] = [];
    if (x > 0) neighbors.push([x - 1, y]);
    if (x < maze.length - 1) neighbors.push([x + 1, y]);
    if (y > 0) neighbors.push([x, y - 1]);
    if (y < maze[0].length - 1) neighbors.push([x, y + 1]);
    console.log(`Neighbors of ${node.position}:`, neighbors);
    return neighbors;
  };

  const runAStar = (start: [number, number], goal: [number, number]) => {
    const openSet: MazeNode[] = [];
    const closedSet = new Set<string>();

    const startNode = new MazeNode(start, 0, heuristic(start, goal), 0, null);
    openSet.push(startNode);

    const path: [number, number][] = [];
    let found = false;

    const interval = setInterval(() => {
      if (openSet.length === 0) {
        clearInterval(interval);
        alert("No path found!");
        console.log("Open set is empty, no path found.");
        return;
      }

      openSet.sort((a, b) => a.f - b.f);
      const currentNode = openSet.shift()!;
      closedSet.add(currentNode.position.toString());
      setCurrentNode(currentNode); // Set the current node

      console.log("Current Node:", currentNode);

      if (currentNode.position.toString() === goal.toString()) {
        let current: MazeNode | null = currentNode;
        while (current) {
          path.push(current.position);
          current = current.parent;
        }
        setPath(path.reverse());
        clearInterval(interval);
        found = true;
        console.log("Path found:", path);
        return;
      }

      const neighbors = getNeighbors(currentNode, numericGrid);
      console.log("Neighbors of current node:", neighbors);

      for (const neighbor of neighbors) {
        const neighborPosStr = neighbor.toString();
        if (
          closedSet.has(neighborPosStr) ||
          numericGrid[neighbor[0]][neighbor[1]] === 1
        ) {
          continue;
        }

        const g = currentNode.g + 1;
        const h = heuristic(neighbor, goal);
        const f = g + h;
        const existingNode = openSet.find(
          (node) => node.position.toString() === neighborPosStr
        );

        if (!existingNode || g < existingNode.g) {
          const neighborNode = new MazeNode(neighbor, g, h, f, currentNode);
          if (!existingNode) {
            openSet.push(neighborNode);
            console.log("Adding neighbor to open set:", neighborNode);
          } else {
            existingNode.g = g;
            existingNode.h = h;
            existingNode.f = f;
            existingNode.parent = currentNode;
            console.log(
              "Updating existing neighbor in open set:",
              existingNode
            );
          }
        }
      }

      setOpenSet([...openSet]);
      setClosedSet(new Set(closedSet));
      console.log("Open Set:", openSet, "Closed Set:", closedSet);
    }, 100);

    if (!found) {
      return [];
    }
  };

  const sendMazeName = (mazeName: string) => {
    if (mazeName === "") {
      alert("The name of the maze can't be empty.");
      return "";
    }
    return `${mazeName}.txt`;
  };

  return (
    <View>
      <View style={styles.tableArea}>
        <DrawTableComponent
          rows={11}
          columns={9}
          draggedCells={tableData}
          path={path}
          openSet={openSet}
          closedSet={closedSet}
          currentNode={currentNode}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Maze to open:</Text>
            <TextInput
              placeholder="maze0"
              onChangeText={setMazeName}
              value={mazeName}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                downloadMaze(sendMazeName(mazeName)), setTableData({});
                setPath([]);
                setOpenSet([]);
                setNumericGrid([]);
                setClosedSet(new Set());
              }}
            >
              <Text style={styles.textStyle}>Open Maze</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <Pressable
          style={[styles.solveMazeButton, styles.solveMazeButton]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Solve maze</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  solveMazeButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#5576cc",
    top: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  tableArea: {
    marginTop: -43,
    width: Dimensions.get("screen").width / 1.1,
    height: Dimensions.get("screen").height / 1.85,
    borderRadius: 7,
    backgroundColor: "orange",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40,
  },
});
