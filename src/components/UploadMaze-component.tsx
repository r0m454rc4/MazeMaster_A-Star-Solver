import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";

const imgDir = FileSystem.documentDirectory + "images/";
// IP address from the computer.
const ipAddress = "192.168.1.124";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function UploadMazeComponent() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  // Load images on startup.
  useEffect(() => {
    loadImages();
  }, []);

  // Load images from file system.
  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
  };

  // Select image from library.
  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);

      // Save image if not cancelled.
      if (!result.canceled) {
        saveImage(result.assets[0].uri);
      }
    }
  };

  // Save image to file system.
  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = "maze_" + new Date().getTime() + ".jpeg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  // Upload image to server
  const uploadImage = async (uri: string) => {
    setUploading(true);

    await FileSystem.uploadAsync(`http://${ipAddress}:8000/upload.php`, uri, {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "file",
    });

    setUploading(false);
  };

  // Delete image from file system.
  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  // Render image list item.
  const renderItem = ({ item }: { item: any }) => {
    const filename = item.split("/").pop();
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 1,
          alignItems: "center",
          gap: 5,
        }}
      >
        <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
        <Text style={{ flex: 1 }}>{filename}</Text>
        <Ionicons.Button
          name="cloud-upload"
          onPress={() => uploadImage(item)}
        />
        <Ionicons.Button name="trash" onPress={() => deleteImage(item)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 20,
        }}
      >
        <Button title="Photo Library" onPress={() => selectImage(true)} />
        <Button title="Capture Image" onPress={() => selectImage(false)} />
      </View>

      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>
        Upload maze:
      </Text>
      <FlatList data={images} renderItem={renderItem} />

      {uploading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}
