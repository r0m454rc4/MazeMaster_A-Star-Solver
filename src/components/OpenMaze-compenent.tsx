import React from "react";
import { Button, Platform, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

// https://www.youtube.com/watch?v=HkIKDqzI3sQ

export default function OpenMazeComponent() {
  const downloadFromUrl = async () => {
    let filename = "small.mp4";
    let result = await FileSystem.downloadAsync(
      `http://techslides.com/demos/sample-videos/${filename}`,
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (url: any, filename: any, mimetype: any) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(url, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (url) => {
            await FileSystem.writeAsStringAsync(url, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
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
