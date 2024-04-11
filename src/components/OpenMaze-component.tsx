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

export default function OpenMazeComponent() {
  const ipAddress = "10.20.1.214";

  const [modalVisible, setModalVisible] = useState(false);
  const [mazeName, setMazeName] = useState("");

  const downloadFromUrl = async (filename: string) => {
    // This is to alert if the user didn't enter a maze to open.
    if (filename == ".txt") {
      alert("The name of the maze can't be empty.");
      // Close the modal (which I use to open the maze).
      setModalVisible(!modalVisible);

      return "";
    } else {
      try {
        let response = await fetch(
          `http://${ipAddress}:8000/Mazes/${filename}`
        );

        if (response.status == 200) {
          openMaze(filename);
          // Reset filename.
          filename = "";
          // Close the modal (which I use to open the maze).
          setModalVisible(!modalVisible);
        }
      } catch (error) {
        return alert(`PHP server is disabled:", ${error}`);
      }
    }
  };

  const Table = (rows: number, columns: number) => {
    let cells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        cells.push(
          <View key={`col_${col}_row_${row}`} style={styles.cell}></View>
        );
      }
    }

    return <View style={styles.table}>{cells}</View>;
  };

  const openMaze = async (filename: string) => {
    let result = null;

    try {
      result = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + filename
      );

      console.log(`Result: ${result}`);
    } catch (error) {
      alert(error);
    }

    // return <View style={styles.centeredView}>{Table(11, 9)}</View>;
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

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
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
              onPress={() => downloadFromUrl(sendMazeName(mazeName))}
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

      {/* <View style={styles.centeredView}>{Table(11, 9)}</View> */}
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
    backgroundColor: "#edecd8",
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
    top: -15,
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
  cell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: "black",
  },
});
