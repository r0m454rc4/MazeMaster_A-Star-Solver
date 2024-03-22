import React, { useRef } from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";

export default function DrawMazeComponent() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      // This is to return to the initial position after releasing.
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.drawingArea}>
      <Animated.View
        style={[
          styles.square,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  drawingArea: {
    width: "83.5%",
    height: "80%",
    borderRadius: 7,
    backgroundColor: "orange",
    position: "absolute",
    // This is to give distance between header & nav bar.
    top: "5.5%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: "red",
  },
});
