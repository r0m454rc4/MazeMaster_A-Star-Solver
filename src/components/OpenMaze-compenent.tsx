import React from "react";
import { Button, Platform, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

// To download files from server.
// https://www.youtube.com/watch?v=HkIKDqzI3sQ

export default function OpenMazeComponent() {
  const downloadFromUrl = async () => {
    let filename = "maze0.txt";
    let localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    let result = await FileSystem.downloadAsync(
      `http://${localhost}:8000/src/Mazes/${filename}`,
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (url: string, filename: string, mimetype: string) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      // This is because the expo-go must have permission to write the file.
      if (permissions.granted) {
        // Here I create a representation of the file using base64.
        const base64 = await FileSystem.readAsStringAsync(url, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Here I wait for the user to select the folder and the name of the file.
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (url) => {
            // Finally, save the data from the original file of the server to the newly created file.
            await FileSystem.writeAsStringAsync(url, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        // If the user hasn't grante the permisission, add the possibility to shore in over google drive.
        shareAsync(url);
      }
    } else {
      shareAsync(url);
    }
  };

  return (
    <View>
      <Button title="Download from url" onPress={downloadFromUrl}></Button>
    </View>
  );
}
