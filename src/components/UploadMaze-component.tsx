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
import { tableData } from "./DrawMaze-compenent";

export default function UploadMazeComponent() {
  const ipAddress = "localhost";

  const uploadFromTable = async (filename: string, data: Set<string>) => {
    // Here I transform the set into an array.
    let arrayData = [...data];

    try {
      let response = await fetch(`http://${ipAddress}:8000/upload.php`, {
        method: "post",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          filename: filename,
          data: arrayData,
        }),
      });

      if (response.status == 200) {
        setModalVisible(!modalVisible);
        return response;
      }
    } catch (error) {
      return alert(`PHP server is disabled:", ${error}`);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [mazeName, setMazeName] = useState("");

  let sendMazeName = (mazeName: string) => {
    // if (mazeName == "") {
    //   return alert("The name of the maze can't be empty.");
    // } else {
    return `${mazeName}.txt`;
    // }
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
            <Text style={styles.modalText}>Name of the maze:</Text>
            <TextInput
              placeholder="maze0"
              // While I type, I update the name of the maze.
              onChangeText={(maze) => setMazeName(maze)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              // tableData is the data sent when the user draws.
              onPress={() => uploadFromTable(sendMazeName(mazeName), tableData)}
            >
              <Text style={styles.textStyle}>Save maze</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Save maze</Text>
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
    top: -30,
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
