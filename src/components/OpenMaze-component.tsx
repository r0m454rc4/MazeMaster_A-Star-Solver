import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { DrawTableComponent } from "./DrawTable-component";

export default function OpenMazeComponent() {
  const ipAddress = "10.20.1.115";
  const [modalVisible, setModalVisible] = useState(false);
  const [mazeName, setMazeName] = useState("");

  let tableData: { [key: string]: any } = [];

  const downloadMaze = async (filename: string) => {
    try {
      let response = await fetch(`http://${ipAddress}:8000/Mazes/${filename}`);

      if (response.status == 200) {
        let res = await FileSystem.downloadAsync(
          `http://${ipAddress}:8000/Mazes/${filename}`,
          FileSystem.documentDirectory + filename
        );

        openMaze(filename);

        // Close the modal (which I use to open the maze).
        setModalVisible(!modalVisible);
        // Reset filename.
        filename = "";

        return res;
      }
    } catch (error) {
      alert(`PHP server is disabled:", ${error}`);
      return setModalVisible(!modalVisible);
    }
  };

  const openMaze = async (filename: string) => {
    let result = null;

    try {
      result = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + filename
      );

      drawTable(result);

      console.log(`TableData: ${tableData}`);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  let sendMazeName = (mazeName: string) => {
    if (mazeName == "") {
      alert("The name of the maze can't be empty.");
      return "";
    } else {
      return `${mazeName}.txt`;
    }
  };

  let drawTable = (data: string) => {
    // Remove line breaks.
    const lines = data.split("\n");

    // Parse the data and return the TableComponent
    const draggedCells: { [key: string]: boolean } = {};

    lines.forEach((line) => {
      line.split(",").forEach((item) => {
        const [row, col, type] = item.split("-");
        const cellKey = `${type}-${row}-${col}`;
        draggedCells[cellKey] = true;
      });
    });

    // Here I store the dragged cells that will be drawn on the table.
    // https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/.
    tableData.push(Object.keys(draggedCells));
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Maze to open:</Text>
            <TextInput
              placeholder="maze0"
              // While I type, I update the name of the maze.
              onChangeText={(maze) => setMazeName(maze)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => downloadMaze(sendMazeName(mazeName))}
            >
              <Text style={styles.textStyle}>Open maze</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Open maze</Text>
      </Pressable>

      {/* {tableData && (
        <View>
          <DrawTableComponent rows={11} columns={9} draggedCells={tableData} />
        </View>
      )} */}

      <View>
        <DrawTableComponent rows={11} columns={9} draggedCells={tableData} />
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
  buttonOpen: {
    backgroundColor: "#339761",
  },
  buttonClose: {
    top: 10,
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
});
