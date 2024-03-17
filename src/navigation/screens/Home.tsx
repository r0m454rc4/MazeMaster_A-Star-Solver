import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />

      {/* <Image source={require("../../assets/images/Button_controls.png")} /> */}

      <Text style={styles.getStartedText}>
        To open previously drawed maze, you must click on the upper icon.
      </Text>
    </View>
  );
}

// Styles is an object, which has container, title... as properties.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#abd2bf",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#f5f6ee",
  },
});
