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
  const ipAddress = "172.20.17.80";
  const [modalVisible, setModalVisible] = useState(false);
  const [mazeName, setMazeName] = useState("");

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

      trainAgent(result);
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

  let trainAgent = (data: string) => {
    console.log(data);
  };

  return (
    <View>
      {/* <TableComponent  /> */}
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
              onPress={() => downloadMaze(sendMazeName(mazeName))}
            >
              <Text style={styles.textStyle}>Train agent</Text>
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
